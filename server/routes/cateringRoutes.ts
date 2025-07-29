import express from "express";
import { CateringRequest } from "../models/CateringRequest";

const router = express.Router();

router.post("/catering-request", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      eventType,
      guestCount,
      eventDate,
      location,
      additionalInfo,
    } = req.body;

    const newRequest = new CateringRequest({
      name,
      email,
      phone,
      eventType,
      guestCount,
      eventDate,
      location,
      additionalInfo,
    });

    await newRequest.save();

    res
      .status(201)
      .json({ message: "Catering request submitted successfully" });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    console.error("❌ Error saving catering request:", message);
    res.status(500).json({ message });
  }
});

export default router;
