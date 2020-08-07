import { Global, Module } from '@nestjs/common';

import { AppConfigModule } from './config/app-config.module';
import { SecurityModule } from './security/security.module';

@Global()
@Module({
    imports: [
        AppConfigModule,
        SecurityModule,
    ],
    exports: [
        AppConfigModule,
        SecurityModule,
    ],
})
export class CommonModule { }
