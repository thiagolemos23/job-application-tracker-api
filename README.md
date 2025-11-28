# Job Application Tracker API

API REST para gerenciar candidaturas de vagas de emprego na área de tecnologia.  
Permite cadastrar, listar, buscar, atualizar e remover candidaturas, com foco em boas práticas, testes automatizados e CI.

## ✨ Funcionalidades

- CRUD completo de candidaturas (`/applications`)
- Campos principais:
  - `company` – Empresa
  - `position` – Cargo
  - `status` – aplicado, teste, entrevista, oferta, rejeitado
  - `source` – origem da vaga (LinkedIn, Gupy, referência etc.)
  - `appliedAt` – data da candidatura
  - `notes` – observações opcionais
- Testes:
  - **Unitários** para a camada de serviço
  - **Integração** com Supertest chamando as rotas reais
- Cobertura de testes **> 95%**
- CI com **GitHub Actions** rodando testes a cada push/PR

## 🧱 Stack utilizada

- **Node.js** + **TypeScript**
- **Express**
- **Prisma ORM** + **PostgreSQL**
- **Jest** + **ts-jest** + **Supertest**
- **Docker** / Docker Compose
- **GitHub Actions** (CI)

---

## 🚀 Como rodar o projeto localmente

### Pré-requisitos

- Node.js (versão 18+)
- Docker e Docker Compose
- Git

### 1. Clonar o repositório

```bash
git clone https://github.com/thiagolemos23/job-application-tracker-api.git
cd job-application-tracker-api
npm install
