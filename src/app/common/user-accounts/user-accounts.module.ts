import { Global, Module } from '@nestjs/common';

import { UserAccountService } from './services/user-account/user-account.service';

@Global()
@Module({
  providers: [
    UserAccountService,
  ],
  exports: [
    UserAccountService,
  ]
})
export class UserAccountsModule { }
