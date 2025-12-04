import { Router } from "express";
import productsRouter from "./productsRouter.js";
import usersRouter from "./usersRouter.js";
import servicesRouter from "./servicesRouter.js";
import feedbackRouter from "./feedbackRouter.js";
import categoriesRouter from "./categoriesRouter.js";
import applicationsRouter from "./applicationsRouter.js"
import cartRouter from "./cartRouter.js";
import ordersRouter from "./orderRouter.js";

const router = new Router();

router.use("/feedback", feedbackRouter);
router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/services", servicesRouter);
router.use("/categories", categoriesRouter);
router.use("/applications", applicationsRouter)
router.use("/cart", cartRouter)
router.use("/orders", ordersRouter)

export default router;
