/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum FilterOperator {
  EQUALS = 'é',
  OR = 'ou',
  CONTAINS = 'contém',
  GREATER_THAN = 'maior que',
  LESS_THAN = 'menor que',
}

export enum FilterField {
  ID = 'ID',
  NAME = 'Nome',
  PHONE = 'Telefone',
  IS_ACTIVE = 'Status',
  CREATED_AT = 'Data de cadastro',
}

interface FilterCondition {
  condition: string;
  parameters: {
    id?: number;
    name?: string;
    phone?: string;
    isActive?: boolean;
    date?: Date;
  };
}

export class FilterDto {
  @ApiProperty({
    enum: FilterField,
    description: 'Campo a ser filtrado',
    example: FilterField.NAME,
  })
  @IsEnum(FilterField)
  field!: FilterField;

  @ApiProperty({
    enum: FilterOperator,
    description: 'Operador do filtro',
    example: FilterOperator.CONTAINS,
  })
  @IsEnum(FilterOperator)
  operator!: FilterOperator;

  @ApiProperty({
    required: false,
    description: 'Valor do filtro (para campos de texto ou número)',
    example: 'João',
  })
  @IsString()
  @IsOptional()
  value?: string;

  @ApiProperty({
    required: false,
    description: 'Valor do filtro (para campos de data)',
    example: '2024-04-12',
  })
  @IsDateString()
  @IsOptional()
  dateValue?: string;

  @ApiProperty({
    required: false,
    description: 'Valor do filtro (para campos booleanos)',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  booleanValue?: boolean;

  static buildCondition(filter: FilterDto): FilterCondition | null {
    let condition = '';
    let parameters: FilterCondition['parameters'] = {};

    switch (filter.field) {
      case FilterField.ID: {
        const value = filter.value;
        if (typeof value === 'string') {
          condition = 'user.id = :id';
          parameters = { id: parseInt(value) };
        }
        break;
      }
      case FilterField.NAME: {
        const value = filter.value;
        if (typeof value === 'string') {
          condition = 'LOWER(user.name) LIKE LOWER(:name)';
          parameters = { name: `%${value}%` };
        }
        break;
      }
      case FilterField.PHONE: {
        const value = filter.value;
        if (typeof value === 'string') {
          condition = 'user.phone = :phone';
          parameters = { phone: value };
        }
        break;
      }
      case FilterField.IS_ACTIVE: {
        const value = filter.booleanValue;
        if (typeof value === 'boolean') {
          condition = 'user.isActive = :isActive';
          parameters = { isActive: value };
        }
        break;
      }
      case FilterField.CREATED_AT: {
        const value = filter.dateValue;
        if (typeof value === 'string') {
          const date = new Date(value);
          if (!isNaN(date.getTime())) {
            if (filter.operator === FilterOperator.GREATER_THAN) {
              condition = 'user.createdAt > :date';
            } else if (filter.operator === FilterOperator.LESS_THAN) {
              condition = 'user.createdAt < :date';
            } else {
              condition = 'DATE(user.createdAt) = DATE(:date)';
            }
            parameters = { date };
          }
        }
        break;
      }
    }

    return condition ? { condition, parameters } : null;
  }
}

export class UserFilterDto {
  @ApiProperty({
    type: [FilterDto],
    required: false,
    description: 'Lista de filtros a serem aplicados',
  })
  @IsOptional()
  filters?: FilterDto[];
}
