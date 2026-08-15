import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try { return database.model('tradeOrder'); } catch {}

  const TradeOrderSchema = new Schema(
    {
      user:   { type: Schema.Types.ObjectId, ref: 'user',   required: true },
      tenant: { type: Schema.Types.ObjectId, ref: 'tenant', required: true },

      // 'market' = instant execution | 'pending' = trigger-based
      orderType: { type: String, enum: ['market', 'pending'], required: true },

      symbol:     { type: String, required: true },
      symbolName: { type: String, default: '' },
      direction:  { type: String, enum: ['buy', 'sell'], required: true },

      // Sizing
      lots:            { type: Number, required: true, min: 0.01 },
      multiplier:      { type: Number, required: true },
      estimatedMargin: { type: Number, default: 0 },
      margin:          { type: Number, default: 0 },   // kept for legacy reads
      fee:             { type: Number, default: 0 },

      // Prices
      entryPrice:     { type: Number },
      targetPrice:    { type: Number },   // pending trigger price
      referencePrice: { type: Number },   // market price at pending order creation
      triggerAbove:   { type: Boolean },  // true → trigger when livePrice >= targetPrice
      closePrice:     { type: Number },

      // Risk management
      takeProfit: { type: Number, default: null },
      stopLoss:   { type: Number, default: null },

      // Result
      pnl: { type: Number, default: 0 },

      // Status lifecycle: market → active → closed | pending → waiting → active → closed | cancelled
      status: {
        type: String,
        enum: ['active', 'waiting', 'closed', 'cancelled'],
        required: true,
        default: 'active',
      },

      closeReason: {
        type: String,
        enum: ['manual', 'tp', 'sl', 'cancelled'],
      },

      // ── Global chart injection (set by admin, visible to ALL users for this symbol) ──
      // While these fields are set the order stays 'active'; customer can still close manually.
      // When startedAt + durationMs elapses, list.ts lazy-finalizes the order.
      injectionTargetPrice: { type: Number },   // admin-calculated close price
      injectionStartedAt:   { type: Date },      // when admin triggered
      injectionDurationMs:  { type: Number },    // animation duration in ms
      injectionPnl:         { type: Number },    // P&L that will be applied on finalization
      injectionEstMargin:   { type: Number },    // estimatedMargin snapshot for wallet credit

      orderNumber: { type: String, required: true },
      openTime:    { type: Date },
      closeTime:   { type: Date },

      createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
      updatedBy: { type: Schema.Types.ObjectId, ref: 'user' },
    },
    { timestamps: true }
  );

  TradeOrderSchema.index({ tenant: 1, user: 1, status: 1, createdAt: -1 });

  TradeOrderSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });
  TradeOrderSchema.set('toJSON',   { getters: true });
  TradeOrderSchema.set('toObject', { getters: true });

  return database.model('tradeOrder', TradeOrderSchema);
};
