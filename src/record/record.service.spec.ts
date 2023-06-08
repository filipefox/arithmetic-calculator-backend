import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from './record.entity';
import { RecordService } from './record.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../user/user.entity';
import { Operation } from '../operation/operation.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

describe('RecordService', () => {
  let recordService: RecordService;
  let recordRepository: Repository<Record>;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    recordRepository = module.get<Repository<Record>>(
      getRepositoryToken(Record),
    );
    authService = module.get<AuthService>(AuthService);
    recordService = new RecordService(authService, recordRepository);
  });

  describe('save', () => {
    it('should save a record with the current user', async () => {
      const operation = new Operation();
      const record: Record = new Record(operation, 1, '', '');
      const user = new User(1);

      jest.spyOn(authService, 'getCurrentUser').mockReturnValue(user);
      jest.spyOn(recordRepository, 'save').mockResolvedValue(record);

      const result = await recordService.save(record);

      expect(authService.getCurrentUser).toHaveBeenCalled();
      expect(recordRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          ...record,
          user: user,
        }),
      );
      expect(result).toBe(record);
    });
  });

  describe('findAll', () => {
    it('should find all records for the current user', async () => {
      const page = 1;
      const rowsPerPage = 10;
      const sortBy = 'createdAt';
      const descending = 'DESC';

      const user = new User(1);

      const operation = new Operation();
      const records: Record[] = [new Record(operation, 1, '', '')];
      const numberOfRecords = records.length;

      jest.spyOn(authService, 'getCurrentUser').mockReturnValue(user);
      jest
        .spyOn(recordRepository, 'findAndCount')
        .mockResolvedValue([records, numberOfRecords]);

      const result = await recordService.findAll(
        page,
        rowsPerPage,
        sortBy,
        descending,
      );

      expect(authService.getCurrentUser).toHaveBeenCalled();
      expect(recordRepository.findAndCount).toHaveBeenCalledWith({
        where: { user: user },
        take: rowsPerPage,
        skip: (page - 1) * rowsPerPage,
        order: { [sortBy]: descending },
      });
      expect(result).toEqual({
        rows: records,
        rowsNumber: numberOfRecords,
      });
    });
  });

  describe('deleteById', () => {
    it('should soft delete a record by its ID for the current user', async () => {
      const id = 1;
      const mockCurrentUser = new User(1);

      jest
        .spyOn(authService, 'getCurrentUser')
        .mockReturnValue(mockCurrentUser);
      jest.spyOn(recordRepository, 'softDelete').mockResolvedValue(undefined);

      await recordService.deleteById(id);

      expect(authService.getCurrentUser).toHaveBeenCalled();
      expect(recordRepository.softDelete).toHaveBeenCalledWith({
        id: id,
        user: mockCurrentUser,
      });
    });
  });
});
