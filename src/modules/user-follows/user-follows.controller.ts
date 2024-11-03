import { Controller } from '@nestjs/common';
import { UserFollowsService } from './user-follows.service';

@Controller('users-follows')
export class UserFollowsController {
  constructor(private readonly userFollowsService: UserFollowsService) {}
}
