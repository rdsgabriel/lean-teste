import { Menu, MenuItem } from "@mui/material"

interface SortMenuProps {
  anchorEl: HTMLElement | null
  onClose: () => void
  options: string[]
  onSelect: (option: string) => void
}

export function SortMenu({ anchorEl, onClose, options, onSelect }: SortMenuProps) {
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