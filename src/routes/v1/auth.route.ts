import { Router } from "express";
import { AuthController } from "../../controllers/auth.controller.js";
import { AuthService } from "../../services/auth.service.js";
import { UserRepository } from "../../repositories/user.repository.js";

// const userRepository = new UserRepository();
// const authService = new AuthService(userRepository);
// const authController = new AuthController(authService);

const authController = new AuthController(new AuthService(new UserRepository));

const authRouter = Router();

authRouter.post('/signup', authController.signupHandler);

authRouter.post('/signin', authController.signinHandler);

export default authRouter;