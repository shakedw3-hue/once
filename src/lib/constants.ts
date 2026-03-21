import type { Pillar } from "@/types/database";

export const PRICE_CORE_PHP = 1499;
export const PRICE_PRO_PHP = 2350;
export const PRICE_AI_PHP = 3950;
export const CURRENCY = "PHP";

export const PILLARS: Record<
  Pillar,
  { title: string; description: string; color: string; icon: string }
> = {
  money: {
    title: "Money",
    description: "Financial direction, opportunity thinking, and decision frameworks.",
    color: "from-amber-400 to-amber-600",
    icon: "DollarSign",
  },
  mind: {
    title: "Mind",
    description: "Focus reset, stress control, emotional resilience, and clarity.",
    color: "from-violet-400 to-purple-600",
    icon: "Brain",
  },
  body: {
    title: "Body",
    description: "Energy reset, training consistency, nutrition, and recovery.",
    color: "from-emerald-400 to-green-500",
    icon: "Heart",
  },
  spirit: {
    title: "Spirit",
    description: "Meaning, gratitude practice, daily reflection, and values alignment.",
    color: "from-blue-400 to-blue-600",
    icon: "Sparkles",
  },
};

export const PILLAR_ORDER: Pillar[] = ["money", "mind", "body", "spirit"];

export const MODULES_PER_PILLAR: Record<Pillar, string[]> = {
  money: [
    "Financial Direction",
    "Opportunity Thinking",
    "Decision Frameworks",
    "Smart Money Management",
    "Risk Thinking",
  ],
  mind: [
    "Focus Reset",
    "Stress Control",
    "Emotional Resilience",
    "Decision Clarity",
    "Habit Architecture",
  ],
  body: [
    "Energy Reset",
    "Training Consistency",
    "Nutrition Simplicity",
    "Recovery",
    "Movement & Mobility",
  ],
  spirit: [
    "Meaning & Direction",
    "Gratitude Practice",
    "Daily Reflection",
    "Values Alignment",
    "Inner Peace & Stillness",
  ],
};
