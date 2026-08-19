import { SignInDto, UpdatePasswordDto } from "../dtos/auth.dto.js";
import { IUserRepository } from "../repositories/user.repository.js";
import { BadRequestError, NotfoundError } from "../utils/errors/app.error.js";
import { comparePassword, hashPassword } from "../utils/helpers/password.helper.js";
import { signToken } from "../utils/helpers/jwt.helper.js";
import { AuthUser, SafeUserWithRole, UserWithRole } from "../types/auth.type.js";

export interface IAuthService {
  signIn(data: SignInDto): Promise<string>;
  getCurrentUserDetils(user: AuthUser): Promise<SafeUserWithRole>;
  updatePassword(user: AuthUser, data: UpdatePasswordDto): Promise<void>;
  logout(): Promise<void>;
}

export class AuthService implements IAuthService {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async signIn(data: SignInDto): Promise<string> {
        const user: UserWithRole | null = await this.userRepository.findByEmail(data.email);

        if (!user) {
            throw new BadRequestError("User not exist");
        }

        const isPasswordValid = await comparePassword(
            data.password,
            user.passwordHash
        );

        if (!isPasswordValid) {
            throw new BadRequestError("Invalid password");
        }

        const token: string = signToken({
          userId: user.id.toString(),
          role: user.role.name
        });

        return token;
    }

    async getCurrentUserDetils(user: AuthUser): Promise<SafeUserWithRole> {
      const currentUser = await this.userRepository.getUserDetails(user.userId);

      if (!currentUser) {
          throw new BadRequestError("User not found");
      }

      return currentUser;
    }


    async updatePassword(user: AuthUser, data: UpdatePasswordDto): Promise<void> {
      const existingUser = await this.userRepository.findById(user.userId);

      if(!existingUser) {
        throw new NotfoundError("User not found");
      }

      const isOldPasswordValid: boolean = await comparePassword(
        data.oldPassword,
        existingUser.passwordHash
      );

      if(!isOldPasswordValid) {
        throw new BadRequestError("Old password is incorrect");
      }

      const passwordHash: string = await hashPassword(data.newPassword);

      await this.userRepository.updatePassword(
        user.userId,
        passwordHash
      );
    }
     async logout(): Promise<void> {}
}