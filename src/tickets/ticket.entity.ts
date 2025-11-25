import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Client } from 'src/client/client.entity';
import { Sector } from 'src/sectors/sector.entity';
import { Attachment } from 'src/attachments/attachment.entity';
import { Priority } from 'src/enums/priority/priority.enum';
import { StatusTicket } from 'src/enums/status-ticket/status-ticket.enum';
import { Employees } from 'src/employees/employees.entity';

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

  @ManyToOne(() => Employees, (employees) => employees.tickets, { eager: true })
  employee: Employees;

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
}
