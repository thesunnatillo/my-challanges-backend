import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChallangesService } from './challanges.service';
import { CreateChallangeDto } from './dto/create-challange.dto';
import { UpdateChallangeDto } from './dto/update-challange.dto';

@Controller('challanges')
export class ChallangesController {
  constructor(private readonly challangesService: ChallangesService) {}

  @Post()
  create(@Body() createChallangeDto: CreateChallangeDto) {
    return this.challangesService.create(createChallangeDto);
  }

  @Get()
  findAll() {
    return this.challangesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challangesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChallangeDto: UpdateChallangeDto,
  ) {
    return this.challangesService.update(+id, updateChallangeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.challangesService.remove(+id);
  }
}
