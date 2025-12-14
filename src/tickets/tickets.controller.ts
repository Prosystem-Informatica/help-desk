import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete 
} from '@nestjs/common';

import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CreateTicketStatusDto } from './updates/dto/create-ticket-update.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() dto: CreateTicketDto) {
    return this.ticketsService.create(dto);
  }

  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: CreateTicketStatusDto,
  ) {
    return this.ticketsService.update(Number(id), dto);
  }

  @Get('by-employee/:id')
  findByEmployee(@Param('id') id: number) {
    return this.ticketsService.findByEmployeeId(Number(id));
  }

  @Get('by-client/:id')
findByClient(@Param('id') id: number) {
  return this.ticketsService.findByClientId(Number(id));
}


  @Patch(':id/assign/:employeeId')
  assignEmployee(
    @Param('id') id: string,
    @Param('employeeId') employeeId: string,
    @Body('message') message?: string,
  ) {
    return this.ticketsService.assignEmployee(
      Number(id),
      Number(employeeId),
      message,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(Number(id));
  }
}
