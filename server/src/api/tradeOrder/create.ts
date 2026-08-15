import ApiResponseHandler from '../apiResponseHandler';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import TradeOrder from '../../database/models/tradeOrder';
import Wallet from '../../database/models/wallet';

const CONTRACT_SIZE = 100;

export default async (req, res, next) => {
  try {
    const currentTenant = MongooseRepository.getCurrentTenant(req);
    const currentUser   = MongooseRepository.getCurrentUser(req);

    const {
      orderType,      // 'market' | 'pending'
      symbol,
      symbolName,
      direction,      // 'buy' | 'sell'
      lots,
      multiplier,
      entryPrice,     // market order open price
      targetPrice,    // pending order trigger price
      referencePrice, // live price at creation time (pending only)
      takeProfit,
      stopLoss,
    } = req.body;

    // ── Validation ──────────────────────────────────────────────────────────
    if (!orderType || !symbol || !direction || !lots || !multiplier) {
      return res.status(400).json({ errors: [{ message: 'Missing required fields' }] });
    }
    if (orderType === 'market' && !entryPrice) {
      return res.status(400).json({ errors: [{ message: 'entryPrice required for market orders' }] });
    }
    if (orderType === 'pending' && (!targetPrice || !referencePrice)) {
      return res.status(400).json({ errors: [{ message: 'targetPrice and referencePrice required for pending orders' }] });
    }

    // Use entryPrice for market, referencePrice for pending (live price at creation)
    // Formula matches the frontend: leverage = multiplier/100, so margin = notional / leverage
    // e.g. multiplier=100 → leverage=1 (no effect), multiplier=500 → leverage=5 (5× less margin)
    const price           = orderType === 'market' ? entryPrice : referencePrice;
    const notional        = price * lots * CONTRACT_SIZE;        // price × lots × 100
    const leverage        = multiplier / 100;                    // 100→1, 200→2, 500→5
    const estimatedMargin = parseFloat((notional / leverage).toFixed(5));
    const fee             = parseFloat((notional * 0.0001).toFixed(5));  // 0.01% of notional

    // ── Balance check ───────────────────────────────────────────────────────
    const WalletModel = Wallet(req.database);
    const wallet = await WalletModel.findOne({
      user:        currentUser.id,
      symbol:      'USDT',
      tenant:      currentTenant.id,
      accountType: 'exchange',
    });

    if (!wallet || wallet.amount < estimatedMargin) {
      return res.status(400).json({
        errors: [{ message: `Insufficient balance. Required: $${estimatedMargin.toFixed(2)}, Available: $${(wallet?.amount ?? 0).toFixed(2)}` }],
      });
    }

    // ── Build order ─────────────────────────────────────────────────────────
    const orderNumber = `TRD-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;
    const now         = new Date();

    const payload: any = {
      user:            currentUser.id,
      tenant:          currentTenant.id,
      orderType,
      symbol,
      symbolName:      symbolName || symbol,
      direction,
      lots,
      multiplier,
      estimatedMargin,
      margin:          estimatedMargin,   // mirror for legacy reads
      fee,
      takeProfit:      takeProfit || null,
      stopLoss:        stopLoss   || null,
      pnl:             0,
      orderNumber,
      createdBy:       currentUser.id,
      updatedBy:       currentUser.id,
    };

    if (orderType === 'market') {
      payload.status     = 'active';
      payload.entryPrice = entryPrice;
      payload.openTime   = now;
    } else {
      payload.status         = 'waiting';
      payload.targetPrice    = targetPrice;
      payload.referencePrice = referencePrice;
      payload.triggerAbove   = targetPrice > referencePrice;
    }

    const TradeOrderModel = TradeOrder(req.database);
    const [order] = await TradeOrderModel.create([payload]);

    // ── Deduct estimatedMargin from wallet immediately ───────────────────────
    await WalletModel.findOneAndUpdate(
      { user: currentUser.id, symbol: 'USDT', tenant: currentTenant.id, accountType: 'exchange' },
      { $inc: { amount: -estimatedMargin } },
      { upsert: false }
    );

    await ApiResponseHandler.success(req, res, order);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
