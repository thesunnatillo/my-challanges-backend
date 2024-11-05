import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ChallengesModule } from './modules/challanges/challanges.module';
import { PostsModule } from './modules/posts/posts.module';
import { AdminModule } from './modules/admin/admin.module';
import { UserFollowsModule } from './modules/user-follows/user-follows.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/entities/user.entity';
import { Challange } from './modules/challanges/entities/challange.entity';
import { Post } from './modules/posts/entities/post.entity';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    AuthModule,
    ChallengesModule,
    PostsModule,
    AdminModule,
    UsersModule,
    UserFollowsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [User, Challange, Post],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
