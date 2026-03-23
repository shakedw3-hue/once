import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/landing/SiteLayout";

export const metadata: Metadata = { title: "The Once method" };

const councilMembers = [
  { name: "Warren Buffett", desc: "The world's most successful investor", pillar: "Money", color: "#F59E0B" },
  { name: "Elon Musk", desc: "Entrepreneur who changed multiple industries", pillar: "Money + Mind", color: "#F59E0B" },
  { name: "Kobe Bryant", desc: "The standard for mental toughness", pillar: "Mind + Body", color: "#8B5CF6" },
  { name: "Andrew Huberman", desc: "Stanford neuroscientist on focus and performance", pillar: "Mind", color: "#8B5CF6" },
  { name: "James Clear", desc: "Behavioral scientist on habits", pillar: "Mind", color: "#8B5CF6" },
  { name: "LeBron James", desc: "The most prepared athlete of his generation", pillar: "Body", color: "#10B981" },
  { name: "Matthew Walker", desc: "World's leading sleep researcher", pillar: "Body", color: "#10B981" },
  { name: "Dalai Lama", desc: "Global authority on inner peace", pillar: "Spirit", color: "#3B82F6" },
  { name: "Oprah Winfrey", desc: "From nothing to global influence", pillar: "Spirit", color: "#3B82F6" },
  { name: "Viktor Frankl", desc: "Found meaning in the worst conditions", pillar: "Spirit", color: "#3B82F6" },
];

const lessonSteps = [
  { n: "1", label: "Teaching", desc: "What the research says. Referenced to the source. Explained in language anyone can understand." },
  { n: "2", label: "Action Step", desc: "One specific thing to do within 24 hours. Not someday. Today. Small enough to actually do it." },
  { n: "3", label: "Reflection", desc: "A question that makes the insight personal. You write your answer. This is where learning becomes change." },
];

