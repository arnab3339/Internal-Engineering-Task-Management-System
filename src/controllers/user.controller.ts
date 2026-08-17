import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";
import { UnauthorizedError } from "../utils/errors/app.error.js";

export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async createUserHandler(req: Request, res: Response) {
    const user = await this.userService.createUser(req.body);
    sendSuccess(res, user, 201, 'User Created Successfully');
  }

  async updateUserHandler(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new UnauthorizedError("Please sign in first");
      }

      const loggedInUserId = req.user.id;
      const targetId = req.params.id as string;

      const updatedUser = await this.userService.updateUser(loggedInUserId, targetId, req.body);

      sendSuccess(res, updatedUser, 200, 'User updated successfully');
    } catch (error) {
      next(error);
    }
}
}