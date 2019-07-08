import { IsEmail, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserCredentiaisDto {

  @ApiModelProperty()
  @IsEmail({}, { message: 'Endereço de e-mail é inválido' })
  @Length(4, 100, { message: 'o e-mail deve ter entre 4 e 100 caracteres' })
  readonly email: string;

  @ApiModelProperty()
  @Length(4, 100, { message: 'A senha deve ter entre 4 e 100 caracteres' })
  readonly password: string;
}
