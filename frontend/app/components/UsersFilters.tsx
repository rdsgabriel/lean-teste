import {
  Stack,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material"
import { Search, KeyboardArrowDown } from "@mui/icons-material"
import { useState, useCallback, useRef } from "react"
import { SORT_OPTIONS, FILTER_OPTIONS, type SortField } from "../constants/sortOptions"
import { FilterMenu } from "./FilterMenu"

interface UsersFiltersProps {
  searchValue: string
  onSearchChange: (value: string) => void
  onSort: (field: SortField) => void
  selectedSort?: SortField
}

const useSearch = (onSearchChange: (value: string) => void) => {
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value)
    searchInputRef.current?.focus()
  }, [onSearchChange])

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 0)
  }, [])

  return { searchInputRef, handleSearch, handleBlur }
}

const useMenuState = () => {
  const [orderByAnchorEl, setOrderByAnchorEl] = useState<null | HTMLElement>(null)
  const [filtersAnchorEl, setFiltersAnchorEl] = useState<null | HTMLElement>(null)

  const handleOrderByClick = (event: React.MouseEvent<HTMLElement>) => {
    setOrderByAnchorEl(event.currentTarget)
  }

  const handleFiltersClick = (event: React.MouseEvent<HTMLElement>) => {
    setFiltersAnchorEl(event.currentTarget)
  }

  return {
    orderByAnchorEl,
    filtersAnchorEl,
    handleOrderByClick,
    handleFiltersClick,
    closeOrderBy: () => setOrderByAnchorEl(null),
    closeFilters: () => setFiltersAnchorEl(null)
  }
}

const filterButtonStyle = {
  color: '#7C3AED',
  textTransform: 'none',
  minWidth: 'auto',
  "&:hover": {
    backgroundColor: 'transparent',
  }
} as const

const searchFieldStyle = {
  width: '320px',
  "& .MuiOutlinedInput-root": {
    backgroundColor: '#fff',
    "& fieldset": {
      borderColor: '#E4E4E7',
    },
    "&:hover fieldset": {
      borderColor: '#E4E4E7',
    },
    "&.Mui-focused fieldset": {
      borderColor: '#7C3AED',
    },
  }
} as const

export function UsersFilters({ 
  searchValue, 
  onSearchChange, 
  onSort,
  selectedSort 
}: UsersFiltersProps) {
  const { searchInputRef, handleSearch, handleBlur } = useSearch(onSearchChange)
  const { 
    orderByAnchorEl,
    filtersAnchorEl,
    handleOrderByClick,
    handleFiltersClick,
    closeOrderBy,
    closeFilters
  } = useMenuState()

  const selectedSortLabel = selectedSort 
    ? SORT_OPTIONS.find(opt => opt.value === selectedSort)?.label 
    : undefined

  const handleSort = (option: string) => {
    const sortOption = SORT_OPTIONS.find(opt => opt.label === option)
    if (sortOption) {
      onSort(sortOption.value)
    }
  }

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <TextField
        placeholder="Pesquisar ID ou nome ou telefone..."
        value={searchValue}
        onChange={handleSearch}
        onBlur={handleBlur}
        size="small"
        inputRef={searchInputRef}
        autoComplete="off"
        sx={searchFieldStyle}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: '#71717A' }} />
            </InputAdornment>
          ),
        }}
      />

      <Button
        onClick={handleOrderByClick}
        endIcon={<KeyboardArrowDown />}
        sx={filterButtonStyle}
      >
        Ordenar por{selectedSortLabel ? ` (${selectedSortLabel})` : ''}
      </Button>

      <Button
        onClick={handleFiltersClick}
        endIcon={<KeyboardArrowDown />}
        sx={filterButtonStyle}
      >
        Filtros
      </Button>

      <FilterMenu 
        anchorEl={orderByAnchorEl}
        onClose={closeOrderBy}
        options={SORT_OPTIONS.map(opt => opt.label)}
        onSelect={handleSort}
      />

      <FilterMenu 
        anchorEl={filtersAnchorEl}
        onClose={closeFilters}
        options={[...FILTER_OPTIONS]}
        onSelect={() => {}}
      />
    </Stack>
  )
} 