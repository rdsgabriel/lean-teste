import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('usuarios')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos os usuários',
    type: [User],
  })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Detalhes do usuário', type: User })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar novo usuário' })
  @ApiBody({
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
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  async create(
    @Body()
    body: {
      username: string;
      password: string;
      name: string;
      phone: string;
    },
  ): Promise<User> {
    return this.usersService.create(
      body.username,
      body.password,
      body.name,
      body.phone,
    );
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Atualizar status do usuário' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID do usuário' })
  @ApiBody({
    description: 'Dados para atualização do status',
    schema: {
      type: 'object',
      properties: { status: { type: 'boolean' } },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Status do usuário atualizado com sucesso',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async updateStatus(
    @Param('id') id: number,
    @Body() body: { status: boolean },
  ): Promise<User> {
    return this.usersService.updateStatus(id, body.status);
  }
}
