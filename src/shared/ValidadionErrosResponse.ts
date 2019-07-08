import { ApiModelProperty } from '@nestjs/swagger';
import { ValidationMessageErrorResponse } from './ValidationMessageErrorResponse';

export class ValidationErrorResponse {
  @ApiModelProperty({example: '400'})
  statusCode: number;
  @ApiModelProperty({example: 'Erro de validação'})
  error: string;

  @ApiModelProperty({
    example: [{
      value: 'visualstudio',
      property: 'link',
      constraints: {
        isUrl: 'O link deve ser válido',
      },
    }],
    type: [ValidationMessageErrorResponse],
  })
  message: [ValidationMessageErrorResponse];
}


export const ValidationErrorOptions: any = {
  status: 400,
  description: 'Erro de validação',
  type: ValidationErrorResponse,
};
