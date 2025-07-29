import mongoose, { Schema, Document } from "mongoose";

export interface IReservation extends Document {
  name: string;
  email: string;
  phone: string;
  date: string; // Store as YYYY-MM-DD string for easier admin view
  time: string;
  partySize: number;
  specialRequests?: string;
  status?: string;
}

const ReservationSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    partySize: { type: Number, required: true },
    specialRequests: { type: String },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export const Reservation = mongoose.model<IReservation>(
  "Reservation",
  ReservationSchema
);
