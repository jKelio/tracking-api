import { Test, TestingModule } from '@nestjs/testing';
import { UserAccountsResourceMapper } from './user-accounts-resource.mapper';

describe('UserAccountsResourceMapper', () => {
  let provider: UserAccountsResourceMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAccountsResourceMapper],
    }).compile();

    provider = module.get<UserAccountsResourceMapper>(
      UserAccountsResourceMapper,
    );
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
