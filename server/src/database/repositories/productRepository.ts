import MongooseRepository from "./mongooseRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import AuditLogRepository from "./auditLogRepository";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";
import FileRepository from "./fileRepository";
import Product from "../models/product";
import UserRepository from "./userRepository";
import RecordRepository from "./recordRepository";
import axios from "axios";

class ProductRepository {
  static apiClient = axios.create({
    baseURL: "https://api.coinranking.com/v2/", // Base URL for all requests
    headers: {
      "x-access-token":
        "coinranking0019013025c860964f4f33e1621dd13b42aae05e00f7dc9b", // Add your access token here
    },
  });

  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    const currentUser = MongooseRepository.getCurrentUser(options);

    const [record] = await Product(options.database).create(
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

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options
    );

    return this.findById(record.id, options);
  }

  static async update(id, data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Product(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Product(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy: MongooseRepository.getCurrentUser(options).id,
      },
      options
    );

    await this._createAuditLog(AuditLogRepository.UPDATE, id, data, options);

    record = await this.findById(id, options);

    return record;
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Product(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    await Product(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(AuditLogRepository.DELETE, id, record, options);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Product(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const response = await this.apiClient.get(
      `/coin/${id}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`
    );

    let rows = response.data.data.coin;

    return rows;
  }

  static async findByCoin(id, options: IRepositoryOptions) {
    const response = await this.apiClient.get(
      `/search-suggestions?query=${id}&referenceCurrencyUuid=yhjMzLPhuIDl`
    );

    let rows = response.data.data.coins;

    return rows;
  }

  static async findAndCountAll(
    { filter, limit = 50, offset = 0 }, // Default limit of 50 items
    options: IRepositoryOptions
  ) {
    const response = await this.apiClient.get(
      `/coins?offset=${offset}&orderBy=marketCap&limit=${limit}&orderDirection=desc&referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&search=`
    );
    let rows = response.data.data.coins;

    return rows;
  }

  static async findTopCoins(
    { filter, limit = 6, offset = 0 }, // Default limit of 50 items
    options: IRepositoryOptions
  ) {
    const response = await this.apiClient.get(
      `/coins?offset=${offset}&orderBy=marketCap&limit=${limit}&orderDirection=desc&referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&search=`
    );
    let rows = response.data.data.coins;

    return rows;
  }

  static async FindNews( options: IRepositoryOptions) {
    
    const response = await axios.get(
      `https://www.bloomberg.com/newsletters-signup-next/api/newsletter/markets-daily?page=3&withStories=true`,

    );
    console.log("🚀 ~ ProductRepository ~ FindNews ~ response:", response.data)
    let rows = response.data;
    return rows;
  }

  // News Details
  static async NewsDetail(id, options: IRepositoryOptions) {
    let data;

    const response = await axios.get(
      `https://coinmarketcap.com/academy/_next/data/nD9fmJNJDqGlUB4iXiXJq/en/article/${id}.json?slug=${id}`,
      data
    );
    let rows = response.data;
    return rows;
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

    const records = await Product(options.database)
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
    //     entityName: Product(options.database).modelName,
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
  static async grapOrders(options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentVip = MongooseRepository.getCurrentUser(options).vip.id;
    const Orderdone = (await RecordRepository.CountOrder(options)).record;
    const mergeDataPosition = currentUser.itemNumber;

    if (
      currentUser &&
      currentUser.product &&
      currentUser.product.id &&
      Orderdone === mergeDataPosition
    ) {
      let prodcut = currentUser.product;
      prodcut.photo = await FileRepository.fillDownloadUrl(prodcut?.photo);
      return prodcut;
    } else {
      let record = await Product(options.database)
        .find({ vip: currentVip, combo: false })
        .populate("vip");
      const random = Math.floor(Math.random() * record.length);
      record = await Promise.all(record.map(this._fillFileDownloadUrls));
      return record[random];
    }
  }
}

export default ProductRepository;
