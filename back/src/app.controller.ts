import { Controller, Get, Query, Res, Headers } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getLeads(@Query() query) {
  // getLeads(@Res() res, @Headers() headers, @Query() query) {
    console.log(query);
    // res.setHeader('Access-Control-Allow-Origin', headers.origin || '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET');
    // res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');    
    // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');    

    return this.appService.getLeads(query.q);
    // return res.json( this.appService.getLeads(query.q));
  }
}
