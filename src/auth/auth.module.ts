import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmployeesModule } from 'src/employees/employees.module';
import { ClientModule } from 'src/client/client.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    EmployeesModule,
    ClientModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
