// server/db.ts
import { MongoClient, Db, Collection } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI as string;

if (!uri) {
  throw new Error("❌ MONGO_URI is not defined in your .env");
}

let client: MongoClient;
let db: Db;
let menuCollection: Collection;

export async function connectToDb(): Promise<Db> {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    console.log("✅ Connected to MongoDB");
    db = client.db("vemmakitchen");
    menuCollection = db.collection("menu_items");
  }
  return db;
}

export function getDb(): Db {
  if (!db) {
    throw new Error("Database not connected. Call connectToDb() first.");
  }
  return db;
}

export { client, menuCollection };
