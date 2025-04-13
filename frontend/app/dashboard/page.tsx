"use client"

import React from "react"
import { 
  Box, 
  Typography,
  CircularProgress,
} from '@mui/material'
import { DataGrid, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid'
import { useUsers } from "../hooks/useUsers"
import { UserStatus } from "../components/UserStatus"
import { UserActions } from "../components/UserActions"
import { UsersFilters } from "../components/UsersFilters"

export default function Dashboard() {
  const {
    users,
    totalUsers,
    isLoading,
    error,
    toggleStatus
  } = useUsers({
    page: 1,
    perPage: 10
  })

  const columns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 90 
    },
    {
      field: 'name',
      headerName: 'Nome',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'phone',
      headerName: 'Telefone',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'createdAt',
      headerName: 'Data de cadastro',
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) => 
        new Date(params.row.createdAt).toLocaleDateString('pt-BR'),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 120,
      renderCell: (params: GridRenderCellParams) => (
        <UserStatus 
          status={params.row.isActive ? "active" : "inactive"}
          onToggle={() => toggleStatus.mutate({ userId: params.row.id, status: !params.row.isActive })}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <UserActions 
          userData={params.row}
          onToggleStatus={({ userId, status }) => toggleStatus.mutate({ userId, status })}
        />
      ),
    },
  ]

  if (isLoading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '100vh',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography color="error">
          Erro ao carregar usuários. Por favor, tente novamente.
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3, bgcolor: '#FAFAFA', minHeight: '100vh' }}>
      <Typography 
        variant="h1" 
        sx={{ 
          fontSize: '2rem',
          fontWeight: 500,
          color: '#18181B',
          mb: 3
        }}
      >
        Usuários
      </Typography>

      <UsersFilters />

      <Box sx={{ 
        bgcolor: "white", 
        borderRadius: 1, 
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        mt: 3
      }}>
        <DataGrid
          rows={users}
          columns={columns}
          rowCount={totalUsers}
          loading={isLoading}
          pageSizeOptions={[10, 25, 50]}
          paginationMode="server"
          filterMode="server"
          sortingMode="server"
          disableRowSelectionOnClick
          keepNonExistentRowsSelected
          autoHeight
          sx={{
            border: 'none',
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: 'background.paper',
              color: 'text.primary',
              fontWeight: 500,
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid',
              borderColor: 'divider',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        />
      </Box>
    </Box>
  )
} 