import { Router } from "express";
const router = Router();
import cartController from "../controllers/cartController.js";
import authMiddleweare from "../middleweare/authMiddleweare.js";

router.post("/add", authMiddleweare, cartController.addProduct);
router.delete("/delete", authMiddleweare, cartController.deleteProduct);
router.get("/get", authMiddleweare, cartController.getCart);

export default router;