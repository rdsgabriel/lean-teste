# 💼 Lean Teste

Projeto de teste técnico com backend em NestJS e frontend em React.

---

## 🚀 Instruções para rodar o projeto

### ✅ Requisitos

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

### 🔧 Rodando com Docker (recomendado)

```bash
docker-compose up --build
```

---

### 💡 Alternativa sem Docker

Caso você não tenha o Docker instalado, também é possível rodar o projeto localmente usando Node.js.

---

### 📦 Passos para rodar o projeto manualmente

#### 🔙 Backend

```bash
cd backend
npm install
npm run dev
```

#### 🔜 Frontend

```bash
cd frontend
npm install
npm run dev
```

---

⚠️ **Importante:** Certifique-se de que o banco de dados esteja configurado corretamente no arquivo `.env` (caso não esteja usando Docker).  
Você pode usar um banco local como PostgreSQL e ajustar a string de conexão conforme necessário.

---

## 🛠️ Tecnologias utilizadas

- **Frontend:** React + NextJS
- **Backend:** NestJS + TypeORM + PostgreSQL
- **Docker:** Containerização com Docker Compose

---

## 📁 Estrutura do projeto

```bash
lean-teste/
├── backend/
│   ├── src/
│   └── .env
├── frontend/
│   ├── src/
│   └── .env
├── docker-compose.yml
└── README.md
```

---
