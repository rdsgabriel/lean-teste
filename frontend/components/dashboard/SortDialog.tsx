"use client"

import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  FormControl, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Box, 
  MenuItem 
} from '@mui/material'

interface SortDialogProps {
  open: boolean
  sortField: string
  onClose: () => void
  onSortFieldChange: (value: string) => void
  onApplySort: () => void
}

export const SortDialog = ({ 
  open, 
  sortField, 
  onClose, 
  onSortFieldChange, 
  onApplySort 
}: SortDialogProps) => {
  return (
    <Dialog 
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Ordenação</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <RadioGroup
            value={sortField}
            onChange={(e) => onSortFieldChange(e.target.value)}
          >
            <FormControlLabel value="id" control={<Radio />} label="ID" />
            <FormControlLabel value="name" control={<Radio />} label="Nome" />
            <FormControlLabel value="phone" control={<Radio />} label="Telefone" />
            <FormControlLabel value="registerDate" control={<Radio />} label="Data de cadastro" />
            <FormControlLabel value="active" control={<Radio />} label="Status" />
          </RadioGroup>
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <MenuItem onClick={onApplySort} sx={{ color: 'primary.main' }}>
            Aplicar
          </MenuItem>
        </Box>
      </DialogContent>
    </Dialog>
  )
} 