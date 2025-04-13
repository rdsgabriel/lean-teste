"use client"

import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Typography,
} from "@mui/material"
import { UserStatus } from "./UserStatus"
import { UserActions } from "./UserActions"
import { useUsers } from "../hooks/useUsers"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface User {
  id: number
  name: string
  phone: string
  createdAt: string
  isActive: boolean
}

export function UsersTable() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const {
    users,
    totalUsers,
    isLoading,
    error,
    toggleStatus,
  } = useUsers({
    page: page + 1,
    perPage: rowsPerPage,
  })

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  if (isLoading) {
    return (
      <Box p={2}>
        <Typography>Carregando...</Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box p={2}>
        <Typography color="error">Erro ao carregar usuários</Typography>
      </Box>
    )
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Data de cadastro</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: User) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  {format(new Date(user.createdAt), "dd/MM/yyyy", { locale: ptBR })}
                </TableCell>
                <TableCell>
                  <UserStatus
                    status={user.isActive ? "active" : "inactive"}
                    onToggle={() => toggleStatus({ userId: user.id, status: !user.isActive })}
                  />
                </TableCell>
                <TableCell align="right">
                  <UserActions userData={user} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalUsers}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Linhas por página"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      />
    </Paper>
  )
} 