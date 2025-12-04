import { Router } from "express";
const router = new Router();
import ordersController from "../controllers/ordersController.js";
import authMiddleware from "../middleweare/authMiddleweare.js";
import checkRoleMiddleweare from "../middleweare/checkRoleMiddleweare.js";

router.post("/", authMiddleware, ordersController.createOrder);
router.get("/", checkRoleMiddleweare(1), ordersController.getOrdersForAdmin);
router.put("/:id", authMiddleware, ordersController.updateOrderStatus);
router.get("/user", authMiddleware, ordersController.getOrdersForUser);

export default router;