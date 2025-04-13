import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { runSeeds } from './database/seeds';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Usuários')
    .setDescription('API para gerenciamento de usuários')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Configuração do CORS
  app.enableCors();

  // Configuração do ValidationPipe
  app.useGlobalPipes(new ValidationPipe());

  // Executa os seeds
  const dataSource = app.get(DataSource);
  await runSeeds(dataSource);

  await app.listen(3000);
}

void bootstrap();
