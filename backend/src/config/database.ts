import mongoose from 'mongoose';
import { env } from './env';

let memoryServer: any = null;

export const connectDatabase = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(env.mongodbUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn('MongoDB connection failed, starting in-memory MongoDB...');
    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      memoryServer = await MongoMemoryServer.create();
      const uri = memoryServer.getUri();
      const conn = await mongoose.connect(uri);
      console.log(`In-memory MongoDB Connected: ${conn.connection.host}`);
    } catch (memError) {
      console.error('Failed to start in-memory MongoDB:', memError);
      process.exit(1);
    }
  }
};

export const stopMemoryServer = async (): Promise<void> => {
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }
};