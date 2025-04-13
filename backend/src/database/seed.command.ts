import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { runSeeds } from './seeds';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  try {
    await runSeeds(dataSource);
  } catch (error) {
    console.error('Erro ao executar seeds:', error);
  } finally {
    await app.close();
  }
}

void bootstrap();
