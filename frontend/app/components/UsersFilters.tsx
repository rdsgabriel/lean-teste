import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Stack,
  Select,
  FormControl,
  Typography,
  Popover,
} from "@mui/material"
import { Search, ArrowDropDown, FilterList, Close, Add, CalendarToday } from "@mui/icons-material"
import { useState } from "react"

interface Filter {
  column: string
  operator: string
  value: string
}

export function UsersFilters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [orderByAnchorEl, setOrderByAnchorEl] = useState<null | HTMLElement>(null)
  const [filtersAnchorEl, setFiltersAnchorEl] = useState<null | HTMLElement>(null)
  const [filters, setFilters] = useState<Filter[]>([])

  const handleOrderByClick = (event: React.MouseEvent<HTMLElement>) => {
    setOrderByAnchorEl(event.currentTarget)
  }

  const handleFiltersClick = (event: React.MouseEvent<HTMLElement>) => {
    setFiltersAnchorEl(event.currentTarget)
  }

  const handleAddFilter = () => {
    setFilters([...filters, { column: "data_cadastro", operator: "é", value: "" }])
    setFiltersAnchorEl(null)
  }

  const handleRemoveFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index))
  }

  const handleRemoveAllFilters = () => {
    setFilters([])
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <TextField
          placeholder="Pesquisar ID ou nome ou telefone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          }}
        />

        <Button
          onClick={handleOrderByClick}
          endIcon={<ArrowDropDown />}
          sx={{
            color: "text.primary",
            borderRadius: "8px",
            textTransform: "none",
            border: "1px solid",
            borderColor: "divider",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              borderColor: "primary.main",
            },
          }}
        >
          Ordenar por
        </Button>

        <Button
          onClick={handleFiltersClick}
          endIcon={<FilterList />}
          sx={{
            color: "text.primary",
            borderRadius: "8px",
            textTransform: "none",
            border: "1px solid",
            borderColor: "divider",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              borderColor: "primary.main",
            },
          }}
        >
          Filtros
        </Button>
      </Stack>

      {filters.length > 0 && (
        <Box sx={{ bgcolor: "background.paper", borderRadius: 1, p: 2, border: "1px solid", borderColor: "divider" }}>
          <Stack spacing={2}>
            {filters.map((filter, index) => (
              <Stack key={index} direction="row" spacing={2} alignItems="center">
                <IconButton
                  size="small"
                  onClick={() => handleRemoveFilter(index)}
                  sx={{ color: "error.main" }}
                >
                  <Close fontSize="small" />
                </IconButton>

                <Typography variant="body2" color="text.secondary">
                  {index === 0 ? "e" : "ou"}
                </Typography>

                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <Select value={filter.column} variant="outlined">
                    <MenuItem value="data_cadastro">Data de cadastro</MenuItem>
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select value={filter.operator} variant="outlined">
                    <MenuItem value="é">é</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  size="small"
                  value={filter.value}
                  placeholder="dd/mm/aaaa"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarToday fontSize="small" sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: 200 }}
                />
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

              <Button
                color="error"
                onClick={handleRemoveAllFilters}
                sx={{ textTransform: "none" }}
              >
                Remover todos
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}

      <Menu
        anchorEl={orderByAnchorEl}
        open={Boolean(orderByAnchorEl)}
        onClose={() => setOrderByAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => setOrderByAnchorEl(null)}>ID</MenuItem>
        <MenuItem onClick={() => setOrderByAnchorEl(null)}>Nome</MenuItem>
        <MenuItem onClick={() => setOrderByAnchorEl(null)}>Telefone</MenuItem>
        <MenuItem onClick={() => setOrderByAnchorEl(null)}>Data de cadastro</MenuItem>
        <MenuItem onClick={() => setOrderByAnchorEl(null)}>Status</MenuItem>
      </Menu>

      <Popover
        anchorEl={filtersAnchorEl}
        open={Boolean(filtersAnchorEl)}
        onClose={() => setFiltersAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            width: 200,
            p: 1,
          },
        }}
      >
        <MenuItem onClick={handleAddFilter}>Data de cadastro</MenuItem>
      </Popover>
    </Box>
  )
} 