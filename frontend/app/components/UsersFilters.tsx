import {
  Stack,
  TextField,
  Button,
  Menu,
  MenuItem,
  InputAdornment,
} from "@mui/material"
import { Search, KeyboardArrowDown } from "@mui/icons-material"
import { useState } from "react"

export function UsersFilters() {
  const [searchQuery, setSearchQuery] = useState("")
  const [orderByAnchorEl, setOrderByAnchorEl] = useState<null | HTMLElement>(null)
  const [filtersAnchorEl, setFiltersAnchorEl] = useState<null | HTMLElement>(null)

  const handleOrderByClick = (event: React.MouseEvent<HTMLElement>) => {
    setOrderByAnchorEl(event.currentTarget)
  }

  const handleFiltersClick = (event: React.MouseEvent<HTMLElement>) => {
    setFiltersAnchorEl(event.currentTarget)
  }

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <TextField
        placeholder="Pesquisar ID ou nome ou telefone..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        size="small"
        sx={{
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
        }}
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
        sx={{
          color: '#7C3AED',
          textTransform: 'none',
          minWidth: 'auto',
          "&:hover": {
            backgroundColor: 'transparent',
          }
        }}
      >
        Ordenar por
      </Button>

      <Button
        onClick={handleFiltersClick}
        endIcon={<KeyboardArrowDown />}
        sx={{
          color: '#7C3AED',
          textTransform: 'none',
          minWidth: 'auto',
          "&:hover": {
            backgroundColor: 'transparent',
          }
        }}
      >
        Filtros
      </Button>

      <Menu
        anchorEl={orderByAnchorEl}
        open={Boolean(orderByAnchorEl)}
        onClose={() => setOrderByAnchorEl(null)}
      >
        <MenuItem onClick={() => setOrderByAnchorEl(null)}>ID</MenuItem>
        <MenuItem onClick={() => setOrderByAnchorEl(null)}>Nome</MenuItem>
        <MenuItem onClick={() => setOrderByAnchorEl(null)}>Telefone</MenuItem>
        <MenuItem onClick={() => setOrderByAnchorEl(null)}>Data de cadastro</MenuItem>
        <MenuItem onClick={() => setOrderByAnchorEl(null)}>Status</MenuItem>
      </Menu>

      <Menu
        anchorEl={filtersAnchorEl}
        open={Boolean(filtersAnchorEl)}
        onClose={() => setFiltersAnchorEl(null)}
      >
        <MenuItem onClick={() => setFiltersAnchorEl(null)}>Data de cadastro</MenuItem>
      </Menu>
    </Stack>
  )
} 