import { DataSource } from 'typeorm';
import { seedUsers } from './user.seed';

export const runSeeds = async (dataSource: DataSource) => {
  try {
    await seedUsers(dataSource);
    console.log('Seeds executados com sucesso!');
  } catch (error) {
    console.error('Erro ao executar seeds:', error);
  }
};
