# Contexto do Produto: Sigma Loc10

## 🎯 Objetivo de Negócio
O **Sigma Loc10** é um sistema de Gestão de Ativos (Enterprise Asset Management) focado no aluguel de equipamentos pesados para construção civil.
O sistema deve resolver a dor principal de gestores de frota: **incerteza sobre a disponibilidade**. Um equipamento não pode ser prometido a dois clientes.

## 👤 Perfil do Usuário
- **Gestor de Frota:** Focado em eficiência. Odeia lentidão no sistema. Precisa de respostas imediatas.
- **Backoffice:** Precisa de dados confiáveis para faturamento.

## 💎 Filosofia de Engenharia (Pilares)

### 1. UX-Driven (Obsessão pela Experiência)
Software lento é um bug.
- **Latência Zero:** O usuário deve ver o resultado de suas ações instantaneamente (Optimistic UI).
- **Feedback:** Todo erro deve ser tratado e explicado ao usuário. Nada de telas brancas ou loaders infinitos.

### 2. Risk-Driven (Engenharia Orientada a Risco)
A integridade dos dados vale mais que novas features.
- **Consistência:** É proibido ter um aluguel sem baixa no estoque correspondente.
- **Atomicidade:** Operações financeiras/estoque são "Tudo ou Nada".