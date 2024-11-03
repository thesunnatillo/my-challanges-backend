import { Module } from '@nestjs/common';
import { UserFollowsService } from './user-follows.service';
import { UserFollowsController } from './user-follows.controller';

@Module({
  controllers: [UserFollowsController],
  providers: [UserFollowsService],
})
export class UserFollowsModule {}
