"use client"

import { useState } from 'react'
import { 
  IconButton, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Typography
} from '@mui/material'
import { 
  MoreVert as MoreVertIcon,
  CheckCircleOutline as ActiveIcon,
  HighlightOff as InactiveIcon
} from '@mui/icons-material'

interface UserActionsProps {
  userData: {
    id: number
    isActive: boolean
  }
  onToggleStatus: (params: { userId: number, status: boolean }) => void
}

export function UserActions({ userData, onToggleStatus }: UserActionsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleToggleStatus = () => {
    onToggleStatus({ 
      userId: userData.id, 
      status: !userData.isActive 
    })
    handleClose()
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleToggleStatus}>
          <ListItemIcon>
            {userData.isActive ? (
              <InactiveIcon fontSize="small" sx={{ color: '#ef4444' }} />
            ) : (
              <ActiveIcon fontSize="small" sx={{ color: '#22c55e' }} />
            )}
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body2" color={userData.isActive ? '#991b1b' : '#166534'}>
              {userData.isActive ? 'Inativar' : 'Ativar'}
            </Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
} 