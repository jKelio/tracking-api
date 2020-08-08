import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserAccountsModule } from 'src/app/common/user-accounts/user-accounts.module';

import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PassportModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          defaultStrategy: config.get<string>('passport.defaultstrategy'),
        };
      },
      inject: [ConfigService]
    }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('jwt.secret'),
          signOptions: { expiresIn: '8h' },
        }
      },
      inject: [ConfigService]
    }),
    UserAccountsModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [
    AuthService,
  ],
})
export class SecurityModule { }
