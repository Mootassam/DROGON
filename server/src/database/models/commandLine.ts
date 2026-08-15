import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('commandLine');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const CommandLineSchema = new Schema(
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'produit',
        required: true,
      },
      productTitle: {
        type: String,
        required: false,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      subTotal: {
        type: Number,
        required: true,
      },
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      importHash: { type: String },
    },
    { timestamps: true },
  );

  CommandLineSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );



  CommandLineSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  CommandLineSchema.set('toJSON', {
    getters: true,
  });

  CommandLineSchema.set('toObject', {
    getters: true,
  });

  return database.model('commandLine', CommandLineSchema);
};
