import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSectorDto {
  @IsString()
  @IsNotEmpty({ message: 'O título do setor é obrigatório.' })
  @MaxLength(100, { message: 'O título pode ter no máximo 100 caracteres.' })
  title: string; 
}
