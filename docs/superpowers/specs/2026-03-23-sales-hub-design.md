# Sales Hub — Unified Revenue Dashboard

## Purpose
A standalone Next.js app that pulls sales data from 3 brands (Rosayo, ALAALA, Once) into one dashboard showing gross/net revenue, order counts, completion rates, and a time-series chart.

## Data Sources

| Brand | Source | Table/Endpoint | Amount Field | Currency | Notes |
|-------|--------|---------------|-------------|----------|-------|
| Rosayo | WooCommerce REST API | `/wp-json/wc/v3/orders` | `total` | PHP | as-is |
| ALAALA | Supabase | `orders` | `amount_paid` | PHP numeric(10,2) | as-is |
| Once | Supabase | `payments` | `amount` | PHP integer (centavos) | ÷ 100 |

### Status Mapping

| Brand | All Orders (Gross) | Completed (Net) |
|-------|-------------------|-----------------|
| Rosayo | all WooCommerce statuses | `status = completed` |
| ALAALA | all rows in `orders` | `payment_status = paid` |
| Once | all rows in `payments` | `status = completed` |

## UI Layout

### Top: 4 Revenue Cards
Each card shows:
- Gross revenue (all orders)
- Net revenue (completed only)
- Gross order count
- Completed order count

Cards: **Total** | **Rosayo** | **ALAALA** | **Once**

### Middle: Time Filter
Toggle: Today / 7 Days / 30 Days / Custom date range

### Completion Rate Table

| | Rosayo | ALAALA | Once | Total |
|---|---|---|---|---|
| Gross Orders | ... | ... | ... | ... |
| Completed | ... | ... | ... | ... |
| **% Completion** | **...%** | **...%** | **...%** | **...%** |

### Bottom: Stacked Bar Chart
- X-axis: dates (granularity matches filter)
- Y-axis: ₱ revenue
- 3 colors stacked per brand

## Tech Stack
- Next.js (App Router)
- Tailwind CSS + shadcn/ui
- Recharts
- Dark theme
- All amounts displayed in ₱ PHP
