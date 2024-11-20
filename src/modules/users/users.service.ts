import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { join } from 'path';
import { writeFileSync } from 'fs';
import { UserI } from './interfaces/user.i';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async update(
    updateUserDto: UpdateUserDto,
    token: string,
    file?: Express.Multer.File,
  ): Promise<UserI> {
    try {
      console.log(file);
      const payload = this.jwtService.verify(token);
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
      console.log(filePath);
      const jj = await this.userRepo.update(payload.id, {
        ...updateUserDto,
        profile_pic: filePath,
      });
      console.log(jj);
      return {
        message: 'Updated successfully',
      };
    } catch (e) {
      return e;
    }
  }
}
