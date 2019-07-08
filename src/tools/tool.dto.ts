import { IsEmail, Length, IsString, MinLength, IsUrl, IsArray, IsMongoId, IsOptional } from 'class-validator';

export class ToolDto {

  @IsOptional()
  id: string;

  @IsString({ message: 'Titulo é obrigatório'})
  @Length(4, 100, { message: 'o titulo deve ter entre 4 e 100 caracteres' })
  readonly title: string;

  @IsString({ message: 'Descrição é obrigatório'})
  @MinLength(10, { message: 'A descrição deve ter mais de 10 caracteres' })
  readonly description: string;

  @IsUrl({}, { message: 'O link deve ser válido'})
  readonly link: string;

  @IsArray()
  @MinLength(2, {each: true})
  readonly tags: string[];

  @IsMongoId()
  @IsOptional()
  user?: any;
}
