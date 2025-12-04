import Router from "express";
import UserController from "../controllers/userController.js";
import authMiddleweare from "../middleweare/authMiddleweare.js";

const router = new Router();
router.post("/registration", UserController.registration);
router.post("/authorization", UserController.authorization);
router.get("/check", authMiddleweare, UserController.check);


export default router;
