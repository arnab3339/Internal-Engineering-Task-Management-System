import {
  Request,
  Response,
  NextFunction,
} from "express";

import { IAuthService } from "../services/auth.service.js";

export class AuthController {

  private readonly authService: IAuthService;

  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  async signupHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      await this.authService.signup(req.body);

      res.status(201).json({
        success: true,
        message: "User registered successfully",
      });

    } catch (error) {

      next(error);
    }
  }
}