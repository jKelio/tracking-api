import { Injectable } from '@nestjs/common';
import { UserAccountEntity } from 'src/app/common/user-accounts/entities/user-account.entity';

import { UserAccountResource } from '../resources/user-accounts.resource';

@Injectable()
export class UserAccountsResourceMapper {
  public toResources(entities: UserAccountEntity[]): UserAccountResource[] {
    return entities.map(this.toResource.bind(this));
  }

  public toResource(entity: UserAccountEntity): UserAccountResource {
    return new UserAccountResource(entity.getId(), entity.getEmail());
  }
}
