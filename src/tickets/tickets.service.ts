import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { Employees } from '../employees/employees.entity';
import { Client } from '../client/client.entity';
import { Sector } from '../sectors/sector.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CreateTicketUpdateDto } from './updates/dto/create-ticket-update.dto';
import { TicketUpdate } from './updates/ticket-update.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,

    @InjectRepository(TicketUpdate)
    private readonly updateRepository: Repository<TicketUpdate>,

    @InjectRepository(Employees)
    private readonly employeeRepository: Repository<Employees>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(Sector)
    private readonly sectorRepository: Repository<Sector>,
  ) {}

  // CRIAÇÃO COM REGISTRO DE HISTÓRICO
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

    const saved = await this.ticketRepository.save(ticket);

    await this.updateRepository.save({
      ticket: saved,
      employee,
      message: 'Ticket criado',
      newStatus: dto.status,
      newPriority: dto.priority,
    });

    return saved;
  }

  findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find({ relations: ['updates'] });
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: ['updates'],
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    return ticket;
  }

  async update(id: number, dto: CreateTicketUpdateDto): Promise<Ticket> {
  const ticket = await this.findOne(id);

  const oldStatus = ticket.status;
  const oldPriority = ticket.priority;

  Object.assign(ticket, dto);
  const updated = await this.ticketRepository.save(ticket);

  if (!updated.employee) {
    throw new Error('Ticket não possui employee associado.');
  }

  await this.updateRepository.save({
    ticket: { id: updated.id },
    employee: { id: updated.employee.id },
    message: dto.message ?? 'Alteração no ticket',
    oldStatus,
    newStatus: updated.status,
    oldPriority,
    newPriority: updated.priority,
  });

  return updated;
}

async assignEmployee(ticketId: number, employeeId: number, message?: string): Promise<Ticket> {
  const ticket = await this.ticketRepository.findOne({
    where: { id: ticketId },
    relations: ['employee'],
  });

  if (!ticket) throw new NotFoundException('Ticket não encontrado');

  const employee = await this.employeeRepository.findOne({
    where: { id: employeeId },
  });

  if (!employee) throw new NotFoundException('Funcionário não encontrado');

  const oldEmployee = ticket.employee?.id;

  ticket.employee = employee;
  const updated = await this.ticketRepository.save(ticket);

  await this.updateRepository.save({
    ticket: { id: updated.id },
    employee: { id: employee.id },
    message: message ?? `Funcionário atribuído ao ticket`,
    oldStatus: ticket.status,
    newStatus: ticket.status,
    oldPriority: ticket.priority,
    newPriority: ticket.priority,
  });

  return updated;
}


  async remove(id: number): Promise<void> {
    const ticket = await this.findOne(id);
    await this.ticketRepository.remove(ticket);
  }
}
