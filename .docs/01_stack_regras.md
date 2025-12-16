# Stack Tecnológico e Diretrizes de Código

## 🛠️ Frontend (Web)
- **Framework:** Next.js 14 (App Router).
- **Linguagem:** TypeScript (Strict Mode).
- **Gerenciamento de Estado:** **TanStack Query (v5)**.
  - 🚫 **Proibido:** Usar `useEffect` para buscar dados.
  - ✅ **Obrigatório:** Usar `useQuery` para leitura e `useMutation` para escrita.
- **Estilização:** TailwindCSS + Lucide-React (Ícones).
- **Service Layer:**
  - Componentes UI (`.tsx`) NUNCA devem fazer chamadas `fetch/axios` diretas.
  - Toda regra de comunicação fica em `src/services/`.

## 🛠️ Backend (API)
- **Framework:** Django 5 + Django REST Framework (DRF).
- **Banco de Dados:** PostgreSQL 16.
- **Padrões de Código:**
  - **Serializers:** Devem validar todos os inputs (Sanitization).
  - **Views:** Preferência por `ViewSet` ou `APIView`.
  - **Snake Case:** Para variáveis e funções Python (`get_rental_history`).
- **Segurança:**
  - Nunca commitar `.env`.
  - CORS restrito a origens confiáveis.

## 🐳 Infraestrutura
- **Docker Compose:** Orquestrador oficial.
- **CI/CD:** GitHub Actions rodando Lint (Front) e Testes (Back) em paralelo.

## 🚫 O que NÃO Fazer (Anti-Patterns)
1. **Lógica de Negócio no Frontend:** Cálculos de preço e multas devem ser feitos no Backend. O Frontend apenas exibe.
2. **Ignorar Erros:** Todo `try` no Python deve ter um `except` que loga o erro ou retorna um HTTP 400/500 adequado.
3. **Magic Numbers:** Não use números soltos no código (ex: `if status == 3`). Use Enums (`Status.MAINTENANCE`).