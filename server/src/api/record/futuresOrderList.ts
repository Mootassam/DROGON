import ApiResponseHandler from '../apiResponseHandler';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import Records from '../../database/models/records';

export default async (req, res, next) => {
  try {
    const currentTenant = MongooseRepository.getCurrentTenant(req);
    const currentUser = MongooseRepository.getCurrentUser(req);

    const { status } = req.query;

    const filter: any = {
      tenant: currentTenant.id,
      user: currentUser.id,
      direction: { $exists: true },
    };

    if (status === 'pending' || status === 'closed') {
      filter.tradeStatus = status;
    }

    const RecordsModel = Records(req.database);
    const rows = await RecordsModel.find(filter).sort({ createdAt: -1 }).limit(200);

    await ApiResponseHandler.success(req, res, { rows, count: rows.length });
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
