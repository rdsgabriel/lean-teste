"use client"

import { IconButton, Tooltip } from "@mui/material"
import { Edit, Trash } from "lucide-react"

interface User {
  id: number
  name: string
  phone: string
  createdAt: string
  isActive: boolean
}

interface UserActionsProps {
  userData: User
}

export function UserActions({ userData }: UserActionsProps) {
  const handleEdit = () => {
    // Implementar edição
    console.log("Editar usuário:", userData.id)
  }

  const handleDelete = () => {
    // Implementar exclusão
    console.log("Excluir usuário:", userData.id)
  }

  return (
    <>
      <Tooltip title="Editar">
        <IconButton
          size="small"
          onClick={handleEdit}
          sx={{ color: "text.secondary" }}
        >
          <Edit size={18} />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Excluir">
        <IconButton
          size="small"
          onClick={handleDelete}
          sx={{ color: "text.secondary", ml: 1 }}
        >
          <Trash size={18} />
        </IconButton>
      </Tooltip>
    </>
  )
} 