import { PartialType } from '@nestjs/mapped-types';
import { CreateChallangeDto } from './create-challange.dto';

export class UpdateChallangeDto extends PartialType(CreateChallangeDto) {}
