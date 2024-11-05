import { HttpException, HttpStatus } from '@nestjs/common';

export class ChallangeNotFoundException extends HttpException {
  constructor() {
    super('Challenge not found', HttpStatus.NOT_FOUND);
  }
}