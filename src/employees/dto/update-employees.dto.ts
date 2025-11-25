import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateEmployeesDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
