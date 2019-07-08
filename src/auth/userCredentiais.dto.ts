import { IsEmail, Length, IsAlphanumeric } from 'class-validator';

export class UserCredentiaisDto {
  @IsEmail({}, { message: 'Endereço de e-mail é inválido' })
  @Length(4, 100, { message: 'o e-mail deve ter entre 4 e 100 caracteres' })
  readonly email: string;

  @Length(4, 100, { message: 'A senha deve ter entre 4 e 100 caracteres' })
  readonly password: string;
}
