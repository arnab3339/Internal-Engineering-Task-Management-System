import { SignInDto } from "../dtos/auth.dto.js";
import { IUserRepository } from "../repositories/user.repository.js";
import { BadRequestError } from "../utils/errors/app.error.js";
import { comparePassword } from "../utils/helpers/password.helper.js";
import { signToken } from "../utils/helpers/jwt.helper.js";
import { SafeUser } from "../types/user.type.js";

export interface IAuthService {
  signIn(data: SignInDto): Promise<{ token: string; user: SafeUser }>;
}

export class AuthService implements IAuthService {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async signIn(data: SignInDto): Promise<{ token: string; user: SafeUser }> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new BadRequestError("Invalid email or password");
    }

    const isPasswordValid = await comparePassword(data.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new BadRequestError("Invalid email or password");
    }

    const token = signToken({
      id: user.id.toString(),
      email: user.email,
      roleId: user.roleId.toString(),
    });

    const { passwordHash: _passwordHash, ...safeUser } = user;

    return {
      token,
      user: safeUser,
    };
  }
}