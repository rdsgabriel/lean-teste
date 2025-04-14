"use client"

import React, { useState } from "react"
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
import { Header } from "../components/Header"
import { type SortField, type SortOrder } from "../constants/sortOptions"
import type { Filter } from "../types/filter"

interface User {
  id: number
  name: string
  phone: string
  createdAt: string
  isActive: boolean
}

interface ToggleStatusParams {
  userId: number
  status: boolean
}

interface UsersTableProps {
  users: User[]
  totalUsers: number
  isLoading: boolean
  onToggleStatus: (params: ToggleStatusParams) => void
  onPageChange: (newPage: number) => void
  onPageSizeChange: (newPageSize: number) => void
  page: number
  pageSize: number
}

const COLUMNS = [
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
        onToggle={() => params.row.onToggleStatus({ 
          userId: params.row.id, 
          status: !params.row.isActive 
        })}
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
        onToggleStatus={params.row.onToggleStatus}
      />
    ),
  },
] as const

function LoadingState() {
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

function ErrorState() {
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

const useSearch = () => {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [debouncedSearch, setDebouncedSearch] = React.useState("")

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  return { searchTerm, setSearchTerm, debouncedSearch }
}

const usePagination = () => {
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)

  const handlePageChange = (newPage: number) => {
    setPage(newPage + 1)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
  }

  return {
    page,
    pageSize,
    handlePageChange,
    handlePageSizeChange
  }
}

const useSort = () => {
  const [sortField, setSortField] = React.useState<SortField>("id")
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("ASC")

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC")
    } else {
      setSortField(field)
      setSortOrder("ASC")
    }
  }

  return {
    sortField,
    sortOrder,
    handleSort
  }
}

function UsersTable({ users, totalUsers, isLoading, onToggleStatus, onPageChange, onPageSizeChange, page, pageSize }: UsersTableProps) {
  const rows = users.map(user => ({
    ...user,
    onToggleStatus
  }))

  return (
    <Box sx={{ 
      bgcolor: "white", 
      borderRadius: 1, 
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      mt: 3
    }}>
      <DataGrid
        rows={rows}
        columns={COLUMNS}
        rowCount={totalUsers}
        loading={isLoading}
        pageSizeOptions={[10, 25, 50]}
        paginationMode="server"
        filterMode="server"
        sortingMode="server"
        disableRowSelectionOnClick
        keepNonExistentRowsSelected
        autoHeight
        onPaginationModelChange={(model) => {
          onPageChange(model.page)
          onPageSizeChange(model.pageSize)
        }}
        paginationModel={{
          page,
          pageSize
        }}
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
  )
}

export default function Dashboard() {
  const { searchTerm, setSearchTerm, debouncedSearch } = useSearch()
  const { page, pageSize, handlePageChange, handlePageSizeChange } = usePagination()
  const { sortField, sortOrder, handleSort } = useSort()
  const [filters, setFilters] = useState<Filter[]>([])

  const {
    users,
    totalUsers,
    isLoading,
    error,
    toggleStatus
  } = useUsers({
    page,
    perPage: pageSize,
    searchQuery: debouncedSearch,
    sortModel: [{ field: sortField, sort: sortOrder.toLowerCase() as "asc" | "desc" }],
    filters
  })

  const handleFiltersChange = (newFilters: Filter[]) => {
    setFilters(newFilters)
  }

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState />

  return (
    <Box sx={{ p: 4 }}>
      <Header />
      
      <Typography
        variant="h1"
        sx={{
          fontSize: 32,
          fontWeight: 500,
          color: '#18181B',
          mb: 3
        }}
      >
        Usuários
      </Typography>

      <UsersFilters 
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onSort={handleSort}
        selectedSort={sortField}
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />

      <UsersTable 
        users={users} 
        totalUsers={totalUsers} 
        isLoading={isLoading}
        onToggleStatus={({ userId, status }) => toggleStatus.mutate({ userId, status })}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        page={page - 1}
        pageSize={pageSize}
      />
    </Box>
  )
} 