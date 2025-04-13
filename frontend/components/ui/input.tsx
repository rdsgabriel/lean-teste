import * as React from "react"
import { TextField, TextFieldProps } from "@mui/material"

export interface InputProps extends Omit<TextFieldProps, "variant"> {
  error?: boolean
}

export function Input({ className, error, ...props }: InputProps) {
  return (
    <TextField
      {...props}
      variant="outlined"
      fullWidth
      error={error}
      className={`rounded-md ${className}`}
    />
  )
} 