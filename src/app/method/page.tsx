import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/landing/SiteLayout";

export const metadata: Metadata = {
  title: "The Method | Once",
};

export default function MethodPage() {
  return (
    <SiteLayout>
      <h1 className="mb-4 text-display text-3xl sm:text-4xl">
        The Once method
      </h1>
      <p className="mb-12 text-base leading-relaxed text-muted-foreground sm:text-lg">
        Once isn&apos;t based on opinions. It&apos;s based on how
        professionals (therapists, coaches, athletes, and the military)
        have been improving performance for decades. We just made it simple
        enough for anyone to use.
      </p>

      {/* The real problem */}
      <section className="mb-14">
        <h2 className="mb-4 text-section text-xl sm:text-2xl">
          Why most self-improvement doesn&apos;t work
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Someone sees an ad for a financial freedom course. Spends ₱5,000.
            Quits after two videos. Not because they&apos;re lazy, but because
            their real problem wasn&apos;t money at all. Maybe it was focus.
            Maybe it was energy. Maybe it was that they had no sense of
            direction in the first place.
          </p>
          <p>
            There&apos;s more content than ever. The problem is picking the wrong
            content, because nobody figured out what was actually going on first.
          </p>
          <p className="font-medium text-foreground">
            Once fixes that: figure out the problem first, then work on it.
          </p>
        </div>
      </section>

      {/* Why 4 areas */}
      <section className="mb-14">
        <h2 className="mb-4 text-section text-xl sm:text-2xl">
          Why we check 4 areas, not 1
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Your life doesn&apos;t run on one thing. Psychologists, doctors, and
            coaches have known this for years. When one area is off, it quietly
            drags everything else down.
          </p>
        </div>

        <div className="my-6 grid grid-cols-2 gap-3">
          {[
            { name: "Money", color: "border-amber-300 bg-amber-50", dot: "bg-amber-500", desc: "Financial clarity, decisions, risk awareness" },
            { name: "Mind", color: "border-violet-300 bg-violet-50", dot: "bg-violet-500", desc: "Focus, stress, emotional resilience, habits" },
            { name: "Body", color: "border-emerald-300 bg-emerald-50", dot: "bg-emerald-500", desc: "Energy, nutrition, movement, recovery" },
            { name: "Spirit", color: "border-blue-300 bg-blue-50", dot: "bg-blue-500", desc: "Purpose, values, reflection, inner calm" },
          ].map((p) => (
            <div key={p.name} className={`rounded-xl border p-4 ${p.color}`}>
              <div className="mb-2 flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${p.dot}`} />
                <span className="text-sm font-semibold text-foreground">{p.name}</span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Financial stress causes anxiety. Anxiety kills sleep. Bad sleep
            kills energy. Low energy makes everything feel pointless. It&apos;s
            all connected. That is why checking only one area never works.
          </p>
          <p className="font-medium text-foreground">
            The assessment finds which area is the root cause, not just the
            most obvious symptom.
          </p>
        </div>
      </section>

      {/* How scoring works */}
      <section className="mb-14">
        <h2 className="mb-4 text-section text-xl sm:text-2xl">
          How the scoring works
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            10 questions, 4 options each. Every option adds points to one or
            more pillars behind the scenes. Here&apos;s what that looks like:
          </p>
        </div>

        <div className="my-6 rounded-xl border bg-card p-4 sm:p-5">
          <p className="mb-3 text-label text-muted-foreground">Example question</p>
          <p className="mb-4 text-sm font-semibold text-foreground">
            &ldquo;What frustrates you most on a daily basis?&rdquo;
          </p>
          <div className="space-y-2">
            {[
              { answer: "Not having enough money for my goals", weights: "Money +4, Mind +2" },
              { answer: "Feeling overwhelmed or anxious", weights: "Mind +4, Body +1, Spirit +1" },
              { answer: "Low energy or feeling unhealthy", weights: "Body +4, Mind +2" },
              { answer: "Feeling lost or disconnected", weights: "Spirit +4, Mind +2" },
            ].map((opt) => (
              <div key={opt.answer} className="flex items-start justify-between gap-3 rounded-lg bg-muted/50 px-3 py-2.5">
                <span className="text-xs text-foreground">{opt.answer}</span>
                <span className="shrink-0 text-[10px] font-mono text-primary">{opt.weights}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            After 10 questions, the system totals your points and converts them
            to a 0–100 scale. Your highest pillar becomes your primary path.
            Second highest becomes secondary.
          </p>
          <p>
            This isn&apos;t a permanent label. It&apos;s a snapshot of where you
            are right now. Take it again in 6 months and your scores will
            probably shift. That&apos;s the whole point.
          </p>
        </div>
      </section>

      {/* Why worksheets */}
      <section className="mb-14">
        <h2 className="mb-4 text-section text-xl sm:text-2xl">
          Why worksheets, not video
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            When you watch a video, you remember about 10–20% of it. When you
            actually do something (write an answer, complete an exercise),
            that jumps to 50–75%. This is well-documented. It&apos;s why the
            best schools in the world stopped relying on lectures years ago.
          </p>
          <p>Every Once lesson has the same structure:</p>
        </div>

        <div className="my-6 space-y-2">
          {[
            { label: "Teaching", desc: "The concept explained in plain text. Read at your own pace.", num: "1" },
            { label: "Action step", desc: "One specific thing to do today. Small enough to actually do it.", num: "2" },
            { label: "Reflection", desc: "A question that connects the concept to your life. You write your answer.", num: "3" },
          ].map((step) => (
            <div key={step.label} className="flex gap-3 rounded-xl border bg-card p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {step.num}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{step.label}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          10–15 minutes per lesson. You do it, you move on, and you actually
          remember it, because you applied it immediately.
        </p>
      </section>

      {/* Who does this */}
      <section className="mb-14">
        <h2 className="mb-4 text-section text-xl sm:text-2xl">
          Who else does things this way
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            The ideas behind Once aren&apos;t new. They&apos;re used by
            people and institutions that take performance seriously:
          </p>
        </div>
        <div className="my-6 space-y-2">
          {[
            { who: "Professional athletes", what: "Score themselves across fitness, mindset, nutrition, and recovery every week. Not just training. The full picture." },
            { who: "Therapists", what: "Before any treatment, they ask you to rate how you're doing in different areas of life. Assessment first, plan second." },
            { who: "The U.S. military", what: "Tests soldiers across 4 life dimensions before deciding what support they need. Same structure, same logic." },
            { who: "Executive coaches", what: "Have used 'score your life areas' frameworks since the 1960s. CEOs do this because it's simple and it works." },
            { who: "Top medical schools", what: "Harvard and others replaced lectures with worksheets and case exercises, because students learn more by doing." },
          ].map((item) => (
            <div key={item.who} className="rounded-xl border bg-card p-4">
              <p className="text-sm font-semibold text-foreground">{item.who}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.what}</p>
            </div>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Once takes these same principles and makes them accessible to
          anyone. No therapist, no coach, no military program required.
        </p>
      </section>

      {/* What makes it different */}
      <section className="mb-14">
        <h2 className="mb-4 text-section text-xl sm:text-2xl">
          What makes this different
        </h2>
        <div className="space-y-2">
          {[
            { title: "It figures out the problem first", desc: "You don't pick from a list of topics. The system tells you where to start, based on your actual scores." },
            { title: "It checks all 4 areas", desc: "Courses cover one topic. Once sees the full picture and finds the area that's holding everything else back." },
            { title: "Every lesson ends with action", desc: "Something you do today. Not 'watch this 45-minute video and think about it.'" },
            { title: "No subscription", desc: "₱649–999 once. No monthly fee, no upsell. You have it, you use it, done." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border bg-card p-4">
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mb-8 flex justify-end">
        <Link href="/pricing" className="text-sm text-primary hover:underline">
          Next: See pricing &rarr;
        </Link>
      </div>

      {/* CTA */}
      <div className="rounded-xl border bg-card p-6 text-center">
        <p className="mb-4 text-sm text-muted-foreground">
          Try it yourself. The assessment is free.
        </p>
        <Button
          render={<Link href="/auth/signup" />}
          size="lg"
          className="h-12 px-6 text-sm font-semibold"
        >
          Take the assessment
        </Button>
      </div>
    </SiteLayout>
  );
}
