"use client"

import React, { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Box, Container, Typography, TextField, Button, InputAdornment, IconButton, CircularProgress, Fade } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useAuth } from "../contexts/AuthContext"
import Link from "next/link"

const StyledTextField = styled(TextField)({
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

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [usernameError, setUsernameError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const { login, isLoading, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUsernameError("")
    setPasswordError("")

    let hasError = false

    if (!username) {
      setUsernameError("O nome de usuário é obrigatório")
      hasError = true
    }

    if (!password) {
      setPasswordError("A senha é obrigatória")
      hasError = true
    }

    if (!hasError) {
      await login(username, password)
    }
  }

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
                Bem-vindo(a)!
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Acesse sua conta para iniciar a sessão
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 3 }}>
                <Typography 
                  component="label" 
                  htmlFor="username" 
                  sx={{ 
                    display: 'block', 
                    mb: 1, 
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                    opacity: isLoading ? 0.7 : 1,
                    transition: 'opacity 0.2s ease-in-out'
                  }}
                >
                  Usuário
                </Typography>
                <StyledTextField
                  id="username"
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Digite seu usuário"
                  error={!!usernameError || !!error}
                  helperText={usernameError || error}
                  size="small"
                  disabled={isLoading}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography 
                  component="label" 
                  htmlFor="password" 
                  sx={{ 
                    display: 'block', 
                    mb: 1, 
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                    opacity: isLoading ? 0.7 : 1,
                    transition: 'opacity 0.2s ease-in-out'
                  }}
                >
                  Senha
                </Typography>
                <StyledTextField
                  id="password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******"
                  error={!!passwordError}
                  helperText={passwordError}
                  size="small"
                  disabled={isLoading}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                          disabled={isLoading}
                          sx={{
                            opacity: isLoading ? 0.7 : 1,
                            transition: 'opacity 0.2s ease-in-out'
                          }}
                        >
                          {showPassword ? 
                            <EyeOff size={18} color="#6b7280" /> : 
                            <Eye size={18} color="#6b7280" />
                          }
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box sx={{ textAlign: 'right', mb: 3 }}>
                <Typography 
                  component="a" 
                  href="#" 
                  sx={{ 
                    color: 'primary.main',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    opacity: isLoading ? 0.7 : 1,
                    transition: 'opacity 0.2s ease-in-out',
                    pointerEvents: isLoading ? 'none' : 'auto',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Esqueceu sua senha?
                </Typography>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{
                  textTransform: 'none',
                  py: 1.5,
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark'
                  },
                  position: 'relative',
                  transition: 'all 0.2s ease-in-out',
                  opacity: isLoading ? 0.9 : 1,
                  mb: 2
                }}
              >
                <Fade in={isLoading} timeout={200}>
                  <CircularProgress
                    size={24}
                    sx={{
                      color: 'white',
                      position: 'absolute',
                      left: '50%',
                      marginLeft: '-12px'
                    }}
                  />
                </Fade>
                <Box 
                  component="span" 
                  sx={{ 
                    visibility: isLoading ? 'hidden' : 'visible',
                    opacity: isLoading ? 0 : 1,
                    transition: 'opacity 0.2s ease-in-out'
                  }}
                >
                  {isLoading ? "Entrando..." : "Acessar plataforma"}
                </Box>
              </Button>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Não tem uma conta?{' '}
                  <Link 
                    href="/register"
                    style={{
                      color: '#9333ea',
                      textDecoration: 'none',
                    }}
                  >
                    <span style={{ cursor: 'pointer' }}>
                      Criar conta
                    </span>
                  </Link>
                </Typography>
              </Box>
            </form>
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