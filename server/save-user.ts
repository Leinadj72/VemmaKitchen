import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
app.use(cors());
app.use(express.json());

// Check Mongo URI
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) throw new Error("❌ MONGO_URI not defined in .env file");

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Mongoose Schema
const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  is_admin: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

// POST route to save user
app.post("/api/save-user", async (req, res) => {
  const { fullName, email, adminInviteCode } = req.body;

  if (!fullName || !email) {
    return res.status(400).json({ error: "Missing fullName or email" });
  }

  try {
    // Prevent duplicates
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Check admin code
    const is_admin =
      adminInviteCode?.trim() === process.env.ADMIN_CODE?.trim();

    // Save new user
    const newUser = new User({ fullName, email, is_admin });
    await newUser.save();

    res.status(201).json({
      message: "✅ User saved successfully",
      is_admin,
    });
  } catch (error) {
    console.error("❌ Failed to save user:", error);
    res.status(500).json({ error: "Failed to save user" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

