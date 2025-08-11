// server/models/menuModel.ts
import { ObjectId } from "mongodb";

export interface MenuItem {
  _id?: ObjectId;
  name: string;
  description: string;
  price: string;
  category: "Mains" | "Sides" | "Desserts";
  image: string;
  available: boolean;
  created_at: Date;
  updated_at: Date;
}
