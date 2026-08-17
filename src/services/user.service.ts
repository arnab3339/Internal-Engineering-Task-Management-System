import { Prisma } from "../../generated/prisma/client.js";
import { SignupDto, UpdateUserDto } from "../dtos/user.dto.js";
import { IUserRepository } from "../repositories/user.repository.js";
import { SafeUser } from "../types/user.type.js";
import { ConflictError, ForbiddenError, NotfoundError } from "../utils/errors/app.error.js";
import { hashPassword } from "../utils/helpers/password.helper.js";
import { parseId } from "../utils/helpers/id.helper.js";

export interface IUserService {
  createUser(data: SignupDto): Promise<SafeUser>;
  updateUser(loggedInUserId: string, targetId: string, data: UpdateUserDto): Promise<SafeUser>;
}

export class UserService implements IUserService {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(data: SignupDto): Promise<SafeUser> {
    try {
      const existingUser = await this.userRepository.findByEmail(data.email);
      if (existingUser) {
        throw new ConflictError("Email already exists");
      }
      const passwordHash = await hashPassword(data.password);
      return await this.userRepository.create(data, passwordHash);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new ConflictError("A record with this value already exists");
      }
      throw error;
    }
  }

 async updateUser(loggedInUserId: string, targetId: string, data: UpdateUserDto): Promise<SafeUser> {
    const targetUserId = parseId(targetId);

    const targetUser = await this.userRepository.findById(targetUserId);

    if (!targetUser) {
      throw new NotfoundError("User not found");
    }

    if (loggedInUserId !== targetId) {
      throw new ForbiddenError("You are not allowed to update this profile");
    }

    const updateData: Prisma.UserUpdateInput = {};

    if (data.fullName !== undefined && data.fullName !== null) {
      updateData.fullName = data.fullName;
    }

    if (data.email !== undefined && data.email !== null) {
      updateData.email = data.email;
    }

    if (data.password !== undefined && data.password !== null) {
      updateData.passwordHash = await hashPassword(data.password);
    }

    try {
      return await this.userRepository.update(targetUserId, updateData);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new ConflictError("Email already in use");
      }
      throw error;
    }
  }
}