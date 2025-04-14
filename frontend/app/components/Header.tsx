import { Stack, Typography, Box } from "@mui/material"

const NAV_LINKS = [
  { label: 'Clientes', isActive: true },
  { label: 'Endereços' },
  { label: 'Entregas' },
]

interface NavLinkProps {
  label: string
  isActive?: boolean
}

function NavLink({ label, isActive }: NavLinkProps) {
  if (isActive) {
    return (
      <Box sx={{ position: 'relative' }}>
        <Typography
          sx={{ 
            color: '#7C3AED',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          {label}
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            bottom: -8,
            left: 0,
            width: '100%',
            height: '2px',
            bgcolor: '#7C3AED'
          }}
        />
      </Box>
    )
  }

  return (
    <Typography 
      sx={{ 
        color: '#71717A',
        fontSize: '14px',
        cursor: 'pointer'
      }}
    >
      {label}
    </Typography>
  )
}

export function Header() {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
      <Stack direction="row" alignItems="center" spacing={6}>
        <Typography
          component="span"
          sx={{
            color: '#A1A1AA',
            fontSize: '14px',
            letterSpacing: '0.1em',
          }}
        >
          LOGO
        </Typography>

        <Stack direction="row" spacing={4}>
          {NAV_LINKS.map((link) => (
            <NavLink key={link.label} {...link} />
          ))}
        </Stack>
      </Stack>

      <Box
        sx={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          bgcolor: '#7C3AED',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '14px',
        }}
      >
        W
      </Box>
    </Stack>
  )
} 