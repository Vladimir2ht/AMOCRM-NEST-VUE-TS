import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getLeads(@Query() query) {
    console.log(query);
    

    return this.appService.getLeads(query.q);
  }
}
