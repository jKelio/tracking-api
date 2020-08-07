import { Injectable } from '@nestjs/common';
import { SecurityEntity } from 'src/app/common/security/entities/security.entity';

import { LoginResource } from '../resources/login.resource';

@Injectable()
export class LoginResourceMapper {

    public toResource(entity: SecurityEntity): LoginResource {
        return new LoginResource(entity.isSuccessfull(), entity.getAccessToken());
    }
}
