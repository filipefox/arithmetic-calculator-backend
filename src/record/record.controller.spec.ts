import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { Test } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from './record.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

describe('RecordController', () => {
  let controller: RecordController;
  let recordService: RecordService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [RecordController],
      providers: [
        RecordService,
        AuthService,
        UserService,
        JwtService,
        {
          provide: getRepositoryToken(Record),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    recordService = moduleRef.get<RecordService>(RecordService);
    controller = new RecordController(recordService);
  });

  it('should return all records', async () => {
    const page = 1;
    const rowsPerPage = 10;
    const sortBy = 'createdAt';
    const order = 'ASC';
    const expectedResult = { rows: [], rowsNumber: 0 };

    jest.spyOn(recordService, 'findAll').mockResolvedValue(expectedResult);

    const result = await controller.findAll(page, rowsPerPage, sortBy, order);

    expect(recordService.findAll).toHaveBeenCalledWith(
      page,
      rowsPerPage,
      sortBy,
      order,
    );
    expect(result).toEqual(expectedResult);
  });

  it('should delete a record by ID', async () => {
    const id = 1;
    const expectedResult = undefined; // Set expected result here

    jest.spyOn(recordService, 'deleteById').mockResolvedValue(undefined);

    const result = await controller.deleteById(id);

    expect(recordService.deleteById).toHaveBeenCalledWith(id);
    expect(result).toEqual(expectedResult);
  });
});
