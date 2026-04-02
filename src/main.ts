import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.flatMap((error) => {
          const messages: string[] = [];

          if (error.constraints) {
            for (const key in error.constraints) {
              const value = error.constraints[key];

              if (key === 'whitelistValidation') {
                messages.push(`La propiedad '${error.property}' no está permitida.`);
              } else {
                messages.push(value);
              }
            }
          }

          return messages;
        });

        return new BadRequestException({
          message: 'Errores de validación',
          errors: formattedErrors,
        });
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();