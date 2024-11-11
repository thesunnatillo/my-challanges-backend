import {
  Controller,
  Post,
  Body,
  Req,
  UseInterceptors,
  UploadedFile, Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('me')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('update')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const token = req.headers.authorization.split(' ')[1];
    return this.usersService.update(updateUserDto, token, file);
  }
}
