import { ApiModelProperty } from '@nestjs/swagger';

export class TokenResponse {
  @ApiModelProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    description: 'Token de acesso do usuário'
  })
  token: string;
}
