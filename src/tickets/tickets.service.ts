import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { Employees } from '../employees/employees.entity';
import { Client } from '../client/client.entity';
import { Sector } from '../sectors/sector.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketStatus } from './updates/ticket-status.entity';
import { CreateTicketStatusDto } from './updates/dto/create-ticket-update.dto';
import { StatusTicket } from 'src/enums/status-ticket/status-ticket.enum';
import { Priority } from 'src/enums/priority/priority.enum';


@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,

    @InjectRepository(TicketStatus)
    private readonly statusRepository: Repository<TicketStatus>,

    @InjectRepository(Employees)
    private readonly employeeRepository: Repository<Employees>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(Sector)
    private readonly sectorRepository: Repository<Sector>,
  ) {}

  async create(dto: CreateTicketDto): Promise<Ticket> {
    const [employee, client, sector] = await Promise.all([
      dto.employeeId ? this.employeeRepository.findOne({ where: { id: dto.employeeId } }) : Promise.resolve(null),
      this.clientRepository.findOne({ where: { id: dto.clientId } }),
      this.sectorRepository.findOne({ where: { id: dto.sectorId } }),
    ]);

    if (dto.employeeId && !employee) throw new NotFoundException('Funcionário não encontrado');
    if (!client) throw new NotFoundException('Cliente não encontrado');
    if (!sector) throw new NotFoundException('Setor não encontrado');

    const ticket = this.ticketRepository.create({
      title: dto.title,
      desc: dto.desc ?? null,
      status: dto.status,
      priority: dto.priority,
      employee: employee ?? null,
      client,
      sector,
    });

    const saved = await this.ticketRepository.save(ticket);

    await this.statusRepository.save({
      ticket: saved,
      employee: employee ?? null,
      message: 'Ticket criado',
      newStatus: dto.status,
      newPriority: dto.priority,
    });

    return saved;
  }

  findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find({
      relations: ['attachments', 'statusHistory', 'employee', 'client', 'sector'],
    });
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: ['attachments', 'statusHistory', 'employee', 'client', 'sector'],
    });

    if (!ticket) throw new NotFoundException(`Ticket with ID ${id} not found`);

    return ticket;
  }

  async addStatus(ticketId: number, dto: CreateTicketStatusDto): Promise<TicketStatus> {
    const ticket = await this.ticketRepository.findOne({ where: { id: ticketId }, relations: ['employee'] });
    if (!ticket) throw new NotFoundException('Ticket not found');

    const employee = dto.employeeId
      ? await this.employeeRepository.findOne({ where: { id: dto.employeeId } })
      : ticket.employee ?? null;

    const oldStatus = ticket.status;
    const oldPriority = ticket.priority;

    if (dto.newStatus) {
      ticket.status = dto.newStatus as StatusTicket;
    }
    if(dto.newPriority){
      ticket.priority = dto.newPriority as Priority;
    }

    await this.ticketRepository.save(ticket);

    const status = this.statusRepository.create({
      ticket,
      employee: employee ?? null,
      message: dto.message ?? null,
      oldStatus: oldStatus ?? null,
      newStatus: dto.newStatus ?? ticket.status,
      oldPriority: oldPriority ?? null,
      newPriority: dto.newPriority ?? ticket.priority,
    });

    return this.statusRepository.save(status);
  }

  async listStatusByTicket(ticketId: number): Promise<TicketStatus[]> {
    return this.statusRepository.find({
      where: { ticket: { id: ticketId } },
      relations: ['employee'],
      order: { createdAt: 'DESC' },
    });
  }

  async remove(id: number): Promise<void> {
    const ticket = await this.findOne(id);
    await this.ticketRepository.remove(ticket);
  }
}

