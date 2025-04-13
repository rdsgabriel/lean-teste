import { create } from 'zustand'

interface FormState {
  // Register form
  registerForm: {
    username: string
    name: string
    phone: string
    password: string
    confirmPassword: string
  }
  registerErrors: {
    username: string
    name: string
    phone: string
    password: string
    confirmPassword: string
  }
  // Login form
  loginForm: {
    username: string
    password: string
  }
  loginErrors: {
    username: string
    password: string
  }
  // Actions
  setRegisterField: (field: keyof FormState['registerForm'], value: string) => void
  setLoginField: (field: keyof FormState['loginForm'], value: string) => void
  validateRegisterForm: () => boolean
  validateLoginForm: () => boolean
  resetForms: () => void
}

export const useFormStore = create<FormState>((set, get) => ({
  registerForm: {
    username: '',
    name: '',
    phone: '',
    password: '',
    confirmPassword: ''
  },
  registerErrors: {
    username: '',
    name: '',
    phone: '',
    password: '',
    confirmPassword: ''
  },
  loginForm: {
    username: '',
    password: ''
  },
  loginErrors: {
    username: '',
    password: ''
  },

  setRegisterField: (field, value) => {
    set((state) => ({
      registerForm: {
        ...state.registerForm,
        [field]: value
      },
      registerErrors: {
        ...state.registerErrors,
        [field]: ''
      }
    }))
  },

  setLoginField: (field, value) => {
    set((state) => ({
      loginForm: {
        ...state.loginForm,
        [field]: value
      },
      loginErrors: {
        ...state.loginErrors,
        [field]: ''
      }
    }))
  },

  validateRegisterForm: () => {
    const { registerForm } = get()
    const errors = {
      username: '',
      name: '',
      phone: '',
      password: '',
      confirmPassword: ''
    }
    let isValid = true

    // Username validation
    if (!registerForm.username) {
      errors.username = 'O nome de usuário é obrigatório'
      isValid = false
    } else if (registerForm.username.length < 3) {
      errors.username = 'O nome de usuário deve ter pelo menos 3 caracteres'
      isValid = false
    }

    // Name validation
    if (!registerForm.name) {
      errors.name = 'O nome é obrigatório'
      isValid = false
    } else if (registerForm.name.length < 3) {
      errors.name = 'O nome deve ter pelo menos 3 caracteres'
      isValid = false
    }

    // Phone validation
    if (!registerForm.phone) {
      errors.phone = 'O telefone é obrigatório'
      isValid = false
    } else {
      // Remove any non-digit character for validation
      const phoneDigits = registerForm.phone.replace(/\D/g, '')
      if (phoneDigits.length < 10 || phoneDigits.length > 11) {
        errors.phone = 'Telefone inválido'
        isValid = false
      }
    }

    // Password validation
    if (!registerForm.password) {
      errors.password = 'A senha é obrigatória'
      isValid = false
    } else if (registerForm.password.length < 6) {
      errors.password = 'A senha deve ter pelo menos 6 caracteres'
      isValid = false
    }

    // Confirm password validation
    if (!registerForm.confirmPassword) {
      errors.confirmPassword = 'A confirmação de senha é obrigatória'
      isValid = false
    } else if (registerForm.password !== registerForm.confirmPassword) {
      errors.confirmPassword = 'As senhas não coincidem'
      isValid = false
    }

    set({ registerErrors: errors })
    return isValid
  },

  validateLoginForm: () => {
    const { loginForm } = get()
    const errors = {
      username: '',
      password: ''
    }
    let isValid = true

    if (!loginForm.username) {
      errors.username = 'O nome de usuário é obrigatório'
      isValid = false
    }

    if (!loginForm.password) {
      errors.password = 'A senha é obrigatória'
      isValid = false
    }

    set({ loginErrors: errors })
    return isValid
  },

  resetForms: () => {
    set({
      registerForm: {
        username: '',
        name: '',
        phone: '',
        password: '',
        confirmPassword: ''
      },
      registerErrors: {
        username: '',
        name: '',
        phone: '',
        password: '',
        confirmPassword: ''
      },
      loginForm: {
        username: '',
        password: ''
      },
      loginErrors: {
        username: '',
        password: ''
      }
    })
  }
})) 