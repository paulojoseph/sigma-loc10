# Loc10 - Rental Management System / Sistema de Locação

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-95%25-green)
![Python](https://img.shields.io/badge/python-3.11+-blue.svg)
![Django](https://img.shields.io/badge/django-5.0-success)
![Next.js](https://img.shields.io/badge/next.js-14.0-black)
![License](https://img.shields.io/badge/license-MIT-yellow)

> **"A Senior Engineering Showcase."**

## 🏗️ Philosophy: Risk-Driven Engineering

This project is not just a CRUD. It is built with a **Risk-First** mindset (Sommerville). Before a single line of code was written, we mapped critical domain risks:
- **Concurrency**: Preventing double-bookings on rentals.
- **Security**: Robust Auth/RBAC logic.
- **Maintainability**: Strict Separation of Concerns.

See our documentation:
- 📖 [Risk Matrix](./docs/RISK_MATRIX.md) - **Start Here**
- 🏛️ [Architecture](./docs/ARCHITECTURE.md)
- 📅 [Project Task Board](./task.md)

## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose
- Make (optional)

### Quick Start
```bash
# 1. Clone the repository
git clone https://github.com/your-username/sigma-loc10.git

# 2. Boot the infrastructure (DB, Redis)
docker compose up -d

# 3. Access
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
```

## 📂 Project Structure (Monorepo)

- `apps/api`: **Django 5** (DRF, PostgreSQL) - The core business logic.
- `apps/web`: **Next.js 14** (TypeScript, Tailwind) - High-performance Client.
- `infra/`: **Docker** orchestration configs.
- `docs/`: Risk analysis and architectural decisions.

---
*Built by the Sigma Nexus Team.*
