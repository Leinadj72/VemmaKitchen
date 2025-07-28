import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) throw new Error('MONGO_URI not defined in .env file');

mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

// Mongoose Schema
const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

// POST route to save user
app.post('/api/save-user', async (req, res) => {
  const { fullName, email } = req.body;
  if (!fullName || !email) {
    return res.status(400).json({ error: 'Missing fullName or email' });
  }

  try {
    const newUser = new User({ fullName, email });
    await newUser.save();
    res.status(201).json({ message: 'User saved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save user' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
