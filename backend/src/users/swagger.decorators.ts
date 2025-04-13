import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { User } from './user.entity';
import { ApiQuery } from '@nestjs/swagger';
import { UserFilterDto } from './dto/filter.dto';

export function ApiOrderListUsers() {
  return applyDecorators(
    ApiOperation({ summary: 'Ordenar usuários' }),
    ApiResponse({
      status: 200,
      description: 'Lista de todos os usuários ordenados',
      type: [User],
    }),
  );
}

export function ApiFindUserById() {
  return applyDecorators(
    ApiOperation({ summary: 'Buscar usuário por ID' }),
    ApiParam({ name: 'id', type: 'number', description: 'ID do usuário' }),
    ApiResponse({
      status: 200,
      description: 'Detalhes do usuário',
      type: User,
    }),
    ApiResponse({ status: 404, description: 'Usuário não encontrado' }),
  );
}

export function ApiCreateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Criar novo usuário' }),
    ApiBody({
      description: 'Dados do usuário para criação',
      schema: {
        type: 'object',
        properties: {
          username: { type: 'string' },
          password: { type: 'string' },
          name: { type: 'string' },
          phone: { type: 'string' },
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Usuário criado com sucesso',
      type: User,
    }),
    ApiResponse({ status: 400, description: 'Requisição inválida' }),
  );
}

export function ApiUpdateUserStatus() {
  return applyDecorators(
    ApiOperation({ summary: 'Atualizar status do usuário' }),
    ApiParam({ name: 'id', type: 'number', description: 'ID do usuário' }),
    ApiBody({
      description: 'Dados para atualização do status',
      schema: {
        type: 'object',
        properties: { status: { type: 'boolean' } },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Status do usuário atualizado com sucesso',
      type: User,
    }),
    ApiResponse({ status: 404, description: 'Usuário não encontrado' }),
  );
}

export function ApiOrderByQuery() {
  return ApiQuery({
    name: 'orderBy',
    required: false,
    description:
      'Coluna pela qual os resultados serão ordenados (id, nome, telefone, dataCadastro, status)',
    example: 'name',
  });
}

export function ApiOrderQuery() {
  return ApiQuery({
    name: 'order',
    required: false,
    description: 'Direção da ordenação (ASC ou DESC)',
    example: 'ASC',
  });
}

export function ApiSearchUsers() {
  return applyDecorators(
    ApiOperation({
      summary: 'Busca usuários por ID, nome ou telefone',
      description:
        'Realiza a busca por um termo que pode ser um número (ID) ou texto (nome ou telefone)',
    }),
    ApiQuery({
      name: 'searchTerm',
      type: String,
      description: 'Termo de busca para pesquisar por ID, nome ou telefone',
    }),
    ApiResponse({
      status: 200,
      description: 'Usuários encontrados com base no termo de busca',
      type: [User],
    }),
  );
}

export function ApiFilterUsers() {
  return applyDecorators(
    ApiOperation({
      summary: 'Filtrar usuários',
      description:
        'Filtra usuários por ID, nome, telefone, status e data de cadastro com diferentes operadores',
    }),
    ApiBody({
      type: UserFilterDto,
      description: 'Filtros a serem aplicados',
      examples: {
        id: {
          summary: 'Filtro por ID',
          value: {
            filters: [
              {
                field: 'ID',
                operator: 'é',
                value: '1',
              },
            ],
          },
        },
        name: {
          summary: 'Filtro por nome',
          value: {
            filters: [
              {
                field: 'Nome',
                operator: 'contém',
                value: 'João',
              },
            ],
          },
        },
        phone: {
          summary: 'Filtro por telefone',
          value: {
            filters: [
              {
                field: 'Telefone',
                operator: 'é',
                value: '11999999999',
              },
            ],
          },
        },
        status: {
          summary: 'Filtro por status',
          value: {
            filters: [
              {
                field: 'Status',
                operator: 'é',
                booleanValue: true,
              },
            ],
          },
        },
        singleDate: {
          summary: 'Filtro por data específica',
          value: {
            filters: [
              {
                field: 'Data de cadastro',
                operator: 'é',
                dateValue: '2024-04-12',
              },
            ],
          },
        },
        dateRange: {
          summary: 'Filtro por intervalo de datas',
          value: {
            filters: [
              {
                field: 'Data de cadastro',
                operator: 'maior que',
                dateValue: '2024-01-01',
              },
              {
                field: 'Data de cadastro',
                operator: 'menor que',
                dateValue: '2024-12-31',
              },
            ],
          },
        },
        multipleFilters: {
          summary: 'Múltiplos filtros combinados',
          value: {
            filters: [
              {
                field: 'Nome',
                operator: 'contém',
                value: 'Silva',
              },
              {
                field: 'Status',
                operator: 'é',
                booleanValue: true,
              },
              {
                field: 'Data de cadastro',
                operator: 'maior que',
                dateValue: '2024-01-01',
              },
            ],
          },
        },
        orCondition: {
          summary: 'Filtros com operador OU',
          value: {
            filters: [
              {
                field: 'Nome',
                operator: 'contém',
                value: 'João',
              },
              {
                field: 'Nome',
                operator: 'ou',
                value: 'Maria',
              },
            ],
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Lista de usuários que correspondem aos filtros',
      type: [User],
    }),
  );
}

export function ApiFindAllUsers() {
  return applyDecorators(
    ApiOperation({
      summary: 'Listar todos os usuários com paginação',
      description: 'Retorna uma lista paginada de usuários',
    }),
    ApiResponse({
      status: 200,
      description: 'Usuários recuperados com sucesso',
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                phone: { type: 'string' },
                isActive: { type: 'boolean' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
              },
            },
          },
          total: { type: 'number' },
          page: { type: 'number' },
          limit: { type: 'number' },
          totalPages: { type: 'number' },
        },
      },
    }),
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      description: 'Número da página (padrão: 1)',
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      description: 'Número de itens por página (padrão: 10, máximo: 10)',
    }),
  );
}
