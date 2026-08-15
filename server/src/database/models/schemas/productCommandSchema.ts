import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductCommandSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'produit',
    },
    quantity: {
      type: Number,
    },
    subTotal: {
      type: Number,
    },
    productTitle: {
      type: String,
    },
  },
  { timestamps: true },
);

ProductCommandSchema.virtual('id').get(function () {
  // @ts-ignore
  return this._id.toHexString();
});

ProductCommandSchema.set('toJSON', {
  getters: true,
});

ProductCommandSchema.set('toObject', {
  getters: true,
});

export default ProductCommandSchema;
