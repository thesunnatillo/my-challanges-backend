import { Injectable } from '@nestjs/common';

@Injectable()
export class HiService {
  hi() {
    return { message: `Hello, cinnamors` };
  }
}
