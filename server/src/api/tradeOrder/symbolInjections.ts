import ApiResponseHandler from '../apiResponseHandler';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import TradeOrder from '../../database/models/tradeOrder';

/**
 * GET /tenant/:tenantId/symbol-injections
 *
 * Returns all currently ACTIVE chart injections for this tenant.
 * An injection is active when: injectionStartedAt + injectionDurationMs > now
 *
 * IMPORTANT: This is intentionally NOT filtered by order status. The chart
 * animation must keep running for the full duration the admin configured,
 * EVEN IF the customer closes their position early. The animation is a
 * market-wide visual effect decoupled from any single order's lifecycle.
 *
 * It is also NOT user-scoped — every client (regardless of who owns the order)
 * shows the same animated price on charts for the affected symbol.
 */
export default async (req, res, next) => {
  try {
    const currentTenant = MongooseRepository.getCurrentTenant(req);

    const TradeOrderModel = TradeOrder(req.database);

    // Fetch any order (active OR closed) that has injection fields set.
    // Bounded to the last 24 h (the max allowed duration) so we never scan
    // ancient orders. The precise time-window filter below decides whether
    // it is still animating.
    const cutoff = new Date(Date.now() - 86_400_000);
    const orders = await TradeOrderModel.find({
      tenant:               currentTenant.id,
      injectionTargetPrice: { $ne: null },
      injectionStartedAt:   { $ne: null, $gte: cutoff },
      injectionDurationMs:  { $ne: null },
    }).select(
      'symbol entryPrice injectionTargetPrice injectionStartedAt injectionDurationMs'
    );

    const nowMs = Date.now();

    // Stable numeric seed from the order id so every client/device generates
    // the EXACT same candle wiggle deterministically.
    const seedFromId = (id: string): number => {
      let h = 0;
      for (let i = 0; i < id.length; i++) {
        h = (h * 31 + id.charCodeAt(i)) | 0;
      }
      return Math.abs(h) % 1_000_000;
    };

    const injections = orders
      .filter(o => {
        const startMs   = (o as any).injectionStartedAt?.getTime() ?? 0;
        const durationMs = (o as any).injectionDurationMs ?? 0;
        return startMs + durationMs > nowMs; // still within animation window
      })
      .map(o => ({
        orderId:     String((o as any)._id),
        symbol:      (o as any).symbol,
        entryPrice:  (o as any).entryPrice,            // animation start (trade open price)
        targetPrice: (o as any).injectionTargetPrice,  // animation end (close price)
        startedAt:   (o as any).injectionStartedAt?.getTime(),
        durationMs:  (o as any).injectionDurationMs,
        seed:        seedFromId(String((o as any)._id)),
      }));

    await ApiResponseHandler.success(req, res, { injections });
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
