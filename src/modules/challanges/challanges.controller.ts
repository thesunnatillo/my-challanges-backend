import {
  Controller,
  Post,
  Body,
  Req,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChallengesService } from './challanges.service';
import { CreateChallengeDto } from './dto/create-challange.dto';
import { Request } from 'express';
import { UpdateChallengeDto } from './dto/update-challange.dto';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post('create')
  create(@Body() createChallengeDto: CreateChallengeDto, @Req() req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    return this.challengesService.create(createChallengeDto, token);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: number,
    @Body() updateChallengeDto: UpdateChallengeDto,
    @Req() req: Request,
  ) {
    const token = req.headers.authorization.split(' ')[1];
    return this.challengesService.update(updateChallengeDto, token, id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: number, @Req() req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    return this.challengesService.delete(id, token);
  }
}
