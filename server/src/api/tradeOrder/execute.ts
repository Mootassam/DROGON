import ApiResponseHandler from '../apiResponseHandler';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import TradeOrder from '../../database/models/tradeOrder';
import Error404 from '../../errors/Error404';

const CONTRACT_SIZE = 100;

export default async (req, res, next) => {
  try {
    const currentTenant = MongooseRepository.getCurrentTenant(req);
    const currentUser   = MongooseRepository.getCurrentUser(req);

    const { id } = req.params;
    const { executionPrice } = req.body; // live market price when trigger hit

    if (!executionPrice) {
      return res.status(400).json({ errors: [{ message: 'executionPrice is required' }] });
    }

    const TradeOrderModel = TradeOrder(req.database);
    const order = await TradeOrderModel.findById(id);

    if (!order || String(order.tenant) !== String(currentTenant.id)) throw new Error404();
    if (order.status !== 'waiting') {
      return res.status(400).json({ errors: [{ message: `Cannot execute order with status: ${order.status}` }] });
    }

    // Recalculate fee at execution price (estimatedMargin stays fixed from creation)
    const fee = parseFloat((executionPrice * order.lots * CONTRACT_SIZE * 0.0001).toFixed(5));

    // Transition waiting → active; estimatedMargin was already deducted at creation
    await TradeOrderModel.updateOne(
      { _id: id, tenant: currentTenant.id, status: 'waiting' },
      {
        $set: {
          status:     'active',
          entryPrice: executionPrice,
          openTime:   new Date(),
          fee,
          updatedBy:  currentUser.id,
        },
      }
    );

    const updated = await TradeOrderModel.findById(id);
    await ApiResponseHandler.success(req, res, updated);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
