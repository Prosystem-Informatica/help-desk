import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Ticket } from '../ticket.entity';
import { Employees } from '../../employees/employees.entity';


@Entity('ticket_updates')
export class TicketUpdate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ticket, ticket => ticket, { onDelete: 'CASCADE' })
  ticket: Ticket;

  @ManyToOne(() => Employees)
  employee: Employees;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({ nullable: true })
  oldStatus: string;

  @Column({ nullable: true })
  newStatus: string;

  @Column({ nullable: true })
  oldPriority: string;

  @Column({ nullable: true })
  newPriority: string;

  @CreateDateColumn()
  createdAt: Date;
}
