# Arquitetura: Loc10 (Showcase Técnico)

## 1. Fluxo de Dados (High-Level)

```mermaid
graph TD
    %% Estilos Globais (Modo Escuro Friendly)
    classDef default fill:#2a2a2a,stroke:#555,stroke-width:2px,color:#fff;
    classDef cluster fill:#1a1a1a,stroke:#444,stroke-width:2px,color:#eee,rx:5,ry:5;

    subgraph "Client Side"
        Browser[Navegador do Usuário]:::default
    end

    subgraph "Docker Compose Network"
        FE[Frontend Container<br/>Next.js 14 + React Query]
        API[Backend Container<br/>Django REST Framework]
        DB[(Database<br/>PostgreSQL 16)]
    end

    %% Conexões
    Browser ==>|HTTPS / JSON| FE
    FE ==>|Server Side Fetching| API
    Browser -.->|Client Side Interactions| API
    API ==>|Read/Write| DB

    %% Estilização Vibrante
    style FE fill:#1565C0,stroke:#0D47A1,stroke-width:2px,color:#fff,rx:5,ry:5
    style API fill:#2E7D32,stroke:#1B5E20,stroke-width:2px,color:#fff,rx:5,ry:5
    style DB fill:#EF6C00,stroke:#E65100,stroke-width:2px,color:#fff
```

## 2. Design de Componentes

### 2.1 Backend (Django 5)
**Papel:** Fonte da Verdade (Source of Truth), Regras de Negócio e Persistência.

*   **Integridade:** Uso mandatório de Transações Atômicas (`transaction.atomic()`) para garantir consistência ACID em operações financeiras e de estoque.
*   **Segurança:** Gestão de variáveis de ambiente via `python-decouple`.

### 2.2 Frontend (Next.js 14)
**Papel:** Apresentação e UX Otimista.

*   **Padrão:** Client-Side Fetching com Service Layer Pattern.
    *   Componentes visuais não tocam `fetch` ou `axios` diretamente.
    *   Lógica isolada em `src/services`.
*   **Estado:** TanStack Query (v5) gerencia Cache, Deduplicação e Atualizações Otimistas (Optimistic Updates).

## 3. Decisões Arquiteturais (Por Quê?)

### Por que React Query?
Para este domínio (Gestão de Ativos), 90% do estado da aplicação é Estado do Servidor (Disponibilidade, Histórico). Usar Redux seria verboso e desnecessário. O React Query sincroniza, invalida cache e gerencia "loading states" automaticamente.

### Por que Docker?
Mitigação do risco "Funciona na minha máquina". O ambiente é reprodutível com um único comando `docker compose up`, garantindo paridade entre desenvolvimento e produção.