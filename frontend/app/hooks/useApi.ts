import { useAuth } from "../contexts/AuthContext"
import Cookies from "js-cookie"

interface FetchOptions extends RequestInit {
  requiresAuth?: boolean
}

const API_BASE_URL = "http://localhost:3000"

export function useApi() {
  const { logout } = useAuth()

  const fetchApi = async (endpoint: string, options: FetchOptions = {}) => {
    const { requiresAuth = true, ...fetchOptions } = options

    const url = `${API_BASE_URL}${endpoint}`

    if (requiresAuth) {
      const token = Cookies.get("access_token")
      if (!token) {
        logout()
        throw new Error("Não autorizado")
      }

      fetchOptions.headers = {
        ...fetchOptions.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    const response = await fetch(url, fetchOptions)

    if (response.status === 401) {
      logout()
      throw new Error("Não autorizado")
    }

    if (!response.ok) {
      throw new Error("Erro na requisição")
    }

    return response.json()
  }

  return { fetchApi }
} 