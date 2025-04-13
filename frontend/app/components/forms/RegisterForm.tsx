"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Box, Typography, Button, InputAdornment, IconButton, CircularProgress } from "@mui/material"
import { StyledTextField } from "../ui/StyledTextField"
import { useFormStore } from "../../store/formStore"

export function RegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    registerForm,
    registerErrors,
    setRegisterField,
    validateRegisterForm,
    resetForms
  } = useFormStore()

  const handleChange = (field: keyof typeof registerForm) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value

    // Se for o campo de telefone, formata o valor
    if (field === 'phone') {
      // Remove caracteres não numéricos
      let numericValue = value.replace(/\D/g, '')
      
      // Limita a 11 dígitos
      if (numericValue.length > 11) {
        numericValue = numericValue.slice(0, 11)
      }
      
      // Formata o número
      if (numericValue.length > 0) {
        value = `(${numericValue.slice(0, 2)}`
        
        if (numericValue.length > 2) {
          value = `${value}) ${numericValue.slice(2)}`
          
          if (numericValue.length > 7) {
            value = `${value.slice(0, 10)}-${numericValue.slice(7)}`
          }
        }
      }
    }

    setRegisterField(field, value)
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateRegisterForm()) return

    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: registerForm.username,
          name: registerForm.name,
          phone: registerForm.phone.replace(/\D/g, ''),
          password: registerForm.password,
        }),
      })

      await new Promise(resolve => setTimeout(resolve, 1500))

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Erro ao criar usuário")
      }

      resetForms()
      router.replace("/login")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar usuário")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Typography color="error" sx={{ mb: 2, fontSize: '0.875rem' }}>
          {error}
        </Typography>
      )}

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
          }}
        >
          Nome de usuário
        </Typography>
        <StyledTextField
          id="username"
          fullWidth
          value={registerForm.username}
          onChange={handleChange("username")}
          placeholder="Digite seu nome de usuário"
          error={!!registerErrors.username}
          helperText={registerErrors.username}
          size="small"
          disabled={isLoading}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography 
          component="label" 
          htmlFor="name" 
          sx={{ 
            display: 'block', 
            mb: 1, 
            fontSize: '0.875rem',
            color: 'text.secondary',
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          Nome completo
        </Typography>
        <StyledTextField
          id="name"
          fullWidth
          value={registerForm.name}
          onChange={handleChange("name")}
          placeholder="Digite seu nome completo"
          error={!!registerErrors.name}
          helperText={registerErrors.name}
          size="small"
          disabled={isLoading}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography 
          component="label" 
          htmlFor="phone" 
          sx={{ 
            display: 'block', 
            mb: 1, 
            fontSize: '0.875rem',
            color: 'text.secondary',
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          Telefone
        </Typography>
        <StyledTextField
          id="phone"
          fullWidth
          value={registerForm.phone}
          onChange={handleChange("phone")}
          placeholder="(00) 00000-0000"
          error={!!registerErrors.phone}
          helperText={registerErrors.phone}
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
          }}
        >
          Senha
        </Typography>
        <StyledTextField
          id="password"
          type={showPassword ? "text" : "password"}
          fullWidth
          value={registerForm.password}
          onChange={handleChange("password")}
          placeholder="******"
          error={!!registerErrors.password}
          helperText={registerErrors.password}
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

      <Box sx={{ mb: 3 }}>
        <Typography 
          component="label" 
          htmlFor="confirmPassword" 
          sx={{ 
            display: 'block', 
            mb: 1, 
            fontSize: '0.875rem',
            color: 'text.secondary',
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          Confirmar senha
        </Typography>
        <StyledTextField
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          fullWidth
          value={registerForm.confirmPassword}
          onChange={handleChange("confirmPassword")}
          placeholder="******"
          error={!!registerErrors.confirmPassword}
          helperText={registerErrors.confirmPassword}
          size="small"
          disabled={isLoading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                  size="small"
                  disabled={isLoading}
                  sx={{
                    opacity: isLoading ? 0.7 : 1,
                  }}
                >
                  {showConfirmPassword ? 
                    <EyeOff size={18} color="#6b7280" /> : 
                    <Eye size={18} color="#6b7280" />
                  }
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
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
        <Box 
          component="span" 
          sx={{ 
            visibility: isLoading ? 'hidden' : 'visible',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.2s ease-in-out'
          }}
        >
          {isLoading ? "Criando conta..." : "Criar conta"}
        </Box>
        {isLoading && (
          <CircularProgress
            size={24}
            sx={{
              color: 'white',
              position: 'absolute',
              left: '50%',
              marginLeft: '-12px'
            }}
          />
        )}
      </Button>
    </form>
  )
} 