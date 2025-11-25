import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Ticket } from 'src/tickets/ticket.entity';

@Entity('attachments')
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.attachments, {
    onDelete: 'CASCADE',
  })
  ticket: Ticket;
}
