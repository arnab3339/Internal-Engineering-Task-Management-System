import { Router } from "express";

import { UserController } from "../../controllers/user.controller.js";
import { UserService } from "../../services/user.service.js";
import { UserRepository } from "../../repositories/user.repository.js";
import { validateRequestBody, validateRequestParams } from "../../middlewares/validate.middleware.js";
import { authenticateUser } from "../../middlewares/authentication.middleware.js";
import { createUserSchema, updateUserSchema, userIdSchema } from "../../dtos/user.dto.js";
import { authorizeUser } from "../../middlewares/authorization.middleware.js";
import { RoleName } from "../../types/role.type.js";

const userController = new UserController(new UserService(new UserRepository()));

const userRouter = Router();

userRouter.post(
    "/",
    authenticateUser,
    authorizeUser(RoleName.ADMIN), 
    validateRequestBody(createUserSchema), 
    userController.createUserHandler.bind(userController)
);

userRouter.patch(
    "/:id", 
    authenticateUser,
    validateRequestParams(userIdSchema), 
    validateRequestBody(updateUserSchema), 
    userController.updateUserHandler.bind(userController)
);

export default userRouter;