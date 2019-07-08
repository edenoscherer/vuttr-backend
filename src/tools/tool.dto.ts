import { Length, IsString, MinLength, IsUrl, IsArray, IsMongoId, IsOptional } from 'class-validator';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { UserDto } from '../users/user.dto';

export class ToolDto {

  @ApiModelPropertyOptional()
  @IsOptional()
  id: string;

  @ApiModelProperty()
  @IsString({ message: 'Titulo é obrigatório'})
  @Length(4, 100, { message: 'o titulo deve ter entre 4 e 100 caracteres' })
  readonly title: string;

  @ApiModelProperty()
  @IsString({ message: 'Descrição é obrigatório'})
  @MinLength(10, { message: 'A descrição deve ter mais de 10 caracteres' })
  readonly description: string;

  @ApiModelProperty()
  @IsUrl({}, { message: 'O link deve ser válido'})
  readonly link: string;

  @ApiModelProperty()
  @IsArray()
  @MinLength(2, {each: true})
  readonly tags: string[];

  @ApiModelPropertyOptional({
    type: UserDto,
  })
  @IsMongoId()
  @IsOptional()
  user?: any;
}
