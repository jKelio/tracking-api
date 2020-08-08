import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as generateUniqueUniversallyIdentifier } from 'uuid';

import { UserAccountEntity } from '../../entities/user-account.entity';

@Injectable()
export class UserAccountService {

    private users: UserAccountEntity[];

    constructor() {
        this.users = [
            new UserAccountEntity(generateUniqueUniversallyIdentifier(), 'mani', 'test'),
            new UserAccountEntity(generateUniqueUniversallyIdentifier(), 'leon', 'test'),
            new UserAccountEntity("test-id", 'testuser', 'test'),
        ];
    }

    public async create(email: string, password: string): Promise<void> {
        const foundUser = await this.findByEmail(email);
        if (foundUser) {
            throw new ConflictException("user could not be created");
        }
        this.users.push(new UserAccountEntity(generateUniqueUniversallyIdentifier(), email, password));
    }

    public async findByEmail(email: string): Promise<UserAccountEntity> {
        return this.users.find(user => user.getEmail() === email);
    }

    public async findById(id: string): Promise<UserAccountEntity> {
        return this.users.find(user => user.getId() === id);
    }

    public async getUsers(): Promise<UserAccountEntity[]> {
        return this.users;
    }

    public async changePassword(
        id: string,
        currentPassword: string,
        newPassword: string,
    ): Promise<void> {
        const entity = await this.findById(id);

        if (!entity) {
            throw new NotFoundException();
        }

        if (entity.getPassword() != currentPassword) {
            throw new ForbiddenException();
        }

        if (entity.getPassword() === newPassword) {
            throw new BadRequestException("old password could not be changed");
        }

        entity.setPassword(newPassword)
    }

    public async deleteUser(id: string): Promise<void> {
        this.users = this.users.filter(user => user.getId() != id);
    }

}
