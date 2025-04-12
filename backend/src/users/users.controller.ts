import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import {
  ApiOrderListUsers,
  ApiFindUserById,
  ApiCreateUser,
  ApiUpdateUserStatus,
  ApiOrderByQuery,
  ApiOrderQuery,
  ApiSearchUsers,
  ApiFilterUsers,
} from './swagger.decorators';
import { UserFilterDto } from './dto/filter.dto';

@Controller('usuarios')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOrderListUsers()
  @ApiOrderByQuery()
  @ApiOrderQuery()
  async orderBy(
    @Query('orderBy') orderBy: string = 'id',
    @Query('order') order: 'ASC' | 'DESC' = 'ASC',
  ): Promise<User[]> {
    return this.usersService.orderBy(orderBy, order);
  }

  @Get('search')
  @ApiSearchUsers()
  async searchUsers(@Query('searchTerm') searchTerm: string): Promise<User[]> {
    return this.usersService.findBySearchTerm(searchTerm);
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
  ) {
    const user = await this.usersService.updateStatus(id, body.status);
    return {
      user,
      sqsSimulation: {
        message: {
          userId: user.id,
          newStatus: user.isActive,
          timestamp: new Date().toISOString(),
          action: 'UPDATE_STATUS',
        },
        status: 'success',
        details: 'Mensagem enviada com sucesso para a fila SQS (simulação)',
      },
    };
  }

  @Post('filter')
  @ApiFilterUsers()
  async findWithFilters(@Body() filterDto: UserFilterDto): Promise<User[]> {
    return this.usersService.findWithFilters(filterDto);
  }
}
