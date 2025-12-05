import { ConflictException, Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import * as bcrypt from 'bcrypt';
import { EmployeesService } from '../employees/employees.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepo: Repository<Client>,

    @Inject(forwardRef(() => EmployeesService))
    private readonly employeeService: EmployeesService,
  ) {}

  async create(data: CreateClientDto) {
    const existingClient = await this.clientRepo.findOne({ where: { email: data.email } });

    if (existingClient) {
      throw new ConflictException('Email já está registrado como Cliente.');
    }

    const existingEmployee = await this.employeeService.findByEmail(data.email);

    if (existingEmployee) {
      throw new ConflictException('Email já está registrado como Funcionário.');
    }

    const hash = await bcrypt.hash(data.password, 10);

    const client = this.clientRepo.create({
      ...data,
      password: hash,
    });

    return this.clientRepo.save(client);
  }

  findAll() {
    return this.clientRepo.find();
  }

  findByEmail(email: string) {
    return this.clientRepo.findOne({ where: { email } });
  }

  findOne(id: number) {
    return this.clientRepo.findOneBy({ id });
  }

  update(id: number, data: UpdateClientDto) {
    return this.clientRepo.update(id, data);
  }

  remove(id: number) {
    return this.clientRepo.delete(id);
  }
}
