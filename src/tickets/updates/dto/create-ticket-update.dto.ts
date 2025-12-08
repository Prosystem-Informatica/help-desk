import { IsOptional, IsString, IsInt } from 'class-validator';

export class CreateTicketStatusDto {
  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  newStatus?: string;

  @IsOptional()
  @IsString()
  newPriority?: string;

  @IsOptional()
  @IsInt()
  employeeId?: number;
}
