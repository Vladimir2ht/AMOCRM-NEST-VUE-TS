import { resolve } from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { Injectable } from '@nestjs/common';
import { Client } from 'amocrm-js';
import { ConfigService } from '@nestjs/config';

interface Lead {
  name: string;
  status_id: string;
  responsible_user_id: string;
  price: number;
  created_at: number;
  [key: string]: any;
}

const filePath = resolve(__dirname, './token.json');

@Injectable()
export class AmoCRMService {
  private readonly amocrm: Client;

  constructor(private configService: ConfigService) {

    this.amocrm = new Client({
      domain: this.configService.get('amocrm.domain'),
      auth: {
        client_id: this.configService.get('amocrm.clientID'), // ID интеграции
        client_secret: this.configService.get('amocrm.clientSecret'), // Секретный ключ
        redirect_uri: this.configService.get('amocrm.redirectURL'), // Ссылка для перенаправления
        code: this.configService.get('amocrm.authorisationCode'), // Код для упрощённой авторизации, необязательный
       },
    });

    if (!existsSync(filePath)) {
      (async () => {
        const status = await this.amocrm.connection.connect();
        console.log(status);
      })();
    }
    
    const updateConnection = async () => {
      if (!this.amocrm.connection.isTokenExpired()) return;
      await this.amocrm.connection.update();
    }
    
    (async () => {
      let renewTimeout: NodeJS.Timeout;
  
      this.amocrm.token.on('change', () => {
        // обновление токена по истечению
        const token = this.amocrm.token.getValue();
        writeFileSync(filePath, JSON.stringify(token));
        clearTimeout(renewTimeout);
        renewTimeout = setTimeout(updateConnection, token.expires_in * 990); // Не 1000, чтобы обновить до окончания действия.
      });
  
      try {
        const json = readFileSync(filePath).toString();
        const currentToken = JSON.parse(json);
        this.amocrm.token.setValue(currentToken);
      } catch (e) {
        console.log('ER1', e)
        // Файл не найден, некорректный JSON-токен
      }
    })();
  }

  async getLeads(query: string ): Promise<Lead[]> {
    query = (query && query.length > 2) ? '/api/v4/leads?with=contacts&query=' + query : '/api/v4/leads?with=contacts';
    let leads: any = await this.amocrm.request.get(query);
    if (!leads.data._embedded) return [];
    leads = leads.data._embedded.leads;

    (await Promise.all( leads.map(lead => {
      return this.amocrm.request.get(`/api/v4/leads/pipelines/${lead.pipeline_id}/statuses/${lead.status_id}`)
    }))).forEach((element, i) => {
      leads[i].status_id = element.data.name;
    });

    (await Promise.all( leads.map(lead => {
      return this.amocrm.request.get(`/api/v4/users/${lead.responsible_user_id}`)
    }))).forEach((element, i) => {
      leads[i].responsible_user_id = element.data.name;
      leads[i].user_mail = element.data.email;
    });

    return leads
	}

}