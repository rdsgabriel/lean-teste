"use client"

import React, { useState, useMemo } from "react"
import { 
  DataGrid, 
  GridToolbar,
  GridFilterModel,
  GridLogicOperator,
} from '@mui/x-data-grid'
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  AppBar,
  Toolbar,
  Button,
} from '@mui/material'
import { useUserStore } from "@/store/userStore"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { FilterToolbar } from "@/components/dashboard/FilterToolbar"
import { UserStatusMenu } from "@/components/dashboard/UserStatusMenu"
import { SortDialog } from "@/components/dashboard/SortDialog"
import { getUserGridColumns } from "@/components/dashboard/userGridColumns"
import { UsersFilters } from "../components/UsersFilters"
import { UsersTable } from "../components/UsersTable"

export default function Dashboard() {
  const { users, toggleUserStatus } = useUserStore()
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
    logicOperator: GridLogicOperator.And,
  })
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [sortDialogOpen, setSortDialogOpen] = useState(false)
  const [sortField, setSortField] = useState('name')

  // Transform user data to match data grid requirements
  const rows = useMemo(() => {
    return users.map(user => ({
      id: user.id,
      name: user.name,
      phone: user.phone,
      registerDate: user.registerDate,
      active: user.active,
    }))
  }, [users])

  // Handle menu click
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget)
    setSelectedRow(id)
  }

  // Handle menu close
  const handleClose = () => {
    setAnchorEl(null)
    setSelectedRow(null)
  }

  // Status change handlers
  const handleActivate = () => {
    if (selectedRow !== null) {
      toggleUserStatus(selectedRow, true)
      handleClose()
    }
  }

  const handleDeactivate = () => {
    if (selectedRow !== null) {
      toggleUserStatus(selectedRow, false)
      handleClose()
    }
  }

  // Apply sort from dialog
  const handleApplySort = () => {
    setSortDialogOpen(false)
    // The sort is applied directly to the DataGrid
  }

  // Get columns with handlers
  const columns = useMemo(() => getUserGridColumns(handleMenuClick), [])

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          backgroundColor: "white",
          borderBottom: "1px solid",
          borderColor: "divider"
        }}
      >
        <Container maxWidth={false}>
          <Toolbar disableGutters sx={{ gap: 3 }}>
            <Typography
              variant="h6"
              sx={{
                color: "text.primary",
                fontWeight: 600,
                mr: 4
              }}
            >
              LOGO
            </Typography>

            <Button
              sx={{
                color: "primary.main",
                textTransform: "none",
                borderRadius: 1,
                minWidth: 0,
                borderBottom: 2,
                borderColor: "primary.main",
                "&:hover": {
                  backgroundColor: "transparent",
                }
              }}
            >
              Clientes
            </Button>

            <Button
              sx={{
                color: "text.secondary",
                textTransform: "none",
                borderRadius: 1,
                minWidth: 0,
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "primary.main",
                }
              }}
            >
              Endereços
            </Button>

            <Button
              sx={{
                color: "text.secondary",
                textTransform: "none",
                borderRadius: 1,
                minWidth: 0,
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "primary.main",
                }
              }}
            >
              Entregas
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Container 
        maxWidth={false} 
        sx={{ 
          py: 3,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          bgcolor: "#fafafa"
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 3, 
            fontWeight: 500,
            color: "text.primary" 
          }}
        >
          Usuários
        </Typography>

        <Box sx={{ bgcolor: "white", borderRadius: 1, p: 3, flexGrow: 1 }}>
          <UsersFilters />
          <UsersTable />
        </Box>
      </Container>
    </Box>
  )
} 