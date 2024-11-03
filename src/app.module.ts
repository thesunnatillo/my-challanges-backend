import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ChallangesModule } from './modules/challanges/challanges.module';
import { PostsModule } from './modules/posts/posts.module';
import { AdminModule } from './modules/admin/admin.module';
import { UserFollowsModule } from './modules/user-follows/user-follows.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    AuthModule,
    ChallangesModule,
    PostsModule,
    AdminModule,
    UsersModule,
    UserFollowsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
