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

        <div className="my-6 space-y-4">
          {[
            {
              pillar: "Money",
              color: "#F59E0B",
              minds: [
                { name: "Ray Dalio", work: "Principles. 600 pages on decision-making and building systems that compound. We take his framework and build it into lessons about financial clarity and risk thinking." },
                { name: "Morgan Housel", work: "The Psychology of Money. Why financial behavior matters more than financial knowledge. His insights shape our lessons on spending awareness and long-term thinking." },
                { name: "Naval Ravikant", work: "How to get rich without getting lucky. Specific, leverage-based wealth creation. We apply his principles to the Filipino context." },
              ],
            },
            {
              pillar: "Mind",
              color: "#A78BFA",
              minds: [
                { name: "Andrew Huberman", work: "Stanford neuroscience. Protocols for focus, dopamine regulation, and stress management backed by peer-reviewed research." },
                { name: "James Clear", work: "Atomic Habits. The science of small behavior change. His 1% improvement framework shapes every habit lesson." },
                { name: "Cal Newport", work: "Deep Work. How to focus in a distracted world. His time-blocking and attention management techniques are in the Mind path." },
              ],
            },
            {
              pillar: "Body",
              color: "#34D399",
              minds: [
                { name: "Andrew Huberman", work: "Science-backed protocols for sleep, exercise timing, cold exposure, and energy optimization." },
                { name: "Matthew Walker", work: "Why We Sleep. The research on how sleep affects every system in your body. His findings shape our Energy Reset module." },
                { name: "Peter Attia", work: "Outlive. Longevity science made practical. Nutrition, movement, and recovery insights built for daily use." },
              ],
            },
            {
              pillar: "Spirit",
              color: "#60A5FA",
              minds: [
                { name: "Viktor Frankl", work: "Man's Search for Meaning. Finding purpose even in suffering. His logotherapy principles anchor the Meaning and Direction module." },
                { name: "Ryan Holiday", work: "The Daily Stoic. Ancient philosophy made practical. Stoic principles for daily decision-making and inner calm." },
                { name: "Thich Nhat Hanh", work: "The Miracle of Mindfulness. Simple, grounded practices for presence and peace that take 5 minutes, not 5 hours." },
              ],
            },
          ].map((pillar) => (
            <div key={pillar.pillar} className="rounded-xl border bg-card p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: pillar.color }} />
                <h3 className="text-sm font-semibold">{pillar.pillar} Pillar</h3>
              </div>
              <div className="space-y-3">
                {pillar.minds.map((mind) => (
                  <div key={mind.name}>
                    <p className="text-xs">
                      <span className="font-semibold text-foreground">{mind.name}</span>
                      <span className="text-muted-foreground"> : {mind.work}</span>
                    </p>
                  </div>
                ))}
              </div>
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
            practical income skills for the Philippine market.
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

      <div className="mb-8 flex justify-end">
        <Link href="/pricing" className="text-sm text-primary hover:underline">
          Next: See pricing →
        </Link>
      </div>

      <div className="rounded-xl border bg-card p-6 text-center">
        <p className="mb-4 text-sm text-muted-foreground">
          Try the method yourself. The assessment is free.
        </p>
        <Button render={<Link href="/auth/signup" />} size="lg" className="h-12 px-6 text-sm font-semibold">
          Do It Once
        </Button>
      </div>
    </SiteLayout>
  );
}
