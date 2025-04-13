import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

export function ApiLogin() {
  return applyDecorators(
    ApiOperation({
      summary: 'Realizar login',
      description: 'Autentica o usuário e retorna um token JWT',
    }),
    ApiBody({
      type: LoginDto,
      description: 'Credenciais do usuário',
      examples: {
        validLogin: {
          summary: 'Login válido',
          value: {
            username: 'joao.silva',
            password: 'senha123',
          },
        },
        invalidLogin: {
          summary: 'Login inválido',
          value: {
            username: 'usuario_inexistente',
            password: 'senha_errada',
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Login realizado com sucesso',
      schema: {
        example: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          user: {
            id: 1,
            username: 'joao.silva',
            name: 'João Silva',
            isActive: true,
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Credenciais inválidas',
      schema: {
        example: {
          statusCode: 401,
          message: 'Credenciais inválidas',
        },
      },
    }),
  );
}

export function ApiRefreshToken() {
  return applyDecorators(
    ApiOperation({ summary: 'Atualizar token de acesso' }),
    ApiBody({ type: RefreshTokenDto }),
    ApiResponse({
      status: 200,
      description: 'Token atualizado com sucesso',
      schema: {
        example: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          user: {
            id: 1,
            username: 'joao.silva',
            name: 'João Silva',
            isActive: true,
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Token inválido ou expirado',
      schema: {
        example: {
          statusCode: 401,
          message: 'Token inválido ou expirado',
        },
      },
    }),
  );
}
