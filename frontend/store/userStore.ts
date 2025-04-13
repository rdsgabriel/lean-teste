import { create } from "zustand"

interface User {
  id: number
  name: string
  phone: string
  registerDate: string
  active: boolean
}

interface UserStore {
  users: User[]
  toggleUserStatus: (id: number, status: boolean) => void
}

// Dados de exemplo
const mockUsers: User[] = [
  {
    id: 1,
    name: "João Silva",
    phone: "(11) 99999-9999",
    registerDate: "01/01/2024",
    active: true,
  },
  {
    id: 2,
    name: "Maria Santos",
    phone: "(11) 88888-8888",
    registerDate: "02/01/2024",
    active: false,
  },
  // Adicione mais usuários de exemplo aqui se desejar
]

export const useUserStore = create<UserStore>((set) => ({
  users: mockUsers,
  toggleUserStatus: (id, status) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, active: status } : user
      ),
    })),
})) 