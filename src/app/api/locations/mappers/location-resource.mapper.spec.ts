import { Test, TestingModule } from '@nestjs/testing';
import { LocationResourceMapper } from './location-resource.mapper';

describe('LocationResourceMapper', () => {
  let provider: LocationResourceMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationResourceMapper],
    }).compile();

    provider = module.get<LocationResourceMapper>(LocationResourceMapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
