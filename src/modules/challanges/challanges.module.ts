import { Module } from '@nestjs/common';
import { ChallangesService } from './challanges.service';
import { ChallangesController } from './challanges.controller';

@Module({
  controllers: [ChallangesController],
  providers: [ChallangesService],
})
export class ChallangesModule {}
