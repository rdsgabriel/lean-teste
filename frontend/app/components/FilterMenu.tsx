import { Menu, MenuItem } from "@mui/material"

interface FilterMenuProps {
  anchorEl: HTMLElement | null
  onClose: () => void
  options: string[]
  onSelect: (option: string) => void
}

export function FilterMenu({ anchorEl, onClose, options, onSelect }: FilterMenuProps) {
  const handleSelect = (option: string) => {
    onSelect(option)
    onClose()
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      {options.map((option) => (
        <MenuItem key={option} onClick={() => handleSelect(option)}>
          {option}
        </MenuItem>
      ))}
    </Menu>
  )
} 