import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ISignUpData } from './interfaces/auth.i';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginAlreadyUsed } from './exception/auth.exception';
import { BcryptHashing } from '../../lib/bcrypt/bcrypt.lib';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async signup(createAuthDto: CreateAuthDto): Promise<ISignUpData> {
    const user = await this.userRepo.findOne({
      where: { email: createAuthDto.email },
    });

    if (user) {
      throw new LoginAlreadyUsed();
    }

    const newUser = {
      ...createAuthDto,
      password: await BcryptHashing.hashPassword(createAuthDto.password),
    };
    const savedUser = await this.userRepo.save(newUser);
    const token = await this.jwtService.signAsync({
      id: savedUser.id,
      email: savedUser.email,
    });
    return {
      user: savedUser,
      token: token,
    };
  }
}
