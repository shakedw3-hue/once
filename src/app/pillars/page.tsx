import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/landing/SiteLayout";

export const metadata: Metadata = {
  title: "The 4 Pillars | Once",
};

const pillars = [
  {
    name: "Money",
    color: "bg-amber-500",
    borderColor: "border-amber-200",
    bgTint: "bg-amber-50",
    modules: [
      "Financial Direction",
      "Opportunity Thinking",
      "Decision Frameworks",
      "Smart Money Management",
      "Risk Thinking",
    ],
    description:
      "Not get-rich-quick. Not crypto tips. This pillar is about understanding where your money actually goes, how to evaluate opportunities, and how to make financial decisions without guessing.",
    whoNeeds:
      "You score high on Money if financial stress or lack of direction is the main thing holding you back. If you're earning but not growing, or not earning enough and don't know where to start, this is your path.",
  },
  {
    name: "Mind",
    color: "bg-violet-500",
    borderColor: "border-violet-200",
    bgTint: "bg-violet-50",
    modules: [
      "Focus Reset",
      "Stress Control",
      "Emotional Resilience",
      "Decision Clarity",
      "Habit Architecture",
    ],
    description:
      "Focus, stress, emotional control, habits. This is the operating system everything else runs on. If your mind isn't working well, nothing else will either, no matter how many courses you take.",
    whoNeeds:
      "You score high on Mind if you're overwhelmed, can't focus, make impulsive decisions, or can't stick to things. If you know what to do but can't make yourself do it, this is your path.",
  },
  {
    name: "Body",
    color: "bg-emerald-500",
    borderColor: "border-emerald-200",
    bgTint: "bg-emerald-50",
    modules: [
      "Energy Reset",
      "Training Consistency",
      "Nutrition Simplicity",
      "Recovery",
      "Movement & Mobility",
    ],
    description:
      "Energy, training, nutrition, recovery, and daily movement. No complicated diets or gym programs. Practical habits that give you more energy and keep you consistent without requiring a lifestyle overhaul.",
    whoNeeds:
      "You score high on Body if you're tired all the time, can't stick to a workout routine, eat poorly, or your physical health is affecting everything else. If your body is working against you, this is your path.",
  },
  {
    name: "Spirit",
    color: "bg-blue-500",
    borderColor: "border-blue-200",
    bgTint: "bg-blue-50",
    modules: [
      "Meaning & Direction",
      "Gratitude Practice",
      "Daily Reflection",
      "Values Alignment",
      "Inner Peace & Stillness",
    ],
    description:
      "Purpose, values, reflection, inner calm. This is the pillar most people ignore until everything else stops working. It's not religious. It's about knowing why you're doing what you're doing.",
    whoNeeds:
      "You score high on Spirit if you feel lost, disconnected, or like you're going through the motions. If you're successful on paper but something feels empty, this is your path.",
  },
];

export default function PillarsPage() {
  return (
    <SiteLayout>
      <h1 className="mb-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        The 4 pillars
      </h1>
      <p className="mb-12 text-base leading-relaxed text-muted-foreground sm:text-lg">
        Once scores you across four areas. Your highest score becomes
        your primary path. Here&apos;s what each pillar covers, what modules are
        in it, and who it&apos;s for.
      </p>

      <div className="space-y-8">
        {pillars.map((pillar) => (
          <div
            key={pillar.name}
            className={`rounded-xl border ${pillar.borderColor} ${pillar.bgTint} p-5 sm:p-6`}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${pillar.color}`} />
              <h2 className="text-lg font-semibold">{pillar.name}</h2>
            </div>

            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              {pillar.description}
            </p>

            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                5 modules in this path:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {pillar.modules.map((mod) => (
                  <span
                    key={mod}
                    className="rounded-md border bg-background px-2.5 py-1 text-xs"
                  >
                    {mod}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground italic">
              {pillar.whoNeeds}
            </p>
          </div>
        ))}
      </div>

      {/* Interconnection note */}
      <div className="mt-10 rounded-xl border bg-card p-5 sm:p-6">
        <h3 className="mb-2 text-sm font-semibold">These pillars aren&apos;t separate.</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Low energy (Body) makes it hard to focus (Mind). Financial stress
          (Money) creates anxiety (Mind) and kills sleep (Body). No sense of
          purpose (Spirit) makes everything else feel pointless. The assessment
          finds which pillar is the root cause, so you fix the actual problem,
          not the symptoms.
        </p>
      </div>

      <div className="mb-8 flex justify-end">
        <Link href="/method" className="text-sm text-primary hover:underline">
          Next: The method behind Once &rarr;
        </Link>
      </div>

      {/* CTA */}
      <div className="mt-10 rounded-xl border bg-card p-6 text-center">
        <p className="mb-4 text-sm text-muted-foreground">
          Find out which pillar needs your attention first.
        </p>
        <Button
          render={<Link href="/auth/signup" />}
          size="lg"
          className="h-12 px-6 text-sm font-semibold"
        >
          Take the free assessment
        </Button>
      </div>
    </SiteLayout>
  );
}
