import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateEmployeesDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
  nome: string; 

  @IsEmail({}, { message: 'E-mail inválido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter ao menos 6 caracteres.' })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  password: string;
}
