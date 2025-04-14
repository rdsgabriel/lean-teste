import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "./useApi"
import { GridSortModel } from "@mui/x-data-grid"
import { Filter } from "../types/filter"

export interface User {
  id: number
  name: string
  phone: string
  isActive: boolean
  createdAt: string
}

interface PaginatedResponse {
  data: User[]
  total: number
  page: number
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

interface UseUsersFilters {
  page?: number
  perPage?: number
  sortModel?: GridSortModel
  filters?: Filter[]
  searchQuery?: string
}

export function useUsers(filters: UseUsersFilters = {}) {
  const queryClient = useQueryClient()
  const { fetchApi } = useApi()
  const { 
    page = 1, 
    perPage = 10,
    sortModel = [],
    filters: filterItems = [],
    searchQuery = ""
  } = filters

  const buildQueryString = () => {
    const params = new URLSearchParams()
    params.append("page", String(page))
    params.append("limit", String(perPage))
    
    if (searchQuery) {
      params.append("searchTerm", searchQuery)
    }

    if (sortModel.length > 0) {
      // Mapeia os campos do frontend para o backend
      const fieldMap: Record<string, string> = {
        id: 'id',
        name: 'name',
        phone: 'phone',
        isActive: 'isActive',
        createdAt: 'createdAt'
      }

      const field = fieldMap[sortModel[0].field] || sortModel[0].field
      params.append("orderBy", field)
      params.append("order", sortModel[0].sort === "desc" ? "DESC" : "ASC")
    }

    return params.toString()
  }

  const {
    data: paginatedData,
    isLoading,
    error,
  } = useQuery<PaginatedResponse, Error>({
    queryKey: ["users", { page, perPage, sortModel, filterItems, searchQuery }],
    queryFn: async () => {
      if (filterItems.length > 0) {
        const response = await fetchApi('/users/filter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filters: filterItems
          }),
        })

        // Adapta a resposta para o formato paginado
        const start = (page - 1) * perPage
        const end = start + perPage
        const paginatedResults = response.slice(start, end)
        
        return {
          data: paginatedResults,
          total: response.length,
          page,
          totalPages: Math.ceil(response.length / perPage)
        }
      }

      // Sempre usa o endpoint /users para listagem e ordenação
      const url = `/users?${buildQueryString()}`
      const response = await fetchApi(url)
      
      return {
        data: response,
        total: response.length,
        page,
        totalPages: Math.ceil(response.length / perPage)
      }
    },
    staleTime: 5000,
    gcTime: 300000,
    refetchOnWindowFocus: false
  })

  const toggleStatus = useMutation({
    mutationFn: ({ userId, status }: { userId: number; status: boolean }) =>
      fetchApi(`/users/${userId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return {
    users: paginatedData?.data ?? [],
    totalUsers: paginatedData?.total ?? 0,
    currentPage: paginatedData?.page ?? page,
    totalPages: paginatedData?.totalPages ?? 1,
    isLoading,
    error,
    toggleStatus,
  }
} 