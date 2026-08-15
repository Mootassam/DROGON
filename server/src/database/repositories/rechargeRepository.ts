import MongooseRepository from "./mongooseRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import AuditLogRepository from "./auditLogRepository";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";
import FileRepository from "./fileRepository";
import Withdraw from "../models/withdraw";
import assets from "../models/wallet";
import transaction from "../models/transaction";
import { sendNotification } from "../../services/notificationServices";
import Error405 from "../../errors/Error405";
import User from "../models/user";
import Error400 from "../../errors/Error400";

class WithdrawRepository {
 static async create(data, options: IRepositoryOptions) {
  const currentTenant = MongooseRepository.getCurrentTenant(options);
  const currentUser = MongooseRepository.getCurrentUser(options);
  const WalletModel = assets(options.database);

  // Find the user's exchange wallet for the specified currency
  let wallet = await WalletModel.findOne({
    user: currentUser.id,
    symbol: data.currency,
    accountType: 'exchange'
  });

  if (!wallet) {
    throw new Error400(
      options.language, 
      "wallet.errors.notFounds",
      { currency: data.currency }
    );
  }

  // Comprehensive freeze status check
  if (wallet.status === 'freezed') {
    let errorMessage;
    let errorKey;
    
    if (wallet.amountFreezed > 0) {
      // Wallet is frozen and has frozen funds
      errorKey = "wallet.errors.frozenWithFunds";
      errorMessage = {
        currency: data.currency,
        frozenAmount: wallet.amountFreezed,
        availableAmount: wallet.amount
      };
    } else {
      // Wallet is frozen but no frozen funds
      errorKey = "wallet.errors.frozen";
      errorMessage = { currency: data.currency };
    }
    
    throw new Error400(options.language, errorKey, errorMessage);
  }

  // Check sufficient balance (considering available amount only)
  if (wallet.amount < data.totalAmount) {
    const availableBalance = wallet.amount;
    const frozenBalance = wallet.amountFreezed;
    const totalBalance = availableBalance + frozenBalance;
    
    if (frozenBalance > 0) {
      // User has some funds, but they're frozen
      throw new Error400(
        options.language, 
        "wallet.errors.insufficientWithFrozen",
        {
          currency: data.currency,
          requested: data.totalAmount,
          available: availableBalance,
          frozen: frozenBalance,
          total: totalBalance
        }
      );
    } else {
      // User simply doesn't have enough funds
      throw new Error400(
        options.language, 
        "wallet.errors.insufficientBalance",
        {
          currency: data.currency,
          requested: data.totalAmount,
          available: availableBalance
        }
      );
    }
  }

  // Validate withdrawal password
  // const user = await User(options.database).findById(currentUser.id);
  // if (!user || user.withdrawPassword !== data.withdrawPassword) {
  //   throw new Error400(
  //     options.language, 
  //     "auth.errors.invalidWithdrawPassword"
  //   );
  // }

  // Create withdrawal record
  console.log("Creating withdrawal record with data:", data);
  const [record] = await Withdraw(options.database).create(
    [
      {
        ...data,
        tenant: currentTenant.id,
        createdBy: currentUser.id,
        updatedBy: currentUser.id,
      },
    ],
    options
  );

  const TransactionModel = options.database.model("transaction");

  // Reduce balance immediately (hold funds while withdrawal is pending)
  await WalletModel.updateOne(
    { _id: wallet.id, accountType: 'exchange' },
    {
      $inc: { amount: -data.totalAmount },
      updatedBy: currentUser.id,
    },
    options
  );

  // Create a transaction log
  await TransactionModel.create({
    type: "withdraw",
    wallet: wallet.id,
    asset: wallet.symbol,
    amount: data.totalAmount,
    referenceId: record.id,
    direction: "out",
    status: "pending",
    user: currentUser.id,
    tenant: currentTenant.id,
    createdBy: currentUser.id,
    updatedBy: currentUser.id,
  });

  // Send notification
  await sendNotification({
    userId: data.createdBy,
    message: ` ${data.totalAmount}`,
    type: "withdraw",
    forAdmin: true,
    options,
  });

  return wallet;
}

