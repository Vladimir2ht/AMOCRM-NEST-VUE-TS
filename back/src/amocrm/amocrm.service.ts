import { existsSync, readFileSync, writeFile } from "fs";
import { resolve } from "path";
import { EventEmitter } from "events";
import { Injectable } from '@nestjs/common';
import { Client } from 'amocrm-js';
import { ConfigService } from "@nestjs/config";
import { ITokenData } from "amocrm-js/dist/interfaces/common";

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
  private renewTimeout: NodeJS.Timeout;
  private readonly updateConnection: () => void;
  // private readonly updateConnection;

  constructor(private configService: ConfigService) {

    // let v = this.configService.get<{[key: string]: any;}>('amocrm')
    // console.log( v.domain); // Можно переписать и на такое.
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
        console.log('First connection: ', status);
      })();
    } else {
      try {
        const json = readFileSync(filePath).toString();
        const currentToken: ITokenData = JSON.parse(json);
        this.amocrm.token.setValue(currentToken);
        console.log('Токен загружен.');
      } catch (e) {
        console.log('Вероятно, файл не найден или некорректный JSON-токен. Ошибка: ', e);
      }
    }

    const emitter= new EventEmitter();
    
    this.updateConnection = async (): Promise<void> => {
      // if (!this.amocrm.connection.isTokenExpired()) return;
      await this.amocrm.connection.update();
      writeFile(
        filePath,
        JSON.stringify(this.amocrm.token.getValue()),
        (err) => {if (err) console.error(err)}
      );
      emitter.emit('refresh token');
      console.log('Often connection updated');
    }

    // Переделать на асинхронный.
    emitter.on('refresh token', (): void => {
      clearTimeout(this.renewTimeout);
      // this.renewTimeout = setTimeout(() => this.updateConnection(), 20000);
      this.renewTimeout = setTimeout(this.updateConnection, this.amocrm.token.getValue().expires_in * 990); // Не 1000, чтобы обновить до окончания действия.
    });
    this.renewTimeout = setTimeout(() => this.updateConnection(), 3000);
    
  }

  async getLeads(query: string ): Promise<Lead[]> {
    query = (query && query.length > 2) ? '/api/v4/leads?with=contacts&query=' + query : '/api/v4/leads?with=contacts';
    let leads: any = await this.amocrm.request.get(query);
    if (!leads.data._embedded) return [];
    leads = leads.data._embedded.leads;

    
    // leads = this.insertAdditionInfo(leads)

    // async function GetAdditionalInfo(where: string, ) {

    // }
    
    // сделать учёт ограничения на 7 запросов в секунду базой данных.

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