import { Module } from '@nestjs/common';

import { FriendsModule } from './friends/friends.module';
import { LocationsModule } from './locations/locations.module';
import { LoginModule } from './login/login.module';
import { UserAccountsModule } from './user-accounts/user-accounts.module';

@Module({
  imports: [LoginModule, UserAccountsModule, LocationsModule, FriendsModule],
})
export class ApiModule { }
