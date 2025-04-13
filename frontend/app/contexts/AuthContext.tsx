"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import Cookies from "js-cookie"

interface User {
  id: number
  username: string
  name: string
  isActive: boolean
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  const logout = useCallback(() => {
    setUser(null)
    Cookies.remove("user")
    Cookies.remove("token")
    router.push("/login")
  }, [router])

  useEffect(() => {
    // Verificar se há um usuário no cookie ao montar o componente
    const userStr = Cookies.get("user")
    if (userStr) {
      try {
        setUser(JSON.parse(userStr))
      } catch {
        // Se houver erro ao fazer parse do cookie, fazer logout
        logout()
      }
    }
  }, [logout])

  useEffect(() => {
    // Redirecionar para login se não estiver autenticado
    const publicRoutes = ['/login', '/register']
    if (!user && !publicRoutes.includes(pathname) && pathname !== null) {
      router.push("/login")
    }
  }, [user, pathname, router])

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

      // Adiciona um delay artificial de 1.5s para melhorar a UX
      await new Promise(resolve => setTimeout(resolve, 1500))

      if (!response.ok) {
        throw new Error("Credenciais inválidas")
      }

      const data = await response.json()

      // Salvar tokens e user nos cookies
      Cookies.set("access_token", data.access_token, { 
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
      })
      Cookies.set("refresh_token", data.refresh_token, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
      })
      Cookies.set("user", JSON.stringify(data.user), {
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
      })

      setUser(data.user)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
} 