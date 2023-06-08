import { Module } from '@nestjs/common';
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
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserCreditModule } from './user.credit/user.credit.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env', '.env.development'] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: Number(process.env.PGPORT),
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      synchronize: Boolean(process.env.TYPE_ORM_SYNCHRONIZE),
      entities: [User, Operation, Record, UserCredit],
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    OperationModule,
    UserModule,
    RecordModule,
    AuthModule,
    UserCreditModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
