"use client"

import { Menu, MenuItem, Typography } from '@mui/material'
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material'

interface UserStatusMenuProps {
  anchorEl: HTMLElement | null
  selectedRow: number | null
  onClose: () => void
  onActivate: () => void
  onDeactivate: () => void
}

export const UserStatusMenu = ({ 
  anchorEl, 
  selectedRow, 
  onClose, 
  onActivate, 
  onDeactivate 
}: UserStatusMenuProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem disabled>
        <Typography variant="body2" color="textSecondary">
          Mudar status
        </Typography>
      </MenuItem>
      <MenuItem onClick={onActivate} sx={{ color: 'green' }}>
        <CheckIcon fontSize="small" sx={{ mr: 1 }} />
        Ativar
      </MenuItem>
      <MenuItem onClick={onDeactivate} sx={{ color: 'red' }}>
        <CloseIcon fontSize="small" sx={{ mr: 1 }} />
        Inativar
      </MenuItem>
    </Menu>
  )
} 