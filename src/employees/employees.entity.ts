import { Sector } from '../sectors/sector.entity';
import { Ticket } from '../tickets/ticket.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity('employees')
export class Employees {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Sector, sector => sector.employees, {
    eager: true,
    nullable: false,
  })
  sector: Sector;

  @OneToMany(() => Ticket, ticket => ticket.employee)
  tickets: Ticket[];
}
