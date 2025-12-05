import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserType } from '../enums/auth/user-type.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const result = await this.authService.validateUser(
      dto.email,
      dto.password,
    );

    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { type, user } = result;

    return this.authService.login(type as UserType, user);
  }
}
