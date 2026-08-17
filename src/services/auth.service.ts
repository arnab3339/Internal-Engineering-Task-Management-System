import { SignInDto } from "../dtos/auth.dto.js";
import { IUserRepository } from "../repositories/user.repository.js";
import { SafeUser } from "../types/user.type.js";
import { UnauthorizedError } from "../utils/errors/app.error.js";
import { comparePassword } from "../utils/helpers/password.helper.js";
import { signToken } from "../utils/helpers/jwt.helper.js";

export interface SignInResult {
  token: string;
  user: SafeUser;
}

export interface IAuthService {
  signIn(data: SignInDto): Promise<SignInResult>;
}

export class AuthService implements IAuthService {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async signIn(data: SignInDto): Promise<SignInResult> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isPasswordValid = await comparePassword(data.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const token = signToken({
      id: user.id.toString(),
      roleId: user.roleId.toString(),
    });

    const { passwordHash, ...safeUser } = user;

    return {
      token,
      user: safeUser as SafeUser,
    };
  }
}