"use client"

import { Chip } from "@mui/material"
import { CheckCircle, XCircle } from "lucide-react"

interface UserStatusProps {
  status: "active" | "inactive"
  onToggle: () => void
}

export function UserStatus({ status, onToggle }: UserStatusProps) {
  return (
    <Chip
      icon={
        status === "active" ? (
          <CheckCircle size={16} color="#22c55e" />
        ) : (
          <XCircle size={16} color="#ef4444" />
        )
      }
      label={status === "active" ? "Ativo" : "Inativo"}
      onClick={onToggle}
      sx={{
        backgroundColor: status === "active" ? "#dcfce7" : "#fee2e2",
        color: status === "active" ? "#166534" : "#991b1b",
        "& .MuiChip-icon": {
          color: "inherit",
        },
        "&:hover": {
          backgroundColor: status === "active" ? "#bbf7d0" : "#fecaca",
        },
      }}
    />
  )
} 