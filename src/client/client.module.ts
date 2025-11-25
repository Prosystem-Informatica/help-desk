import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    forwardRef(() => EmployeesModule), ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService]
})
export class ClientModule {}
