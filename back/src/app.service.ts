import { Inject, Injectable } from '@nestjs/common';
import { AmoCRMService } from './amocrm/amocrm.service';

@Injectable()
export class AppService {
  
  constructor(
    @Inject(AmoCRMService) private readonly CRMService: AmoCRMService,
  ) {}

  async getLeads() {
    const it = await this.CRMService.getLeads('')
    console.log('+', it);
    // return "Hornet";

    return it;
  }
}
