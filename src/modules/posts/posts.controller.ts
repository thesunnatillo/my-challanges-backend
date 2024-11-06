import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Req,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

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
    // console.log('controller running...')
    return this.postsService.create(createPostDto, challenge_id, token, file);
  }
}
