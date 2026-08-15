import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('auditLog');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const AuditLogSchema = new Schema(
    {
      user: {
        type: String,
        ref: 'user',
        required: true,
      },
      country: {
        type: String,
        maxlength: 255,
        required: true,
      },
      clientIP: {
        type: String,
        maxlength: 255,
        required: true,
      },
      tenantId: {
        type: String,
        maxlength: 255,
      },
      timestamp: { type: Date, required: true },
      values: { type: Schema.Types.Mixed },
    },
    { timestamps: true },
  );

  AuditLogSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  AuditLogSchema.set('toJSON', {
    getters: true,
  });

  AuditLogSchema.set('toObject', {
    getters: true,
  });

  return database.model('auditLog', AuditLogSchema);
};
