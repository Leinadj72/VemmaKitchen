// server/seedAdmin.ts
import { connectToDb } from "./server/db";
import bcrypt from "bcryptjs";

async function seedAdmin() {
  try {
    const db = await connectToDb();
    const email = "admin@example.com";
    const password = "Admin123!";
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      console.log("✅ Admin already exists");
    } else {
      await db.collection("users").insertOne({
        email,
        password: hashedPassword,
        is_admin: true,
        created_at: new Date(),
      });
      console.log("✅ Admin created successfully!");
    }
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
  } finally {
    process.exit(0);
  }
}

seedAdmin();
