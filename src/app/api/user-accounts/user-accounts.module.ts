import { Module } from '@nestjs/common';

import { UserAccountsController } from './controllers/user-accounts.controller';
import { UserAccountsResourceMapper } from './mappers/user-accounts-resource.mapper';

@Module({
  controllers: [UserAccountsController],
  providers: [UserAccountsResourceMapper],
})
export class UserAccountsModule {}
