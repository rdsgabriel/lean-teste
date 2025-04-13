export interface UserResponse {
  id: number;
  username: string;
  name: string;
  isActive: boolean;
}

export interface CreateUserDto {
  username: string;
  password: string;
  name: string;
}

export interface User extends CreateUserDto {
  id: number;
  isActive: boolean;
  password: string;
}
