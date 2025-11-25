import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { Employees } from 'src/employees/employees.entity';
import { Client } from 'src/client/client.entity';
import { Sector } from 'src/sectors/sector.entity';
import { StatusTicket } from 'src/enums/status-ticket/status-ticket.enum';
import { Priority } from 'src/enums/priority/priority.enum';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Employees)
    private readonly employeeRepository: Repository<Employees>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Sector)
    private readonly sectorRepository: Repository<Sector>,
  ) {}

  async create(dto: CreateTicketDto): Promise<Ticket> {
  const [employee, client, sector] = await Promise.all([
    this.employeeRepository.findOne({ where: { id: dto.employeeId } }),
    this.clientRepository.findOne({ where: { id: dto.clientId } }),
    this.sectorRepository.findOne({ where: { id: dto.sectorId } }),
  ]);

  if (!employee) throw new NotFoundException('Funcionário não encontrado');
  if (!client) throw new NotFoundException('Cliente não encontrado');
  if (!sector) throw new NotFoundException('Setor não encontrado');

  const ticket = this.ticketRepository.create({
    title: dto.title,
    desc: dto.desc ?? null,
    status: dto.status,
    priority: dto.priority,
    employee,
    client,
    sector,
  });

  return this.ticketRepository.save(ticket);
}



  findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find({ relations: ['attachments'] });
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: ['attachments'],
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    return ticket;
  }

  async update(id: number, dto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.findOne(id);
    Object.assign(ticket, dto);
    return this.ticketRepository.save(ticket);
  }

  async remove(id: number): Promise<void> {
    const ticket = await this.findOne(id);
    await this.ticketRepository.remove(ticket);
  }
}
