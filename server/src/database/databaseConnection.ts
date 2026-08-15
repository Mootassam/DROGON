
import mongoose from 'mongoose';
import { getConfig } from '../config';
import init from './models';

export async function databaseInit() {
  if (mongoose.connection.readyState) {
    return mongoose;
  }

  const uri = getConfig().DATABASE_CONNECTION;
  if (!uri) {
    throw new Error('❌ DATABASE_CONNECTION (Mongo URI) is missing from config/env');
  }

  return mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any)
    .then(() => {
      init(mongoose);
      console.log('✅ MongoDB connected');
      return mongoose;
    })
    .catch((error) => {
      console.error('❌ MongoDB connection error', error);
      throw error;
    });
}
