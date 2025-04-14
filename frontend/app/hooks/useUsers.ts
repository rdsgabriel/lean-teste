import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "./useApi"
import { GridFilterModel, GridSortModel } from "@mui/x-data-grid"

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
  filterModel?: GridFilterModel
  searchQuery?: string
}

export function useUsers(filters: UseUsersFilters = {}) {
  const queryClient = useQueryClient()
  const { fetchApi } = useApi()
  const { 
    page = 1, 
    perPage = 10,
    sortModel = [],
    filterModel,
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
      params.append("orderBy", sortModel[0].field)
      params.append("order", sortModel[0].sort === "desc" ? "DESC" : "ASC")
    }

    if (filterModel?.items.length) {
      filterModel.items.forEach((filter, index) => {
        params.append(`filters[${index}][field]`, filter.field)
        params.append(`filters[${index}][operator]`, filter.operator)
        params.append(`filters[${index}][value]`, filter.value as string)
      })
    }

    return params.toString()
  }

  const {
    data: paginatedData,
    isLoading,
    error,
  } = useQuery<PaginatedResponse, Error>({
    queryKey: ["users", { page, perPage, sortModel, filterModel, searchQuery }],
    queryFn: async () => {
      let endpoint = '/users'
      
      if (searchQuery) {
        endpoint = '/users/search'
      } else if (!sortModel.length) {
        endpoint = '/users/list'
      }
      
      const url = `${endpoint}?${buildQueryString()}`
      const response = await fetchApi(url)
      
      // Se for uma busca, adapta o formato da resposta
      if (searchQuery) {
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
      
      // Se for ordenação, adapta o formato da resposta
      if (sortModel.length > 0) {
        return {
          data: response.slice((page - 1) * perPage, page * perPage),
          total: response.length,
          page,
          totalPages: Math.ceil(response.length / perPage)
        }
      }
      
      return response
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