import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error('MONGO_URI not defined in .env file');
}

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
