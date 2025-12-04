import Router from "express";
const router = new Router();
import productsController from "../controllers/productsController.js";
import authMiddleweare from "../middleweare/authMiddleweare.js";
import checkRoleMiddleweare from "../middleweare/checkRoleMiddleweare.js";


router.get("/", productsController.getAll);
router.get("/:id", productsController.getOne);
router.post("/admin", authMiddleweare, checkRoleMiddleweare(1), productsController.add);
router.put("/admin/:id", authMiddleweare, checkRoleMiddleweare(1), productsController.edit);
router.delete("/:id", authMiddleweare, checkRoleMiddleweare(1), productsController.delete);

export default router;
