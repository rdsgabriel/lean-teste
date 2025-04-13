import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Array de rotas públicas que não precisam de autenticação
const publicRoutes = ['/login', '/register']

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")
  const path = request.nextUrl.pathname
  const isPublicRoute = publicRoutes.includes(path)

  // Log para debug
  console.log('Middleware:', {
    path,
    isPublicRoute,
    hasToken: !!token,
    cookies: request.cookies.getAll()
  })

  // Se tem token e está tentando acessar rota pública, redireciona para dashboard
  if (token && isPublicRoute) {
    console.log('Redirecionando para /dashboard - Usuário autenticado tentando acessar rota pública')
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Se não tem token e não é rota pública, redireciona para login
  if (!token && !isPublicRoute) {
    console.log('Redirecionando para /login - Rota protegida sem token')
    return NextResponse.redirect(new URL("/login", request.url))
  }

  console.log('Permitindo acesso à rota:', path)
  return NextResponse.next()
}

// Configuração do matcher para excluir arquivos estáticos e API
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)'
  ]
} 