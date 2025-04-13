import * as React from "react"
import { FormLabel, FormLabelProps } from "@mui/material"

export interface LabelProps extends FormLabelProps {
  children: React.ReactNode
}

export function Label({ children, className, ...props }: LabelProps) {
  return (
    <FormLabel {...props} className={`block text-sm font-medium ${className}`}>
      {children}
    </FormLabel>
  )
} 