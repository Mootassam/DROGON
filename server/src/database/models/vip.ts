import mongoose from 'mongoose';
import FileSchema from './schemas/fileSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('vip');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const VipSchema = new Schema(
    {
      title: {
        type: String,
      },
      entrylimit: {
        type: String,
      },
      levellimit: {
        type: String,
      },
      photo: [FileSchema],
      dailyorder: {
        type: String,
      },
      comisionrate: {
        type: String,
      },
    //   status: {
    //     type: String,
    //     enum: ['enable', 'disable'],
    //     default: 'enable',
    //   },
  
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true,
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

  VipSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  VipSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  VipSchema.set('toJSON', {
    getters: true,
  });

  VipSchema.set('toObject', {
    getters: true,
  });

  return database.model('vip', VipSchema);
};
