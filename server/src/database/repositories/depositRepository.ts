import MongooseRepository from "./mongooseRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import AuditLogRepository from "./auditLogRepository";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";
import FileRepository from "./fileRepository";
import Deposit from "../models/deposit";
import assets from "../models/wallet";
import transaction from "../models/transaction";
import wallet from "../models/wallet";
import { sendNotification } from "../../services/notificationServices";
import WalletRepository from "./assetsRepository";
import User from "../models/user";
class DepositRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    const [record] = await Deposit(options.database).create(
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

    const WalletModel = assets(options.database);
    const TransactionModel = options.database.model("transaction");

    // 1️⃣ Fetch (or lazily create) the user's wallet for the given asset
    const coinSymbol = data.rechargechannel.toUpperCase();
    let wallet = await WalletModel.findOneAndUpdate(
      { user: currentUser.id, symbol: coinSymbol },
      { $setOnInsert: { amount: 0 } },
      { upsert: true, new: true }
    );

    // 3️⃣ Create a transaction log
    await TransactionModel.create({
      type: "deposit",
      wallet: wallet.id,
      asset: wallet.symbol,
      amount: data.amount,
      referenceId: record.id,
      direction: "in",
      status: "pending", // deposit is pending
      user: currentUser.id,
      tenant: currentTenant.id,
      createdBy: currentUser.id,
      updatedBy: currentUser.id,
    });


    await sendNotification({
      userId: currentUser.id, // the user to notify
      message: ` ${data.amount} ${coinSymbol} `,
      type: "deposit", // type of notification
      forAdmin: true,
      options, // your repository options
    });

    // 4️⃣ Return the updated wallet
    return wallet;
  }


static async createFromBackend(data, options: IRepositoryOptions) {
  const db = options.database;
  const currentTenant = MongooseRepository.getCurrentTenant(options);
  const currentAdmin = MongooseRepository.getCurrentUser(options); // Admin performing the action

  // 1️⃣ Validate target user
  const targetUserId = data.createdBy;
  const targetUser = await User(db).findById(targetUserId);
  if (!targetUser) {
    throw new Error(`User with id ${targetUserId} not found`);
  }

  // 2️⃣ Prepare deposit data (force status = 'success')
  const depositData = {
    ...data,
    status: 'success',                 // Immediately completed
    tenant: currentTenant.id,
    createdBy: currentAdmin.id,
    updatedBy: currentAdmin.id,
  };

  // 3️⃣ Create the deposit record
  const [depositRecord] = await Deposit(db).create([depositData], options);

  // 4️⃣ Find or create the user's wallet for the deposited coin
  const WalletModel = assets(db);
  const coinSymbol = depositData.rechargechannel.toUpperCase();
  
  let wallet = await WalletModel.findOneAndUpdate(
    { user: targetUserId, symbol: coinSymbol },
    { $setOnInsert: { amount: 0 } },   // Initialise if new
    { upsert: true, new: true }
  );

  // 5️⃣ Create a transaction log (status = 'completed')
  const TransactionModel = db.model('transaction');
  await TransactionModel.create({
    type: 'deposit',
    wallet: wallet._id,
    asset: coinSymbol,
    amount: Number(depositData.amount),
    referenceId: depositRecord.id,
    direction: 'in',
    status: 'completed',                // Deposit is already successful
    user: targetUserId,
    tenant: currentTenant.id,
    createdBy: currentAdmin.id,
    updatedBy: currentAdmin.id,
  });

  // 6️⃣ Process the deposit (updates wallet balance, handles first‑deposit referral rewards)
  await WalletRepository.processDeposit(targetUserId, depositData, options);

  // 7️⃣ Send notification to the user
  sendNotification({
    userId: targetUserId,
    message: `${depositData.amount} ${coinSymbol} has been credited to your account by admin.`,
    type: 'deposit',
    options,
  }).catch(console.error);

  // 8️⃣ Send notification to admins (optional, similar to the original `create`)
  sendNotification({
    userId: currentAdmin.id,            // Notify the admin who performed the action
    message: `Manual deposit of ${depositData.amount} ${coinSymbol} to user ${targetUser.email || targetUserId} completed.`,
    type: 'deposit',
    forAdmin: true,
    options,
  }).catch(console.error);

  // 9️⃣ Return the deposit record
  return depositRecord;
}

  static async update(id, data, io, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Deposit(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Deposit(options.database).updateOne(
      { _id: id },
      {
        ...data,
        auditor: MongooseRepository.getCurrentUser(options).id,
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

    // ✅ Update the deposit status
    await Deposit(options.database).updateOne(
      { _id: id },
      {
        $set: {
          status: data.status,
          acceptime: new Date(), // store current time
          auditor: currentUser.id,
          updatedBy: currentUser.id,
        },
      },
      options
    );

    // ✅ Update the related transaction using referenceId + referenceModel
    await transaction(options.database).updateOne(
      {
        referenceId: id,
      },
      {
        $set: {
          status: data.status,
          updatedBy: currentUser.id,
        },
      },
      options
    );

    const value = this.findById(id, options)
    return value
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Deposit(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Deposit(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(AuditLogRepository.DELETE, id, record, options);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Deposit(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Deposit(options.database)
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
    let rows = await Deposit(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate("auditor")
      .populate("createdBy");

    const count = await Deposit(options.database).countDocuments(criteria);

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

    const records = await Deposit(options.database)
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
    //     entityName: Deposit(options.database).modelName,
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

export default DepositRepository;
