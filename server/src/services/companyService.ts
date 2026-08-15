import Error400 from "../errors/Error400";
import MongooseRepository from "../database/repositories/mongooseRepository";
import { IServiceOptions } from "./IServiceOptions";
import CompanyRepository from "../database/repositories/companyRepository";

export default class CompanyService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const record = await CompanyRepository.create(data, {
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
        "company"
      );
      throw error;
    }
  }

  async findAll() {
    const record = await CompanyRepository.findContact(this.options);
    return record;
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const record = await CompanyRepository.update(id, data, {
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
        await CompanyRepository.destroy(id, {
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
    return CompanyRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return CompanyRepository.findAllAutocomplete(search, limit, this.options);
  }

  async findAndCountAll(args) {
    return CompanyRepository.findAndCountAll(args, this.options);
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
    const count = await CompanyRepository.count(
      {
        importHash,
      },
      this.options
    );

    return count > 0;
  }
}
