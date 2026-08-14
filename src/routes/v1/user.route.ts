import { Router } from "express";

import { UserController } from "../../controllers/user.controller.js";
import { UserService } from "../../services/user.service.js";
import { UserRepository } from "../../repositories/user.repository.js";
import { validateBody } from "../../middlewares/validate.middleware.js";
import { createUserSchema } from "../../dtos/user.dto.js";

const userRouter = Router();

const userRepository = new UserRepository();

const userService = new UserService(
  userRepository
);

const userController = new UserController(
  userService
);

userRouter.post(
  "/",
  validateBody(createUserSchema),
  userController.createUserHandler.bind(
    userController
  )
);

export default userRouter;