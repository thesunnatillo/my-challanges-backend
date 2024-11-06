import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challange.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Challange } from './entities/challange.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ChallengeI } from './interfaces/challenges.i';
import { UpdateChallengeDto } from './dto/update-challange.dto';
import { ChallangeNotFoundException } from './exception/challenge.exception';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challange)
    private readonly challengesRepo: Repository<Challange>,
    private readonly jwtService: JwtService,
  ) {}
  async create(
    createChallengeDto: CreateChallengeDto,
    token: string,
  ): Promise<ChallengeI> {
    try {
      const payload = await this.jwtService.verify(token);

      const newChallenge = {
        ...createChallengeDto,
        user: payload.id,
      };
      const savedChallenge = await this.challengesRepo.save(newChallenge);

      return {
        challenge: savedChallenge,
        message: 'Chellenj yaratildi',
      };
    } catch (err) {
      return err;
    }
  }

  async update(
    updateChallengeDto: UpdateChallengeDto,
    token: string,
    id: number,
  ): Promise<ChallengeI> {
    try {
      const payload = await this.jwtService.verify(token);
      const challenges = await this.challengesRepo.find({
        where: { user: payload.id },
      });

      let matchChallengeCount = 0;
      for (let i = 0; i < challenges.length; i++) {
        const challenge_id = challenges[i].id;
        if (id != challenge_id) {
          matchChallengeCount++;
        }
      }

      if (matchChallengeCount === challenges.length) {
        throw new UnauthorizedException('Bu sizning challenge emas!');
      }

      await this.challengesRepo.update(id, {
        ...updateChallengeDto,
      });
      return {
        message: 'Yangilandi!',
      };
    } catch (e) {
      return e;
    }
  }

  async delete(id: number, token: string) {
    try {
      // const challenge_find = await this.challengesRepo.find({
      //   where: { id: id },
      // });
      const payload = await this.jwtService.verify(token);
      const challenges = await this.challengesRepo.find({
        where: { user: payload.id },
      });

      let matchChallengeCount = 0;
      for (let i = 0; i < challenges.length; i++) {
        const challenge_id = challenges[i].id;
        if (id != challenge_id) {
          matchChallengeCount++;
        }
      }

      if (matchChallengeCount === challenges.length) {
        throw new ChallangeNotFoundException();
      }

      await this.challengesRepo.delete({ id: id });
      return {
        message: 'Challenge deleted!',
      };
    } catch (e) {
      return e;
    }
  }
}
