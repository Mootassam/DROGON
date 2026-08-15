import ApiResponseHandler from '../apiResponseHandler';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import TradeOrder from '../../database/models/tradeOrder';
import Wallet from '../../database/models/wallet';
import Error404 from '../../errors/Error404';

export default async (req, res, next) => {
  try {
    const currentTenant = MongooseRepository.getCurrentTenant(req);
    const currentUser   = MongooseRepository.getCurrentUser(req);

    const { id } = req.params;

    const TradeOrderModel = TradeOrder(req.database);
    const order = await TradeOrderModel.findById(id);

    if (!order || String(order.tenant) !== String(currentTenant.id)) throw new Error404();
    if (order.status !== 'waiting') {
      return res.status(400).json({ errors: [{ message: 'Only waiting orders can be cancelled' }] });
    }

    await TradeOrderModel.updateOne(
      { _id: id, tenant: currentTenant.id },
      { $set: { status: 'cancelled', closeReason: 'cancelled', closeTime: new Date(), updatedBy: currentUser.id } }
    );

    // ── Refund estimatedMargin to the user's wallet ──────────────────────────
    const refund = order.estimatedMargin ?? order.margin ?? 0;
    if (refund > 0) {
      const WalletModel = Wallet(req.database);
      await WalletModel.findOneAndUpdate(
        { user: currentUser.id, symbol: 'USDT', tenant: currentTenant.id, accountType: 'exchange' },
        { $inc: { amount: refund } },
        { upsert: false }
      );
    }

    const updated = await TradeOrderModel.findById(id);
    await ApiResponseHandler.success(req, res, updated);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
