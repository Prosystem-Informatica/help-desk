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
import { CreateTicketUpdateDto } from './updates/dto/create-ticket-update.dto';

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
    @Body() dto: CreateTicketUpdateDto,
  ) {
    return this.ticketsService.update(Number(id), dto);
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
