# Risk Matrix: Loc10 (Rental Management)

## 1. Critical Domain Risks

| Risk ID | Risk Scenario | Probability | Impact | Mitigation Strategy (Technical) |
| :--- | :--- | :--- | :--- | :--- |
| **R-001** | **Rental Concurrency (Overbooking)**<br>Two customers attempt to rent the same equipment (e.g., "Betoneira 120L") for overlapping dates simultaneously. | High | Critical | **Database Locking (Pessimistic):** Use `select_for_update` during the Checkout transaction to lock the Inventory Row.<br>**Constraint:** SQL Exclusion Constraints (`btree_gist` extension in Postgres) to checking overlapping ranges at DB level. |
| **R-002** | **Inventory Drift**<br>Physical inventory status differs from Digital status (Equipment returned broken but marked available). | Medium | High | **State Machine Logic:** Implement strict transitions (Available -> Inspecting -> Maintenance -> Available). Block "Available" transition without "Inspection Pass" event. |
| **R-003** | **Late Returns & Pricing**<br>Customer does not return item on time; billing calculation becomes complex. | High | Medium | **Background Workers (Celery/Redis):** Daily cron job to flag "Overdue" rentals and calculate penalties dynamically. |

## 2. Technical Risks

| Risk ID | Risk Scenario | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **T-001** | **N+1 Query Performance**<br>Listing 50 equipment items triggers 50+ queries for "Category" or "Maintenance History". | High | **Strict Code Audit:** Mandatory `select_related` / `prefetch_related` in Django `get_queryset`. CI pipeline fails if query count > threshold (using `django-assert-num-queries`). |
| **T-002** | **Frontend-Backend Desync**<br>Next.js types do not match Django API responses. | Medium | **Code Generation:** Use `openapi-typescript-codegen` to generate TS interfaces directly from Django's `swagger.json`. |

## 3. Security Risks

| Risk ID | Risk Scenario | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **S-001** | **Price Tampering**<br>User modifies API payload to change rental price. | Critical | **Server-Side Validation:** Never trust client price. Recalculate total on Backend based on `EquipmentID` + `DateRange`. |
