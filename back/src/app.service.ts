import { Inject, Injectable } from '@nestjs/common';
import { AmoCRMService } from './amocrm/amocrm.service';

@Injectable()
export class AppService {
  
  constructor(
    @Inject(AmoCRMService) private readonly CRMService: AmoCRMService,
  ) {}

  async getLeads(query) {
    let it: any = await this.CRMService.getLeads(query);
    // it = it.data._embedded
    console.log('+');
    // return "Hornet";

    return JSON.stringify(it);
  }
}
