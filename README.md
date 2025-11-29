# 🧘‍♀️ Define Pilates — Sistema de Gestão para Estúdios de Pilates

O Define Pilates é um sistema completo de gestão para estúdios, permitindo administrar alunos, planos, assinaturas, aulas, agenda, horários de funcionamento e muito mais.
Ele utiliza uma arquitetura monorepo, separando frontend, backend e pacotes compartilhados.

## 📂 Estrutura do Projeto

```bash
define-pilates/
│
├── apps/
│   ├── backend/        # API em Node.js + TypeScript + Express (Drizzle ORM)
│   └── frontend/       # Interface em React + Vite + Tailwind + Shadcn UI
│
└── README.md
```

### Tecnologias Utilizadas

- Backend

  - Node.js
  - TypeScript
  - Express
  - Drizzle ORM
  - PostgreSQL
  - Zod
  - tsx
  - Dotenv

- Frontend

  - React
  - TypeScript
  - Vite
  - TailwindCSS
  - Shadcn UI
  - React Hook Form

- Infra / Dev
  - pnpm workspaces
  - Monorepo architecture
  - Docker
  - Vercel (frontend)

### 🚀 Instalação e Configuração

1️⃣ Pré-requisitos

Você precisa ter instalado:

- Node.js 18+
- Git
- Postgres instalado localmente ou conta no Neon

### 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/alvarosena/studio.git
cd studio
```

Instalar dependências:

```bash
npm install
```

continua...
