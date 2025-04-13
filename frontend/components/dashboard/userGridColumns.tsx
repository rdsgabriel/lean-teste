import { GridColDef, GridActionsCellItem, GridFilterOperator, GridFilterItem, GridRowParams } from '@mui/x-data-grid'
import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import { UserStatusChip } from './UserStatusChip'

export const getFilterOperators = () => {
  const filterOperators: Record<string, GridFilterOperator[]> = {
    id: [
      {
        label: 'é',
        value: 'equals',
        getApplyFilterFn: (filterItem: GridFilterItem) => {
          return (params): boolean => {
            return params.value === filterItem.value
          }
        },
      },
      {
        label: 'contém',
        value: 'contains',
        getApplyFilterFn: (filterItem: GridFilterItem) => {
          return (params): boolean => {
            return params.value.toString().includes(filterItem.value?.toString() || '')
          }
        },
      },
    ],
    name: [
      {
        label: 'é',
        value: 'equals',
        getApplyFilterFn: (filterItem: GridFilterItem) => {
          return (params): boolean => {
            return params.value === filterItem.value
          }
        },
      },
      {
        label: 'contém',
        value: 'contains',
        getApplyFilterFn: (filterItem: GridFilterItem) => {
          return (params): boolean => {
            return params.value.toLowerCase().includes((filterItem.value as string)?.toLowerCase() || '')
          }
        },
      },
    ],
    phone: [
      {
        label: 'é',
        value: 'equals',
        getApplyFilterFn: (filterItem: GridFilterItem) => {
          return (params): boolean => {
            return params.value === filterItem.value
          }
        },
      },
      {
        label: 'contém',
        value: 'contains',
        getApplyFilterFn: (filterItem: GridFilterItem) => {
          return (params): boolean => {
            return params.value.includes(filterItem.value)
          }
        },
      },
    ],
    registerDate: [
      {
        label: 'é',
        value: 'equals',
        getApplyFilterFn: (filterItem: GridFilterItem) => {
          return (params): boolean => {
            return params.value === filterItem.value
          }
        },
      },
      {
        label: 'depois de',
        value: 'after',
        getApplyFilterFn: (filterItem: GridFilterItem) => {
          return (params): boolean => {
            const [day, month, year] = params.value.split('/').map(Number)
            const [filterDay, filterMonth, filterYear] = (filterItem.value as string)?.split('/').map(Number) || [0, 0, 0]
            
            const dateValue = new Date(year, month - 1, day)
            const filterDate = new Date(filterYear, filterMonth - 1, filterDay)
            
            return dateValue > filterDate
          }
        },
      },
      {
        label: 'antes de',
        value: 'before',
        getApplyFilterFn: (filterItem: GridFilterItem) => {
          return (params): boolean => {
            const [day, month, year] = params.value.split('/').map(Number)
            const [filterDay, filterMonth, filterYear] = (filterItem.value as string)?.split('/').map(Number) || [0, 0, 0]
            
            const dateValue = new Date(year, month - 1, day)
            const filterDate = new Date(filterYear, filterMonth - 1, filterDay)
            
            return dateValue < filterDate
          }
        },
      },
    ],
    active: [
      {
        label: 'é',
        value: 'equals',
        getApplyFilterFn: (filterItem: GridFilterItem) => {
          return (params): boolean => {
            return params.value === (filterItem.value === 'true' || filterItem.value === true)
          }
        },
      },
    ],
  }

  return filterOperators
}

export const getUserGridColumns = (
  handleMenuClick: (event: React.MouseEvent<HTMLElement>, id: number) => void
): GridColDef[] => {
  const filterOperators = getFilterOperators()
  
  return [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 90,
      filterOperators: filterOperators.id,
    },
    { 
      field: 'name', 
      headerName: 'Nome', 
      width: 250,
      filterOperators: filterOperators.name,
    },
    { 
      field: 'phone', 
      headerName: 'Telefone', 
      width: 150,
      filterOperators: filterOperators.phone,
    },
    { 
      field: 'registerDate', 
      headerName: 'Data de cadastro', 
      width: 160,
      filterOperators: filterOperators.registerDate,
    },
    { 
      field: 'active', 
      headerName: 'Status', 
      width: 120,
      filterOperators: filterOperators.active,
      renderCell: (params) => <UserStatusChip active={params.value} />,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 50,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<MoreVertIcon />}
          label="Menu"
          onClick={(event) => handleMenuClick(event, params.id as number)}
        />,
      ],
    },
  ]
} 