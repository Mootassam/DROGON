import mongoose from 'mongoose';
import FileSchema from './schemas/fileSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('detailsCampagne');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const DetailsCampagneSchema = new Schema(
    {
      adherent: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      palier: {
        type: Schema.Types.ObjectId,
        ref: 'palier',
        required: true,
      },
      campagne: [{
        type: Schema.Types.ObjectId,
        ref: 'campagne',
      }],
      titre: {
        type: String,
        ref: 'campagne',
      },
      statutPay: {
        type: String,
        enum: [
          "paye",
          "non_paye",
          null
        ],
      },
      montant: {
        type: Number,
      },
      facture: [FileSchema],
      typePay: {
        type: String,
        enum: [
          "paymee",
          "cb",
          "virement",
          "especes",
          null
        ],
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

  DetailsCampagneSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  // DetailsCampagneSchema.index(
  //   { adherent: 1, tenant: 1 },
  //   {
  //     unique: true,
  //     partialFilterExpression: {
  //       adherent: { $type: 'objectId' },
  //     },
  //   },
  // );

  DetailsCampagneSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  DetailsCampagneSchema.set('toJSON', {
    getters: true,
  });

  DetailsCampagneSchema.set('toObject', {
    getters: true,
  });

  return database.model('detailsCampagne', DetailsCampagneSchema);
};
