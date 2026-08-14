import { Router } from "express";
import { AuthController } from "../../controllers/auth.controller.js";
import { AuthService } from "../../services/auth.service.js";
import { UserRepository } from "../../repositories/user.repository.js";

const authController = new AuthController(
  new AuthService(
    new UserRepository()
  )
);

const authRouter = Router();

authRouter.post(
  "/signup",
  authController.signupHandler.bind(authController)
);

export default authRouter;