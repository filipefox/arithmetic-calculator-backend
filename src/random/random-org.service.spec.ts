import { HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { RandomOrgService } from './random-org.service';

describe('RandomOrgService', () => {
  let service: RandomOrgService;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        RandomOrgService,
        {
          provide: HttpService,
          useValue: {
            axiosRef: {
              post: jest.fn().mockResolvedValue({
                data: {
                  result: {
                    random: {
                      data: ['random-string'],
                    },
                  },
                },
              }),
            },
          },
        },
      ],
    }).compile();

    service = moduleRef.get<RandomOrgService>(RandomOrgService);
    httpService = moduleRef.get<HttpService>(HttpService);
  });

  it('should retrieve a random string from Random.org API', async () => {
    const expectedResult = 'random-string';

    const result = await service.getRandomString();

    expect(httpService.axiosRef.post).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });
});
