# Job Application Tracker

Aplicação **full stack** para organizar e acompanhar candidaturas de vagas de emprego.

- API em **Node.js + TypeScript** com **Prisma + PostgreSQL (Docker)**
- Testes unitários e de integração com **Jest** e **GitHub Actions (CI)**
- Frontend em **React + TypeScript** para criar, listar, atualizar status e excluir candidaturas

> Projeto feito para portfólio, simulando um cenário real de uso e boas práticas de código.

---

## 🚀 Funcionalidades

### Backend (API)

- CRUD completo de candidaturas:
  - `POST /applications` – cria candidatura
  - `GET /applications` – lista candidaturas
  - `PUT /applications/:id` – atualiza status e demais campos
  - `DELETE /applications/:id` – exclui candidatura
- Banco relacional com **PostgreSQL** (Docker + Prisma)
- Mapeamento de modelo:
  - empresa, cargo, status, origem, data de candidatura e notas
- Testes:
  - unitários de service
  - integração de rotas com **Supertest**
  - cobertura > 80%
- CI:
  - workflow no **GitHub Actions** rodando `npm test` em cada push/PR

### Frontend (React)

- Lista todas as candidaturas vindas da API
- Formulário para criar nova candidatura
- Atualização de **status** direto na tabela (select → PUT na API)
- Exclusão de candidatura com confirmação
- Interface simples, responsiva e em tema escuro

---

## 🛠️ Stack utilizada

**Backend**

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL (Docker Compose)
- Jest + Supertest
- GitHub Actions (CI)

**Frontend**

- React
- TypeScript
- Vite
- Fetch API

---

## 📁 Estrutura do projeto

```txt
.
├── src/                    # API Node.js (controllers, services, repositories)
│   └── modules/
│       └── applications/   # Módulo de candidaturas
├── prisma/
│   ├── schema.prisma       # Modelos Prisma
│   └── migrations/         # Migrações do banco
├── docker-compose.yml      # Postgres em Docker
├── frontend/               # App React + Vite
│   └── src/
│       └── App.tsx         # Interface principal (tabela + formulário)
└── .github/workflows/ci.yml# Pipeline de testes (GitHub Actions)
⚙️ Como rodar localmente

1. Pré-requisitos
Node.js (recomendado 18+)

npm

Docker e Docker Compose

2. Clonar o repositório
bash
Copiar código
git clone https://github.com/thiagolemos23/job-application-tracker.git
cd job-application-tracker


3. Subir o banco (PostgreSQL via Docker)
bash
Copiar código
docker compose up -d
Isso sobe um container Postgres configurado para o projeto.

4. Instalar dependências do backend
bash
Copiar código
npm install
5. Rodar migrações do Prisma
bash
Copiar código
npx prisma migrate dev --name init
Se já estiver em sync, o comando só vai confirmar e seguir.

6. Rodar a API
bash
Copiar código
npm run dev
A API ficará disponível em:

txt
Copiar código
http://localhost:3000
Você pode testar:

txt
Copiar código
GET http://localhost:3000/health
7. Instalar e rodar o frontend
Em outro terminal:

bash
Copiar código
cd frontend
npm install
npm run dev
O Vite vai subir em algo como:

txt
Copiar código
http://localhost:5173
ou 5174/5175 (ver o log do terminal).
O frontend já está configurado para consumir a API em http://localhost:3000.

🧪 Testes
No backend (raiz do projeto):

bash
Copiar código
npm test
Roda testes unitários e de integração

Gera relatório de cobertura em modo CLI

O mesmo comando é usado no workflow de GitHub Actions.

💡 Pontos de destaque técnicos
Projeto full stack completo (API + banco + frontend)

Uso de Prisma com PostgreSQL em Docker e migrações versionadas

Testes automatizados com boa cobertura e executados em CI

Frontend React comunicando com a API real (sem mock), incluindo:

criação de registros

atualização de status em tempo real

exclusão com atualização otimista

Código organizado em camadas (controller → service → repository)

✅ Próximos passos (possíveis evoluções)
Este projeto já é totalmente utilizável, mas poderia ser expandido com:

Filtros por status/origem da candidatura

Paginação na listagem

Autenticação de usuário (ex: login simples para proteger a API)

Deploy em ambiente cloud (Railway, Render, Fly.io, etc.)

Se você está vendo esse projeto como recrutador:
a ideia aqui foi mostrar domínio do básico bem feito — não só “Hello World” ou lista de tarefas, mas um fluxo real: API, banco, testes, CI e interface consumindo tudo.

perl
Copiar código

Troca o `SEU-USUARIO` no link do clone pelo teu usuário real, ajusta qualquer detalhe de texto que quiser, salva o `README.md`, dá mais um commit/push e o repo tá redondo.
