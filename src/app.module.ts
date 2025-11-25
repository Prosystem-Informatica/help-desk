import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module';
import { ClientModule } from './client/client.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { SectorsModule } from './sectors/sector.module';
import { TicketsModule } from './tickets/tickets.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost',
      port: 5432, 
      username: 'postgres',
      password: 'admin',
      database: 'postgres',
      autoLoadEntities: true, 
      synchronize: true, 
    }),
    EmployeesModule,
    ClientModule,
    AttachmentsModule,
    SectorsModule,
    TicketsModule,
    AuthModule
  ],
})
export class AppModule {}
