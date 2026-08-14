import { Router } from "express";
import authRouter from "./auth.route.js";
import roleRouter from "./role.route.js";

const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/roles", roleRouter);

export default v1Router;