  static async update(id, data, io, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Withdraw(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Withdraw(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy: MongooseRepository.getCurrentUser(options).id,
      },
      options
    );

    await this._createAuditLog(AuditLogRepository.UPDATE, id, data, options);

    record = await this.findById(id, options);

    return record;
  }

  static async updateStatus(id, data, io, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);

    // ✅ Update withdrawal status
    await Withdraw(options.database).updateOne(
      { _id: id },
      {
        $set: {
          status: data.status,
          acceptime: new Date(),
          auditor: currentUser.id,
          updatedBy: currentUser.id,
        },
      },
      options
    );

    // ✅ Sync transaction status
    await transaction(options.database).updateOne(
      { referenceId: id },
      {
        $set: {
          status: data.status,
          updatedBy: currentUser.id,
        },
      },
      options
    );

    console.log(data.status);

    if (data.status === "success") {
      await sendNotification({
        userId: data.createdBy.id, // the user to notify
        message: ` ${data.withdrawAmount} ${data.currency.toUpperCase()} `,
        type: "withdraw", // type of notification
        options, // your repository options
      });
    }





    // ❌ If rejected → refund user balance
    if (data.status === "canceled") {

      await sendNotification({
        userId: data.createdBy.id, // the user to notify
        message: ` ${data.withdrawAmount} ${data.currency.toUpperCase()} `,
        type: "cancel_withdraw", // type of notification
        options, // your repository options
      });


      const withdrawRecord = await Withdraw(options.database).findById(id);
      const WalletModel = assets(options.database);

      if (!withdrawRecord) {
        throw new Error("Withdraw record not found");
      }

      await WalletModel.updateOne(
        { user: withdrawRecord.createdBy, symbol: withdrawRecord.currency },
        { $inc: { amount: withdrawRecord.totalAmount } }, // refund balance
        options
      );
    }
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Withdraw(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Withdraw(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(AuditLogRepository.DELETE, id, record, options);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Withdraw(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Withdraw(options.database)
        .findById(id)
        .populate("auditor")
        .populate("createdBy"),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    return this._fillFileDownloadUrls(record);
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    console.log("I am here");

    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ["_id"]: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.user) {


        criteriaAnd.push({
          createdBy: filter.user,
        });
      }

      if (filter.idnumer) {
        criteriaAnd.push({
          idnumer: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.idnumer),
            $options: "i",
          },
        });
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");
    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;
    let rows = await Withdraw(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate("auditor")
      .populate("createdBy");

    const count = await Withdraw(options.database).countDocuments(criteria);

    rows = await Promise.all(rows.map(this._fillFileDownloadUrls));

    return { rows, count };
  }

  static async findAndCountAllMobile(
    { filter, limit = 0, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    criteriaAnd.push({
      user: currentUser.id,
    });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ["_id"]: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.user) {
        criteriaAnd.push({
          user: filter.user,
        });
      }

      if (filter.idnumer) {
        criteriaAnd.push({
          idnumer: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.idnumer),
            $options: "i",
          },
        });
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");
    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;
    let rows = await Withdraw(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate("auditor")
      .populate("createdBy");

    const count = await Withdraw(options.database).countDocuments(criteria);

    rows = await Promise.all(rows.map(this._fillFileDownloadUrls));

    return { rows, count };
  }
  static async findAllAutocomplete(search, limit, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: Array<any> = [
      {
        tenant: currentTenant.id,
      },
    ];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            titre: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: "i",
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort("titre_ASC");
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await Withdraw(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    // await AuditLogRepository.log(
    //   {
    //     entityName: Withdraw(options.database).modelName,
    //     entityId: id,
    //     action,
    //     values: data,
    //   },
    //   options
    // );
  }

  static async _fillFileDownloadUrls(record) {
    if (!record) {
      return null;
    }

    const output = record.toObject ? record.toObject() : record;

    output.photo = await FileRepository.fillDownloadUrl(output.photo);

    return output;
  }
}

export default WithdrawRepository;
