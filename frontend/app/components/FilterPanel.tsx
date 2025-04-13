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
  SelectChangeEvent,
} from "@mui/material"
import { Close, Add } from "@mui/icons-material"

interface Filter {
  column: string
  operator: string
  value: string
}

interface FilterPanelProps {
  filters: Filter[]
  onFilterChange: (filters: Filter[]) => void
}

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  const handleRemoveFilter = (index: number) => {
    const newFilters = filters.filter((_, i) => i !== index)
    onFilterChange(newFilters)
  }

  const handleFilterChange = (
    index: number,
    field: keyof Filter,
    value: string
  ) => {
    const newFilters = filters.map((filter, i) =>
      i === index ? { ...filter, [field]: value } : filter
    )
    onFilterChange(newFilters)
  }

  const handleAddFilter = () => {
    onFilterChange([...filters, { column: "data_cadastro", operator: "é", value: "" }])
  }

  const handleRemoveAll = () => {
    onFilterChange([])
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
              {index > 0 ? "ou" : "e"}
            </Typography>

            <FormControl size="small" sx={{ minWidth: 200 }}>
              <Select
                value={filter.column}
                onChange={(e: SelectChangeEvent) =>
                  handleFilterChange(index, "column", e.target.value)
                }
              >
                <MenuItem value="data_cadastro">Data de cadastro</MenuItem>
                <MenuItem value="status">Status</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={filter.operator}
                onChange={(e: SelectChangeEvent) =>
                  handleFilterChange(index, "operator", e.target.value)
                }
              >
                <MenuItem value="é">é</MenuItem>
                <MenuItem value="não é">não é</MenuItem>
                <MenuItem value="contém">contém</MenuItem>
              </Select>
            </FormControl>

            <TextField
              size="small"
              value={filter.value}
              onChange={(e) => handleFilterChange(index, "value", e.target.value)}
              placeholder="dd/mm/aaaa"
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
            onClick={handleRemoveAll}
            sx={{ textTransform: "none" }}
          >
            Remover todos
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )
} 