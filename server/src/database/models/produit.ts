import mongoose from 'mongoose';
import FileSchema from './schemas/fileSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('produit');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProduitSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      codeName: {
        type: String,
      },
      discount: {
        type: Number,
        required: true,
      },
      noOfTimes: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ['enable', 'disable'],
        default: 'enable',
      },
      type: {
        type: String,
        required: true,
        enum: ['multiple', 'single'],
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

  ProduitSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );



  ProduitSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ProduitSchema.set('toJSON', {
    getters: true,
  });

  ProduitSchema.set('toObject', {
    getters: true,
  });

  return database.model('produit', ProduitSchema);
};
