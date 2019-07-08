import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ValidationError, BadRequestException } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    disableErrorMessages: false,
    validateCustomDecorators: true,
    exceptionFactory: (errors: ValidationError[]) => {
      return new BadRequestException(errors.map(err => {
        return {
          value: err.value,
          property: err.property,
          constraints: err.constraints,
        };
      }));
    },
  }));

  await app.listen(3000);
}
bootstrap();
