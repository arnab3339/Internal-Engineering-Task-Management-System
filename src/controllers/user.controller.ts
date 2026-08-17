import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";

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
      const loggedInUserId = req.user!.id;
      const targetId = req.params.id;

      const updatedUser = await this.userService.updateUser(loggedInUserId, targetId, req.body);

      sendSuccess(res, updatedUser, 200, 'User updated successfully');
    } catch (error) {
      next(error);
    }
  }
}