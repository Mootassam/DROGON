import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('campagne');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const CampagneSchema = new Schema(
    {
      titre: {
        type: String,
        required: true,
      },
      annee: {
        type: Number,
        required: true,
      },
      datedebut: {
        type: String,
        required: true,
      },
      datefin: {
        type: String,
        required: true,
      },
      statut: {
        type: String,
        required: true,
        enum: [
          "en_cours",
          "termine",
          "annule"
        ],
      },
      details: [{
        type: Schema.Types.ObjectId,
        ref: 'detailsCampagne',
      }],
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

  CampagneSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  CampagneSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  CampagneSchema.set('toJSON', {
    getters: true,
  });

  CampagneSchema.set('toObject', {
    getters: true,
  });

  return database.model('campagne', CampagneSchema);
};
