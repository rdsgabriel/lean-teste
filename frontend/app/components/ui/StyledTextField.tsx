import { styled } from "@mui/material/styles"
import { TextField } from "@mui/material"

export const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    transition: 'opacity 0.2s ease-in-out',
    '&.Mui-disabled': {
      opacity: 0.7,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    '&.Mui-error': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#ef4444',
      }
    }
  },
  '& .MuiFormHelperText-root': {
    color: '#ef4444',
    marginLeft: 0,
    fontSize: '0.75rem'
  }
}) 