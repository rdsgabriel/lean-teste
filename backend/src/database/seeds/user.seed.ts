import { DataSource } from 'typeorm';
import { User } from '../../users/user.entity';
import * as argon2 from 'argon2';

export const seedUsers = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);

  // Verifica se já existe um usuário admin
  const existingAdmin = await userRepository.findOne({
    where: { username: 'admin' },
  });

  if (!existingAdmin) {
    const hashedPassword = await argon2.hash('admin');

    const adminUser = userRepository.create({
      name: 'Administrador',
      username: 'admin',
      password: hashedPassword,
      phone: '(11) 99999-9999',
      isActive: true,
    });

    await userRepository.save(adminUser);
    console.log('Usuário admin criado com sucesso!');
  }

  // Criar 10 usuários adicionais
  const usersToCreate = [
    { name: 'João Silva', username: 'joao', phone: '(11) 98888-8888' },
    { name: 'Maria Santos', username: 'maria', phone: '(11) 97777-7777' },
    { name: 'Pedro Oliveira', username: 'pedro', phone: '(11) 96666-6666' },
    { name: 'Ana Costa', username: 'ana', phone: '(11) 95555-5555' },
    { name: 'Carlos Souza', username: 'carlos', phone: '(11) 94444-4444' },
    { name: 'Julia Lima', username: 'julia', phone: '(11) 93333-3333' },
    { name: 'Lucas Ferreira', username: 'lucas', phone: '(11) 92222-2222' },
    { name: 'Beatriz Almeida', username: 'beatriz', phone: '(11) 91111-1111' },
    { name: 'Rafael Pereira', username: 'rafael', phone: '(11) 90000-0000' },
    {
      name: 'Mariana Rodrigues',
      username: 'mariana',
      phone: '(11) 89999-9999',
    },
  ];

  for (const userData of usersToCreate) {
    const existingUser = await userRepository.findOne({
      where: { username: userData.username },
    });

    if (!existingUser) {
      const hashedPassword = await argon2.hash('123456');

      const user = userRepository.create({
        ...userData,
        password: hashedPassword,
        isActive: true,
      });

      await userRepository.save(user);
      console.log(`Usuário ${userData.username} criado com sucesso!`);
    }
  }
};
