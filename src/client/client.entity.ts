import { Ticket } from 'src/tickets/ticket.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  telefone: string;

  @Column()
  empresa: string;

  @OneToMany(() => Ticket, (ticket) => ticket.client)
  tickets: Ticket[];
}
