import mongoose, { Schema, Document } from "mongoose";

export interface ICateringRequest extends Document {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  guestCount: string;
  eventDate: Date;
  location: string;
  additionalInfo?: string;
  status?: string;
}

const CateringRequestSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    eventType: { type: String, required: true },
    guestCount: { type: String, required: true },
    eventDate: { type: Date, required: true },
    location: { type: String, required: true },
    additionalInfo: { type: String },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export const CateringRequest = mongoose.model<ICateringRequest>(
  "CateringRequest",
  CateringRequestSchema
);
