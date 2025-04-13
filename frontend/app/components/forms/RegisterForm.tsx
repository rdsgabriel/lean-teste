"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Box, Typography, Button, InputAdornment, IconButton, CircularProgress } from "@mui/material"
import { StyledTextField } from "../ui/StyledTextField"

interface FormData {
  username: string
  name: string
  phone: string
  password: string
  confirmPassword: string
}

interface FormErrors {
  username: string
  name: string
  phone: string
  password: string
  confirmPassword: string
}

export function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }))
    setError(null)
  }

  const validateForm = () => {
    const newErrors = { ...errors }
    let hasError = false

    if (!formData.username) {
      newErrors.username = "O nome de usuário é obrigatório"
      hasError = true
    }

    if (!formData.name) {
      newErrors.name = "O nome é obrigatório"
      hasError = true
    }

    if (!formData.phone) {
      newErrors.phone = "O telefone é obrigatório"
      hasError = true
    }

    if (!formData.password) {
      newErrors.password = "A senha é obrigatória"
      hasError = true
    } else if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres"
      hasError = true
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "A confirmação de senha é obrigatória"
      hasError = true
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem"
      hasError = true
    }

    setErrors(newErrors)
    return !hasError
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          name: formData.name,
          phone: formData.phone,
          password: formData.password,
        }),
      })

      await new Promise(resolve => setTimeout(resolve, 1500))

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Erro ao criar usuário")
      }

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
          value={formData.username}
          onChange={handleChange("username")}
          placeholder="Digite seu nome de usuário"
          error={!!errors.username}
          helperText={errors.username}
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
          value={formData.name}
          onChange={handleChange("name")}
          placeholder="Digite seu nome completo"
          error={!!errors.name}
          helperText={errors.name}
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
          value={formData.phone}
          onChange={handleChange("phone")}
          placeholder="Digite seu telefone"
          error={!!errors.phone}
          helperText={errors.phone}
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
          value={formData.password}
          onChange={handleChange("password")}
          placeholder="******"
          error={!!errors.password}
          helperText={errors.password}
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
          value={formData.confirmPassword}
          onChange={handleChange("confirmPassword")}
          placeholder="******"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
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