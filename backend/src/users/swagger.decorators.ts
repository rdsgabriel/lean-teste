import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { User } from './user.entity';

export function ApiListUsers() {
  return applyDecorators(
    ApiOperation({ summary: 'Listar todos os usuários' }),
    ApiResponse({
      status: 200,
      description: 'Lista de todos os usuários',
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
