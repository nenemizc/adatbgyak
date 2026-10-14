import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }

  @Get('festmenyek')
  @Render('festmenyek')
  async getFestmenyek(@Query('minev') minev:string = '0'){
    return {db: await this.appService.festmenyekDb(), festmenyek: await this.appService.festmenyLista(parseInt(minev))};
  }
}
