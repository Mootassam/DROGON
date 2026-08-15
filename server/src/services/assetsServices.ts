import Error400 from '../errors/Error400';
import MongooseRepository from '../database/repositories/mongooseRepository';
import { IServiceOptions } from './IServiceOptions';
import AssetRepository from '../database/repositories/assetsRepository';

export default class AssetsServices {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const record = await AssetRepository.create(data, {
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
        'vip',
      );

      throw error;
    }
  }

  async transferBetweenAccounts(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const record = await AssetRepository.transferBetweenAccounts(data, {
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
        'vip',
      );

      throw error;
    }
  }

  async findAllTransfers(args) {
    return AssetRepository.findAndCountAllTransfer(
      args,
      this.options,
    );
  }


    async FreezeAccount(id) {
    return AssetRepository.FreezeAccount(
      id,
      this.options,
    );
  }

  async ConvertFiat(fiat) {
    return AssetRepository.convertCoins(
      fiat

    );
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const record = await AssetRepository.update(
        id,
        data,
        {
          ...this.options,
          session,
        },
      );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'vip',
      );

      throw error;
    }
  }

  async destroyAll(ids) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      for (const id of ids) {
        await AssetRepository.destroy(id, {
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
    return AssetRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return AssetRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return AssetRepository.findAndCountAll(
      args,
      this.options,
    );
  }


  async findAndCountAllMobile(args) {
    return AssetRepository.findAndCountAllMobile(
      args,
      this.options,
    );
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashRequired',
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashExistent',
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await AssetRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
