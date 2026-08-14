import { Prisma, User } from "../../generated/prisma/client.js";
import { SignupDto } from "../dtos/user.dto.js";
import { IUserRepository } from "../repositories/user.repository.js";
import { ConflictError } from "../utils/errors/app.error.js";
import bcrypt from "bcrypt";

export interface IUserService {
  createUser(data: SignupDto): Promise<User>;
}

export class UserService implements IUserService {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(data: SignupDto): Promise<User> {
    try {
      const existingUser = await this.userRepository.findByEmail(
        data.email
      );

      if (existingUser) {
        throw new ConflictError("Email already exists");
      }

      const passwordHash = await bcrypt.hash(data.password, 10);

      return await this.userRepository.create(data, passwordHash);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ConflictError(
          "A record with this value already exists"
        );
      }

      throw error;
    }
  }
}