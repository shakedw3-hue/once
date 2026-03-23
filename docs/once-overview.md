# Once. --- Platform Overview

## What is Once.

**One-line:** The only platform that diagnoses your life across four pillars, then builds the one personalized path that is right for you.

**Extended:** Once. is a Philippine-first personal development platform that replaces the endless catalog of online courses with a single, structured experience. It starts with a free 15-question assessment that scores users across Money, Mind, Body, and Spirit. Based on those scores, Once. builds one personalized path --- not a library to browse, but a curated sequence of 10-minute worksheet-based lessons drawn from the world's leading researchers and practitioners. Pro and AI Careers plans add real income skills built specifically for the Philippine market.

### The problem we solve

There are over 200,000 self-help books on Amazon, over 10,000 courses on Udemy, and millions of hours of podcasts. Filipinos spend thousands of pesos on courses they never finish --- not because they are lazy, but because none of those courses were built for their specific situation. Nobody diagnoses the real bottleneck first. Someone whose real problem is focus buys a finance course. Someone who needs direction watches productivity videos. The content is not wrong. It is just wrong for them.

### How we solve it differently

Once. inverts the model. Instead of "browse and buy," it is "diagnose and prescribe." The free assessment identifies which of the four life pillars need the most attention, then the recommendation engine selects the right plan, the right track, and the right lesson sequence --- automatically. Every lesson ends with one action step for today, not a video to watch someday. The result is a completion rate that traditional courses cannot match, because every lesson was chosen for a reason specific to the user.

---

## Product

### Free Assessment

- 15 questions across three phases: Hook (Q1--Q3), Deep Dive (Q4--Q10), Future Focus (Q11--Q15)
- Covers all four pillars: Money, Mind, Body, Spirit
- Each question has 3--4 options, each carrying weighted scores toward specific pillars
- Thoughtful response copy after each answer to build trust and emotional connection
- Takes approximately 10 minutes to complete
- Users see their pillar scores and recommended path before paying anything
- No credit card required

### Scoring System and Personalization

- Raw pillar scores are calculated from answer weights across all 15 questions
- Scores are normalized to percentages that sum to 100
- The system identifies a primary path (highest-need pillar) and secondary path
- The primary path determines module sequencing and lesson selection
- Users receive a personalized Once. profile showing their scores and path

### Smart Recommendation Engine

The recommendation engine determines both the plan and the income track based on two key signals:

- **Income target** (Q12): Ranges from "extra P5,000--P15,000/month" to "P50,000+/month"
- **Digital comfort** (Q13): From "very comfortable" to "not sure if I can"

Recommendation logic:
- P50,000+ income target --> AI Careers (track varies by digital comfort)
- Job replacement income target --> AI Careers (high digital comfort) or Pro (lower comfort)
- Extra income target --> Pro (track matched to primary pillar)
- Stability-first --> Pro (track matched to primary pillar)
- Primary pillar = Money --> Shopee/Lazada E-Commerce
- Primary pillar = Mind --> Social Media Management
- Other primary pillars --> Freelancing

The system never recommends Core on its own. It believes in the user and defaults to Pro or AI Careers.

### Lesson Library

- **275+ lessons** across all plans
- **Core:** 5 modules, 25 lessons (5 per module per pillar)
- **Pro:** 125 total lessons (Core + 100 income skill lessons)
- **AI Careers:** 200+ lessons (Pro + 3 AI career tracks)

### 3-Layer Lesson Architecture

Every lesson follows this structure:

1. **Teaching** --- What the research says. Referenced to the original source. Explained in language anyone can understand.
2. **Action Step** --- One specific thing to do within 24 hours. Not someday. Today. Small enough to actually do it.
3. **Reflection** --- A question that makes the insight personal. The user writes their answer. This is where learning becomes change.

Format is worksheet-based, not video. Users remember up to 50% more when they write and do things, compared to watching video.

### Modules per Pillar

**Money:**
- Financial Direction
- Opportunity Thinking
- Decision Frameworks
- Smart Money Management
- Risk Thinking

**Mind:**
- Focus Reset
- Stress Control
- Emotional Resilience
- Decision Clarity
- Habit Architecture

**Body:**
- Energy Reset
- Training Consistency
- Nutrition Simplicity
- Recovery
- Movement & Mobility

**Spirit:**
- Meaning & Direction
- Gratitude Practice
- Daily Reflection
- Values Alignment
- Inner Peace & Stillness

### Engagement System

