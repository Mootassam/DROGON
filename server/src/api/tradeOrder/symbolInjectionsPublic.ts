import ApiResponseHandler from '../apiResponseHandler';
import TradeOrder from '../../database/models/tradeOrder';

/**
 * GET /symbol-injections-public
 *
 * PUBLIC, UNAUTHENTICATED feed of active chart injections.
 *
 * Visitors who are NOT logged in have no tenant/token, yet must still see the
 * same admin-applied profit/loss animation on the charts. This endpoint requires
 * neither auth nor a tenant id in the URL — it returns every currently-animating
 * injection straight from the shared database so any device (signed in or not)
 * renders the identical chart.
 */
export default async (req, res, next) => {
  try {
    const TradeOrderModel = TradeOrder(req.database);

    // Bounded to the last 24 h (max allowed duration) to avoid scanning old data.
    const cutoff = new Date(Date.now() - 86_400_000);
    const orders = await TradeOrderModel.find({
      injectionTargetPrice: { $ne: null },
      injectionStartedAt:   { $ne: null, $gte: cutoff },
      injectionDurationMs:  { $ne: null },
    }).select(
      'symbol entryPrice injectionTargetPrice injectionStartedAt injectionDurationMs'
    );

    const nowMs = Date.now();

    const seedFromId = (id: string): number => {
      let h = 0;
      for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
      return Math.abs(h) % 1_000_000;
    };

    const injections = orders
      .filter(o => {
        const startMs    = (o as any).injectionStartedAt?.getTime() ?? 0;
        const durationMs  = (o as any).injectionDurationMs ?? 0;
        return startMs + durationMs > nowMs;
      })
      .map(o => ({
        orderId:     String((o as any)._id),
        symbol:      (o as any).symbol,
        entryPrice:  (o as any).entryPrice,
        targetPrice: (o as any).injectionTargetPrice,
        startedAt:   (o as any).injectionStartedAt?.getTime(),
        durationMs:  (o as any).injectionDurationMs,
        seed:        seedFromId(String((o as any)._id)),
      }));

    await ApiResponseHandler.success(req, res, { injections });
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
