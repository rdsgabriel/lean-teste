import { useAuth } from "../contexts/AuthContext"
import Cookies from "js-cookie"

interface FetchOptions extends RequestInit {
  requiresAuth?: boolean
}

export function useApi() {
  const { logout } = useAuth()

  const fetchApi = async (url: string, options: FetchOptions = {}) => {
    const { requiresAuth = true, ...fetchOptions } = options

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