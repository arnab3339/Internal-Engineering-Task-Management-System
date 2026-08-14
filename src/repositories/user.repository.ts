import { User } from "../generated/prisma/client.js";
import { SignupDto } from "../dtos/user.dto.js";
import { prisma } from "../configs/db.config.js";

export interface IUserRepository {
  create(
    data: SignupDto,
    passwordHash: string
  ): Promise<User>;

  findByEmail(
    email: string
  ): Promise<User | null>;
}

export class UserRepository implements IUserRepository {

async create(
  data: SignupDto,
  passwordHash: string
): Promise<User> {
  return prisma.user.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      passwordHash: passwordHash,

      role: {
        connect: {
          name: "Developer",
        },
      },
    },
  });
}

  async findByEmail(
    email: string
  ): Promise<User | null> {

    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}