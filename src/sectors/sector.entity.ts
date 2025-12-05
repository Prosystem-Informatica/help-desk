import { Ticket } from '../tickets/ticket.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('sectors')
export class Sector {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @OneToMany(() => Ticket, (ticket) => ticket.sector)
  tickets: Ticket[];
}
