import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Challange } from '../challanges/entities/challange.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Challange])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
