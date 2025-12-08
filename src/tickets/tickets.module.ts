import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { Employees } from '../employees/employees.entity';
import { Client } from '../client/client.entity';
import { Sector } from '../sectors/sector.entity';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TicketUpdate } from './updates/ticket-update.entity';
import { TicketUpdateRepository } from './updates/ticket-update.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ticket,
      TicketUpdate, 
      Employees,
      Client,
      Sector,
    ]),
  ],
  controllers: [TicketsController],
  providers: [
    TicketsService,
    TicketUpdateRepository,
  ],
  exports: [
    TicketUpdateRepository,
  ],
})
export class TicketsModule {}
