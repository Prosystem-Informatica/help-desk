import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module';
import { ClientModule } from './client/client.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { SectorsModule } from './sectors/sector.module';
import { TicketsModule } from './tickets/tickets.module';
import { AuthModule } from './auth/auth.module';
import env from './config/env';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: env.dbType,
      host: env.dbHost,
      port: env.dbPort,
      username: env.dbUsername,
      password: env.dbPassword,
      database: env.dbName,
      autoLoadEntities: true,
      synchronize: true,
      logging: env.dbLog,
      ssl: {
        rejectUnauthorized: false, 
      },
    }),
    EmployeesModule,
    ClientModule,
    AttachmentsModule,
    SectorsModule,
    TicketsModule,
    AuthModule,
  ],
})
export class AppModule {}
