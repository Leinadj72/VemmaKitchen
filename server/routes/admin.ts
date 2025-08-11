// backend/routes/admin.ts
import { Router } from "express";
import { getDb } from "../db"; // your Mongo connection helper

const router = Router();

router.get("/check", async (req, res) => {
  try {
    const email = req.query.email as string;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const db = getDb();
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ isAdmin: user.is_admin === true });
  } catch (err) {
    console.error("Admin check failed:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
