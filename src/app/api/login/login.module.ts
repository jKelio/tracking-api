import { Module } from '@nestjs/common';

import { LoginController } from './controllers/login.controller';
import { LoginResourceMapper } from './mappers/login-resource.mapper';

@Module({
  controllers: [LoginController],
  providers: [LoginResourceMapper],
})
export class LoginModule {}
