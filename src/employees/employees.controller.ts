import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateEmployeesDto } from './dto/create-employees.dto';
import { EmployeesService } from './employees.service';
import { UpdateEmployeesDto } from './dto/update-employees.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post('create')
  create(@Body() data: CreateEmployeesDto) {
    return this.employeesService.create(data);
  }

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.employeesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateEmployeesDto) {
    return this.employeesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.employeesService.remove(id);
  }
}
