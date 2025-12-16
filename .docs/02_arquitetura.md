# Arquitetura: Loc10 (Showcase Técnico)

## 1. Fluxo de Dados (High-Level)

```mermaid
graph TD
    Client[Navegador do Usuário]
    
    subgraph "Camada Frontend (Next.js 14)"
        UI[Componentes React]
        Service[Service Layer (Axios)]
        Query[Cache TanStack Query]
    end
    
    subgraph "Camada Backend (Rede Docker)"
        API[Django REST Framework]
        DB[(PostgreSQL 16)]
    end
    
    Client -->|Interação| UI
    UI -->|Optimistic Update| Query
    UI -->|Chamada de Método| Service
    Service -->|HTTPS / JSON| API
    API -->|Transação Atômica| DB
2. Design de Componentes
2.1 Backend (Django 5)
Papel: Fonte da Verdade (Source of Truth).

Integridade: Uso mandatório de Transações Atômicas (transaction.atomic()) para garantir consistência ACID.

Segurança: Gestão de variáveis via python-decouple.

2.2 Frontend (Next.js 14)
Papel: Apresentação e UX Otimista.

Padrão: Client-Side Fetching com Service Layer Pattern.

Estado: React Query gerencia Cache, Deduplicação e Atualizações Otimistas.

3. Decisões Arquiteturais (Por Quê?)
Por que React Query?
Para este domínio, 90% do estado é Estado do Servidor (Disponibilidade, Histórico). Redux seria "boilerplate" desnecessário. O React Query sincroniza e invalida cache automaticamente.

Por que Docker?
Mitigação do risco "Funciona na minha máquina". O ambiente é reprodutível com um único comando docker compose up.