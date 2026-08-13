export interface IUserRepository {
    create(): Promise<void>
    find(): Promise<void>
    findAll(): Promise<void>
    update(): Promise<void>
    delete(): Promise<void>
}

export class UserRepository implements IUserRepository {
    async create(): Promise<void> {
        
    }

    async find(): Promise<void> {
        
    }

    async findAll(): Promise<void> {
        
    }

    async update(): Promise<void> {
        
    }

    async delete(): Promise<void> {
        
    }
}