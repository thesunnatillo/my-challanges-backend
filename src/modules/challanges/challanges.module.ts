import { Module } from '@nestjs/common';
import { ChallengesService } from './challanges.service';
import { ChallengesController } from './challanges.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challange } from './entities/challange.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Challange])],
  controllers: [ChallengesController],
  providers: [ChallengesService],
})
export class ChallengesModule {}
