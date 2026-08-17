import {
    SignInDto,
    UpdatePasswordDto
} from "../dtos/auth.dto.js";
import { IUserRepository } from "../repositories/user.repository.js";
import {
    BadRequestError,
    UnauthorizedError
} from "../utils/errors/app.error.js";
import {
    comparePassword,
    hashPassword
} from "../utils/helpers/password.helper.js";
import { signToken } from "../utils/helpers/jwt.helper.js";
import { UserTokenPayload } from "../types/user.type.js";

export interface IAuthService {
    signIn(data: SignInDto): Promise<string>;

    updatePassword(
        user: UserTokenPayload,
        data: UpdatePasswordDto
    ): Promise<void>;
}

export class AuthService implements IAuthService {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
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

    async updatePassword(
        user: UserTokenPayload,
        data: UpdatePasswordDto
    ): Promise<void> {
        const userId = BigInt(user.id);

        const existingUser = await this.userRepository.findById(userId);

        if (!existingUser) {
            throw new UnauthorizedError("User not found");
        }

        const isOldPasswordValid = await comparePassword(
            data.oldPassword,
            existingUser.passwordHash
        );

        if (!isOldPasswordValid) {
            throw new BadRequestError("Old password is incorrect");
        }

        const isSamePassword = await comparePassword(
            data.newPassword,
            existingUser.passwordHash
        );

        if (isSamePassword) {
            throw new BadRequestError(
                "New password must be different from old password"
            );
        }

        const passwordHash = await hashPassword(data.newPassword);

        await this.userRepository.updatePassword(
            userId,
            passwordHash
        );
    }
}