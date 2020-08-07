import { Test, TestingModule } from '@nestjs/testing';
import { LoginResourceMapper } from './login-resource.mapper';

describe('LoginResourceMapper', () => {
  let provider: LoginResourceMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginResourceMapper],
    }).compile();

    provider = module.get<LoginResourceMapper>(LoginResourceMapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
