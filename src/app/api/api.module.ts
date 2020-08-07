import { Module } from '@nestjs/common';

import { LoginModule } from './login/login.module';
import { UserAccountsModule } from './user-accounts/user-accounts.module';

@Module({
  imports: [
    LoginModule,
    UserAccountsModule,
  ],
})
export class ApiModule { }
