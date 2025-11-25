import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from 'src/employees/employees.service';
import { ClientService } from 'src/client/client.service';
import * as bcrypt from 'bcrypt';
import { UserType } from 'src/enums/auth/user-type.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeesService,
    private readonly clientService: ClientService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const employee = await this.employeeService.findByEmail(email);

    console.log("Oq temos aqui > ", employee);

    if (employee && (await bcrypt.compare(password, employee.password))) {
      return { type: UserType.EMPLOYEE, user: employee };
    }

    const client = await this.clientService.findByEmail(email);
    if (client && (await bcrypt.compare(password, client.password))) {
      return { type: UserType.CLIENT, user: client };
    }

    throw new UnauthorizedException('Email ou senha inválidos');
  }

  async login(userType: 'EMPLOYEE' | 'CLIENT', user: any) {
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
}
