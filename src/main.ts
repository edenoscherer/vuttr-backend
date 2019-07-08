import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, ValidationError, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: false,
      validateCustomDecorators: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException(
          errors.map(err => {
            return {
              value: err.value,
              property: err.property,
              constraints: err.constraints,
            };
          }),
          'Erro de validação',
        );
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Vuttr - Edeno Luiz Scherer')
    .setDescription('API para acesso ao sistema de Vuttr')
    .setVersion('1.0')
    .addTag('Vuttr')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
