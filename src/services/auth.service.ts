import { IUserRepository } from "../repositories/user.repository.js";

export interface IAuthService {
    signup(): void
    signin(): void
}

export class AuthService implements IAuthService {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    signup(): void {
        
    }

    signin(): void {
        
    }
}