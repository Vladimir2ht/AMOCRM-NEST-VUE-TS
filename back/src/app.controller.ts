import { Controller, Get, Query, Res, Headers } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getLeads(@Query() query) {
    return this.appService.getLeads(query.q);
  }
}
