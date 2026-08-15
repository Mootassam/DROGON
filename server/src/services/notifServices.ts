import Error400 from "../errors/Error400";
import MongooseRepository from "../database/repositories/mongooseRepository";
import { IServiceOptions } from "./IServiceOptions";
import WalletRepository from "../database/repositories/assetsRepository";
import NotificationRepository from "../database/repositories/notificationtRepository";

export default class NotifServicess {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data, io?) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const record = await NotificationRepository.createNotification(data, {
        ...this.options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        "vip"
      );

      throw error;
    }
  }

  async update(id, io) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const record = await NotificationRepository.update(id, io, {
        ...this.options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        "vip"
      );

      throw error;
    }
  }

  async updateStatus(id, data, io) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const record = await NotificationRepository.updateStatus(id, data, io, {
        ...this.options,
        session,
      });
      // await WalletRepository.updateAmount(data.createdBy.id, data, {
      //   ...this.options,
      //   session,
      // });

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        "vip"
      );

      throw error;
    }
  }

  async destroyAll(ids) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      for (const id of ids) {
        await NotificationRepository.destroy(id, {
          ...this.options,
          session,
        });
      }

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async findById(id) {
    return NotificationRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return NotificationRepository.findAllAutocomplete(
      search,
      limit,
      this.options
    );
  }

  async findAndCountAll(args) {
    return NotificationRepository.findAndCountAll(args, this.options);
  }

    async findAndCountAllMobile(args) {
    return NotificationRepository.findAndCountAllMobile(args, this.options);
  }

  async countAll() {
    return NotificationRepository.unreadSummary(this.options);
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new Error400(
        this.options.language,
        "importer.errors.importHashRequired"
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new Error400(
        this.options.language,
        "importer.errors.importHashExistent"
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await NotificationRepository.count(
      {
        importHash,
      },
      this.options
    );

    return count > 0;
  }
}
