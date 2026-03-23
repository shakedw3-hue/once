import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconMoney, IconMind, IconBody, IconSpirit } from "@/components/ui/icons";
import SiteLayout from "@/components/landing/SiteLayout";

const pillarIcons: Record<string, React.ReactNode> = {
  Money: <IconMoney size="md" />,
  Mind: <IconMind size="md" />,
  Body: <IconBody size="md" />,
  Spirit: <IconSpirit size="md" />,
};

export const metadata: Metadata = {
  title: "The 4 Pillars | Once",
};

const pillars = [
  {
    name: "Money",
    color: "bg-amber-500",
    borderColor: "border-amber-200",
    bgTint: "bg-amber-50",
    dotColor: "#F59E0B",
    gradientFrom: "from-amber-50",
    gradientTo: "to-amber-100/40",
    modules: [
      "Financial Direction",
      "Opportunity Thinking",
      "Decision Frameworks",
      "Smart Money Management",
      "Risk Thinking",
    ],
    description:
      "Built from what the world's most successful investors actually do.",
    whoNeeds:
      "You score high on Money if financial stress or lack of direction is the main thing holding you back. If you're earning but not growing, or not earning enough and don't know where to start, this is your path.",
  },
  {
    name: "Mind",
    color: "bg-violet-500",
    borderColor: "border-violet-200",
    bgTint: "bg-violet-50",
    dotColor: "#8B5CF6",
    gradientFrom: "from-violet-50",
    gradientTo: "to-violet-100/40",
    modules: [
      "Focus Reset",
      "Stress Control",
      "Emotional Resilience",
      "Decision Clarity",
      "Habit Architecture",
    ],
    description:
      "Built from decades of neuroscience research on how high performers think, focus, and decide.",
    whoNeeds:
      "You score high on Mind if you're overwhelmed, can't focus, make impulsive decisions, or can't stick to things. If you know what to do but can't make yourself do it, this is your path.",
  },
  {
    name: "Body",
    color: "bg-emerald-500",
    borderColor: "border-emerald-200",
    bgTint: "bg-emerald-50",
    dotColor: "#10B981",
    gradientFrom: "from-emerald-50",
    gradientTo: "to-emerald-100/40",
    modules: [
      "Energy Reset",
      "Training Consistency",
      "Nutrition Simplicity",
      "Recovery",
      "Movement & Mobility",
    ],
    description:
      "Built from the science of energy, sleep, and performance.",
    whoNeeds:
      "You score high on Body if you're tired all the time, can't stick to a workout routine, eat poorly, or your physical health is affecting everything else. If your body is working against you, this is your path.",
  },
  {
    name: "Spirit",
    color: "bg-blue-500",
    borderColor: "border-blue-200",
    bgTint: "bg-blue-50",
    dotColor: "#3B82F6",
    gradientFrom: "from-blue-50",
    gradientTo: "to-blue-100/40",
    modules: [
      "Meaning & Direction",
      "Gratitude Practice",
      "Daily Reflection",
      "Values Alignment",
      "Inner Peace & Stillness",
    ],
    description:
      "Built from the philosophy of people who found meaning in the hardest circumstances.",
    whoNeeds:
      "You score high on Spirit if you feel lost, disconnected, or like you're going through the motions. If you're successful on paper but something feels empty, this is your path.",
  },
];

export default function PillarsPage() {
  return (
    <SiteLayout>
      {/* Hero heading */}
      <div className="mb-16 text-center">
        <p
          className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase"
          style={{ color: "#6366F1" }}
        >
          The Framework
        </p>
        <h1
          className="mb-5 text-4xl font-semibold tracking-tight sm:text-5xl"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          The 4 Pillars
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Once scores you across four areas. Your highest score becomes
          your primary path. Here&apos;s what each pillar covers, what modules are
          in it, and who it&apos;s for.
        </p>
      </div>

      {/* Pillar cards */}
      <div className="space-y-10">
        {pillars.map((pillar) => (
          <div
            key={pillar.name}
            className={`relative overflow-hidden rounded-2xl border ${pillar.borderColor} bg-gradient-to-br ${pillar.gradientFrom} ${pillar.gradientTo} p-6 sm:p-8`}
            style={{
              boxShadow: "0 4px 24px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.03)",
            }}
          >
            {/* Header row */}
            <div className="mb-5 flex items-center gap-3">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: pillar.dotColor }}
              />
              <h2
                className="text-xl font-semibold tracking-tight sm:text-2xl"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {pillar.name}
              </h2>
              <span className="ml-auto">{pillarIcons[pillar.name]}</span>
            </div>

            <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {pillar.description}
            </p>

            {/* Modules */}
            <div className="mb-6">
              <p
                className="mb-3 text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground"
              >
                5 Modules in This Path
              </p>
              <div className="flex flex-wrap gap-2">
                {pillar.modules.map((mod) => (
                  <span
                    key={mod}
                    className="rounded-lg border border-white/80 bg-white/70 px-3.5 py-1.5 text-xs font-medium backdrop-blur-sm"
                    style={{
                      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                    }}
                  >
                    {mod}
                  </span>
                ))}
              </div>
            </div>

            {/* Who needs this */}
            <div
              className="rounded-xl border border-white/60 bg-white/50 p-4"
              style={{
                boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
              }}
            >
              <p
                className="mb-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground"
              >
                Who This Is For
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {pillar.whoNeeds}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Interconnection note */}
      <div
        className="mt-14 rounded-2xl border bg-white p-6 sm:p-8"
        style={{
          boxShadow: "0 4px 24px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.03)",
        }}
      >
        <h3
          className="mb-3 text-lg font-semibold tracking-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          These pillars aren&apos;t separate.
        </h3>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Low energy (Body) makes it hard to focus (Mind). Financial stress
          (Money) creates anxiety (Mind) and kills sleep (Body). No sense of
          purpose (Spirit) makes everything else feel pointless. The assessment
          finds which pillar is the root cause, so you fix the actual problem,
          not the symptoms.
        </p>
      </div>

      <p className="mt-10 text-center once-signature">Once<span style={{color:"#4F46E5"}}>.</span></p>

      <div className="mb-8 flex justify-end">
        <Link
          href="/method"
          className="text-sm font-medium hover:underline"
          style={{ color: "#4F46E5" }}
        >
          Next: The method behind Once &rarr;
        </Link>
      </div>

      {/* CTA */}
      <div
        className="mt-10 rounded-2xl border bg-white p-8 text-center"
        style={{
          boxShadow: "0 4px 24px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.03)",
        }}
      >
        <p className="mb-5 text-sm text-muted-foreground">
          Find out which pillar needs your attention first.
        </p>
        <Button
          render={<Link href="/auth/signup" />}
          size="lg"
          className="h-14 w-full px-8 text-base font-semibold sm:w-auto"
        >
          Do It Once
        </Button>
      </div>
    </SiteLayout>
  );
}
