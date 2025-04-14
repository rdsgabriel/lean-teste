export const SORT_OPTIONS = [
  { label: 'ID', value: 'id' },
  { label: 'Nome', value: 'name' },
  { label: 'Telefone', value: 'phone' },
  { label: 'Data de cadastro', value: 'createdAt' },
  { label: 'Status', value: 'isActive' }
] as const

export const FILTER_OPTIONS = ['Data de cadastro'] as const

export type SortField = typeof SORT_OPTIONS[number]['value']
export type SortOrder = 'ASC' | 'DESC' 