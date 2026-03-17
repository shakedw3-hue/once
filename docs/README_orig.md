# BetterLife

Personalized life-improvement platform for the Philippine market.

## Structure

betterlife/
  docs/
    Product.md        — Product specification and vision
    Architecture.md   — System architecture and database schema
    DevRules.md       — Development conventions and rules
  app/
    components/       — UI components
    backend/          — Server actions and API logic
    database/         — Supabase schema and migrations

## Quick Start

1. Install dependencies: npm install
2. Set up Supabase project and add credentials to .env.local
3. Set up Stripe and add credentials to .env.local
4. Run development server: npm run dev

## Tech Stack

- Next.js + Tailwind + ShadCN + Framer Motion
- Supabase (auth, database, API)
- Stripe (payments)
