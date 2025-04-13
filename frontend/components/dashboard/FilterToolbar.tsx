"use client"

import { Stack, IconButton, Typography } from '@mui/material'
import { FilterList as FilterIcon, Sort as SortIcon } from '@mui/icons-material'
import { GridFilterModel } from '@mui/x-data-grid'

interface FilterToolbarProps {
  onSortClick: () => void
  filterModel: GridFilterModel
  setFilterModel: (model: GridFilterModel) => void
}

export const FilterToolbar = ({ 
  onSortClick, 
  filterModel,
  setFilterModel 
}: FilterToolbarProps) => {
  const handleFilterClick = () => {
    const newFilterModel = { ...filterModel }
    newFilterModel.items = [
      ...filterModel.items, 
      { 
        field: 'name', 
        operator: 'contains', 
        value: '' 
      }
    ]
    setFilterModel(newFilterModel)
  }

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="flex-end" spacing={2} mb={2}>
      <IconButton 
        sx={{ 
          border: '1px solid purple', 
          color: 'purple',
          borderRadius: '4px',
          p: 1
        }}
        onClick={onSortClick}
      >
        <SortIcon fontSize="small" />
        <Typography sx={{ ml: 1 }}>Ordenar por</Typography>
      </IconButton>
      
      <IconButton 
        sx={{ 
          border: '1px solid purple', 
          color: 'purple',
          borderRadius: '4px',
          p: 1
        }}
        onClick={handleFilterClick}
      >
        <FilterIcon fontSize="small" />
        <Typography sx={{ ml: 1 }}>Filtros</Typography>
      </IconButton>
    </Stack>
  )
} 