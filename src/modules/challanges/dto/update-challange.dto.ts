import { PartialType } from '@nestjs/mapped-types';
import { CreateChallengeDto } from './create-challange.dto';

export class UpdateChallengeDto extends PartialType(CreateChallengeDto) {}
