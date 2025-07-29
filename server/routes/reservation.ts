import express from "express";
import { Reservation } from "../models/Reservation";

const router = express.Router();

router.post("/reservation", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      date,
      time,
      partySize,
      specialRequests,
    } = req.body;

    const newReservation = new Reservation({
      name,
      email,
      phone,
      date,
      time,
      partySize,
      specialRequests,
    });

    await newReservation.save();

    res.status(201).json({ message: "Reservation created successfully" });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Something went wrong";
    console.error("❌ Reservation error:", msg);
    res.status(500).json({ message: msg });
  }
});

export default router;
