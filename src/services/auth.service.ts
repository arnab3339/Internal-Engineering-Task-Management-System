import { SignInDto } from "../dtos/auth.dto.js";

import { IUserRepository } from "../repositories/user.repository.js";

import { BadRequestError } from "../utils/errors/app.error.js";
import { comparePassword } from "../utils/helpers/password.helper.js";

import { signToken } from "../utils/helpers/jwt.helper.js";

import { SafeUser, UserTokenPayload } from "../types/user.type.js";

export interface IAuthService {
    signIn(data: SignInDto): Promise<string>;

    getCurrentUser(
        user: UserTokenPayload
    ): Promise<SafeUser>;
}

export class AuthService implements IAuthService {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;

        this.signIn = this.signIn.bind(this);
        this.getCurrentUser = this.getCurrentUser.bind(this);
    }

    async signIn(data: SignInDto): Promise<string> {
        const user = await this.userRepository.findByEmail(data.email);

        if (!user) {
            throw new BadRequestError("Invalid email or password");
        }

        const isPasswordValid = await comparePassword(
            data.password,
            user.passwordHash
        );

        if (!isPasswordValid) {
            throw new BadRequestError("Invalid email or password");
        }

        const token = signToken({
            id: user.id.toString(),
            email: user.email,
            roleId: user.roleId.toString(),
        });

        return token;
    }

    async getCurrentUser(
        user: UserTokenPayload
    ): Promise<SafeUser> {
        const currentUser = await this.userRepository.findById(
            BigInt(user.id)
        );

        if (!currentUser) {
            throw new BadRequestError("User not found");
        }

        return currentUser;
    }
}