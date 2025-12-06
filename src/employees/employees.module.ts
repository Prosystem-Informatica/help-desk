import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employees } from './employees.entity';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { ClientModule } from '../client/client.module';
import { SectorsModule } from 'src/sectors/sector.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employees]),
    forwardRef(() => ClientModule), 
    forwardRef(() => SectorsModule), 
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService]
})
export class EmployeesModule {}
