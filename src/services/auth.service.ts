import { IUserRepository } from "../repositories/user.repository.js";

export interface IAuthService {
    signup(): Promise<void>
    signin(): Promise<void>
}

export class AuthService implements IAuthService {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async signup(): Promise<void> {
        
    }

    async signin(): Promise<void> {
        
    }
}