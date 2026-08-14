import { Prisma, User } from "../../generated/prisma/client.js";
import { SignupDto } from "../dtos/user.dto.js";
import { IUserRepository } from "../repositories/user.repository.js";
import { ConflictError } from "../utils/errors/app.error.js";
import { hashPassword } from "../utils/password.hash.js";

export interface IUserService {
  createUser(
    data: SignupDto
  ): Promise<Omit<User, "passwordHash">>;
}

export class UserService implements IUserService {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(
    data: SignupDto
  ): Promise<Omit<User, "passwordHash">> {
    try {
      const existingUser =
        await this.userRepository.findByEmail(
          data.email
        );

      if (existingUser) {
        throw new ConflictError(
          "Email already exists"
        );
      }

      const passwordHash =
        await hashPassword(data.password);

      const user =
        await this.userRepository.create(
          data,
          passwordHash
        );

      const {
        passwordHash: _passwordHash,
        ...userWithoutPassword
      } = user;

      return userWithoutPassword;
    } catch (error) {
      if (
        error instanceof
          Prisma.PrismaClientKnownRequestError &&
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