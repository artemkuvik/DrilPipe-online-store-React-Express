import { Router } from "express";
const router = new Router();
import categoriesController from "../controllers/categoriesController.js";

router.get("/", categoriesController.getAll);

export default router;