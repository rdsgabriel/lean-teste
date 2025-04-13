"use client"

import { AppBar, Toolbar, Box, Typography, Avatar } from '@mui/material'

export const DashboardHeader = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'text.primary', boxShadow: 1 }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 5 }}>
            LOGO
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            <Typography 
              sx={{ 
                px: 1, 
                pb: 2, 
                color: 'purple.main', 
                borderBottom: '2px solid purple', 
                cursor: 'pointer'
              }}
            >
              Clientes
            </Typography>
            <Typography sx={{ px: 1, pb: 2, color: 'text.secondary', cursor: 'pointer' }}>
              Endereços
            </Typography>
            <Typography sx={{ px: 1, pb: 2, color: 'text.secondary', cursor: 'pointer' }}>
              Entregas
            </Typography>
          </Box>
        </Box>
        <Avatar sx={{ bgcolor: 'purple', width: 32, height: 32 }}>W</Avatar>
      </Toolbar>
    </AppBar>
  )
} 