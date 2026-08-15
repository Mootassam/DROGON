import Error400 from "../errors/Error400";
import MongooseRepository from "../database/repositories/mongooseRepository";
import { IServiceOptions } from "./IServiceOptions";
import RulesRepository from "../database/repositories/rulesRepository";

export default class RulesService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const record = await RulesRepository.create(data, {
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
        "category"
      );
      throw error;
    }
  }

  async findAll() {
    const record = await RulesRepository.findContact(this.options);
    return record;
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const record = await RulesRepository.update(id, data, {
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
        "category"
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
        await RulesRepository.destroy(id, {
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
    return RulesRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return RulesRepository.findAllAutocomplete(search, limit, this.options);
  }

  async findAndCountAll(args) {
    return RulesRepository.findAndCountAll(args, this.options);
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
    const count = await RulesRepository.count(
      {
        importHash,
      },
      this.options
    );

    return count > 0;
  }
}
