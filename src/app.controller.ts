import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/privet')
  hello(): string {
    return 'Privet mir';
  }
}
