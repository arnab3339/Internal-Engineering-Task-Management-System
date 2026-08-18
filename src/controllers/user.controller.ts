import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";
import { AuthenticatedRequest } from "../types/express.js";
import { SafeUser } from "../types/auth.type.js";

export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async createUserHandler(req: Request, res: Response) {
    const user: SafeUser = await this.userService.createUser(req.body);
    sendSuccess(res, user, 201, 'User Created Successfully');
  }

  async updateUserHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req as AuthenticatedRequest;

      const loggedInUserId = user.userId;
      const targetUserId = req.params.id as string;

      const updatedUser: SafeUser = await this.userService.updateUser(loggedInUserId, BigInt(targetUserId), req.body);

      sendSuccess(res, updatedUser, 200, 'User updated successfully');
    } catch (error) {
      next(error);
    }
  }


  async getAllUsersHandler(_req: Request, res: Response, next: NextFunction) {
  try {
    const users: SafeUser[] = await this.userService.getAllUsers();

    sendSuccess(res, users, 200, "Users fetched successfully");
  } catch (error) {
    next(error);
  }
}
}