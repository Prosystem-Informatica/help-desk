import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from '../employees/employees.service';
import { ClientService } from '../client/client.service';
import * as bcrypt from 'bcrypt';
import { UserType } from '../enums/auth/user-type.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeesService,
    private readonly clientService: ClientService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const employee = await this.employeeService.findByEmail(email);

    if (employee && (await bcrypt.compare(password, employee.password))) {
      return { type: UserType.EMPLOYEE, user: employee };
    }

    const client = await this.clientService.findByEmail(email);

    if (client && (await bcrypt.compare(password, client.password))) {
      return { type: UserType.CLIENT, user: client };
    }

    throw new UnauthorizedException('Email ou senha inválidos');
  }

  async login(userType: UserType, user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      type: userType,
    };

    return {
      access_token: this.jwt.sign(payload),
      userType,
      user,
    };
  }

  async register(dto: any) {
    const { nome, email, password } = dto;

    const existingEmployee = await this.employeeService.findByEmail(email);
    const existingClient = await this.clientService.findByEmail(email);

    if (existingEmployee || existingClient) {
      throw new BadRequestException('Email já está em uso.');
    }

    const hashed = await bcrypt.hash(password, 10);

    const isProsystem =
      email.endsWith('@prosystem.com') ||
      email.endsWith('@prosystem.com.br');

    let createdUser;
    let userType: UserType;

    if (isProsystem) {
      if (!dto.sectorId) {
        throw new BadRequestException('SectorId é obrigatório para funcionários.');
      }

      createdUser = await this.employeeService.create({
        nome,
        email,
        password: hashed,
        sectorId: dto.sectorId,
      });

      userType = UserType.EMPLOYEE;
    } else {
      if (!dto.telefone || !dto.empresa) {
        throw new BadRequestException('Telefone e Empresa são obrigatórios para clientes.');
      }

      createdUser = await this.clientService.create({
        nome,
        email,
        password: hashed,
        telefone: dto.telefone,
        empresa: dto.empresa,
      });

      userType = UserType.CLIENT;
    }

    return this.login(userType, createdUser);
  }
}
