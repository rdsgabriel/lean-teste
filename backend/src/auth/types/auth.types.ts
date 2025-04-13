export interface User {
  id: number;
  username: string;
  name: string;
  password: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserResponse {
  id: number;
  username: string;
  name: string;
  isActive: boolean;
}

export interface TokenPayload {
  sub: number;
  username: string;
  type: 'access' | 'refresh';
  iat?: number;
  exp?: number;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: UserResponse;
}
