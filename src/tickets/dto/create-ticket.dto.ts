import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsEnum,
  IsInt,
} from 'class-validator';
import { Priority } from '../../enums/priority/priority.enum';
import { StatusTicket } from '../../enums/status-ticket/status-ticket.enum';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty({ message: 'O título do ticket é obrigatório.' })
  @MaxLength(150, { message: 'O título deve ter no máximo 150 caracteres.' })
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(2000, { message: 'A descrição deve ter no máximo 2000 caracteres.' })
  desc?: string;

  @IsEnum(StatusTicket, { message: 'Status inválido. Use um valor válido do enum StatusTicket.' })
  @IsOptional()
  status?: StatusTicket;

  @IsInt({ message: 'employeeId deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O employeeId é obrigatório.' })
  employeeId: number;

  @IsInt({ message: 'clientId deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O clientId é obrigatório.' })
  clientId: number;

  @IsInt({ message: 'sectorId deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O sectorId é obrigatório.' })
  sectorId: number;

  @IsEnum(Priority, { message: 'Priority inválida. Use um valor válido do enum Priority.' })
  @IsOptional()
  priority?: Priority;
}
