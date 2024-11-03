import { Test, TestingModule } from '@nestjs/testing';
import { UserFollowsService } from './user-follows.service';

describe('UserFollowsService', () => {
  let service: UserFollowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFollowsService],
    }).compile();

    service = module.get<UserFollowsService>(UserFollowsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
