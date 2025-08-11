// server/routes/menu.ts
import express from "express";
import {
  getAllMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
} from "../controllers/menuController";

const router = express.Router();

router.get("/", getAllMenu);
router.post("/", addMenuItem);
router.put("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);
router.patch("/:id/toggle", toggleAvailability);

export default router;
