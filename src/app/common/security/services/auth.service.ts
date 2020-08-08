import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAccountResource } from 'src/app/api/user-accounts/resources/user-accounts.resource';
import { UserAccountEntity } from 'src/app/common/user-accounts/entities/user-account.entity';
import { UserAccountService } from 'src/app/common/user-accounts/services/user-account/user-account.service';

import { SecurityEntity } from '../entities/security.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserAccountService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<UserAccountResource> {
    const user = await this.usersService.findByEmail(username);
    if (user && user.getPassword() === pass) {
      return new UserAccountResource(user.getId(), user.getEmail());
    }
    return null;
  }

  async login(user: any): Promise<SecurityEntity> {
    const payload = { email: user.getEmail(), sub: user.getId() };
    return new SecurityEntity(true, this.jwtService.sign(payload));
  }
}
