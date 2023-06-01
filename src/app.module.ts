import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from './operation/operation.entity';
import { DataSource } from 'typeorm';
import { OperationModule } from './operation/operation.module';
import { UserModule } from './user/user.module';
import { RecordModule } from './record/record.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { User } from './user/user.entity';
import { Record } from './record/record.entity';
import { UserCredit } from './user.credit/user.credit.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env', '.env.local'] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: Number(process.env.PGPORT),
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      synchronize: Boolean(process.env.TYPE_ORM_SYNCHRONIZE) || false,
      entities: [User, Operation, Record, UserCredit],
    }),
    OperationModule,
    UserModule,
    RecordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
