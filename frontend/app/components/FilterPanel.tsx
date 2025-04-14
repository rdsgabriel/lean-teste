import {
  Paper,
  Stack,
  IconButton,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material"
import { Close, Add, FilterAlt } from "@mui/icons-material"
import { FILTER_FIELDS, FIELD_OPERATORS, FilterFieldValue, FilterOperatorValue } from "../constants/filterOptions"
import { Filter, FilterChangeHandler } from "../types/filter"
import { ChangeEvent, MouseEvent, useState } from "react"

interface FilterPanelProps {
  filters: Filter[]
  onFilterChange: FilterChangeHandler
}

export function FilterPanel({ filters: initialFilters, onFilterChange }: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<Filter[]>(initialFilters)

  const handleRemoveFilter = (index: number) => {
    const newFilters = localFilters.filter((_, i) => i !== index)
    setLocalFilters(newFilters)
  }

  const handleFilterChange = (
    index: number,
    field: keyof Filter,
    value: string | boolean | Date | null
  ) => {
    const newFilters = localFilters.map((filter, i) => {
      if (i !== index) return filter

      // Reset values when changing field
      if (field === 'field') {
        const newField = value as FilterFieldValue
        return {
          field: newField,
          operator: FIELD_OPERATORS[newField][0]
        }
      }

      // Handle different value types based on field
      if (field === 'value' || field === 'dateValue' || field === 'booleanValue') {
        const newFilter = { ...filter }
        delete newFilter.value
        delete newFilter.dateValue
        delete newFilter.booleanValue
        
        if (filter.field === FILTER_FIELDS.IS_ACTIVE) {
          return { ...newFilter, booleanValue: value === 'true' }
        } else if (filter.field === FILTER_FIELDS.CREATED_AT) {
          return { ...newFilter, dateValue: typeof value === 'string' ? value : (value as Date)?.toISOString().split('T')[0] }
        } else {
          return { ...newFilter, value: value as string }
        }
      }

      return { ...filter, [field]: value }
    }) as Filter[]

    setLocalFilters(newFilters)
  }

  const handleAddFilter = (event: MouseEvent) => {
    event.preventDefault()
    const firstField = FILTER_FIELDS.ID
    setLocalFilters([
      ...localFilters,
      {
        field: firstField,
        operator: FIELD_OPERATORS[firstField][0]
      }
    ])
  }

  const handleRemoveAll = (event: MouseEvent) => {
    event.preventDefault()
    setLocalFilters([])
    onFilterChange([])
  }

  const handleApplyFilters = () => {
    onFilterChange(localFilters)
  }

  const renderValueInput = (filter: Filter, index: number) => {
    if (filter.field === FILTER_FIELDS.IS_ACTIVE) {
      return (
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={filter.booleanValue?.toString() ?? 'true'}
            onChange={(e) => handleFilterChange(index, 'booleanValue', e.target.value)}
          >
            <MenuItem value="true">Ativo</MenuItem>
            <MenuItem value="false">Inativo</MenuItem>
          </Select>
        </FormControl>
      )
    }

    if (filter.field === FILTER_FIELDS.CREATED_AT) {
      return (
        <TextField
          type="date"
          size="small"
          value={filter.dateValue ?? ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleFilterChange(index, 'dateValue', e.target.value)}
          sx={{ width: 200 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )
    }

    return (
      <TextField
        size="small"
        value={filter.value ?? ''}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleFilterChange(index, 'value', e.target.value)}
        placeholder={filter.field === FILTER_FIELDS.ID ? "Digite o ID..." : "Digite o valor..."}
        sx={{ width: 200 }}
      />
    )
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "8px",
      }}
    >
      <Stack spacing={2} onClick={(e) => e.stopPropagation()}>
        {localFilters.map((filter, index) => (
          <Stack key={index} direction="row" spacing={2} alignItems="center">
            <IconButton
              size="small"
              onClick={() => handleRemoveFilter(index)}
              sx={{ color: "error.main" }}
            >
              <Close fontSize="small" />
            </IconButton>

            <Typography variant="body2" color="text.secondary">
              {index > 0 ? "ou" : "e"}
            </Typography>

            <FormControl size="small" sx={{ minWidth: 200 }}>
              <Select
                value={filter.field}
                onChange={(e) => handleFilterChange(index, "field", e.target.value)}
              >
                {Object.entries(FILTER_FIELDS).map(([key, value]) => (
                  <MenuItem key={key} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={filter.operator}
                onChange={(e) => handleFilterChange(index, "operator", e.target.value)}
              >
                {FIELD_OPERATORS[filter.field].map((operator: FilterOperatorValue) => (
                  <MenuItem key={operator} value={operator}>
                    {operator}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {renderValueInput(filter, index)}
          </Stack>
        ))}

        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button
            startIcon={<Add />}
            onClick={handleAddFilter}
            sx={{ color: "primary.main", textTransform: "none" }}
          >
            Adicionar filtro
          </Button>

          <Stack direction="row" spacing={2}>
            <Button
              color="error"
              onClick={handleRemoveAll}
              sx={{ textTransform: "none" }}
            >
              Remover todos
            </Button>
            
            <Button
              variant="contained"
              startIcon={<FilterAlt />}
              onClick={handleApplyFilters}
              sx={{ textTransform: "none" }}
            >
              Aplicar filtros
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  )
}