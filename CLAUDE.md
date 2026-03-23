# Once. — Project Documentation

> The only platform that diagnoses your life — then builds your path.

## What This Project Does

Once. is a personalized life-improvement SaaS platform for the Philippine market (ages 20-40). It diagnoses users across 4 pillars (Money, Mind, Body, Spirit) via a 15-question assessment, then builds a personalized learning path with structured lessons, daily tracking, and income skills.

**Domain:** onceph.com
**Stack:** Next.js 16, Tailwind CSS v4, Supabase, Paddle (payments), Resend (email), Vercel

---

## Plans & Pricing

| Plan | Price | Lessons | What's Included |
|------|-------|---------|-----------------|
| Once Core | ₱1,499 | 25 | Assessment + personalized path + 5 modules |
| Once Pro | ₱2,350 | 125 | Core + 4 income tracks (social media, e-commerce, freelancing, side income) |
| Once AI Careers | ₱3,950 | 200+ | Pro + 3 AI career tracks |

All one-time payment. Lifetime access. 14-day unconditional refund.

---

## User Flow

```
Landing (/) → Signup (/auth/signup) → Questionnaire (15 questions)
→ Profile Complete (age, location) → Profile Reveal (scores + blurred teasers)
→ Checkout (Paddle) → Dashboard → Daily lessons → Income track
```

---

## Project Structure

```
src/
├── app/                    # Page routes + API + server actions
│   ├── page.tsx            # Landing page (cinematic dark hero)
│   ├── auth/               # signup, login, forgot-password, reset-password, callback
│   ├── questionnaire/      # 15-question assessment flow
│   ├── profile/            # Profile reveal + profile completion
│   ├── checkout/           # Paddle checkout + success page
│   ├── dashboard/          # Main dashboard + module/lesson views
│   ├── admin/              # 8-tab admin panel (overview, users, analytics, content, coupons, payments, insights, behavior)
│   ├── api/                # Webhook, push notifications, email cron, account deletion
│   ├── pricing/            # Standalone pricing page
│   ├── how-it-works/       # Method explanation
│   ├── pillars/            # 4 pillars detail page
│   ├── method/             # Philosophy + influences
│   └── privacy|terms|refund/ # Legal pages
├── components/
│   ├── landing/            # Hero, Header, Footer, Testimonials, TrustBadges, etc.
│   ├── questionnaire/      # QuestionnaireFlow, ProfileReveal
│   ├── dashboard/          # DashboardView, ModuleView, LessonView, PillarRadar
│   ├── admin/              # AdminShell, ContentManager
│   └── ui/                 # shadcn components + InstallBanner, NotificationPrompt
├── lib/
│   ├── supabase/           # server.ts (createClient, createServiceClient), client.ts, middleware.ts
│   ├── questionnaire.ts    # QUESTIONS, scoring, recommendation engine
│   ├── email.ts            # 5 email types via Resend
│   ├── validation.ts       # Zod schemas for all inputs
│   ├── rate-limit.ts       # In-memory IP rate limiter
│   ├── stripe.ts           # Stripe/Paddle integration
│   ├── constants.ts        # PILLARS, pricing, limits
│   └── theme.ts            # Pillar colors and theming
├── types/
│   ├── database.ts         # Pillar, PillarScores, Recommendation, Plan types
│   └── pwa.d.ts            # BeforeInstallPromptEvent
└── middleware.ts            # Auth protection for /dashboard/*, /admin/*
```

---

## Database (Supabase)

### Core Tables
- **users** — profile, plan, streak, paths, demographics
- **questionnaire_answers** — answers (jsonb), scores (jsonb)
- **paths** — 4 pillars (money, mind, body, spirit)
- **modules** — 5 core per pillar + pro + ai modules
- **lessons** — 5 per module, with description, action_step, reflection_prompt
- **user_progress** — lesson completion + reflections
- **payments** — Paddle/Stripe records (user_id nullable for GDPR)
- **user_tracking** — daily metrics (weight, sleep, savings, meditation, gratitude)
- **coupons** — discount codes
- **push_subscriptions** — web push endpoints
- **analytics** — event tracking

### RLS
- Users: read/update own data only
- Content (modules/lessons/paths): public read
- Admin: safety-net SELECT on all tables via `is_admin()` function
- Service client (`createServiceClient()`) bypasses RLS for admin/webhook operations

---

## Key Patterns

### Supabase Clients
- `createClient()` — respects RLS, for user-facing operations
- `createServiceClient()` — bypasses RLS, for admin/webhook/cron operations
- Column "order" conflicts with PostgREST — always filter/sort in JavaScript, not with `.order("order")`

### Server Actions
- Every action calls `supabase.auth.getUser()` first
- Every action wrapped in try/catch
- Generic errors to client, `console.error` server-side
- Rate limiting on auth actions (5 req/15min per IP)
- Zod validation on all inputs

### Email System (Resend)
- `sendWelcomeEmail` — after signup
- `sendProfileReadyEmail` — after questionnaire
- `sendPurchaseConfirmationEmail` — after payment
- `sendWeeklyProgressEmail` — cron every Sunday
- `sendStreakMilestoneEmail` — at 7, 14, 30 day streaks

### PWA
- `manifest.ts` — installable app (standalone, indigo theme)
- `public/sw.js` — push notification handler only (no caching)
- `InstallBanner` — iOS/Android install prompts (dashboard only)
- `NotificationPrompt` — daily reminder opt-in

---

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=Once <hello@onceph.com>
NEXT_PUBLIC_VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
CRON_SECRET=
```

---

## Running

```bash
npm install
npm run dev        # localhost:3000
npm run build      # production build
npx vercel --prod  # deploy to Vercel
```

---

## Brand Rules

- Logo: "Once." — the period is ALWAYS indigo (#4F46E5)
- Display font: Playfair Display (serif) for headings
- Body font: Inter (sans-serif)
- Primary color: #4F46E5 (Indigo)
- Pillar colors: Money=#F59E0B, Mind=#A78BFA, Body=#34D399, Spirit=#60A5FA
- Voice: Direct, no hype, no exclamation marks, proof over promises
- Currency: Always Philippine Peso (₱), never USD
- No framer-motion on landing page (CSS animations only for performance)
- Inline styles for hex colors (Tailwind v4 doesn't reliably render arbitrary hex)

---

## Migrations

Run in Supabase SQL Editor in order:
001 → 014 (see `supabase/migrations/`)

---

## Cron Jobs (vercel.json)

- `/api/email/weekly` — every Sunday 9AM UTC (5PM PH)
- `/api/push/send-daily` — daily midnight UTC (8AM PH)

Both require `CRON_SECRET` environment variable.
