import mongoose from 'mongoose';
import FileSchema from './schemas/fileSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('projet');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProjetSchema = new Schema(
    {
      titre: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      details: {
        type: String,
        required: true,
      },
      typeProjet: {
        type: String,
        required: true,
        enum: [
          "idee",
          "projet_ligue",
          "projet_ca"
        ],
      },
      statutProjet: {
        type: String,
        required: true,
        enum: [
          "draft",
          "actif",
          "canceled",
          "closed"
        ],
      },
      photoPrincipal: [FileSchema],
      budget: {
        type: Number,
      },
      lieu: {
        type: String,
      },
      dateDebutProjet: {
        type: Date,
      },
      dateFinProjet: {
        type: Date,
      },
      dateDebutDon: {
        type: String,
      },
      dateFinDon: {
        type: String,
      },
      photos: [FileSchema],
      attachements: [FileSchema],
      votes: [{
        type: Schema.Types.ObjectId,
        ref: 'votes',
      }],
      dons: [{
        type: Schema.Types.ObjectId,
        ref: 'dons',
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

  ProjetSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );



  ProjetSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ProjetSchema.set('toJSON', {
    getters: true,
  });

  ProjetSchema.set('toObject', {
    getters: true,
  });

  return database.model('projet', ProjetSchema);
};
