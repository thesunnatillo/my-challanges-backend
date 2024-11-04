import { Injectable } from '@nestjs/common';
import { CreateChallangeDto } from './dto/create-challange.dto';
import { UpdateChallangeDto } from './dto/update-challange.dto';

@Injectable()
export class ChallangesService {
  create(createChallangeDto: CreateChallangeDto) {
    return createChallangeDto;
  }

  findAll() {
    return `This action returns all challanges`;
  }

  findOne(id: number) {
    return `This action returns a #${id} challange`;
  }

  update(id: number, updateChallangeDto: UpdateChallangeDto) {
    return updateChallangeDto;
  }

  remove(id: number) {
    return `This action removes a #${id} challange`;
  }
}
