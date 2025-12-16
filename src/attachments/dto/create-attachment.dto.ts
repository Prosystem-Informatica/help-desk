import { IsNotEmpty, IsString, MaxLength, IsInt } from 'class-validator';

export class CreateAttachmentDto {
  @IsString()
  @IsNotEmpty({ message: 'A IMG do arquivo é obrigatória.' })
  @MaxLength(255, { message: 'A IMG pode ter no máximo 255 caracteres.' })
  base64: string; 

  @IsInt({ message: 'ticketId deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O ticketId é obrigatório.' })
  ticketId: number; 
}
