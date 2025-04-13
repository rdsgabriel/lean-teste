"use client"

import { Box, Container, Typography, Fade } from "@mui/material"
import Link from "next/link"
import { RegisterForm } from "../components/forms/RegisterForm"

export default function Register() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Container 
        maxWidth="sm" 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          py: 6,
          px: { xs: 2, sm: 6 }
        }}
      >
        <Fade in={true}>
          <Box>
            <Box sx={{ mb: 6, textAlign: 'left' }}>
              <Typography 
                variant="h5" 
                component="h1" 
                sx={{ 
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  color: 'text.primary',
                  mb: 3
                }}
              >
                LOGO
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.primary', mb: 1 }}>
                Criar conta
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Preencha os dados abaixo para criar sua conta
              </Typography>
            </Box>

            <RegisterForm />

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Já tem uma conta?{' '}
                <Link 
                  href="/login"
                  style={{
                    color: '#9333ea',
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ cursor: 'pointer' }}>
                    Fazer login
                  </span>
                </Link>
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Container>

      <Box 
        sx={{ 
          display: { xs: 'none', md: 'block' },
          width: '50%',
          bgcolor: 'primary.main'
        }} 
      />
    </Box>
  )
} 