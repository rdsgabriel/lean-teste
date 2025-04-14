export const FILTER_FIELDS = {
  ID: 'ID',
  NAME: 'Nome',
  PHONE: 'Telefone',
  IS_ACTIVE: 'Status',
  CREATED_AT: 'Data de cadastro'
} as const

export const FILTER_OPERATORS = {
  EQUALS: 'é',
  CONTAINS: 'contém',
  GREATER_THAN: 'maior que',
  LESS_THAN: 'menor que'
} as const

export type FilterFieldKey = keyof typeof FILTER_FIELDS
export type FilterFieldValue = typeof FILTER_FIELDS[FilterFieldKey]
export type FilterOperatorValue = typeof FILTER_OPERATORS[keyof typeof FILTER_OPERATORS]

export const FIELD_OPERATORS: Record<FilterFieldValue, FilterOperatorValue[]> = {
  [FILTER_FIELDS.ID]: [FILTER_OPERATORS.EQUALS],
  [FILTER_FIELDS.NAME]: [FILTER_OPERATORS.EQUALS, FILTER_OPERATORS.CONTAINS],
  [FILTER_FIELDS.PHONE]: [FILTER_OPERATORS.EQUALS, FILTER_OPERATORS.CONTAINS],
  [FILTER_FIELDS.IS_ACTIVE]: [FILTER_OPERATORS.EQUALS],
  [FILTER_FIELDS.CREATED_AT]: [
    FILTER_OPERATORS.EQUALS,
    FILTER_OPERATORS.GREATER_THAN,
    FILTER_OPERATORS.LESS_THAN
  ]
}

export type FilterField = keyof typeof FILTER_FIELDS
export type FilterOperator = typeof FILTER_OPERATORS[keyof typeof FILTER_OPERATORS] 