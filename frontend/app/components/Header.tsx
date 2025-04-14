import { Stack, Typography, Box } from "@mui/material"
import Link from "next/link"

const NAV_LINKS = [
  { href: '/.', label: 'Clientes', isActive: true },
  { href: '/.', label: 'Endereços' },
  { href: '/.', label: 'Entregas' },
]

interface NavLinkProps {
  href: string
  label: string
  isActive?: boolean
}

function NavLink({ href, label, isActive }: NavLinkProps) {
  if (isActive) {
    return (
      <Box sx={{ position: 'relative' }}>
        <Link 
          href={href}
          style={{ 
            textDecoration: 'none',
            color: '#7C3AED',
            fontSize: '14px',
          }}
        >
          {label}
        </Link>
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
    <Link 
      href={href}
      style={{ 
        textDecoration: 'none',
        color: '#71717A',
        fontSize: '14px',
      }}
    >
      {label}
    </Link>
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
            <NavLink key={link.href} {...link} />
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