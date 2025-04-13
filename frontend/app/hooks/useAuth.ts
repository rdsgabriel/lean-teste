import { useState } from "react"
import { useRouter } from "next/navigation"

interface LoginResponse {
  access_token: string
  refresh_token: string
  user: {
    id: number
    username: string
    name: string
    isActive: boolean
  }
}

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error("Credenciais inválidas")
      }

      const data: LoginResponse = await response.json()

      localStorage.setItem("access_token", data.access_token)
      localStorage.setItem("refresh_token", data.refresh_token)
      localStorage.setItem("user", JSON.stringify(data.user))

      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("user")
    router.push("/login")
  }

  const getUser = () => {
    const userStr = localStorage.getItem("user")
    if (!userStr) return null
    return JSON.parse(userStr)
  }

  const getAccessToken = () => {
    return localStorage.getItem("access_token")
  }

  return {
    login,
    logout,
    getUser,
    getAccessToken,
    isLoading,
    error,
  }
} 