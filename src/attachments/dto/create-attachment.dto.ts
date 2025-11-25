import { IsNotEmpty, IsString, MaxLength, IsInt } from 'class-validator';

export class CreateAttachmentDto {
  @IsString()
  @IsNotEmpty({ message: 'A URL do arquivo é obrigatória.' })
  @MaxLength(255, { message: 'A URL pode ter no máximo 255 caracteres.' })
  url: string; 

  @IsInt({ message: 'ticketId deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O ticketId é obrigatório.' })
  ticketId: number; 
}
