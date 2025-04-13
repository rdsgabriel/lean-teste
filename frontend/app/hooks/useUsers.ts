import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export interface User {
  id: number
  name: string
  phone: string
  isActive: boolean
  createdAt: string
}

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export enum FilterOperator {
  EQUALS = "é",
  OR = "ou",
  CONTAINS = "contém",
  GREATER_THAN = "maior que",
  LESS_THAN = "menor que",
}

export enum FilterField {
  ID = "ID",
  NAME = "Nome",
  PHONE = "Telefone",
  IS_ACTIVE = "Status",
  CREATED_AT = "Data de cadastro",
}

interface Filter {
  field: FilterField
  operator: FilterOperator
  value?: string
  dateValue?: string
  booleanValue?: boolean
}

interface UseUsersFilters {
  page?: number
  perPage?: number
  search?: string
  orderBy?: string
  order?: "ASC" | "DESC"
  filters?: Filter[]
}

export function useUsers(filters: UseUsersFilters = {}) {
  const queryClient = useQueryClient()
  const { page = 1, perPage = 10 } = filters

  const {
    data: paginatedData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", { page, perPage }],
    queryFn: async () => {
      const response = await fetch(`/api/users/list?page=${page}&limit=${perPage}`)
      if (!response.ok) throw new Error("Erro ao buscar usuários")
      return response.json() as Promise<PaginatedResponse<User>>
    },
  })

  const { mutate: search } = useMutation({
    mutationFn: async (searchTerm: string) => {
      const response = await fetch(`/api/users/search?searchTerm=${encodeURIComponent(searchTerm)}`)
      if (!response.ok) throw new Error("Erro ao pesquisar usuários")
      return response.json() as Promise<User[]>
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  const { mutate: applyFilters } = useMutation({
    mutationFn: async (filters: Filter[]) => {
      const response = await fetch("/api/users/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filters }),
      })
      if (!response.ok) throw new Error("Erro ao filtrar usuários")
      return response.json() as Promise<User[]>
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  const { mutate: orderUsers } = useMutation({
    mutationFn: async ({ orderBy, order }: { orderBy: string; order: "ASC" | "DESC" }) => {
      const response = await fetch(`/api/users?orderBy=${orderBy}&order=${order}`)
      if (!response.ok) throw new Error("Erro ao ordenar usuários")
      return response.json() as Promise<User[]>
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  const { mutate: toggleStatus } = useMutation({
    mutationFn: async ({ userId, status }: { userId: number; status: boolean }) => {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: status }),
      })
      if (!response.ok) throw new Error("Erro ao atualizar status")
      return response.json() as Promise<User>
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  return {
    users: paginatedData?.data ?? [],
    totalUsers: paginatedData?.total ?? 0,
    currentPage: paginatedData?.page ?? page,
    totalPages: paginatedData?.totalPages ?? 1,
    isLoading,
    error,
    search,
    applyFilters,
    orderUsers,
    toggleStatus,
  }
} 