import ApiResponseHandler from '../apiResponseHandler';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import TradeOrder from '../../database/models/tradeOrder';

export default async (req, res, next) => {
  try {
    const currentTenant = MongooseRepository.getCurrentTenant(req);
    const currentUser   = MongooseRepository.getCurrentUser(req);

    const { status, orderType } = req.query;

    const TradeOrderModel = TradeOrder(req.database);

    // NOTE: Positions are NEVER auto-closed. Even after a chart injection's
    // animation window elapses, the order stays 'active' and is only closed
    // when the customer manually closes it from /ordersPage (see close.ts).
    // The injection fields are kept so close.ts can apply the admin-configured
    // P&L when the customer closes after the animation has finished.

    const filter: any = { tenant: currentTenant.id, user: currentUser.id };
    if (status)    filter.status    = status;
    if (orderType) filter.orderType = orderType;

    const rows = await TradeOrderModel
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(500);

    await ApiResponseHandler.success(req, res, { rows, count: rows.length });
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
