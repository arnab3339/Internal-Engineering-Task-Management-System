import { Request, Response } from "express";
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
}