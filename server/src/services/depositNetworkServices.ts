
import Error400 from "../errors/Error400";
import MongooseRepository from "../database/repositories/mongooseRepository";
import { IServiceOptions } from "./IServiceOptions";
import DepositNetworkRepository from "../database/repositories/depositNetworkRepository";
import WalletRepository from "../database/repositories/assetsRepository";

export default class DepositNetworkServices {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data, io?) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const record = await DepositNetworkRepository.create(data, {
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

  async update(id, data, io?) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const record = await DepositNetworkRepository.update(id, data, io, {
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
      const record = await DepositNetworkRepository.updateStatus(id, data, io, {
        ...this.options,
        session,
      });
      console.log(record.status);

      await WalletRepository.processDeposit(data.createdBy.id, data, {
        ...this.options,
        session,
      });


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
        await DepositNetworkRepository.destroy(id, {
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
    return DepositNetworkRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return DepositNetworkRepository.findAllAutocomplete(search, limit, this.options);
  }

  async findAndCountAll(args) {
    return DepositNetworkRepository.findAndCountAll(args, this.options);
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
    const count = await DepositNetworkRepository.count(
      {
        importHash,
      },
      this.options
    );

    return count > 0;
  }
}
