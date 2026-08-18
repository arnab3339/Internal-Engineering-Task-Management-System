import { Prisma, User } from "../../generated/prisma/client.js";
import { CreateUserDto } from "../dtos/user.dto.js";
import { prisma } from "../configs/db.config.js";
import { DEVELOPER } from "../contants/role.constant.js";
import { SafeUser, SafeUserWithRole, UserWithRole } from "../types/auth.type.js";

export interface IUserRepository {
  create(data: CreateUserDto, passwordHash: string): Promise<SafeUser>;

  findByEmail(email: string): Promise<UserWithRole | null>;

  findById(id: bigint): Promise<User | null>;

  getUserDetails(id: bigint): Promise<SafeUserWithRole | null>

  updatePassword(id: bigint, passwordHash: string): Promise<SafeUser>;

  updateUser(id: bigint, data: Prisma.UserUpdateInput): Promise<SafeUser>;

  getAllUsers(): Promise<SafeUser[]>;
}

export class UserRepository implements IUserRepository {
  async create(data: CreateUserDto, passwordHash: string): Promise<SafeUser> {
    return prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        passwordHash: passwordHash,
        role: {
            connect: {
              name: DEVELOPER,
            },
        },
      },
      omit: {
        passwordHash: true
      }
    });
  }

  async findByEmail(email: string): Promise<UserWithRole | null> {
      return prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          role: true
        }
      });
  }

  async findById(id: bigint): Promise<User | null> {
      return prisma.user.findUnique({
          where: {
              id,
          },
      });
  }

  async getUserDetails(id: bigint): Promise<SafeUserWithRole | null> {
    return prisma.user.findUnique({
      where: {
        id
      },
      include: {
        role: true
      },
      omit: {
        passwordHash: true
      }
    });
  }

  async updatePassword(id: bigint, passwordHash: string): Promise<SafeUser> {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        passwordHash,
      },
      omit: {
        passwordHash: true,
      },
    });
  }

  async updateUser(id: bigint, data: Prisma.UserUpdateInput): Promise<SafeUser> {
    return prisma.user.update({
      where: {
        id
      },
      data,
      omit: {
        passwordHash: true
      }
    });
  }

  async getAllUsers(): Promise<SafeUser[]> {
  return prisma.user.findMany({
    omit: {
      passwordHash: true,
    },
  });
}
}