import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { Employees } from '../employees/employees.entity';
import { Client } from '../client/client.entity';
import { Sector } from '../sectors/sector.entity';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TicketStatus } from './updates/ticket-status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ticket,
      TicketStatus, 
      Employees,
      Client,
      Sector,
    ]),
  ],
  controllers: [TicketsController],
  providers: [
    TicketsService,
  ],
})
export class TicketsModule {}