- Streak tracking (daily lesson completion)
- Progress tracking across modules and pillars
- Personalized dashboard showing scores, streaks, and lesson progress
- Badge system for milestones

### Income Tracks

**Pro plan income skills:**
- Social Media Management (P15,000--P40,000/month)
- Shopee/Lazada E-Commerce (P10,000--P50,000/month)
- Freelancing on Upwork and OnlineJobs.ph (P15,000--P60,000/month)
- Online side income building

**AI Careers tracks (3 tracks):**
- AI Business Services --- "You ask AI. AI does the work. You get paid." (P20,000--P50,000/project)
- AI Content & Design --- "You describe it. AI creates it. You deliver it." (P8,000--P25,000/month)
- AI Web & No-Code --- "Build a real website in 48 hours. Zero coding." (P15,000--P40,000/project)

---

## Plans & Pricing

### Once Core --- P1,499 (one-time)
- Full 4-pillar assessment and personalized profile
- 5 structured modules
- 5--7 lessons per module (25 total)
- Action steps and reflections
- Progress tracking
- Lifetime access

### Once Pro --- P2,350 (one-time) --- Most Popular
- Everything in Core
- Social media management skills
- Shopee/Lazada e-commerce
- Freelancing and client acquisition
- Building an online side income
- 100 additional lessons (125 total)
- Priority updates

### Once AI Careers --- P3,950 (one-time) --- Best Investment
- Everything in Pro
- AI Business Services track
- AI Content & Design track
- AI Web & No-Code track
- 200+ lessons total

### Payment Details
- One-time payment, lifetime access
- No subscription, no upsells, no hidden tiers
- Accepted methods: Visa, Mastercard, GCash, Maya
- Payment processor: Paddle
- 14-day refund policy
- Free assessment before any payment is required

---

## Target Audience

### Primary Demographics
- Filipino professionals ages 20--40
- Income range: P15,000--P50,000/month
- Mobile-first users (80%+ Android)
- English-literate with Taglish preference

### Key Segments

**BPO workers (25--35)**
- 8+ years in the industry, feeling stuck
- Have disposable income but no growth path
- Need systems, not motivation

**Fresh graduates (22--26)**
- No direction after graduation
- Overwhelmed by options
- Low budget, high willingness to learn

**Side hustlers (25--35)**
- Have tried multiple courses and failed
- Spent P5,000--P40,000 on courses that did not stick
- Skeptical but still searching

**Young parents (25--35)**
- Limited time (10 minutes/day is the maximum)
- Family-driven motivation
- Need practical income skills, not theory

### Psychographic Profile
- Have tried self-improvement content before (YouTube, courses, books)
- Frustrated by generic advice that does not apply to their situation
- Skeptical of "guru" promises and hype language
- Value practical, specific, peso-denominated guidance
- Want results they can measure

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 |
| Styling | Tailwind CSS v4 |
| Database & Auth | Supabase |
| Payments | Paddle |
| Email | Resend |
| Hosting | Vercel |
| Fonts | Playfair Display (display), Inter (body) |

---

## Key Metrics (Goals)

| Metric | Target |
|--------|--------|
| Assessment completion rate | >70% |
| Assessment to paid conversion | >15% |
| Day-7 retention | >50% |
| Day-30 retention | >30% |

---

## The Four-Step Process

```
01. Diagnose --- 15 questions across Money, Mind, Body, and Spirit.
                  We find exactly where you are.

02. Match    --- We build one path based on your scores.
                  Not a catalog. Your path.

03. Learn    --- 10 minutes a day. Every lesson is built from
                  what the world's best minds already proved.

04. Launch   --- Pro members get practical income skills
                  for the Philippine market. Real pesos.
```

---

## Content Sources

### The Council of Minds

Every Once. lesson is built from researchers, authors, and practitioners who spent decades studying what actually works. The platform does not invent advice. It filters, builds from, and personalizes what the best minds have already proven.

**Money:** Warren Buffett, Ray Dalio, Robert Kiyosaki, Elon Musk, Mark Cuban
**Mind:** Andrew Huberman, James Clear, Cal Newport, David Goggins, Tim Ferriss
**Body:** Matthew Walker, Peter Attia, LeBron James, Cristiano Ronaldo, Kobe Bryant
**Spirit:** Dalai Lama, Viktor Frankl, Ryan Holiday, Oprah Winfrey, Jay Shetty

**Research institutions:** Harvard, MIT, WHO, McKinsey, Forbes

---

*Once. v1 --- Philippines Personal Development Intelligence*
