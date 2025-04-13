"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useErrorStore } from "@/store/errorStore"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { setError, clearError, error } = useErrorStore()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    if (!email.includes("@")) {
      setError("E-mail incorreto. Confira o texto novamente.")
      return
    }

    if (password.length < 6) {
      setError("Senha incorreta. Por favor, verifique o texto novamente.")
      return
    }

    // Simulação de login bem-sucedido
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col justify-center w-full md:w-1/2 p-6 md:p-12 bg-white">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-800 uppercase">Logo</h1>
            <p className="mt-2 text-gray-600">Bem-vindo(a)!</p>
            <p className="text-sm text-gray-500">Acesse sua conta para iniciar a sessão</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-600">Email</Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemplo.com"
                error={error?.includes("E-mail")}
              />
              {error?.includes("E-mail") && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-600">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******"
                  error={error?.includes("Senha")}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {error?.includes("Senha") && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
              )}
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-purple-600 hover:underline">
                Esqueceu sua senha?
              </a>
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Acessar plataforma
            </Button>
          </form>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 bg-purple-600">
        {/* Área colorida à direita */}
      </div>
    </div>
  )
} 