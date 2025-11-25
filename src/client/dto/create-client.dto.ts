import {
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,
  Matches,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
  @MinLength(3, { message: 'O nome deve ter ao menos 3 caracteres.' })
  nome: string;

  @IsEmail({}, { message: 'E-mail inválido.' })
  @IsNotEmpty({ message: 'O campo email é obrigatório.' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @IsNotEmpty({ message: 'O campo password é obrigatório.' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo telefone é obrigatório.' })
  @Matches(/^\(?\d{2}\)? ?\d{4,5}-?\d{4}$/, {
    message: 'Telefone inválido. Exemplo: (11) 98888-7777',
  })
  telefone: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo empresa é obrigatório.' })
  empresa: string;
}