export default function MethodPage() {
  return (
    <SiteLayout>
      {/* Hero heading */}
      <div className="mb-16 text-center">
        <p
          className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase"
          style={{ color: "#6366F1" }}
        >
          Our Approach
        </p>
        <h1
          className="mb-5 text-4xl font-semibold tracking-tight sm:text-5xl"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          The Once Method
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Ray Dalio wrote 600 pages. Andrew Huberman recorded 300 hours. James
          Clear spent years studying habits. We learned from what matters for you right
          now and built it into a 10-minute lesson you can act on today.
        </p>
      </div>

      {/* The problem */}
      <section className="mb-16">
        <h2
          className="mb-5 text-2xl font-semibold tracking-tight sm:text-3xl"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          The information overload problem
        </h2>
        <div
          className="rounded-2xl border bg-white p-6 sm:p-8 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base"
          style={{
            boxShadow: "0 4px 24px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.03)",
          }}
        >
          <p>
            There are over 200,000 self-help books on Amazon. Over 10,000 online
            courses on Udemy. Millions of hours of podcasts. The problem is not
            that the knowledge does not exist. The problem is that nobody is
            filtering it for you.
          </p>
          <p>
            Someone buys a ₱5,000 course on financial freedom. They quit after
            two videos. Not because they are lazy. Because the course was not
            built for their specific situation. Their real bottleneck might have
            been focus, energy, or direction. Nobody diagnosed it first.
          </p>
          <p className="font-medium text-foreground">
            Once solves this with four steps: Diagnose, Match, Learn, Launch.
          </p>
        </div>
      </section>

      {/* The council of minds */}
      <section className="mb-16">
        <div className="mb-8 text-center">
          <p
            className="mb-2 text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "#6366F1" }}
          >
            Built From The Best
          </p>
          <h2
            className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The council of minds
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground">
            Every Once lesson is built from researchers, authors, and
            practitioners who spent decades studying what actually works. We
            do not invent advice. We filter, build from, and personalize what the
            best minds have already proven.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {councilMembers.map((person) => (
            <div
              key={person.name}
              className="group rounded-2xl border bg-white p-4 text-center transition-shadow duration-200 hover:shadow-md"
              style={{
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              {/* Avatar circle */}
              <div
                className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{
                  backgroundColor: person.color,
                  boxShadow: `0 4px 14px ${person.color}40`,
                }}
              >
                {person.name.split(" ").map(n => n[0]).join("")}
              </div>
              <p className="text-xs font-semibold tracking-tight">{person.name}</p>
              <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{person.desc}</p>
              <p
                className="mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase"
                style={{
                  color: person.color,
                  backgroundColor: `${person.color}12`,
                }}
              >
                {person.pillar}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How distillation works */}
      <section className="mb-16">
        <h2
          className="mb-5 text-2xl font-semibold tracking-tight sm:text-3xl"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          How we turn 600 pages into a 10-minute lesson
        </h2>
        <div
          className="rounded-2xl border bg-white p-6 sm:p-8"
          style={{
            boxShadow: "0 4px 24px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.03)",
          }}
        >
          <div className="mb-6 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              We do not summarize. We extract the one actionable principle from
              each source that applies to your pillar, at your level, right now.
              Then we structure it into a lesson you can complete in 10 minutes.
            </p>
            <p>Every lesson has three parts:</p>
          </div>

          {/* Numbered steps */}
          <div className="space-y-4">
            {lessonSteps.map((step) => (
              <div
                key={step.label}
                className="flex gap-4 rounded-xl border bg-gradient-to-r from-slate-50/80 to-white p-5"
                style={{
                  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                }}
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{
                    backgroundColor: "#4F46E5",
                    boxShadow: "0 2px 8px rgba(79,70,229,0.3)",
                  }}
                >
                  {step.n}
                </span>
                <div>
                  <p className="mb-1 text-sm font-semibold tracking-tight">{step.label}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
            You remember up to 50% more when you write and do things, compared
            to watching a video. That is why Once is worksheets, not lectures.
            You do not watch someone else&apos;s insight. You build your own.
          </p>
        </div>
      </section>

      {/* The Launch step */}
      <section className="mb-16">
        <h2
          className="mb-5 text-2xl font-semibold tracking-tight sm:text-3xl"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          From growth to income
        </h2>
        <div
          className="rounded-2xl border bg-white p-6 sm:p-8 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base"
          style={{
            boxShadow: "0 4px 24px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.03)",
          }}
        >
          <p>
            Core builds your foundation across Money, Mind, Body, and Spirit.
            Pro takes the next step: 100 additional lessons that teach you
            practical income skills for the Philippine market. AI Careers goes
            even further with three AI-powered tracks: AI Business Services,
            AI Content &amp; Design, and AI Web &amp; No-Code.
          </p>
          <p>
            Social media management for local businesses. Selling on Shopee
            and Lazada. Finding freelance clients on Upwork and OnlineJobs.ph.
            Building a digital side income. Real platforms, real numbers, real
            step-by-step instructions.
          </p>
          <p className="font-medium text-foreground">
            Growing as a person is the foundation. Growing your income is the
            launch. Once gives you both.
          </p>
        </div>
      </section>

      <p className="mt-6 text-center once-signature">Once<span style={{color:"#4F46E5"}}>.</span></p>

      <div className="mb-8 flex justify-end">
        <Link
          href="/pricing"
          className="text-sm font-medium hover:underline"
          style={{ color: "#4F46E5" }}
        >
          Next: See pricing &rarr;
        </Link>
      </div>

      {/* CTA */}
      <div
        className="rounded-2xl border bg-white p-8 text-center"
        style={{
          boxShadow: "0 4px 24px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.03)",
        }}
      >
        <p className="mb-5 text-sm text-muted-foreground">
          Try the method yourself. The assessment is free.
        </p>
        <Button render={<Link href="/auth/signup" />} size="lg" className="h-14 w-full px-8 text-base font-semibold sm:w-auto">
          Do It Once
        </Button>
      </div>
    </SiteLayout>
  );
}
