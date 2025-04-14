# Lean Teste

Sistema de gerenciamento de usuários com funcionalidades de listagem, filtragem, ordenação e busca.

## Instruções para rodar o projeto

### Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- PostgreSQL (se não usar Docker)

### Rodando com Docker (recomendado)

```bash
docker-compose up --build
```

- Acesse a documentação da API no Swagger: [http://localhost:3000/api#](http://localhost:3000/api#)
- Acesse o dashboard na URL: [http://localhost:3001](http://localhost:3001)

**Credenciais de login:**

- **Login**: admin
- **Senha**: adminadmin

Se preferir, registre-se diretamente no sistema.

### Rodando localmente

1. **Backend**:

```bash
cd backend
npm install
npm run dev
```

2. **Frontend**:

```bash
cd frontend
npm install
npm run dev
```

**Importante**: Certifique-se de que o banco de dados esteja configurado corretamente no arquivo `.env` (caso não esteja usando Docker).

## Arquitetura e Decisões Técnicas

### Frontend

- **Next.js 14**: Framework React com suporte a Server Components e App Router
- **Material-UI (MUI)**: Sistema de design robusto para UI consistente
- **TanStack Query**: Gerenciamento de estado do servidor e cache
- **Zustand**: Gerenciamento de estado global simplificado
- **TypeScript**: Tipagem estática para maior segurança e manutenibilidade
- **date-fns**: Manipulação de datas
- **Argon2**: Algoritmo de hash de senha seguro e moderno

### Backend

- **NestJS**: Framework Node.js escalável com arquitetura modular
- **TypeORM**: ORM para PostgreSQL com suporte a TypeScript
- **PostgreSQL**: Banco de dados relacional
- **Class Validator**: Validação de DTOs
- **Swagger**: Documentação da API

### Padrões e Práticas

1. **Arquitetura em Camadas**:
   - Frontend: Components, Hooks, Services
   - Backend: Controllers, Services, Repositories

2. **Componentização**:
   - Componentes reutilizáveis (FilterPanel, UserStatus, etc.)
   - Hooks customizados para lógica de negócio

3. **Gerenciamento de Estado**:
   - TanStack Query para cache e estado do servidor
   - Zustand para estado global da aplicação

4. **Paginação e Filtros**:
   - Paginação no servidor
   - Sistema de filtros compostos
   - Ordenação dinâmica

## Decisões de Implementação

### Implementações Manuais vs. Componentes Prontos

Optou-se por implementar manualmente várias funcionalidades que poderiam ter sido resolvidas com componentes prontos do Material-UI (MUI), como:

1. **Sistema de Filtros Compostos**:
   - Implementação manual do `FilterPanel` com lógica própria.
   - Poderia ter sido usado o `DataGrid Pro` do MUI, que já oferece filtros avançados integrados.

2. **Paginação e Ordenação**:
   - Lógica de paginação implementada manualmente no backend e frontend.
   - O `DataGrid Pro` do MUI oferece funcionalidades de paginação e ordenação já integradas.

3. **Gerenciamento de Estado dos Filtros**:
   - O estado dos filtros é gerenciado manualmente com hooks personalizados.
   - O `MUI X Data Grid Pro` tem gerenciamento de estado interno para filtros.

### Razões para Implementação Manual

1. **Aprendizado e Demonstração de Conhecimento**:
   - Mostrar capacidade de implementar lógicas complexas e demonstrar a compreensão profunda dos conceitos.

2. **Customização e Controle**:
   - Maior flexibilidade na lógica de negócios e controle total sobre o comportamento dos componentes.

3. **Independência de Licenças Pagas**:
   - Evitar dependência de componentes premium do MUI.
   - Solução mais econômica para projetos reais, sem custos com licenças de componentes pagos.

4. **Performance**:
   - Código mais enxuto e específico para as necessidades do projeto.
   - Menor overhead de features não utilizadas, o que pode levar a uma aplicação mais rápida e leve.

## Melhorias Propostas

### Performance

1. **Otimização de Queries**:
   - Implementar índices no banco de dados.
   - Otimizar consultas com filtros compostos.

2. **Frontend**:
   - Implementar virtualização para grandes listas.
   - Lazy loading de componentes pesados.
   - Memoização de componentes que re-renderizam frequentemente.

### Funcionalidades

1. **Autenticação e Autorização**:
   - Implementar JWT para autenticação segura.
   - Controle de acesso baseado em roles.
   - Implementar refresh tokens para melhor experiência do usuário.

2. **UX/UI**:
   - Implementar feedback visual para ações do usuário, como toasts.
   - Adicionar estados de carregamento com Skeletons.
   - Implementar modo escuro para uma melhor experiência do usuário.
   - Garantir responsividade para dispositivos móveis.

### Qualidade de Código

1. **Testes**:
   - **Testes unitários**: A intenção era implementar testes unitários (com Jest), mas por falta de tempo, isso não foi possível. No entanto, os testes são de extrema importância e deveriam ser uma prioridade para garantir a qualidade e manutenção do código.
   - **Testes de integração**: Testes de integração entre backend e frontend.
   - **Testes E2E**: Testes end-to-end com Cypress ou Playwright.

2. **Monitoramento**:
   - Implementação de logging estruturado para depuração.
   - Monitoramento de erros com Sentry.
   - Métricas de performance para otimizar a aplicação.

### DevOps

1. **CI/CD**:
   - Pipeline de deploy automático com integração de testes automatizados.
   - Análise de código estática para garantir qualidade no código.

2. **Infraestrutura**:
   - Containerização com Docker e orquestração com Kubernetes.
   - Escalabilidade horizontal para suportar maior tráfego.
   - Backup automatizado para garantir a integridade dos dados.

## Checklist de Funcionalidades Cumpridas

- [x] Sistema de listagem de usuários.
- [x] Funcionalidade de filtragem e ordenação.
- [x] Implementação de busca por nome de usuário.
- [x] Autenticação simples com login de administrador.
- [x] API documentada com Swagger.
- [x] Frontend responsivo com Material-UI.
- [x] Backend estruturado com NestJS e TypeORM.
- [x] Sistema de filtros compostos.
- [x] Lógica de paginação no servidor.
- [x] Gerenciamento de estado do servidor com TanStack Query.
- [x] Implementação de segurança com hash de senhas utilizando Argon2.

---

**Nota**: Embora não tenha sido possível implementar todos os testes de maneira eficaz por limitações de tempo, o foco seria em cobrir as partes críticas do código com testes unitários, de integração e E2E, a fim de garantir a qualidade e a segurança do sistema em longo prazo.
