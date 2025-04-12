import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ObjectLiteral } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { FilterOperator, UserFilterDto } from './dto/filter.dto';
import { Logger } from '@nestjs/common';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async orderBy(
    orderBy: string = 'id',
    order: 'ASC' | 'DESC' = 'ASC',
  ): Promise<User[]> {
    return await this.usersRepository.find({
      order: { [orderBy]: order },
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(
        `Usuário com nome ${username} não encontrado`,
      );
    }
    return user;
  }

  async create(
    username: string,
    password: string,
    name: string,
    phone: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      name,
      phone,
    });
    return await this.usersRepository.save(user);
  }

  private normalizePhone(phone: string): string {
    return phone.replace(/\D/g, '');
  }

  async findBySearchTerm(searchTerm: string): Promise<User[]> {
    try {
      if (!searchTerm || searchTerm.trim() === '') {
        return [];
      }

      const term = searchTerm.trim();
      const normalizedSearchTerm = this.normalizePhone(term);

      // Busca por ID se o termo for um número
      if (!isNaN(Number(term))) {
        const usersById = await this.usersRepository.find({
          where: { id: Number(term) },
        });

        // Se encontrar usuários por ID, retorna-os
        if (usersById.length > 0) {
          return usersById;
        }
      }

      // Busca por nome - usando ILIKE para ser case-insensitive
      const usersByName = await this.usersRepository
        .createQueryBuilder('user')
        .where('LOWER(user.name) LIKE LOWER(:term)', { term: `%${term}%` })
        .getMany();

      // Se encontrar usuários pelo nome, retorna-os
      if (usersByName.length > 0) {
        return usersByName;
      }

      // Busca por telefone
      const usersByPhone = await this.usersRepository.find({
        where: { phone: Like(`%${normalizedSearchTerm}%`) },
      });

      // Retorna os usuários encontrados pelo telefone
      return usersByPhone;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return [];
    }
  }

  private async simulateSQSMessage(
    userId: number,
    newStatus: boolean,
  ): Promise<void> {
    const message = {
      userId,
      newStatus,
      timestamp: new Date().toISOString(),
      action: 'UPDATE_STATUS',
    };

    console.log('\n=== SIMULAÇÃO SQS INICIADA ===');
    console.log('Mensagem:', message);
    this.logger.log(
      `[SQS Simulation] Enviando mensagem para fila: ${JSON.stringify(message)}`,
    );

    await new Promise((resolve) => setTimeout(resolve, 100));

    console.log('Mensagem enviada com sucesso!');
    console.log('=== SIMULAÇÃO SQS FINALIZADA ===\n');
    this.logger.log('[SQS Simulation] Mensagem enviada com sucesso');
  }

  async updateStatus(id: number, status: boolean): Promise<User> {
    const user = await this.findOne(id);
    user.isActive = status;

    await this.simulateSQSMessage(id, status);

    return await this.usersRepository.save(user);
  }

  async findWithFilters(filterDto: UserFilterDto): Promise<User[]> {
    try {
      if (!filterDto.filters?.length) {
        return this.usersRepository.find({ order: { id: 'ASC' } });
      }

      const queryBuilder = this.usersRepository.createQueryBuilder('user');
      let isFirstCondition = true;

      this.logger.debug(`Processando ${filterDto.filters.length} filtros`);

      for (const filter of filterDto.filters) {
        const filterResult = FilterDto.buildCondition(filter);

        if (!filterResult) {
          continue;
        }

        const { condition, parameters } = filterResult;

        this.logger.debug(`Aplicando condição: ${condition}`, parameters);

        if (filter.operator === FilterOperator.OR && !isFirstCondition) {
          queryBuilder.orWhere(condition, parameters as ObjectLiteral);
        } else {
          if (isFirstCondition) {
            queryBuilder.where(condition, parameters as ObjectLiteral);
            isFirstCondition = false;
          } else {
            queryBuilder.andWhere(condition, parameters as ObjectLiteral);
          }
        }
      }

      const query = queryBuilder.getQuery();
      const params = queryBuilder.getParameters();
      this.logger.debug('Query final:', { query, params });

      const result = await queryBuilder.getMany();
      this.logger.debug(`${result.length} usuários encontrados`);

      return result;
    } catch (error) {
      this.logger.error('Erro ao filtrar usuários:', error);
      if (error instanceof Error) {
        throw new Error(`Erro ao filtrar usuários: ${error.message}`);
      }
      throw new Error('Erro ao filtrar usuários');
    }
  }
}
