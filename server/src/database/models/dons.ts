import mongoose from 'mongoose';
import FileSchema from './schemas/fileSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('dons');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const DonsSchema = new Schema(
    {
      adherent: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      montant: {
        type: Number,
      },
      projet: {
        type: Schema.Types.ObjectId,
        ref: 'projet',
      },
      titre: {
        type: String,
        ref: 'projet',
      },
      typePaiement: {
        type: String,
        required: true,
        enum: [
          "paymee",
          "cb",
          "virement",
          "especes"
        ],
      },
      attachements: [FileSchema],
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

  DonsSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  DonsSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  DonsSchema.set('toJSON', {
    getters: true,
  });

  DonsSchema.set('toObject', {
    getters: true,
  });

  return database.model('dons', DonsSchema);
};
