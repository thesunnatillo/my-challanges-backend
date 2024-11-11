import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { join } from 'path';
import { writeFileSync } from 'fs';
import { Challange } from '../challanges/entities/challange.entity';
import { PostI } from './interfaces/post.i';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
    @InjectRepository(Challange)
    private readonly challengesRepo: Repository<Challange>,
    private readonly jwtService: JwtService,
  ) {}
  async create(
    createPostDto: CreatePostDto,
    challenge_id: number,
    token: string,
    file?: Express.Multer.File,
  ): Promise<PostI> {
    try {
      const payload = await this.jwtService.verify(token);
      let filePath: string;
      if (!file) {
        filePath = null;
      } else {
        filePath = join(
          __dirname,
          '..',
          '..',
          '..',
          '..',
          'uploads',
          file.originalname,
        );
        writeFileSync(filePath, file.buffer);
      }

      /////////////////////////////////////////////////////////////
      const challenges = await this.challengesRepo.find({
        where: { user: { id: payload.id } },
      });
      let matchChallengeCount = 0;
      for (let i = 0; i < challenges.length; i++) {
        const challengeId = challenges[i].id;
        if (challenge_id != challengeId) {
          matchChallengeCount++;
        }
      }
      if (matchChallengeCount === challenges.length) {
        throw new UnauthorizedException('Bu sizning challenge emas!');
      }
      //////////////////////////////////////////////////////////
      const challenge = await this.challengesRepo.findOne({
        where: { id: challenge_id },
      });

      const newPost = this.postRepo.create({
        ...createPostDto,
        media_path: filePath,
        challange: challenge,
      });

      const savedPost = await this.postRepo.save(newPost);
      return {
        post: savedPost,
        message: 'Saved Post',
      };
    } catch (e) {
      return e;
    }
  }

  async update(
    updatePostDto: UpdatePostDto,
    challenge_id: number,
    post_id: number,
    token: string,
  ): Promise<PostI> {
    try {
      const payload = await this.jwtService.verify(token);
      /////////////////////////////////////////////////////////////
      const challenges = await this.challengesRepo.find({
        where: { user: { id: payload.id } },
      });
      console.log(challenges);
      let matchChallengeCount = 0;
      for (let i = 0; i < challenges.length; i++) {
        const challengeId = challenges[i].id;
        if (challenge_id != challengeId) {
          matchChallengeCount++;
        }
      }
      if (matchChallengeCount === challenges.length) {
        throw new UnauthorizedException('Bu sizing challenge ems!');
      }
      //////////////////////////////////////////////////////////
      const post = await this.postRepo.findOne({ where: { id: post_id } });
      if (!post) {
        return { message: '[404] Post topilmadi!' };
      }
      await this.postRepo.update(post_id, {
        ...updatePostDto,
      });
      return {
        message: 'Post updated',
      };
    } catch (e) {
      return e;
    }
  }

  async delete(
    challenge_id: number,
    post_id: number,
    token: string,
  ): Promise<PostI> {
    try {
      const payload = await this.jwtService.verify(token);
      /////////////////////////////////////////////////////////////
      const challenges = await this.challengesRepo.find({
        where: { user: { id: payload.id } },
      });
      console.log(challenges);
      let matchChallengeCount = 0;
      for (let i = 0; i < challenges.length; i++) {
        const challengeId = challenges[i].id;
        if (challenge_id != challengeId) {
          matchChallengeCount++;
        }
      }
      if (matchChallengeCount === challenges.length) {
        throw new UnauthorizedException('Bu sizing challenge ems!');
      }
      //////////////////////////////////////////////////////////
      const post = await this.postRepo.findOne({ where: { id: post_id } });
      if (!post) {
        return { message: '[404] Post topilmadi! ' };
      }

      await this.postRepo.remove(post);
      return {
        message: 'Post deleted!',
      };
    } catch (e) {
      return e;
    }
  }
}
