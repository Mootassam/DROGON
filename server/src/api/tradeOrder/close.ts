import ApiResponseHandler from '../apiResponseHandler';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import TradeOrder from '../../database/models/tradeOrder';
import Wallet from '../../database/models/wallet';
import Error404 from '../../errors/Error404';

const CONTRACT_SIZE = 100;

// Must match graborders/PC's src/view/shared/useSymbolInjections.ts so the P&L the
// customer sees ascending/descending live is exactly what gets credited on close.
function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function marketPnl(order: any, closePrice: number): number {
  const priceDiff = order.direction === 'buy'
    ? closePrice - order.entryPrice
    : order.entryPrice - closePrice;
  return parseFloat((priceDiff * order.lots * CONTRACT_SIZE - order.fee).toFixed(5));
}

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
    // Admin-controlled orders (chart animation) must ascend/descend toward the
    // configured Net P&L over the admin's chosen duration, NOT jump to it
    // immediately — closing early pays only the fraction reached so far, exactly
    // what the customer was shown live. If the animation window has fully
    // elapsed without the customer closing, the injected outcome expires and the
    // position falls back to the real market price, same as a normal close.
    const injStart = (order as any).injectionStartedAt
      ? ((order as any).injectionStartedAt as Date).getTime()
      : 0;
    const injDurMs = (order as any).injectionDurationMs ?? 0;
    const injPnl   = (order as any).injectionPnl;

    let netPnl: number;
    if (injStart > 0 && injDurMs > 0 && injPnl != null) {
      const prog = (Date.now() - injStart) / injDurMs;
      netPnl = prog < 1
        ? parseFloat((injPnl * easeInOutSine(Math.max(0, prog))).toFixed(5))
        : marketPnl(order, closePrice);
    } else {
      // Normal (non-admin-controlled) close — derive P&L from the real price move.
      netPnl = marketPnl(order, closePrice);
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
