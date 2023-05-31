import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperationController } from './operation/operation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from "./operation/operation.entity";
import { DataSource } from "typeorm";
import { OperationService } from "./operation/operation.service";
import { OperationModule } from "./operation/operation.module";
import { UserModule } from "./user/user.module";
import { RecordModule } from "./record/record.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
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
