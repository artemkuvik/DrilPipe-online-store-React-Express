import Router from "express";
const router = new Router();
import feedbackController from "../controllers/feedbackController.js";
import authMiddleweare from "../middleweare/authMiddleweare.js";
import checkRoleMiddleweare from "../middleweare/checkRoleMiddleweare.js";

router.post("/",authMiddleweare, feedbackController.add);
router.get("/admin", authMiddleweare, checkRoleMiddleweare(1), feedbackController.getAll);
router.delete("/admin/:id", authMiddleweare, checkRoleMiddleweare(1), feedbackController.delete);

export default router;
