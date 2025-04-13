import * as React from "react"
import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material"

interface ButtonProps extends MuiButtonProps {
  children: React.ReactNode
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <MuiButton
      {...props}
      className={`rounded-md font-medium ${className}`}
    >
      {children}
    </MuiButton>
  )
} 