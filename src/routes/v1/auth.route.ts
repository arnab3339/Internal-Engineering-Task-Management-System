import { Router } from "express";
import { AuthController } from "../../controllers/auth.controller.js";
import { AuthService } from "../../services/auth.service.js";
import { UserRepository } from "../../repositories/user.repository.js";
import { validateBody } from "../../middlewares/validate.middleware.js";
import { signInSchema, updatePasswordSchema } from "../../dtos/auth.dto.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const authController = new AuthController(
    new AuthService(
        new UserRepository()
    )
);

const authRouter = Router();

authRouter.post(
    "/signin",
    validateBody(signInSchema),
    authController.signInHandler.bind(authController)
);

authRouter.get(
    "/me",
    authMiddleware,
    authController.getCurrentUser.bind(authController)
authRouter.patch(
    "/update-password",
    authenticate,
    validateBody(updatePasswordSchema),
    authController.updatePasswordHandler.bind(authController)
);

export default authRouter;