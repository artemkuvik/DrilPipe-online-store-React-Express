import { Router } from "express";
const router = new Router();
import applicationsController from '../controllers/applicationsController.js';
import authMiddleweare from '../middleweare/authMiddleweare.js';
import checkRoleMiddleweare from '../middleweare/checkRoleMiddleweare.js';


router.get("/admin", authMiddleweare, checkRoleMiddleweare(1), applicationsController.getAll);
router.post("/", authMiddleweare, applicationsController.add);
router.put("/:id", authMiddleweare, checkRoleMiddleweare(1), applicationsController.updateStatus);

export default router;
