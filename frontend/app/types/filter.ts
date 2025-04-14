import {FilterFieldValue, FilterOperatorValue } from '../constants/filterOptions'

export interface Filter {
  field: FilterFieldValue
  operator: FilterOperatorValue
  value?: string
  dateValue?: string
  booleanValue?: boolean
}

export interface FilterChangeHandler {
  (filters: Filter[]): void
} 