import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Ticket } from '../ticket.entity';
import { Employees } from '../../employees/employees.entity';

@Entity()
export class TicketStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ticket, ticket => ticket.statusHistory, { onDelete: 'CASCADE' })
  ticket: Ticket;

  @ManyToOne(() => Employees, { nullable: true })
  employee: Employees;

  @Column({ nullable: true })
  message: string;

  @Column({ nullable: true })
  oldStatus: string;

  @Column({ nullable: true })
  newStatus: string;

  @Column({ nullable: true })
  oldPriority: string;

  @Column({ nullable: true })
  newPriority: string;
}
