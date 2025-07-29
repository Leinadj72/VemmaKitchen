import express from "express";
import { ContactMessage } from "../models/ContactMessage";

const router = express.Router();

router.post("/contact-message", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = new ContactMessage({
      name,
      email,
      subject,
      message,
    });

    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Something went wrong";
    console.error("❌ Contact form error:", msg);
    res.status(500).json({ message: msg });
  }
});

export default router;
