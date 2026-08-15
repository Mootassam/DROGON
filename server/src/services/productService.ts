import Error400 from "../errors/Error400";
import MongooseRepository from "../database/repositories/mongooseRepository";
import { IServiceOptions } from "./IServiceOptions";
import ProductRepository from "../database/repositories/productRepository";
import Error405 from "../errors/Error405";

export default class ProductServices {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const record = await ProductRepository.create(data, {
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
        "product"
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const record = await ProductRepository.update(id, data, {
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
        "product"
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
        await ProductRepository.destroy(id, {
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
    return ProductRepository.findById(id, this.options);
  }

  async findByCoin(id) {
    return ProductRepository.findByCoin(id, this.options);
  }

  async findNews() {

    return ProductRepository.FindNews(this.options);
  }

  async findTopCoins(data) { 
    return ProductRepository.findTopCoins(data, this.options)
  }



  async findAllAutocomplete(search, limit) {
    return ProductRepository.findAllAutocomplete(search, limit, this.options);
  }

  async findAndCountAll(args) {
    return ProductRepository.findAndCountAll(args, this.options);
  }

  async checkPermission(options) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    if (!currentUser?.balance && currentUser?.balance === 0) {
throw new Error400(options.language, "errors.resetAccountContactSupport");    }
  }
  

  async grapOrders(args) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      // await this.checkPermission(this.options);
      return ProductRepository.grapOrders(this.options);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
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
    const count = await ProductRepository.count(
      {
        importHash,
      },
      this.options
    );

    return count > 0;
  }
}
