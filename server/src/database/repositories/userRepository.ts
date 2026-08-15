import jwt from "jsonwebtoken";
import MongooseRepository from "./mongooseRepository";
import User from "../models/user";
import AuditLogRepository from "./auditLogRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import FileRepository from "./fileRepository";
import crypto from "crypto";
import Error404 from "../../errors/Error404";
import SettingsRepository from "./settingsRepository";
import { isUserInTenant } from "../utils/userTenantUtils";
import { IRepositoryOptions } from "./IRepositoryOptions";
import lodash from "lodash";

import Vip from "../models/vip";

import withdraw from "../models/withdraw";
import deposit from "../models/deposit";
import axios from "axios";
import { sendNotification } from "../../services/notificationServices";
import kyc from "../models/kyc";
import auditLog from "../models/auditLog";
import Error400 from "../../errors/Error400";




export default class UserRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);

    data = this._preSave(data);

    const [user] = await User(options.database).create(
      [
        {
          email: data.email,
          fullName: data.fullName || null,
          phoneNumber: data.phoneNumber || null,
          country: data.country || null,
          nationality: data.nationality || null,
          passportPhoto: data.passportPhoto || null,
          passportDocument: data.passportDocument || null,
          avatars: data.avatars || [],
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      options
    );

    // await AuditLogRepository.log(
    //   {
    //     entityName: "user",
    //     entityId: user.id,
    //     action: AuditLogRepository.CREATE,
    //     values: user,
    //   },
    //   options
    // );

    return this.findById(user.id, {
      ...options,
      bypassPermissionValidation: true,
    });
  }

  static async updateUser(
    id,
    userId,
    options,
    status,
    withdrawPassword,
    score,


  ) {
    const user = await MongooseRepository.wrapWithSessionIfExists(
      User(options.database).findById(id),
      options
    );


    await User(options.database).updateOne(
      { _id: userId },
      {
        $set: {
          score: score,
          withdrawPassword: withdrawPassword,
          $tenant: { status },
        },
      },
      options
    );
  }



  static async updateMyBankInfo(data, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);

    // Access the nested data
    const bankData = data.data || data; // Handle both nested and direct structures

    // Update the current user's bank information
    const updatedUser = await User(options.database).findByIdAndUpdate(
      currentUser.id,
      {
        $set: {
          accountHolder: bankData.accountHolder,
          ibanNumber: bankData.ibanNumber, // Note: schema uses "IbanNumber" (capital I)
          bankName: bankData.bankName,
          ifscCode: bankData.ifscCode
        },
        updatedBy: currentUser.id
      },
      { new: true } // Return the updated document
    );



    return updatedUser;
  }


  static async findUserByEmail(email, options: IRepositoryOptions) {
    let payload = await User(options.database).findOne({
      email: email,
    });

    return payload
  }


  static async createFromWallet(req, data, options: IRepositoryOptions) {
    const normalizeIP = (ip: string) => ip?.replace(/^::ffff:/, "");

    const normalizedAddress = data.address.toLowerCase();

    const rawIP =
      req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection as any)?.socket?.remoteAddress;

    const clientIP = normalizeIP(rawIP);
    const country = await this.getCountry(clientIP);

    let [user] = await User(options.database).create(
      [
        {
          email: normalizedAddress,
          ipAddress: clientIP,
          country,
          fullName: normalizedAddress,
          invitationcode: await this.createUniqueRefCode(options),
          refcode: await this.createUniqueRefCode(options),
        }
      ],
      options

    );




    delete user.password;
    // await AuditLogRepository.log(
    //   {
    //     entityName: "user",
    //     entityId: user.id,
    //     action: AuditLogRepository.CREATE,
    //     values: user,
    //   },
    //   options
    // );

    return this.findByIdMobile(user.id, {
      ...options,
      bypassPermissionValidation: true,
    });
  }



  static async StatsDeposit(options: IRepositoryOptions) {
    // Map of CoinGecko IDs to our symbol keys
    const coinMap: Record<string, string> = {
      bitcoin: "btc",
      ethereum: "eth",
      solana: "sol",
      ripple: "xrp",
      tether: "usdt",
    };

    // Fetch all prices in one request from CoinGecko
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: Object.keys(coinMap).join(","), // "bitcoin,ethereum,solana,ripple,tether"
          vs_currencies: "usd",
        },
      }
    );

    // Normalize prices like before (btc, eth, sol, xrp, usdt)
    const prices: Record<string, number> = {};
    for (const [id, symbol] of Object.entries(coinMap)) {
      prices[symbol] = res.data[id]?.usd || 0;
    }

    // Fetch successful deposits
    const deposits = await deposit(options.database).find({
      status: "success",
    });

    let totalInUSDT = 0;

    for (const d of deposits) {
      // normalize channel: "usd" in DB should be treated as "usdt"
      const channelRaw = d.rechargechannel?.toLowerCase();
      const channel = channelRaw === "usd" ? "usdt" : channelRaw;

      const amount = parseFloat(d.amount);

      if (!amount || !channel || !prices[channel]) continue;

      // Convert deposit to USDT (CoinGecko gives in USD)
      totalInUSDT += amount * prices[channel];
    }

    return {
      totalDepositUSDT: totalInUSDT || 0,
      totalCount: deposits.length || 0,
    };
  }


  static async countAll(options: IRepositoryOptions) {
    let rows = await User(options.database).countDocuments({
      "tenants.roles": "member",
      "tenants.status": "active",
    });

    return { count: rows };
  }


  static async StatsWithdraw(options: IRepositoryOptions) {
    // Map of CoinGecko IDs to our symbol keys
    const coinMap: Record<string, string> = {
      bitcoin: "btc",
      ethereum: "eth",
      solana: "sol",
      ripple: "xrp",
      tether: "usdt",
    };

    // Fetch all prices in one request from CoinGecko
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: Object.keys(coinMap).join(","), // "bitcoin,ethereum,solana,ripple,tether"
          vs_currencies: "usd",
        },
      }
    );

    // Normalize prices like before (btc, eth, sol, xrp, usdt)
    const prices: Record<string, number> = {};
    for (const [id, symbol] of Object.entries(coinMap)) {
      prices[symbol] = res.data[id]?.usd || 0;
    }

    // Fetch successful withdrawals
    const withdrawals = await withdraw(options.database).find({
      status: "success",
    });

    let totalInUSDT = 0;

    for (const w of withdrawals) {
      // normalize: "usd" → "usdt"
      const channelRaw = w.currency?.toLowerCase();
      const channel = channelRaw === "usd" ? "usdt" : channelRaw;

      const amount = parseFloat(w.withdrawAmount);

      if (!amount || !channel || !prices[channel]) continue;

      // Convert withdrawal to USDT (CoinGecko gives in USD)
      totalInUSDT += amount * prices[channel];
    }

    return {
      totalWithdrawUSDT: totalInUSDT || 0,
      totalCount: withdrawals.length || 0,
    };
  }


  static async UpdateKyc(value, options: IRepositoryOptions) {
    // Find the KYC record for this user
    const item = await kyc(options.database).findOne({ user: value.user });

    if (!item) {
      throw new Error("KYC record not found for user");
    }

    // Update user document
    await User(options.database).updateOne(
      { _id: value.user },
      {
        $set: {
          kyc: value.kyc,
          fullName: item.realname || "", // fallback to empty string
        },
      },
      options
    );

    // Send notification only if KYC is approved
    if (value.kyc === true) {
      await sendNotification({
        userId: value.user,
        message: `${item.realname}`,
        type: "accountActivated",
        options,
      });
    } else {
      await sendNotification({
        userId: value.user,
        message: `${item.realname}`,
        type: "cancel_activated",
        options,
      });
    }
  }



  static async UpdateWithdrawPassword(value: { oldPassword?: string; newPassword: string }, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const userId = currentUser.id;

    // Find the user document
    const user = await User(options.database).findOne({ _id: userId });
    if (!user) {
      throw new Error400(options.language, 'errors.userNotFound');
    }

    // If the user already has a withdrawal password
    if (user.withdrawPassword) {
      // Ensure oldPassword is provided
      if (!value.oldPassword) {
        throw new Error400(options.language, 'errors.oldPasswordRequired');
      }
      // Verify that oldPassword matches the stored value
      if (value.oldPassword !== user.withdrawPassword) {
        throw new Error400(options.language, 'errors.passwordNotMatching');
      }
    }

    // Update the withdrawal password (simple string)
    await User(options.database).updateOne(
      { _id: userId },
      { $set: { withdrawPassword: value.newPassword } },
      options
    );
  }

  static async updateWalletAddress(value, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const { currency, address, password } = value;

    // Verify the user's withdrawal password
    const user = await User(options.database).findById(currentUser.id);
    if (!user || user.withdrawPassword !== password) {
      throw new Error400(options.language, "errors.passwordNotMatching");
    }

    // Ensure supported currency
    const allowedCurrencies = ["USDT", "BTC", "ETH", "SOL", "XRP"];
    if (!allowedCurrencies.includes(currency)) {
      throw new Error400(options.language, "errors.unsupportedCurrency");
    }

    // Define the update path based on the currency
    const updatePath = `wallet.${currency}.address`;

    // Update and return the updated user
    const updatedUser = await User(options.database).findByIdAndUpdate(
      currentUser.id,
      { $set: { [updatePath]: address } },
      { new: true, useFindAndModify: false } // 👈 here
    );

    return updatedUser;
  }

  static async generateRefCode() {
    const prefix = "NX";
    const randomPart = Math.floor(100000 + Math.random() * 900000); // 6 digits
    return `${prefix}${randomPart}`;
  }

  static async createUniqueRefCode(options: IRepositoryOptions) {
    let code;
    let exists = true;

    while (exists) {
      code = this.generateRefCode();
      exists = await User(options.database).exists({ refCode: code });
    }

    return code;
  }

  static async UpdatehasDeposited(data, options: IRepositoryOptions) {
    const record = await User(options.database).updateOne(
      { _id: data.id }, // filter by the user’s _id
      { $set: { hasDeposited: true } } // update field safely
    );

    return record; // return the update resul
    // t if needed
  }

  static async getReferralTree(
    refCode: string,
    maxLevel: number,
    options: IRepositoryOptions
  ) {
    // We'll store aggregated counts by level number
    const levelMap: Record<
      number,
      { approvedCount: number; pendingCount: number }
    > = {};

    async function fetchLevel(currentRefCode: string, level: number) {
      if (level > maxLevel) return;

      const children = await User(options.database).find({
        invitationcode: currentRefCode,
      });

      const approved = children.filter((u) => u.hasDeposited).length;
      const pending = children.filter((u) => !u.hasDeposited).length;

      if (!levelMap[level]) {
        levelMap[level] = { approvedCount: 0, pendingCount: 0 };
      }

      levelMap[level].approvedCount += approved;
      levelMap[level].pendingCount += pending;

      for (const child of children) {
        await fetchLevel(child.refcode, level + 1);
      }
    }

    await fetchLevel(refCode, 1);

    // Convert the map into an array sorted by level
    const result = Object.keys(levelMap)
      .map((lvl) => ({
        level: Number(lvl),
        approvedCount: levelMap[Number(lvl)].approvedCount,
        pendingCount: levelMap[Number(lvl)].pendingCount,
      }))
      .sort((a, b) => a.level - b.level);

    return result;
  }

  static async getReferralUsersByLevel(
    refCode: string,
    level: number,
    status: "approved" | "pending",
    options: IRepositoryOptions
  ) {
    // collect users level by level
    async function fetchLevel(
      currentRefCode: string,
      currentLevel: number
    ): Promise<any[]> {
      if (currentLevel > level) return [];

      const children = await User(options.database).find({
        invitationcode: currentRefCode,
      });

      if (currentLevel === level) {
        // return approved or pending only
        return status === "approved"
          ? children.filter((u) => u.hasDeposited)
          : children.filter((u) => !u.hasDeposited);
      }

      // search deeper if not reached the level yet
      let results: any[] = [];
      for (const child of children) {
        const sub = await fetchLevel(child.refcode, currentLevel + 1);
        results = results.concat(sub);
      }
      return results;
    }

    const users = await fetchLevel(refCode, 1);
    return users;
  }

   static async createFromAuth(data, options: IRepositoryOptions) {
     data = this._preSave(data);
     const req = data.req;
     const normalizeIP = (ip: string) => ip.replace(/^::ffff:/, "");

     const rawIP =
       req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
       req.connection.remoteAddress ||
       req.socket.remoteAddress ||
       (req.connection as any).socket?.remoteAddress;

     const clientIP = normalizeIP(rawIP);
     const country = await this.getCountry(clientIP);

     let [user] = await User(options.database).create(
       [
         {
           email: data.email,
           password: data.password,
           phoneNumber: data.phoneNumber,
           ipAddress: clientIP,
           country: country,
           fullName: data.fullName,
           withdrawPassword: data.withdrawPassword,
           invitationcode: data.invitationcode,
           refcode: await this.createUniqueRefCode(options),
           accountType: data.accountType || "real", // Default to "real"
         },
       ],
       options
     );

     delete user.password;
     // await AuditLogRepository.log(
     //   {
     //     entityName: "user",
     //     entityId: user.id,
     //     action: AuditLogRepository.CREATE,
     //     values: user,
     //   },
     //   options
     // );

     return this.findById(user.id, {
       ...options,
       bypassPermissionValidation: true,
     });
   }

  static async getCountry(ip: string) {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();
    return data.country; // e.g., "United States"
  }

  static async VipLevel(options) {
    const sort = MongooseQueryUtils.sort("createdAt_DESC");
    const skip = Number(0) || undefined;
    const limitEscaped = Number(0) || undefined;
    let rows = await Vip(options.database)
      .find()
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate("members");

    const count = await Vip(options.database).countDocuments();

    return { rows, count };
  }
   static async createFromAuthMobile(data, options: IRepositoryOptions) {
     const req = data.req;

     const normalizeIP = (ip: string) => ip.replace(/^::ffff:/, "");

     const rawIP =
       req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
       req.connection.remoteAddress ||
       req.socket.remoteAddress ||
       (req.connection as any).socket?.remoteAddress;

     const clientIP = normalizeIP(rawIP);

     const country = await this.getCountry(clientIP);

     const isDemo = data.accountType === "demo";

     let [user] = await User(options.database).create(
       [
         {
           email: data.email,
           password: data.password,
           phoneNumber: data.phoneNumber,
           ipAddress: clientIP,
           country: country,
           firstName: data.firstName,
           fullName: data.fullName,
           refcode: await this.createUniqueRefCode(options),
           accountType: data.accountType || "real",
           emailVerified: isDemo, // Auto-verify demo accounts
         },
       ],
       options
     );

     delete user.password;

     return this.findByIdMobile(user.id, {
       ...options,
       bypassPermissionValidation: true,
     });
   }

  static async updatePassword(
    id,
    password,
    invalidateOldTokens: boolean,
    options: IRepositoryOptions
  ) {
    const currentUser = MongooseRepository.getCurrentUser(options);

    const data: any = {
      password,
      updatedBy: id,
    };

    if (invalidateOldTokens) {
      data.jwtTokenInvalidBefore = new Date();
    }

    await User(options.database).updateOne({ _id: id }, data, options);

    // await AuditLogRepository.log(
    //   {
    //     entityName: "user",
    //     entityId: id,
    //     action: AuditLogRepository.UPDATE,
    //     values: {
    //       id,
    //       password: "secret",
    //     },
    //   },
    //   options
    // );

    return this.findById(id, {
      ...options,
      bypassPermissionValidation: true,
    });
  }

  static async updateProfile(id, data, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);

    await this.checkSolde(data, options);
    data = this._preSave(data);
    await User(options.database).updateOne(
      { _id: id },
      {
        firstName: data.firstName || currentUser.firstName,
        lastName: data.lastName || currentUser.lastName,
        fullName: data.fullName || currentUser.fullName,
        phoneNumber: data.phoneNumber || currentUser.phoneNumber,
        updatedBy: currentUser.id,
        avatars: data.avatars || [],
        vip: data.vip || currentUser.vip,
        balance: data.balance || currentUser.balance,
        trc20: data.trc20 || currentUser.trc20,
        walletname: data.walletname || currentUser.walletname,
        usernamewallet: data.usernamewallet || currentUser.usernamewallet,
        product: data?.product,
        itemNumber: data?.itemNumber,
        preferredcoin: data?.preferredcoin
      },
      options
    );

    const user = await this.findById(id, options);

    // await AuditLogRepository.log(
    //   {
    //     entityName: "user",
    //     entityId: id,
    //     action: AuditLogRepository.UPDATE,
    //     values: user,
    //   },
    //   options
    // );

    return user;
  }

  static async updateProfileGrap(id, data, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    // await this.checkSolde(data, options);

    data = this._preSave(data);
    await User(options.database).updateOne(
      { _id: id },
      {
        firstName: data.firstName || currentUser.firstName,
        lastName: data.lastName || currentUser.lastName,
        fullName: data.fullName || currentUser.fullName,
        phoneNumber: data.phoneNumber || currentUser.phoneNumber,
        updatedBy: currentUser.id,
        avatars: data.avatars || [],
        vip: data.vip || currentUser.vip,
        balance: data.balance,
        freezeblance: data.freezeblance,
        erc20: data.erc20 || currentUser.erc20,
        trc20: data.trc20 || currentUser.trc20,
        walletname: data.walletname || currentUser.walletname,
        usernamewallet: data.usernamewallet || currentUser.usernamewallet,
        product: data?.product || currentUser?.product,
      },
      options
    );

    const user = await this.findById(id, options);

    // await AuditLogRepository.log(
    //   {
    //     entityName: "user",
    //     entityId: id,
    //     action: AuditLogRepository.UPDATE,
    //     values: user,
    //   },
    //   options
    // );

    return user;
  }

  static async updateSolde(id, data, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    // await this.checkSolde(data, options);

    data = this._preSave(data);
    await User(options.database).updateOne(
      { _id: id },
      {
        firstName: data.firstName || currentUser.firstName,
        lastName: data.lastName || currentUser.lastName,
        fullName: data.fullName || currentUser.fullName,
        phoneNumber: data.phoneNumber || currentUser.phoneNumber,
        updatedBy: currentUser.id,
        avatars: data.avatars || [],
        vip: data.vip || currentUser.vip,
        balance: data.balances,
        erc20: data.erc20 || currentUser.erc20,
        trc20: data.trc20 || currentUser.trc20,
        walletname: data.walletname || currentUser.walletname,
        usernamewallet: data.usernamewallet || currentUser.usernamewallet,
        product: data?.product,
      },
      options
    );

    const user = await this.findById(id, options);

    // await AuditLogRepository.log(
    //   {
    //     entityName: "user",
    //     entityId: id,
    //     action: AuditLogRepository.UPDATE,
    //     values: user,
    //   },
    //   options
    // );

    return user;
  }

  static async updateBalance(data, options) {
    const currentUser = await MongooseRepository.getCurrentUser(options);

    const currentBalance = currentUser.balance;
    const currentVip = currentUser.vip.id;

    if (!data) return;
  }

  static async checkSolde(data, options) {
    const currentUser = await MongooseRepository.getCurrentUser(options);

  }

  static async generateEmailVerificationToken(
    email,
    options: IRepositoryOptions
  ) {
    const currentUser = MongooseRepository.getCurrentUser(options);

    const { id } = await this.findByEmailWithoutAvatar(email, options);

    const emailVerificationToken = crypto.randomBytes(20).toString("hex");
    const emailVerificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

    await User(options.database).updateOne(
      { _id: id },
      {
        emailVerificationToken,
        emailVerificationTokenExpiresAt,
        updatedBy: currentUser.id,
      },
      options
    );

    // await AuditLogRepository.log(
    //   {
    //     entityName: "user",
    //     entityId: id,
    //     action: AuditLogRepository.UPDATE,
    //     values: {
    //       id,
    //       emailVerificationToken,
    //       emailVerificationTokenExpiresAt,
    //     },
    //   },
    //   options
    // );

    return emailVerificationToken;
  }

  static async generatePasswordResetToken(email, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);

    const { id } = await this.findByEmailWithoutAvatar(email, options);

    const passwordResetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

    await User(options.database).updateOne(
      { _id: id },
      {
        passwordResetToken,
        passwordResetTokenExpiresAt,
        updatedBy: currentUser.id,
      },
      options
    );

    // await AuditLogRepository.log(
    //   {
    //     entityName: "user",
    //     entityId: id,
    //     action: AuditLogRepository.UPDATE,
    //     values: {
    //       id,
    //       passwordResetToken,
    //       passwordResetTokenExpiresAt,
    //     },
    //   },
    //   options
    // );

    return passwordResetToken;
  }

  static async findByEmail(email, options: IRepositoryOptions) {
    const record = await this.findByEmailWithoutAvatar(email, options);
    return await this._fillRelationsAndFileDownloadUrls(record, options);
  }

  static async findByEmailWithoutAvatar(email, options: IRepositoryOptions) {
    return MongooseRepository.wrapWithSessionIfExists(
      User(options.database)
        .findOne({
          email: {
            $regex: new RegExp(`^${MongooseQueryUtils.escapeRegExp(email)}$`),
            $options: "i",
          },
        })
        .populate("tenants.tenant"),
      options
    );
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenants: { $elemMatch: { tenant: currentTenant.id } },
    });

    // 🟩 MODIFIED: Filter by role = "admin" OR "agent" OR status = "empty-permissions"
    criteriaAnd.push({
      $or: [
        // Users with admin or agent roles
        {
          tenants: {
            $elemMatch: {
              roles: { $in: ["admin", "agent"] }
            }
          },
        },
        // Users with empty-permissions status
        {
          tenants: {
            $elemMatch: {
              status: "empty-permissions"
            }
          }
        }
      ]
    });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ["_id"]: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.fullName) {
        criteriaAnd.push({
          ["fullName"]: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.fullName),
            $options: "i",
          },
        });
      }

      if (filter.email) {
        criteriaAnd.push({
          ["email"]: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.email),
            $options: "i",
          },
        });
      }

      // 🟩 MODIFIED: Remove the role filter from user input since we're hardcoding our criteria
      // if (filter.role) {
      //   criteriaAnd.push({
      //     tenants: { $elemMatch: { roles: filter.role } },
      //   });
      // }

      if (filter.invitationcode) {
        criteriaAnd.push({
          ["invitationcode"]: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.invitationcode),
            $options: "i",
          },
        });
      }

      if (filter.status) {
        criteriaAnd.push({
          tenants: {
            $elemMatch: { status: filter.status },
          },
        });
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== "") {
          criteriaAnd.push({
            ["createdAt"]: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== "") {
          criteriaAnd.push({
            ["createdAt"]: {
              $lte: end,
            },
          });
        }
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;

    let rows = await MongooseRepository.wrapWithSessionIfExists(
      User(options.database)
        .find(criteria)
        .skip(skip)
        .limit(limitEscaped)
        .sort(sort)
        .populate("wallet"),
      options
    );

    const count = await MongooseRepository.wrapWithSessionIfExists(
      User(options.database).countDocuments(criteria),
      options
    );

    rows = this._mapUserForTenantForRows(rows, currentTenant);
    rows = await Promise.all(
      rows.map((row) => this._fillRelationsAndFileDownloadUrls(row, options))
    );

    return { rows, count };
  }



  static async findAndCountAllClients(
    { filter, limit = 0, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenants: { $elemMatch: { tenant: currentTenant.id } },
    });

    // 🟩 ADDED: Always filter by role = "member"
    criteriaAnd.push({
      tenants: { $elemMatch: { roles: "member" } },
    });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ["_id"]: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.fullName) {
        criteriaAnd.push({
          ["fullName"]: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.fullName),
            $options: "i",
          },
        });
      }

      if (filter.email) {
        criteriaAnd.push({
          ["email"]: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.email),
            $options: "i",
          },
        });
      }

      // 🟩 MODIFIED: Remove the role filter from user input since we're hardcoding it to "member"
      // if (filter.role) {
      //   criteriaAnd.push({
      //     tenants: { $elemMatch: { roles: filter.role } },
      //   });
      // }

      if (filter.invitationcode) {
        criteriaAnd.push({
          ["invitationcode"]: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.invitationcode),
            $options: "i",
          },
        });
      }

      if (filter.status) {
        criteriaAnd.push({
          tenants: {
            $elemMatch: { status: filter.status },
          },
        });
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== "") {
          criteriaAnd.push({
            ["createdAt"]: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== "") {
          criteriaAnd.push({
            ["createdAt"]: {
              $lte: end,
            },
          });
        }
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;

    let rows = await MongooseRepository.wrapWithSessionIfExists(
      User(options.database)
        .find(criteria)
        .skip(skip)
        .limit(limitEscaped)
        .sort(sort)
        .populate("wallet"),
      options
    );

    const count = await MongooseRepository.wrapWithSessionIfExists(
      User(options.database).countDocuments(criteria),
      options
    );

    rows = this._mapUserForTenantForRows(rows, currentTenant);
    rows = await Promise.all(
      rows.map((row) => this._fillRelationsAndFileDownloadUrls(row, options))
    );

    return { rows, count };
  }




  static async filterIdInTenant(id, options: IRepositoryOptions) {
    return lodash.get(await this.filterIdsInTenant([id], options), "[0]", null);
  }

  static async filterIdsInTenant(ids, options: IRepositoryOptions) {
    if (!ids || !ids.length) {
      return ids;
    }

    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let users = await User(options.database)
      .find({
        _id: {
          $in: ids,
        },
        tenants: {
          $elemMatch: { tenant: currentTenant.id },
        },
      })
      .select(["_id"]);

    return users.map((user) => user._id);
  }

  static cleanupForRelationships(userOrUsers) {
    if (!userOrUsers) {
      return userOrUsers;
    }

    if (Array.isArray(userOrUsers)) {
      return userOrUsers.map((user) =>
        lodash.pick(user, ["_id", "id", "firstName", "lastName", "email"])
      );
    }

    return lodash.pick(userOrUsers, [
      "_id",
      "id",
      "firstName",
      "lastName",
      "email",
    ]);
  }

  static async findAllAutocomplete(search, limit, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: Array<any> = [
      {
        tenants: {
          $elemMatch: { tenant: currentTenant.id },
        },
      },
    ];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            fullName: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: "i",
            },
          },
          {
            email: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: "i",
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort("fullName_ASC");
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    let users = await User(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    users = this._mapUserForTenantForRows(users, currentTenant);

    const buildText = (user) => {
      if (!user.fullName) {
        return user.email;
      }

      return `${user.fullName} <${user.email}>`;
    };

    return users.map((user) => ({
      id: user.id,
      label: buildText(user),
    }));
  }

  static async findByIdWithPassword(id, options: IRepositoryOptions) {
    return await MongooseRepository.wrapWithSessionIfExists(
      User(options.database).findById(id).populate("tenants.tenant"),
      options
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    let record = await MongooseRepository.wrapWithSessionIfExists(
      User(options.database)
        .findById(id)
        .populate("tenants.tenant"),
      options
    );

    if (!record) {
      throw new Error404();
    }

    const currentTenant = MongooseRepository.getCurrentTenant(options);
    if (!options || !options.bypassPermissionValidation) {
      if (!isUserInTenant(record, currentTenant.id)) {
        throw new Error404();
      }
      record = this._mapUserForTenant(record, currentTenant);
    }

    record = await this._fillRelationsAndFileDownloadUrls(record, options);

    return record;
  }









  static async oneClickLogin(userId, options: any = {}) {
    const user = await this.findById(userId, options);


    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    // 🔑 Generate a fresh JWT for this user (short-lived recommended)
    //  const token = jwt.sign(
    //           { id: user.id },
    //           getConfig().AUTH_JWT_SECRET,
    //           { expiresIn: getConfig().AUTH_JWT_EXPIRES_IN }
    //         );

    return "token";
  }

  static async findByIdMobile(id, options: IRepositoryOptions) {
    let record = await MongooseRepository.wrapWithSessionIfExists(
      User(options.database)
        .findById(id)
        .populate("tenants.tenant")
        .populate("vip")
        .populate("product"),
      options
    );

    if (!record) {
      throw new Error404();
    }

    const currentTenant = MongooseRepository.getCurrentTenant(options);
    if (!options || !options.bypassPermissionValidation) {
      if (!isUserInTenant(record, currentTenant.id)) {
        throw new Error404();
      }
      record = this._mapUserForTenantMobile(record, currentTenant);
    }

    record = await this._fillRelationsAndFileDownloadUrls(record, options);

    return record;
  }

  static async checkRefcode(refcode, options: IRepositoryOptions) {
    const checkref = await MongooseRepository.wrapWithSessionIfExists(
      User(options.database).findOne({
        refcode: refcode,
      }),
      options
    );

    if (!checkref) {
      return null;
    }
    return true;
  }



  static async SaveIp(id, data, options: IRepositoryOptions) {

    const req = data;
    const normalizeIP = (ip: string) => ip.replace(/^::ffff:/, "");
    const rawIP =
      req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection as any).socket?.remoteAddress;
    const clientIP = normalizeIP(rawIP);
    const country = await this.getCountry(clientIP);

    const [log] = await auditLog(options.database).create(
      [
        {
          user: id,
          country: country || "local",
          clientIP: clientIP,
          timestamp: new Date(),
        },
      ],
      options,
    );


  }



  static async findPassword(id, options: IRepositoryOptions) {
    let record = await MongooseRepository.wrapWithSessionIfExists(
      User(options.database).findById(id).select("+password"),
      options
    );

    if (!record) {
      return null;
    }

    return record.password;
  }

  static async findByIdWithoutAvatar(id, options: IRepositoryOptions) {
    return this.findById(id, options);
  }

  static async Destroy(id, options) {
    return User(options.database).deleteOne({ _id: id });
  }

  /**
   * Finds the user by the password token if not expired.
   */
  static async findByPasswordResetToken(token, options: IRepositoryOptions) {
    return MongooseRepository.wrapWithSessionIfExists(
      User(options.database).findOne({
        passwordResetToken: token,
        passwordResetTokenExpiresAt: { $gt: Date.now() },
      }),
      options
    );
  }

  /**
   * Finds the user by the email verification token if not expired.
   */
  static async findByEmailVerificationToken(
    token,
    options: IRepositoryOptions
  ) {
    return MongooseRepository.wrapWithSessionIfExists(
      User(options.database).findOne({
        emailVerificationToken: token,
        emailVerificationTokenExpiresAt: {
          $gt: Date.now(),
        },
      }),
      options
    );
  }

  static async markEmailVerified(id, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);

    await User(options.database).updateOne(
      { _id: id },
      {
        emailVerified: true,
        updatedBy: currentUser.id,
      },
      options
    );

    // await AuditLogRepository.log(
    //   {
    //     entityName: "user",
    //     entityId: id,
    //     action: AuditLogRepository.UPDATE,
    //     values: {
    //       emailVerified: true,
    //     },
    //   },
    //   options
    // );

    return true;
  }

  static async count(filter, options: IRepositoryOptions) {
    return MongooseRepository.wrapWithSessionIfExists(
      User(options.database).countDocuments(filter),
      options
    );
  }

  /**
   * Normalize the user fields.
   */
  static _preSave(data) {
    if (data.firstName || data.lastName) {
      data.fullName = `${(data.firstName || "").trim()} ${(
        data.lastName || ""
      ).trim()}`.trim();
    }

    data.email = data.email ? data.email.trim() : null;

    data.firstName = data.firstName ? data.firstName.trim() : null;

    data.lastName = data.lastName ? data.lastName.trim() : null;

    return data;
  }

  /**
   * Maps the users data to show only the current tenant related info
   */
  static _mapUserForTenantForRows(rows, tenant) {
    if (!rows) {
      return rows;
    }

    return rows.map((record) => this._mapUserForTenant(record, tenant));
  }

  /**
   * Maps the user data to show only the current tenant related info
   */
  static _mapUserForTenant(user, tenant) {
    if (!user || !user.tenants) {
      return user;
    }

    const tenantUser = user.tenants.find(
      (tenantUser) =>
        tenantUser &&
        tenantUser.tenant &&
        String(tenantUser.tenant.id) === String(tenant.id)
    );

    delete user.tenants;

    const status = tenantUser ? tenantUser.status : "active";
    const roles = tenantUser ? tenantUser.roles : ["member"];

    // If the user is only invited,
    // tenant members can only see its email
    const otherData = status === "active" ? user.toObject() : {};

    return {
      ...otherData,
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      passportNumber: user.passportNumber,
      country: user.country,
      withdrawPassword: user.withdrawPassword,
      balance: user.balance,
      invitationcode: user.invitationcode,
      nationality: user.nationality,
      refcode: user.refcode,
      accountType: user.accountType || "real",
      roles,
      status,
    };
  }

  static _mapUserForTenantMobile(user, tenant) {
    if (!user || !user.tenants) {
      return user;
    }

    const tenantUser = user.tenants.find(
      (tenantUser) =>
        tenantUser &&
        tenantUser.tenant &&
        String(tenantUser.tenant.id) === String(tenant.id)
    );

    // delete user.tenants;

    const status = "active";
    const roles = ["member"];

    // If the user is only invited,
    // tenant members can only see its email
    const otherData = status === "active" ? user.toObject() : {};

     return {
       ...otherData,
       id: user.id,
       email: user.email,
       phoneNumber: user.phoneNumber,
       firstName: user.firstName,
       lastName: user.lastName,
       fullName: user.fullName,
       passportNumber: user.passportNumber,
       country: user.country,
       withdrawPassword: user.withdrawPassword,
       balance: user.balance,
       invitationcode: user.invitationcode,
       nationality: user.nationality,
       refcode: user.refcode,
       accountType: user.accountType || "real",
       roles,
       status,
     };
   }
  static async findByRoleAutocomplete(
    search,
    limit,
    options: IRepositoryOptions
  ) {
    const currentTenant1 = MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: Array<any> = [
      {
        tenants: {
          $elemMatch: { tenant: currentTenant1.id },
        },
      },
    ];
    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            fullName: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: "i",
            },
          },
          {
            email: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: "i",
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort("fullName_ASC");
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    let users = await User(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    users = this._mapUserForTenantForRows(users, currentTenant1);

    const buildText = (user) => {
      if (!user.fullName) {
        return user.email;
      }

      return `${user.fullName} <${user.email}>`;
    };

    return users.map((user) => ({
      id: user.id,
      label: buildText(user),
    }));
  }

  static async _fillRelationsAndFileDownloadUrls(
    record,
    options: IRepositoryOptions
  ) {
    if (!record) {
      return null;
    }

    const output = record.toObject ? record.toObject() : record;

    if (output.tenants && output.tenants.length) {
      await Promise.all(
        output.tenants.map(async (userTenant) => {
          userTenant.tenant.settings = await SettingsRepository.find({
            currentTenant: userTenant.tenant,
            ...options,
          });
        })
      );
    }

    output.avatars = await FileRepository.fillDownloadUrl(output.avatars);
    output.passportPhoto = await FileRepository.fillDownloadUrl(
      output.passportPhoto
    );
    output.passportDocument = await FileRepository.fillDownloadUrl(
      output.passportDocument
    );
    return output;
  }

  static async createFromSocial(
    provider,
    providerId,
    email,
    emailVerified,
    firstName,
    lastName,
    options
  ) {
    let data = {
      email,
      emailVerified,
      providerId,
      provider,
      firstName,
      lastName,
    };

    data = this._preSave(data);

    let [user] = await User(options.database).create([data], options);




    return this.findById(user.id, {
      ...options,
      bypassPermissionValidation: true,
    });
  }

  static async CountUser(options: IRepositoryOptions) {
    let rows = await User(options.database).aggregate([
      { $group: { _id: null, count: { $sum: 1 } } },
    ]);
    return rows;
  }

  static async CountUsers(options: IRepositoryOptions) {
    const count = await MongooseRepository.wrapWithSessionIfExists(
      User(options.database).countDocuments(),
      options
    );

    return count;
  }
}
