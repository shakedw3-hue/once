import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/landing/SiteLayout";

export const metadata: Metadata = { title: "The Once method" };

export default function MethodPage() {
  return (
    <SiteLayout>
      <h1 className="mb-4 text-display text-3xl sm:text-4xl">
        The Once method
      </h1>
      <p className="mb-12 text-base leading-relaxed text-muted-foreground sm:text-lg">
        Ray Dalio wrote 600 pages. Andrew Huberman recorded 300 hours. James
        Clear spent years studying habits. We learned from what matters for you right
        now and built it into a 10-minute lesson you can act on today.
      </p>

      {/* The problem */}
      <section className="mb-14">
        <h2 className="mb-4 text-section text-xl sm:text-2xl">
          The information overload problem
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
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
      <section className="mb-14">
        <h2 className="mb-4 text-section text-xl sm:text-2xl">
          The council of minds
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Every Once lesson is built from researchers, authors, and
            practitioners who spent decades studying what actually works. We
            do not invent advice. We filter, build from, and personalize what the
            best minds have already proven.
          </p>
        </div>

        <div className="my-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { name: "Warren Buffett", desc: "The world's most successful investor", pillar: "Money", color: "#F59E0B" },
            { name: "Elon Musk", desc: "Entrepreneur who changed multiple industries", pillar: "Money + Mind", color: "#F59E0B" },
            { name: "Kobe Bryant", desc: "The standard for mental toughness", pillar: "Mind + Body", color: "#A78BFA" },
            { name: "Andrew Huberman", desc: "Stanford neuroscientist on focus and performance", pillar: "Mind", color: "#A78BFA" },
            { name: "James Clear", desc: "Behavioral scientist on habits", pillar: "Mind", color: "#A78BFA" },
            { name: "LeBron James", desc: "The most prepared athlete of his generation", pillar: "Body", color: "#34D399" },
            { name: "Matthew Walker", desc: "World's leading sleep researcher", pillar: "Body", color: "#34D399" },
            { name: "Dalai Lama", desc: "Global authority on inner peace", pillar: "Spirit", color: "#60A5FA" },
            { name: "Oprah Winfrey", desc: "From nothing to global influence", pillar: "Spirit", color: "#60A5FA" },
            { name: "Viktor Frankl", desc: "Found meaning in the worst conditions", pillar: "Spirit", color: "#60A5FA" },
          ].map((person) => (
            <div key={person.name} className="rounded-xl border bg-card p-3 text-center">
              <div
                className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: person.color }}
              >
                {person.name.split(" ").map(n => n[0]).join("")}
              </div>
              <p className="text-xs font-semibold">{person.name}</p>
              <p className="mt-0.5 text-[10px] leading-tight text-muted-foreground">{person.desc}</p>
              <p className="mt-1.5 text-[9px] font-medium" style={{ color: person.color }}>{person.pillar}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How distillation works */}
      <section className="mb-14">
        <h2 className="mb-4 text-section text-xl sm:text-2xl">
          How we turn 600 pages into a 10-minute lesson
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            We do not summarize. We extract the one actionable principle from
            each source that applies to your pillar, at your level, right now.
            Then we structure it into a lesson you can complete in 10 minutes.
          </p>
          <p>Every lesson has three parts:</p>
        </div>
        <div className="my-6 space-y-2">
          {[
            { n: "1", label: "Teaching", desc: "What the research says. Referenced to the source. Explained in language anyone can understand." },
            { n: "2", label: "Action step", desc: "One specific thing to do within 24 hours. Not someday. Today. Small enough to actually do it." },
            { n: "3", label: "Reflection", desc: "A question that makes the insight personal. You write your answer. This is where learning becomes change." },
          ].map((step) => (
            <div key={step.label} className="flex gap-3 rounded-xl border bg-card p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{step.n}</span>
              <div>
                <p className="text-sm font-semibold">{step.label}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          You remember up to 50% more when you write and do things, compared
          to watching a video. That is why Once is worksheets, not lectures.
          You do not watch someone else&apos;s insight. You build your own.
        </p>
      </section>

      {/* The Launch step */}
      <section className="mb-14">
        <h2 className="mb-4 text-section text-xl sm:text-2xl">
          From growth to income
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
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

        <p className="mt-6 text-center once-signature">Once<span className="once-dot">.</span></p>

      <div className="mb-8 flex justify-end">
        <Link href="/pricing" className="text-sm text-primary hover:underline">
          Next: See pricing →
        </Link>
      </div>

      <div className="rounded-xl border bg-card p-6 text-center">
        <p className="mb-4 text-sm text-muted-foreground">
          Try the method yourself. The assessment is free.
        </p>
        <Button render={<Link href="/auth/signup" />} size="lg" className="h-14 w-full px-8 text-base font-semibold sm:w-auto">
          Do It Once
        </Button>
      </div>
    </SiteLayout>
  );
}
