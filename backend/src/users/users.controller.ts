import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import {
  ApiListUsers,
  ApiFindUserById,
  ApiCreateUser,
  ApiUpdateUserStatus,
} from './swagger.decorators';

@Controller('usuarios')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiListUsers()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiFindUserById()
  async findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiCreateUser()
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
  @ApiUpdateUserStatus()
  async updateStatus(
    @Param('id') id: number,
    @Body() body: { status: boolean },
  ): Promise<User> {
    return this.usersService.updateStatus(id, body.status);
  }
}
