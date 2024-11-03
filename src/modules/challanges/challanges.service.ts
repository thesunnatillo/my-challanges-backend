import { Injectable } from '@nestjs/common';
import { CreateChallangeDto } from './dto/create-challange.dto';
import { UpdateChallangeDto } from './dto/update-challange.dto';

@Injectable()
export class ChallangesService {
  create(createChallangeDto: CreateChallangeDto) {
    return 'This action adds a new challange';
  }

  findAll() {
    return `This action returns all challanges`;
  }

  findOne(id: number) {
    return `This action returns a #${id} challange`;
  }

  update(id: number, updateChallangeDto: UpdateChallangeDto) {
    return `This action updates a #${id} challange`;
  }

  remove(id: number) {
    return `This action removes a #${id} challange`;
  }
}
