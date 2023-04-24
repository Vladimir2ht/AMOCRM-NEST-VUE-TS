import { Inject, Injectable } from '@nestjs/common';
import { AmoCRMService } from './amocrm/amocrm.service';

@Injectable()
export class AppService {
  
  constructor(
    @Inject(AmoCRMService) private readonly CRMService: AmoCRMService,
  ) {}

  async getLeads(query: string): Promise<string> {
    return JSON.stringify(await this.CRMService.getLeads(query));
  }
}
