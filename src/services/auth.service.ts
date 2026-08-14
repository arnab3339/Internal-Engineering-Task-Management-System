import bcrypt from "bcrypt";
import { IUserRepository } from "../repositories/user.repository.js";
import { SignupDto } from "../dtos/user.dto.js";
import {
  BadRequestError,
  ConflictError,
} from "../utils/errors/app.error.js";

export interface IAuthService {
  signup(data: SignupDto): Promise<void>;
}

export class AuthService implements IAuthService {

  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async signup(data: SignupDto): Promise<void> {

    const existingUser =
      await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new ConflictError(
        "A user with this email already exists"
      );
    }

    const passwordHash =
      await bcrypt.hash(data.password, 10);

    await this.userRepository.create(
      data,
      passwordHash
    );
  }
}