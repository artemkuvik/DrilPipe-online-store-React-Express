import Router from "express";
const router = new Router();
import servicesController from "../controllers/servicesController.js";
import authMiddleweare from "../middleweare/authMiddleweare.js";
import checkRoleMiddleweare from "../middleweare/checkRoleMiddleweare.js";


router.get("/", servicesController.getAll);
router.post("/admin", authMiddleweare, checkRoleMiddleweare(1), servicesController.add);
router.put("/admin/:id", authMiddleweare, checkRoleMiddleweare(1), servicesController.edit);
router.delete("/admin/:id", authMiddleweare, checkRoleMiddleweare(1), servicesController.delete);

export default router;
