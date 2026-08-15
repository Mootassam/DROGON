import Error404 from '../../errors/Error404';
import Social from '../models/social';
import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import MongooseRepository from './mongooseRepository';

class socialRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const [record] = await Social(options.database).create(
      [
        {
          ...data,
          tenant: currentTenant.id,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        Social(options.database)
          .findById(id)
          .populate('adherent'),
        options,
      );

    if (
      !record ||
      String(record.tenant) !== String(currentTenant.id)
    ) {
      throw new Error404();
    }
  }

  static async update(
    id,
    data,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        Social(options.database).findById(id),
        options,
      );

    if (
      !record ||
      String(record.tenant) !== String(currentTenant.id)
    ) {
      throw new Error404();
    }

    await Social(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy:
          MongooseRepository.getCurrentUser(options).id,
      },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );
    record = await this.findById(id, options);
    return record;
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        Social(options.database).findById(id),
        options,
      );

    if (
      !record ||
      String(record.tenant) !== String(currentTenant.id)
    ) {
      throw new Error404();
    }

    await Social(options.database).deleteOne(
      { _id: id },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );
  }

  static async _createAuditLog(
    action,
    id,
    data,
    options: IRepositoryOptions,
  ) {
    // await AuditLogRepository.log(
    //   {
    //     entityName: Social(options.database).modelName,
    //     entityId: id,
    //     action,
    //     values: data,
    //   },
    //   options,
    // );
  }
}


export default socialRepository