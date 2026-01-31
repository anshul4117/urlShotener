import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not set');
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
    return mongoose.connection;
  } catch (err) {
    console.error('MongoDB connection error', err);
    throw err;
  }
};

const disconnectDB = async () => {
  if (mongoose.connection && mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
};

export { connectDB, disconnectDB };