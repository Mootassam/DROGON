import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('palier');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const PalierSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      montant: {
        type: Number,
        required: true,
      },
      details: {
        type: String,
        required: true,
      },
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
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

  PalierSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  PalierSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  PalierSchema.set('toJSON', {
    getters: true,
  });

  PalierSchema.set('toObject', {
    getters: true,
  });

  return database.model('palier', PalierSchema);
};
