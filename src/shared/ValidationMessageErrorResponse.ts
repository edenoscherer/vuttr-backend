import { ApiModelProperty } from '@nestjs/swagger';

export class ValidationMessageErrorResponse {
  @ApiModelProperty()
  value: any;
  @ApiModelProperty()
  property: string;
  @ApiModelProperty()
  constraints: { [key: string]: string; };
}
