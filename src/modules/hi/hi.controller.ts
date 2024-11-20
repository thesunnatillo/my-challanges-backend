import { Controller, Get } from '@nestjs/common';
import { HiService } from './hi.service';

@Controller('hi')
export class HiController {
  constructor(private readonly hiService: HiService) {}

  @Get('f')
  hi() {
    return this.hiService.hi();
  }
}
