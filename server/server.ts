import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

// Load env vars
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

if (!mongoURI) {
  throw new Error("❌ MONGO_URI not defined in .env file");
}

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// Define User schema + model
const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// Create Express app
const app = express();

app.use(
  cors({
    origin: "http://localhost:8080", // allow your Vite frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Save user route
app.post("/api/save-user", async (req: Request, res: Response) => {
  const { email, fullName } = req.body;

  if (!email || !fullName) {
    return res.status(400).json({ error: "Missing fullName or email" });
  }

  try {
    const existing = await User.findOne({ email });
    if (!existing) {
      await User.create({ email, fullName });
    }
    res.status(200).json({ message: "User saved successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Failed to save user" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
