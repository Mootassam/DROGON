import ApiResponseHandler from '../apiResponseHandler';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import Records from '../../database/models/records';
import Wallet from '../../database/models/wallet';
import Error404 from '../../errors/Error404';

export default async (req, res, next) => {
  try {
    const currentTenant = MongooseRepository.getCurrentTenant(req);
    const currentUser = MongooseRepository.getCurrentUser(req);

    const { id } = req.params;
    const { closePrice } = req.body;

    if (!closePrice) {
      return res.status(400).json({ errors: [{ message: 'closePrice is required' }] });
    }

    const RecordsModel = Records(req.database);
    const record = await RecordsModel.findById(id);

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    if (record.tradeStatus === 'closed') {
      return res.status(400).json({ errors: [{ message: 'Order already closed' }] });
    }

    const openingPrice = record.price;
    const lots = record.lots ?? 0.01;
    const contractSize = 100;

    let pnl: number;
    if (record.direction === 'buy') {
      pnl = (closePrice - openingPrice) * lots * contractSize;
    } else {
      pnl = (openingPrice - closePrice) * lots * contractSize;
    }

    pnl = parseFloat(pnl.toFixed(5));

    await RecordsModel.updateOne(
      { _id: id, tenant: currentTenant.id },
      {
        $set: {
          tradeStatus: 'closed',
          closePrice,
          pnl,
          profit: pnl,
          updatedBy: currentUser.id,
        },
      }
    );

    // Update USDT wallet balance with P&L
    const WalletModel = Wallet(req.database);
    await WalletModel.findOneAndUpdate(
      { user: currentUser.id, symbol: 'USDT', tenant: currentTenant.id, accountType: 'exchange' },
      { $inc: { amount: pnl } },
      { upsert: false }
    );

    const updated = await RecordsModel.findById(id);
    await ApiResponseHandler.success(req, res, updated);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
