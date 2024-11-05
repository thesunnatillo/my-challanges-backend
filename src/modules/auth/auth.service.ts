import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ILogInData, ISignUpData } from './interfaces/auth.i';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import {
  LoginAlreadyUsed,
  LoginOrPasswordWrongException,
} from './exception/auth.exception';
import { BcryptHashing } from '../../lib/bcrypt/bcrypt.lib';
import { RedisService } from '../../lib/redis/redis.service';
import { LogInDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
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
    await this.redisService.set(`token_${savedUser.id}`, token);
    return {
      user: savedUser,
      token: token,
    };
  }

  async login(logInDto: LogInDto): Promise<ILogInData> {
    const user = await this.userRepo.findOne({
      where: { email: logInDto.email },
    });

    if (!user) {
      throw new LoginOrPasswordWrongException();
    }

    const matchPassword = await BcryptHashing.comparePassword(
      logInDto.password,
      user.password,
    );

    if (!matchPassword) {
      throw new LoginOrPasswordWrongException();
    }

    const token = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });
    await this.redisService.set(`token_${user.id}`, token);
    return {
      token: token,
    };
  }

  async logout(token: string) {
    try {
      const payload = await this.jwtService.verify(token);
      await this.redisService.del(`token_${payload.id}`);
      return {
        message: 'Log out',
      };
    } catch (e) {
      throw new UnauthorizedException('Do not allow');
    }
  }
}
