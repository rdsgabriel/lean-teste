import { TextField, InputAdornment } from "@mui/material"
import { Search } from "@mui/icons-material"

interface SearchFieldProps {
  value: string
  onChange: (value: string) => void
}

export function SearchField({ value, onChange }: SearchFieldProps) {
  return (
    <TextField
      placeholder="Pesquisar ID ou nome ou telefone..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
  )
} 