import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Client } from '../client/client.entity';
import { Sector } from '../sectors/sector.entity';
import { Attachment } from '../attachments/attachment.entity';
import { Priority } from '../enums/priority/priority.enum';
import { StatusTicket } from '../enums/status-ticket/status-ticket.enum';
import { Employees } from '../employees/employees.entity';
import { TicketStatus } from './updates/ticket-status.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  title: string;

  @Column({ type: 'text', nullable: true })
  desc?: string | null;

  @Column({ type: 'varchar', default: StatusTicket.ABERTO })
  status: StatusTicket;

  @ManyToOne(() => Employees, (employees) => employees.tickets, {
    eager: true,
    nullable: true,
  })
  employee?: Employees | null;

  @ManyToOne(() => Client, client => client.tickets, { eager: true })
  client: Client;

  @ManyToOne(() => Sector, sector => sector.tickets, { eager: true })
  sector: Sector;

  @Column({ type: 'varchar', default: Priority.MEDIUM })
  priority: Priority;

  @OneToMany(() => Attachment, attachment => attachment.ticket, {
    cascade: true,
  })
  attachments: Attachment[];

  @OneToMany(() => TicketStatus, status => status.ticket)
  statusHistory: TicketStatus[];

}
