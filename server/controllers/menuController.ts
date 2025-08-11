// server/controllers/menuController.ts
import { Request, Response } from "express";
import { connectToDb, menuCollection } from "../db";
import { ObjectId } from "mongodb";
import { MenuItem } from "../models/menuModel";

export const getAllMenu = async (req: Request, res: Response) => {
  await connectToDb();
  const menu = await menuCollection.find().toArray();
  res.json(menu);
};

export const addMenuItem = async (req: Request, res: Response) => {
  await connectToDb();
  const item: MenuItem = {
    ...req.body,
    available: true,
    created_at: new Date(),
    updated_at: new Date(),
  };
  const result = await menuCollection.insertOne(item);
  res.json({ _id: result.insertedId, ...item });
};

export const updateMenuItem = async (req: Request, res: Response) => {
  await connectToDb();
  const id = req.params.id;
  const update = { ...req.body, updated_at: new Date() };
  await menuCollection.updateOne({ _id: new ObjectId(id) }, { $set: update });
  res.json({ message: "Updated" });
};

export const deleteMenuItem = async (req: Request, res: Response) => {
  await connectToDb();
  const id = req.params.id;
  await menuCollection.deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Deleted" });
};

export const toggleAvailability = async (req: Request, res: Response) => {
  await connectToDb();
  const id = req.params.id;
  const item = await menuCollection.findOne({ _id: new ObjectId(id) });
  if (!item) return res.status(404).json({ error: "Not found" });

  await menuCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { available: !item.available, updated_at: new Date() } }
  );
  res.json({ message: "Toggled availability" });
};
