
import MongooseRepository from "./mongooseRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import AuditLogRepository from "./auditLogRepository";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";
import FileRepository from "./fileRepository";
import Notification from "../models/notification";
import assets from "../models/wallet";
import transaction from "../models/transaction";
import wallet from "../models/wallet";
import { sendNotification } from "../../services/notificationServices";
import notification from "../models/notification";
import deposit from "../models/deposit";
import withdraw from "../models/withdraw";
import kyc from "../models/kyc";
import futures from "../models/futures";
class NotificationRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);
    const currentUser = MongooseRepository.getCurrentUser(options);

    const [record] = await notification(options.database).create(
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
    return record;
  }

  static async createNotification(data, options: IRepositoryOptions) {
    console.log("🚀 ~ NotificationRepository ~ createNotification ~ data:", data)
    await sendNotification({
      userId: data.userId,
      message: `${data.message}`,
      type: data.type,
      options,
    });


  }





  static async update(id, io, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Notification(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Notification(options.database).updateOne(
      { _id: id },
      {
        auditor: MongooseRepository.getCurrentUser(options).id,
        updatedBy: MongooseRepository.getCurrentUser(options).id,
        status: "read",
      },
      options
    );

    // await this._createAuditLog(AuditLogRepository.UPDATE, id, options);

    record = await this.findById(id, options);

    return record;
  }

  static async updateStatus(id, data, io, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);

    // ✅ Update the Notification status
    await Notification(options.database).updateOne(
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
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Notification(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Notification(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(AuditLogRepository.DELETE, id, record, options);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Notification(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options
    );
  }

  static async unread(options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Notification(options.database).countDocuments({
        tenant: currentTenant.id,
        status: "unread",
      }),
      options
    );
  }

  static async unreadSummary(options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    // Build queries for each type
    const depositQuery = deposit(options.database).countDocuments({
      tenant: currentTenant.id,
      status: "pending",
    });

    const withdrawQuery = withdraw(options.database).countDocuments({
      tenant: currentTenant.id,
      status: "pending",
    });

    const kycQuery = kyc(options.database).countDocuments({
      tenant: currentTenant.id,
      status: "pending",
    });

    const futuresQuery = futures(options.database).countDocuments({
      tenant: currentTenant.id,
      finalized: false,
    });

    // Run them in parallel for performance
    const [depositCount, withdrawCount, kycCount, futuresCount] =
      await Promise.all([
        MongooseRepository.wrapWithSessionIfExists(depositQuery, options),
        MongooseRepository.wrapWithSessionIfExists(withdrawQuery, options),
        MongooseRepository.wrapWithSessionIfExists(kycQuery, options),
        MongooseRepository.wrapWithSessionIfExists(futuresQuery, options),
      ]);

    // Return result as an object
    return {
      deposit: depositCount,
      withdraw: withdrawCount,
      kyc: kycCount,
      futures: futuresCount,
    };
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Notification(options.database).findById(id).populate("userId"),
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
    const currentUser = MongooseRepository.getCurrentUser(options);

    let criteriaAnd: any = [];


    criteriaAnd.push({
      tenant: currentTenant.id,
    });


    if (filter) {
      criteriaAnd.push({
        status: filter,
      });
    }
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

      if (filter.user) {
        criteriaAnd.push({
          status: filter.status,
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
    let rows = await Notification(options.database)
      .find(criteria)
      .skip(skip)
      .sort(sort)
      .populate("userId");

    const count = await Notification(options.database).countDocuments({
      userId: currentUser.id,
      status: "unread",
    });

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
      userId: currentUser.id,
    });


    if (filter) {
      criteriaAnd.push({
        status: filter,
      });
    }
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

      if (filter.user) {
        criteriaAnd.push({
          status: filter.status,
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
    let rows = await Notification(options.database)
      .find(criteria)
      .skip(skip)
      .sort(sort)
      .populate("userId");

    const count = await Notification(options.database).countDocuments({
      userId: currentUser.id,
      status: "unread",
    });

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

    const records = await Notification(options.database)
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
    //     entityName: Notification(options.database).modelName,
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

export default NotificationRepository;
