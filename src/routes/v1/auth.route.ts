import { Router } from "express";

import { AuthController } from "../../controllers/auth.controller.js";
import { AuthService } from "../../services/auth.service.js";
import { UserRepository } from "../../repositories/user.repository.js";

import { validateBody } from "../../middlewares/validate.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

import { signInSchema } from "../../dtos/auth.dto.js";

const authRouter = Router();

const userRepository = new UserRepository();

const authService = new AuthService(userRepository);

const authController = new AuthController(authService);

authRouter.post(
    "/signin",
    validateBody(signInSchema),
    authController.signInHandler
);

authRouter.get(
    "/me",
    authMiddleware,
    authController.getCurrentUser
);

export default authRouter;