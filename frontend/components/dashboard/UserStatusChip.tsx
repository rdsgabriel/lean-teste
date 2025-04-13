"use client"

import { Chip } from '@mui/material'

interface UserStatusChipProps {
  active: boolean
}

export const UserStatusChip = ({ active }: UserStatusChipProps) => {
  return (
    <Chip 
      label={active ? "Ativo" : "Inativo"} 
      color={active ? "success" : "error"}
      size="small"
      sx={{ 
        backgroundColor: active ? 'rgba(84, 214, 44, 0.16)' : 'rgba(255, 72, 66, 0.16)',
        color: active ? 'rgb(34, 154, 22)' : 'rgb(183, 33, 54)',
        fontWeight: 'bold'
      }}
    />
  )
} 