import ApiResponseHandler from '../apiResponseHandler';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import Records from '../../database/models/records';

export default async (req, res, next) => {
  try {
    const currentTenant = MongooseRepository.getCurrentTenant(req);
    const currentUser = MongooseRepository.getCurrentUser(req);

    const { coin, price, direction, lots, multiplier, amount, stopLoss, takeProfit } = req.body;

    if (!coin || !price || !direction || !lots || !multiplier) {
      return res.status(400).json({ errors: [{ message: 'Missing required fields' }] });
    }

    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const RecordsModel = Records(req.database);
    const [record] = await RecordsModel.create([
      {
        user: currentUser.id,
        coin,
        price,
        amount: amount ?? 0,
        profit: 0,
        number: orderNumber,
        direction,
        lots,
        multiplier,
        tradeStatus: 'pending',
        pnl: 0,
        ...(stopLoss != null && { stopLoss }),
        ...(takeProfit != null && { takeProfit }),
        tenant: currentTenant.id,
        createdBy: currentUser.id,
        updatedBy: currentUser.id,
      },
    ]);

    await ApiResponseHandler.success(req, res, record);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
