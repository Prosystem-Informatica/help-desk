import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTicketUpdateDto {
  @IsNumber()
  @IsNotEmpty()
  ticketId: number;

  @IsNumber()
  @IsNotEmpty()
  employeeId: number;

  @IsString()
  message: string;

  @IsString()
  oldStatus: string;

  @IsString()
  newStatus: string;

  @IsString()
  oldPriority: string;

  @IsString()
  newPriority: string;
}
