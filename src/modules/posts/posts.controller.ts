import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Req,
  UploadedFile,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Query('challenge_id') challenge_id: number,
    @Body() createPostDto: CreatePostDto,
    @Req() req: Request,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const token = req.headers.authorization.split(' ')[1];
    return this.postsService.create(createPostDto, challenge_id, token, file);
  }

  @Patch('update')
  update(
    @Query('challenge_id') challenge_id: number,
    @Query('post_id') post_id: number,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: Request,
  ) {
    const token = req.headers.authorization.split(' ')[1];
    return this.postsService.update(
      updatePostDto,
      challenge_id,
      post_id,
      token,
    );
  }

  @Delete('delete')
  delete(
    @Query('challenge_id') challenge_id: number,
    @Query('post_id') post_id: number,
    @Req() req: Request,
  ) {
    const token = req.headers.authorization.split(' ')[1];
    return this.postsService.delete(challenge_id, post_id, token);
  }
}
