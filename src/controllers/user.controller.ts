import { Request, Response } from "express";
import { UserService } from "../services/user.service.js";

export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async signupHandler(req: Request, res: Response) {
    const user = await this.userService.signup(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        ...user,
        id: user.id.toString(),
        roleId: user.roleId.toString(),
      },
    });
  }
}