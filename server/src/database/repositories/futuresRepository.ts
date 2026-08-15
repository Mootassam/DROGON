import MongooseRepository from "./mongooseRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import AuditLogRepository from "./auditLogRepository";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";
import FileRepository from "./fileRepository";
import Futures from "../models/futures";
import Wallet from "../models/wallet";
import { sendNotification } from "../../services/notificationServices";
import Error400 from "../../errors/Error400";
import Transaction from '../models/transaction';

class FuturesRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    if (!data.futuresAmount || data.futuresAmount <= 200) {
      throw new Error400(options.language, "errors.amountConditions");
    }

    const walletModel = Wallet(options.database);
    const transactionModel = Transaction(options.database);

    const usdtWallet = await walletModel.findOne({
      user: currentUser.id,
      symbol: "USDT",
      accountType: 'exchange'
    });

    if (!usdtWallet) {
      throw new Error400(options.database, 'errors.usdtWalletNotFound');
    }

    if (usdtWallet.amount < data.futuresAmount) {
      throw new Error400(options.database,'errors.insufficientusdtWallet');
    }

    if (usdtWallet.status !== 'active') {
      throw new Error400(options.database, 'errors.usdtWalletorfrozen');
    }

    try {
      const updatedWallet = await walletModel.findOneAndUpdate(
        {
          _id: usdtWallet._id,
          tenant: currentTenant.id,
          amount: { $gte: data.futuresAmount },
          accountType: 'exchange'
        },
        {
          $inc: { amount: -data.futuresAmount },
          $set: { updatedBy: currentUser.id, updatedAt: new Date() },
        },
        { new: true }
      );

      if (!updatedWallet) {
        throw new Error400(options.database,'errors.insufficientusdtWallet');
      }

      const openPositionTime = data.openPositionTime
        ? new Date(data.openPositionTime)
        : new Date();

      const durationMs = await this.parseDurationToMs(
        data.contractDuration || "60s"
      );

      const expiryTime = new Date(openPositionTime.getTime() + durationMs);

      const payload = {
        ...data,
        openPositionTime,
        expiryTime,
        finalized: false,
        finalizedAt: null,
        tenant: currentTenant.id,
        createdBy: currentUser.id,
        updatedBy: currentUser.id,
        accountType: currentUser.accountType || "real",
      };

        const [record] = await Futures(options.database).create([payload], options);

        await transactionModel.create({
          type: "futures_reserved",
          referenceId: record._id,
          wallet: usdtWallet._id,
          asset: "USDT",
          amount: data.futuresAmount,
          status: "completed",
          direction: "out",
          user: currentUser.id,
          tenant: currentTenant.id,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
          dateTransaction: new Date(),
          description: `Futures trade reserved: ${data.futuresAmount} USDT for ${data.futuresStatus} position`
        });

      await sendNotification({
        userId: currentUser.id,
        message: `Futures trade created: ${data.futuresAmount} USDT`,
        type: "futures",
        forAdmin: true,
        options,
      });

      await this._createAuditLog(
        AuditLogRepository.CREATE,
        record.id,
        payload,
        options
      );

      return this.findById(record.id, options);
    } catch (error) {
      console.error('Futures creation failed:', error);
      throw error;
    }
  }

  static async update(id, data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    const FuturesModel = Futures(options.database);
    const walletModel = Wallet(options.database);
    const transactionModel = Transaction(options.database);

    let record = await FuturesModel.findById(id);

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    if (record.finalized) {
      throw new Error400(options.language, "futures.alreadyFinalized");
    }

    const isControlUpdate = data.control === "loss" || data.control === "profit";

    const calculateProfit = (
      amount: number,
      leverage: number | string,
      duration: string | number
    ): number => {
      const amountNum = Number(amount) || 0;
      const leverageNum = parseFloat(leverage?.toString() || "0");
      const durationStr = duration?.toString().trim();

      const payoutMap: Record<string, number> = {
        "60": 10,
        "120": 20,
        "180": 40,
        "240": 80,
      };

      const payoutPercent = payoutMap[durationStr];
      if (!payoutPercent) return 0;

      return (amountNum * leverageNum * payoutPercent) / 100;
    };

    const calculateClosingPrice = (
      openPrice: number,
      direction: "long" | "short",
      control: "profit" | "loss",
      assetType: string
    ): number => {
      const basePrice = openPrice;
      const randomPercentage = 0.002 + Math.random() * (0.005 - 0.002);
      const change = basePrice * (randomPercentage / 100);

      if (control === "profit") {
        if (direction === "long") {
          return basePrice + change;
        } else {
          return basePrice - change;
        }
      } else {
        if (direction === "long") {
          return basePrice - change;
        } else {
          return basePrice + change;
        }
      }
    };

    try {
       if (isControlUpdate) {
         const selectedWallet = await walletModel.findOne({
           user: record.createdBy,
           symbol: "USDT",
           tenant: currentTenant.id,
           accountType: 'exchange'
         });

          if (!selectedWallet) {
            throw new Error400(options.language, "errors.usdtWalletNotFoundForUser", {
              userId: record.createdBy
            });
          }

          let closePrice = data.closePositionPrice;
          if (closePrice && closePrice > 100) {
            throw new Error400(options.language, "errors.closingPriceExceedLimit");
          }

          if (!closePrice) {
            closePrice = calculateClosingPrice(
              record.openPositionPrice,
              record.futuresStatus,
              data.control,
              record.futuresPair || "BTC/USDT"
            );
          }

          const closeTime = data.closePositionTime || new Date();

          // ── Percentage-based P&L (new admin UI) ─────────────────────────
          // data.profitPercent: number (e.g. 20 = 20%)
          // netPnl: signed net P&L (+profit, -loss)
          // walletReturn: amount credited back to wallet (capital ± netPnl)
          let netPnl: number;
          let walletReturn: number;

          if (data.profitPercent !== undefined && data.profitPercent !== null) {
            const pct = Math.max(0, Math.min(100, Number(data.profitPercent)));
            const pnlAbs = record.futuresAmount * pct / 100;
            netPnl       = data.control === 'profit' ? pnlAbs : -pnlAbs;
            walletReturn = record.futuresAmount + netPnl;
          } else if (data.profitAndLossAmount !== undefined) {
            // Legacy path: profitAndLossAmount was total returned for profit,
            // or negative full amount for loss. Convert to netPnl / walletReturn.
            const raw = Number(data.profitAndLossAmount);
            if (data.control === 'profit') {
              // Old format: raw = futuresAmount + profit (e.g. 1200)
              walletReturn = raw;
              netPnl       = raw - record.futuresAmount;
            } else {
              // Old format: raw = -futuresAmount (e.g. -1000) — user loses all
              walletReturn = 0;
              netPnl       = raw; // keeps negative value
            }
          } else {
            // Fallback: leverage-based calculation
            const profitAmount = FuturesRepository.calculateProfit(
              record.futuresAmount,
              record.leverage,
              record.contractDuration
            );
            if (data.control === 'profit') {
              netPnl       = profitAmount;
              walletReturn = record.futuresAmount + profitAmount;
            } else {
              netPnl       = -record.futuresAmount;
              walletReturn = 0;
            }
          }

          if (data.control === 'profit' && netPnl <= 0) {
            throw new Error400(options.language, 'errors.profitAmountInvalid');
          }
          if (data.control === 'loss' && netPnl >= 0) {
            throw new Error400(options.language, 'errors.lossAmountInvalid');
          }

          // Credit wallet (return capital ± P&L)
          if (walletReturn > 0) {
            await walletModel.findOneAndUpdate(
              { _id: selectedWallet._id, tenant: currentTenant.id, accountType: 'exchange' },
              {
                $inc: { amount: walletReturn },
                $set: { updatedBy: currentUser.id, updatedAt: new Date() },
              },
              { new: true }
            );
          }

          await transactionModel.create({
            type: data.control === 'profit' ? 'futures_profit' : 'futures_loss',
            referenceId: record._id,
            wallet: selectedWallet._id,
            asset: 'USDT',
            amount: Math.abs(netPnl),
            status: 'completed',
            direction: data.control === 'profit' ? 'in' : 'out',
            user: record.createdBy,
            tenant: currentTenant.id,
            createdBy: currentUser.id,
            updatedBy: currentUser.id,
            dateTransaction: new Date(),
            description: data.control === 'profit'
              ? `Futures profit: +${netPnl.toFixed(2)} USDT (${record.futuresAmount} returned)`
              : `Futures loss: ${netPnl.toFixed(2)} USDT (${walletReturn.toFixed(2)} returned)`
          });

         await FuturesModel.updateOne(
           { _id: id, tenant: currentTenant.id, finalized: { $ne: true } },
           {
             $set: {
               control: data.control,
               finalized: true,
               finalizedAt: new Date(),
               updatedBy: currentUser.id,
               profitAndLossAmount: netPnl,
               closePositionPrice: closePrice,
               closePositionTime: closeTime,
             },
           }
         );

      } else {
        const updateData = { ...data, updatedBy: currentUser.id };

        if (data.closePositionPrice && data.closePositionPrice > 100) {
          throw new Error400(options.language, "errors.closingPriceExceedLimit");
        }

        await FuturesModel.updateOne(
          { _id: id, tenant: currentTenant.id },
          updateData
        );
      }

      await this._createAuditLog(AuditLogRepository.UPDATE, id, data, options);

      record = await this.findById(id, options);
      return record;

    } catch (err) {
      throw err;
    }
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Futures(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Futures(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(AuditLogRepository.DELETE, id, record, options);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Futures(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Futures(options.database)
        .findById(id)
        .populate("user")
        .populate("createdBy"),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    return this._fillFileDownloadUrls(record);
  }

  static async findAndCountAll(
    { filter, limit = 500, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [];
    criteriaAnd.push({ tenant: currentTenant.id });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({ ["_id"]: MongooseQueryUtils.uuid(filter.id) });
      }
      if (filter.user) {
        criteriaAnd.push({ createdBy: filter.user });
      }
      if (filter.idnumer) {
        criteriaAnd.push({
          idnumer: { $regex: MongooseQueryUtils.escapeRegExp(filter.idnumer), $options: "i" },
        });
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");
    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;

    let rows = await Futures(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate("user")
      .populate("createdBy");

    const count = await Futures(options.database).countDocuments(criteria);

    rows = await Promise.all(rows.map(this._fillFileDownloadUrls));

    return { rows, count };
  }

  static async findAndCountAllMobile(
    { filter, limit = 500, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    let criteriaAnd: any = [];
    criteriaAnd.push({ tenant: currentTenant.id, createdBy: currentUser.id });

    if (filter) {
      criteriaAnd.push({ finalized: filter });
      if (filter.id) {
        criteriaAnd.push({ ["_id"]: MongooseQueryUtils.uuid(filter.id) });
      }
      if (filter.idnumer) {
        criteriaAnd.push({
          idnumer: { $regex: MongooseQueryUtils.escapeRegExp(filter.idnumer), $options: "i" },
        });
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");
    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;

    let rows = await Futures(options.database)
      .find(criteria)
      .skip(skip)
      .sort(sort)
      .populate("createdBy");

    const count = await Futures(options.database).countDocuments(criteria);

    rows = await Promise.all(rows.map(this._fillFileDownloadUrls));

    return { rows, count };
  }

  static async findAllAutocomplete(search, limit, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: Array<any> = [{ tenant: currentTenant.id }];

    if (search) {
      criteriaAnd.push({
        $or: [
          { _id: MongooseQueryUtils.uuid(search) },
          { titre: { $regex: MongooseQueryUtils.escapeRegExp(search), $options: "i" } },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort("titre_ASC");
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = { $and: criteriaAnd };

    const records = await Futures(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
  }

  static async _fillFileDownloadUrls(record) {
    if (!record) {
      return null;
    }
    const output = record.toObject ? record.toObject() : record;
    output.photo = await FileRepository.fillDownloadUrl(output.photo);
    return output;
  }

  static async autoFinalizeExpired(options: IRepositoryOptions) {
    const now = new Date();
    const PRE_EMPTIVE_WINDOW_MS = 20 * 1000;
    const preEmptiveCutoff = new Date(now.getTime() + PRE_EMPTIVE_WINDOW_MS);

    const FuturesModel = Futures(options.database);
    const WalletModel = Wallet(options.database);
    const TransactionModel = Transaction(options.database);

    const candidates = await FuturesModel.find({
      finalized: false,
      expiryTime: { $lte: preEmptiveCutoff }
    })
    .limit(1000)
    .lean();

    if (candidates.length === 0) {
      return { processed: 0 };
    }

    let processedCount = 0;

    for (const record of candidates) {
       try {
          const isDemo = record.accountType === 'demo';
          const isPreemptive = record.expiryTime > now;

          // Skip if not yet expired
          if (isPreemptive) {
            continue;
          }

          let control: 'profit' | 'loss';
          let descriptionPrefix: string;
          let closePrice: number;

          if (isDemo) {
            // Demo: 85% profit, 15% loss
            const random = Math.random();
            control = random < 0.85 ? 'profit' : 'loss';
            descriptionPrefix = control === 'profit' ? 'Demo profit' : 'Demo loss';
            closePrice = FuturesRepository.calculateClosingPrice(
              record.openPositionPrice,
              record.futuresStatus,
              control,
              record.futureCoin || 'BTC/USDT'
            );
          } else {
            // Real: 30% profit, 70% loss
            const random = Math.random();
            control = random < 0.30 ? 'profit' : 'loss';
            descriptionPrefix = control === 'profit' ? 'Auto profit' : 'Expired loss';
            closePrice = FuturesRepository.calculateClosingPrice(
              record.openPositionPrice,
              record.futuresStatus,
              control,
              record.futureCoin || 'BTC/USDT'
            );
          }

        const updateData: any = {
          control,
          finalized: true,
          finalizedAt: now,
          closePositionPrice: closePrice,
          closePositionTime: now,
          updatedBy: null
        };

        let profitLossAmount: number;

        if (control === 'profit') {
          const profitAmount = FuturesRepository.calculateProfit(
            record.futuresAmount,
            record.leverage,
            record.contractDuration
          );
          profitLossAmount = record.futuresAmount + profitAmount;
          updateData.profitAndLossAmount = profitLossAmount;
        } else {
          profitLossAmount = -record.futuresAmount;
          updateData.profitAndLossAmount = profitLossAmount;
        }

        const updateResult = await FuturesModel.updateOne(
          { _id: record._id, finalized: false },
          { $set: updateData }
        );

        if (updateResult.modifiedCount === 0) {
          continue;
        }

        const wallet = await WalletModel.findOne({
          user: record.createdBy,
          symbol: "USDT",
          accountType: 'exchange',
          tenant: record.tenant
        });

        if (wallet) {
          if (control === 'profit') {
            await WalletModel.updateOne(
              { _id: wallet._id },
              { $inc: { amount: profitLossAmount } }
            );
          }

          await TransactionModel.create({
            type: control === 'profit' ? 'futures_profit' : 'futures_loss',
            referenceId: record._id,
            wallet: wallet._id,
            asset: 'USDT',
            amount: Math.abs(profitLossAmount),
            status: 'completed',
            direction: control === 'profit' ? 'in' : 'out',
            user: record.createdBy,
            tenant: record.tenant,
            dateTransaction: now,
            description: `Futures ${control}: ${Math.abs(profitLossAmount)} USDT (${descriptionPrefix})`
          });
        }

        await sendNotification({
          userId: record.createdBy,
          message: `Your futures trade has been closed with ${control === 'profit' ? 'a profit' : 'a loss'} of ${Math.abs(profitLossAmount)} USDT`,
          type: "futures",
          options: {
            ...options,
            currentUser: { id: record.createdBy },
            currentTenant: { id: record.tenant }
          }
        });

        processedCount++;
      } catch (err) {
        console.error(`Error processing future ${record._id}:`, err);
      }
    }

    return { processed: processedCount };
  }

  static calculateClosingPrice(
    openPrice: number,
    direction: "long" | "short",
    control: "profit" | "loss",
    assetType: string
  ): number {
    const basePrice = openPrice;
    const randomPercentage = 0.002 + Math.random() * (0.005 - 0.002);
    const change = basePrice * (randomPercentage / 100);

    if (control === "profit") {
      if (direction === "long") {
        return basePrice + change;
      } else {
        return basePrice - change;
      }
    } else {
      if (direction === "long") {
        return basePrice - change;
      } else {
        return basePrice + change;
      }
    }
  }

  static calculateProfit(
    amount: number,
    leverage: number | string,
    duration: string | number
  ): number {
    const amountNum = Number(amount) || 0;
    const leverageNum = parseFloat(leverage?.toString() || "0");
    const durationStr = duration?.toString().trim();

    const payoutMap: Record<string, number> = {
      "60": 10,
      "120": 20,
      "180": 40,
      "240": 80,
    };

    const payoutPercent = payoutMap[durationStr];
    if (!payoutPercent) return 0;

    return (amountNum * leverageNum * payoutPercent) / 100;
  }

  static async parseDurationToMs(duration: string | number | undefined) {
    if (duration == null) return 0;
    if (typeof duration === "number") return duration * 1000;
    if (typeof duration !== "string") return 0;

    const trimmed = duration.trim().toLowerCase();

    if (/^\d+$/.test(trimmed)) {
      return parseInt(trimmed, 10) * 1000;
    }

    const m = trimmed.match(/^(\d+)(s|m|h|d)?$/);
    if (!m) return 0;

    const v = Number(m[1]);
    const unit = m[2] || "s";

    switch (unit) {
      case "s": return v * 1000;
      case "m": return v * 60 * 1000;
      case "h": return v * 60 * 60 * 1000;
      case "d": return v * 24 * 60 * 60 * 1000;
      default: return v * 1000;
    }
  }
}

export default FuturesRepository;
