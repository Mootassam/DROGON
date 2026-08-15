import ApiResponseHandler from '../apiResponseHandler';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import TradeOrder from '../../database/models/tradeOrder';
import Wallet from '../../database/models/wallet';
import Error404 from '../../errors/Error404';

const CONTRACT_SIZE = 100;

export default async (req, res, next) => {
  try {
    const currentTenant = MongooseRepository.getCurrentTenant(req);
    const currentUser   = MongooseRepository.getCurrentUser(req);

    const { id } = req.params;
    const { closePrice, closeReason = 'manual' } = req.body;

    if (!closePrice) {
      return res.status(400).json({ errors: [{ message: 'closePrice is required' }] });
    }

    const TradeOrderModel = TradeOrder(req.database);
    const order = await TradeOrderModel.findById(id);

    if (!order || String(order.tenant) !== String(currentTenant.id)) throw new Error404();
    if (order.status !== 'active') {
      return res.status(400).json({ errors: [{ message: `Cannot close order with status: ${order.status}` }] });
    }

    // ── P&L calculation ─────────────────────────────────────────────────────
    // If the order has an active injection, prefer admin-configured injectionPnl when
    // the animation window has already elapsed. For early manual closes mid-animation,
    // calculate P&L from the current animated (customer-supplied) closePrice.
    const injStartMs  = (order as any).injectionStartedAt
      ? ((order as any).injectionStartedAt as Date).getTime()
      : 0;
    const injDurMs    = (order as any).injectionDurationMs ?? 0;
    const injDone     = injStartMs > 0 && (injStartMs + injDurMs) <= Date.now();

    let netPnl: number;
    if (injDone && (order as any).injectionPnl != null) {
      // Animation finished before customer closed – use admin-configured P&L
      netPnl = parseFloat(((order as any).injectionPnl).toFixed(5));
    } else {
      // Normal close (or early close mid-animation)
      const priceDiff = order.direction === 'buy'
        ? closePrice - order.entryPrice
        : order.entryPrice - closePrice;
      netPnl = parseFloat((priceDiff * order.lots * CONTRACT_SIZE - order.fee).toFixed(5));
    }

    // ── Update order ────────────────────────────────────────────────────────
    // NOTE: We intentionally KEEP the injection fields intact. The admin-configured
    // chart animation must keep running across all charts/markets for its full
    // duration even after the customer closes their position early. The injection
    // is a market-wide visual effect decoupled from this order's lifecycle, and
    // symbol-injections returns it (regardless of status) until the time elapses.
    await TradeOrderModel.updateOne(
      { _id: id, tenant: currentTenant.id, status: 'active' },
      {
        $set: {
          status:     'closed',
          closePrice,
          closeReason,
          closeTime:  new Date(),
          pnl:        netPnl,
          updatedBy:  currentUser.id,
        },
      }
    );

    // ── Update wallet ───────────────────────────────────────────────────────
    const estMargin = (order as any).injectionEstMargin
                      ?? (order as any).estimatedMargin
                      ?? (order as any).margin
                      ?? 0;
    const WalletModel = Wallet(req.database);
    await WalletModel.findOneAndUpdate(
      { user: currentUser.id, symbol: 'USDT', tenant: currentTenant.id, accountType: 'exchange' },
      { $inc: { amount: estMargin + netPnl } },
      { upsert: false }
    );

    const updated = await TradeOrderModel.findById(id);
    await ApiResponseHandler.success(req, res, updated);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
