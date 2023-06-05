import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as process from 'process';

@Injectable()
export class RandomOrgService {
  constructor(private httpService: HttpService) {}

  async getRandomString(): Promise<string> {
    const baseUrl = 'https://api.random.org/json-rpc/4/invoke';
    const apiKey = process.env.RANDOM_ORG_API_KEY;

    const requestBody = {
      jsonrpc: '2.0',
      method: 'generateStrings',
      params: {
        apiKey: apiKey,
        n: 1,
        length: 20,
        characters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      },
      id: 1,
    };

    const response = await this.httpService.axiosRef.post(baseUrl, requestBody);
    return response.data.result.random.data[0];
  }
}
