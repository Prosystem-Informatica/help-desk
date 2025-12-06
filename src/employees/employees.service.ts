import { ConflictException, Injectable, Inject, forwardRef, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employees } from './employees.entity';
import { CreateEmployeesDto } from './dto/create-employees.dto';
import { UpdateEmployeesDto } from './dto/update-employees.dto';
import * as bcrypt from 'bcrypt';
import { ClientService } from '../client/client.service';
import { Sector } from 'src/sectors/sector.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees)
    private funcionarioRepo: Repository<Employees>,

    @Inject(forwardRef(() => ClientService))
    private readonly clientService: ClientService,

    @InjectRepository(Sector)
    private sectorRepo: Repository<Sector>,
  ) {}

  async create(data: CreateEmployeesDto) {
  const existingEmployee = await this.funcionarioRepo.findOne({
    where: { email: data.email },
  });

  if (existingEmployee) {
    throw new ConflictException('Email já está registrado como Funcionário.');
  }

  const existingClient = await this.clientService.findByEmail(data.email);

  if (existingClient) {
    throw new ConflictException('Email já está registrado como Cliente.');
  }

  const sector = await this.sectorRepo.findOne({
    where: { id: data.sectorId },
  });

  if (!sector) {
    throw new NotFoundException('Setor não encontrado.');
  }

  const hash = await bcrypt.hash(data.password, 10);

  const employee = this.funcionarioRepo.create({
    nome: data.nome,
    email: data.email,
    password: hash,
    sector: sector,     // 👈 ESSENCIAL
  });

  return this.funcionarioRepo.save(employee);
}


  findAll() {
    return this.funcionarioRepo.find();
  }

  findByEmail(email: string) {
    return this.funcionarioRepo.findOne({
      where: { email },
    });
  }

  findOne(id: number) {
    return this.funcionarioRepo.findOneBy({ id });
  }

  update(id: number, data: UpdateEmployeesDto) {
    return this.funcionarioRepo.update(id, data);
  }

  remove(id: number) {
    return this.funcionarioRepo.delete(id);
  }
}
