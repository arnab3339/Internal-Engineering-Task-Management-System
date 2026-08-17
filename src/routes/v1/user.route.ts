import { Router } from "express";
import { UserController } from "../../controllers/user.controller.js";
import { UserService } from "../../services/user.service.js";
import { UserRepository } from "../../repositories/user.repository.js";
import { validateBody } from "../../middlewares/validate.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { createUserSchema, updateUserSchema } from "../../dtos/user.dto.js";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const userRouter = Router();

userRouter.post('/', validateBody(createUserSchema), userController.createUserHandler.bind(userController));

userRouter.patch('/:id', authMiddleware, validateBody(updateUserSchema), userController.updateUserHandler.bind(userController));

export default userRouter;