import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employees } from './employees.entity';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { ClientModule } from '../client/client.module';
import { Sector } from 'src/sectors/sector.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employees, Sector]),
    forwardRef(() => ClientModule), 
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService]
})
export class EmployeesModule {}
