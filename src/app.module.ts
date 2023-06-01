import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperationController } from './operation/operation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from "./operation/operation.entity";
import { DataSource } from "typeorm";
import { OperationService } from "./operation/operation.service";
import { OperationModule } from "./operation/operation.module";
import { UserModule } from './user/user.module';
import { RecordModule } from "./record/record.module";
import { ConfigModule } from "@nestjs/config";
import * as process from "process";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: Number(process.env.PGPORT),
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      entities: [Operation],
      synchronize: true,
    }),
    OperationModule,
    UserModule,
    RecordModule
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {
  constructor(private dataSource: DataSource) {}
}
