# Matriz de Risco: Loc10

Este documento guia as decisões técnicas baseadas em riscos de negócio.

## 1. Riscos Críticos de Negócio

| ID | Risco | Impacto | Mitigação (Implementada) |
| :--- | :--- | :--- | :--- |
| **R-001** | **Concorrência (Overbooking)**<br>Dois clientes alugam o mesmo item ao mesmo tempo. | Crítico | **Transações Atômicas (ACID):** O Backend processa o aluguel e a baixa de estoque em um único bloco. Se um falhar, tudo é desfeito. |
| **R-002** | **Latência de UX**<br>Sistema lento frustra o usuário. | Alto | **Optimistic UI:** O Frontend atualiza a tela instantaneamente (0ms), revertendo apenas se o servidor rejeitar. |
| **R-003** | **Divergência de Estoque**<br>Item consta disponível mas está quebrado. | Alto | **Status Rígido:** Equipamento tem estados definidos (Disponível, Alugado, Manutenção) controlados pelo banco. |

## 2. Riscos Técnicos

| ID | Risco | Impacto | Mitigação |
| :--- | :--- | :--- | :--- |
| **T-001** | **Acoplamento Frontend/API**<br>Mudança na API quebra a tela. | Alto | **Service Pattern:** Isolamento total da lógica HTTP em `src/services`. |
| **T-002** | **Ambiente Inconsistente** | Crítico | **Docker:** Paridade total entre Dev e Prod. |

## 3. Riscos de Segurança

| ID | Risco | Impacto | Mitigação |
| :--- | :--- | :--- | :--- |
| **S-001** | **Adulteração de Preço** | Crítico | **Validação Backend:** O servidor ignora o preço enviado pelo front e recalcula baseado no banco de dados. |