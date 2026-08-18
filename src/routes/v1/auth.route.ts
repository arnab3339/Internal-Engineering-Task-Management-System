import { Router } from "express";
import { AuthController } from "../../controllers/auth.controller.js";
import { AuthService } from "../../services/auth.service.js";
import { UserRepository } from "../../repositories/user.repository.js";
import { validateRequestBody } from "../../middlewares/validate.middleware.js";
import { signInSchema, updatePasswordSchema } from "../../dtos/auth.dto.js";
import { authenticateUser } from "../../middlewares/authentication.middleware.js";

const authController = new AuthController(new AuthService(new UserRepository()));

const authRouter = Router();

authRouter.post(
    "/signin",
    validateRequestBody(signInSchema),
    authController.signInHandler.bind(authController)
);

authRouter.get(
    "/me",
    authenticateUser,
    authController.getCurrentUser.bind(authController)
);

authRouter.patch(
    "/update-password",
    authenticateUser,
    validateRequestBody(updatePasswordSchema),
    authController.updatePasswordHandler.bind(authController)
);

export default authRouter;