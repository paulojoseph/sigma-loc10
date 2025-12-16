# 🚜 Sigma Loc | Enterprise Asset Management

> **Technical Showcase**: Full Stack Application engineered for Scalability, Maintainability, and Developer Experience.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-85%25-green)
![Stack](https://img.shields.io/badge/stack-Next.js%20%7C%20Django%20%7C%20Postgres-blue)

## 🎯 Sobre o Projeto

O **Sigma Loc** é um sistema de gestão de ativos e locação de equipamentos pesados. Construído com uma arquitetura **Risk-Driven**, ele prioriza a integridade dos dados, segurança e performance.

Este projeto não é apenas um CRUD; é uma demonstração de decisões de arquitetura sênior, incluindo:
- **Separação de Preocupações**: Frontend (BFF/Client) desacoplado do Backend (Core Domain).
- **Service Layer**: Lógica de negócios isolada em serviços reutilizáveis no frontend.
- **State Management**: Uso de **React Query** para cache, deduping e sincronização de estado server-client.
- **Design System**: UI polida com Tailwind CSS, Glassmorphism e padrões de usabilidade enterprise (feedback optimistic).

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: Next.js 14 (App Router)
- **State/Cache**: TanStack React Query v5
- **Styling**: Tailwind CSS v3 + Lucide React
- **Quality**: TypeScript Strict Mode, ESLint

### Backend (API)
- **Framework**: Django 5 + Django REST Framework
- **Database**: PostgreSQL 16
- **Architecture**: Domain-Driven Design (lite) com Apps modulares (`core`, `accounts`, `equipment`)

### Infrastructure (DevOps)
- **Containerization**: Docker Compose
- **Tooling**: Makefiles, Husky (pre-commit)

## 🚀 Como Rodar

O projeto utiliza Docker Compose para orquestrar todos os serviços. Você não precisa instalar Python ou Node.js localmente.

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/sigma-loc10.git
   cd sigma-loc10
   ```

2. **Suba o ambiente**:
   ```bash
   docker compose up --build
   ```
   *O frontend estará disponível em `http://localhost:3000` e a API em `http://localhost:8000`.*

3. **Crie um Superusuário (Opcional)**:
   ```bash
   make superuser
   ```

## 🧪 Testes

A qualidade é garantida através de testes automatizados.

```bash
# Frontend (Unitários)
docker compose exec frontend npm test

# Backend (Integração)
docker compose exec api pytest
```

## 🏗️ Decisões de Arquitetura

### Por que React Query?
Para evitar o "useEffect hell" e gerenciar estados assíncronos (loading, error, success) de forma declarativa. Isso melhora a UX com cache imediato e revalidação em background.

### Por que Django?
Pela robustez do ORM e segurança padrão (CSRF, XSS protection). O DRF permite criar APIs RESTful rapidamente, focando nas regras de negócio complexas.

### Risk-Driven Engineering
Identificamos riscos críticos (ex: *Race Conditions* em locações simultâneas) e mitigamos com transações atômicas no banco de dados (`select_for_update` planejado).

---
*Desenvolvido como showcase técnico.*
