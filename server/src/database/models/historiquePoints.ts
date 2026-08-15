import mongoose from 'mongoose';
import FileSchema from './schemas/fileSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('historiquePoints');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const HistoriquePointsSchema = new Schema(
    {
      adherent: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      points: {
        type: Number,
        required: true,
      },
      commentaire: {
        type: String,
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

  HistoriquePointsSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  HistoriquePointsSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  HistoriquePointsSchema.set('toJSON', {
    getters: true,
  });

  HistoriquePointsSchema.set('toObject', {
    getters: true,
  });

  return database.model('historiquePoints', HistoriquePointsSchema);
};
