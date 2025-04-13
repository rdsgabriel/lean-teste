import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import {
  User,
  UserResponse,
  TokenPayload,
  AuthResponse,
} from './types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserResponse | null> {
    try {
      const user = (await this.usersService.findOneByUsername(
        username,
      )) as User | null;
      if (!user) {
        return null;
      }

      if (!user.isActive) {
        throw new UnauthorizedException('Usuário está inativo');
      }

      const isPasswordValid = await argon2.verify(user.password, password);
      if (!isPasswordValid) {
        return null;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _pwd, ...result } = user;
      return result as UserResponse;
    } catch {
      return null;
    }
  }

  private generateTokens(user: UserResponse): AuthResponse {
    const payload: TokenPayload = {
      sub: user.id,
      username: user.username,
      type: 'access',
    };

    const refreshPayload: TokenPayload = {
      ...payload,
      type: 'refresh',
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(refreshPayload, {
        expiresIn: this.configService.get<string>('jwt.refreshExpiresIn'),
      }),
      user,
    };
  }

  async login(username: string, password: string): Promise<AuthResponse> {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return this.generateTokens(user);
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const decoded = this.jwtService.verify(refreshToken);
      const payload = decoded as TokenPayload;

      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Token inválido');
      }

      const user = (await this.usersService.findOne(
        payload.sub,
      )) as User | null;
      if (!user || !user.isActive) {
        throw new UnauthorizedException('Usuário não encontrado ou inativo');
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _pwd, ...userResponse } = user;
      return this.generateTokens(userResponse as UserResponse);
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }

  async validateToken() {
    try {
      // O token já foi validado pelo JwtAuthGuard
      // Se chegou aqui, o token é válido
      return { valid: true };
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
