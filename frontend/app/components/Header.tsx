import { Stack, Typography, Box } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname?.startsWith(path)

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
          <Box sx={{ position: 'relative' }}>
            <Link 
              href="/clientes" 
              style={{ 
                textDecoration: 'none',
                color: '#7C3AED',
                fontSize: '14px',
              }}
            >
              Clientes
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

          <Link 
            href="/enderecos"
            style={{ 
              textDecoration: 'none',
              color: '#71717A',
              fontSize: '14px',
            }}
          >
            Endereços
          </Link>

          <Link 
            href="/entregas"
            style={{ 
              textDecoration: 'none',
              color: '#71717A',
              fontSize: '14px',
            }}
          >
            Entregas
          </Link>
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