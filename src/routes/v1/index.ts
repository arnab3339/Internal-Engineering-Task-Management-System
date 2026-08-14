import { Router } from "express";
import authRouter from "./auth.route.js";
import roleRouter from "./role.route.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/roles", roleRouter);

export default router;