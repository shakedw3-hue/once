import type { Pillar, PillarScores, Plan, Recommendation } from "@/types/database";

export interface QuestionOption {
  label: string;
  emoji?: string;
  weights: Partial<Record<Pillar, number>>;
  response: string;
}

export interface Question {
  id: string;
  phase: "hook" | "deep" | "future";
  prompt: string;
  options: QuestionOption[];
}

export const QUESTIONS: Question[] = [
  // PHASE 1 — THE HOOK (Q1-3)
  {
    id: "battery",
    phase: "hook",
    prompt: "If your life was a phone, what would the battery look like right now?",
    options: [
      { label: "Almost dead (5%)", emoji: "🔴", weights: { body: 3, mind: 3, spirit: 2 }, response: "That took courage to admit. Let's figure out why." },
      { label: "Low, barely getting through", emoji: "🟡", weights: { body: 2, mind: 2, spirit: 1 }, response: "You're not stuck. You're just not moving yet." },
      { label: "Okay, not great not bad", emoji: "🟢", weights: { mind: 1, spirit: 1 }, response: "Okay is the most dangerous place to be." },
      { label: "Charged, just need direction", emoji: "⚡", weights: { money: 2, spirit: 3 }, response: "Direction is exactly what Once is built for." },
    ],
  },
  {
    id: "proud",
    phase: "hook",
    prompt: "When was the last time you felt genuinely proud of yourself?",
    options: [
      { label: "This week", weights: { mind: 1, spirit: 1 }, response: "Hold onto that. We're going to build more of it." },
      { label: "This month", weights: { mind: 2, spirit: 1 }, response: "Good. There's momentum. Let's use it." },
      { label: "I can't remember", weights: { mind: 3, spirit: 3 }, response: "That's more common than you think." },
      { label: "I'm not sure I ever have", weights: { spirit: 5, mind: 2 }, response: "That answer is the beginning of something important." },
    ],
  },
  {
    id: "one_change",
    phase: "hook",
    prompt: "What's the one area that, if it changed, would change everything?",
    options: [
      { label: "Money. Tired of never having enough.", emoji: "💰", weights: { money: 5, mind: 1 }, response: "Money isn't everything. But not having it affects everything." },
      { label: "Mind. My thoughts work against me.", emoji: "🧠", weights: { mind: 5, spirit: 1 }, response: "The mind is the operating system. Fix that, fix everything." },
      { label: "Body. I have no energy.", emoji: "💪", weights: { body: 5, mind: 1 }, response: "Energy is the currency of life. You can't outperform a tired body." },
      { label: "Spirit. I don't know what I'm doing this for.", emoji: "🌿", weights: { spirit: 5, mind: 1 }, response: "Purpose is the anchor that holds everything else together." },
    ],
  },
  // PHASE 2 — DEEP DIVE (Q4-10)
  {
    id: "two_years",
    phase: "deep",
    prompt: "When you imagine life 2 years from now, what do you see?",
    options: [
      { label: "Completely different. I need a full reset.", weights: { spirit: 3, money: 2, mind: 1 }, response: "A reset isn't starting over. It's starting right." },
      { label: "Better, but I'm not sure how to get there.", weights: { mind: 3, money: 2 }, response: "The gap between here and there is just a plan." },
      { label: "Similar, but more stable.", weights: { money: 2, body: 1 }, response: "Stability is underrated. Let's build it." },
      { label: "I try not to think about it.", weights: { spirit: 4, mind: 2 }, response: "Avoiding the future means someone else decides it for you." },
    ],
  },
  {
    id: "follow_through",
    phase: "deep",
    prompt: "What usually stops you from following through?",
    options: [
      { label: "Lose motivation after a few days", weights: { mind: 3, spirit: 2 }, response: "Motivation fades. Systems don't." },
      { label: "Don't know where to start", weights: { mind: 2, money: 2 }, response: "Clarity is what Once gives you first." },
      { label: "Get distracted by other things", weights: { mind: 4, body: 1 }, response: "Distraction is the enemy of direction." },
      { label: "Afraid it won't work", weights: { spirit: 3, mind: 2 }, response: "Fear of failure is just fear of trying." },
    ],
  },
  {
    id: "income",
    phase: "deep",
    prompt: "How do you feel about your income right now?",
    options: [
      { label: "Not enough, and I don't see how to change it", weights: { money: 5, spirit: 1 }, response: "Seeing the path is the first step to walking it." },
      { label: "Covers basics but nothing more", weights: { money: 3, mind: 1 }, response: "Survival mode is real. Let's get you past it." },
      { label: "Okay, but I want more", weights: { money: 2 }, response: "Wanting more isn't greed. It's growth." },
      { label: "Money isn't my main concern right now", weights: { mind: 1, spirit: 2 }, response: "Good. That means we can focus on what actually matters to you." },
    ],
  },
  {
    id: "sleep",
    phase: "deep",
    prompt: "How many hours of real sleep do you get most nights?",
    options: [
      { label: "Less than 5", weights: { body: 5, mind: 2 }, response: "Under 5 hours, your decision-making drops to near-impaired levels. This matters." },
      { label: "5 to 6 hours", weights: { body: 3, mind: 1 }, response: "You're functioning but not thriving. There's a difference." },
      { label: "6 to 7 hours", weights: { body: 1 }, response: "Close to good. Small adjustments make a big difference here." },
      { label: "7 to 8 or more", weights: {}, response: "Your body is getting what it needs. That's a real advantage." },
    ],
  },
  {
    id: "reaction",
    phase: "deep",
    prompt: "When things go wrong, what's your first reaction?",
    options: [
      { label: "I blame myself", weights: { mind: 3, spirit: 2 }, response: "Self-blame is heavy. Let's trade it for self-awareness." },
      { label: "I blame the situation or others", weights: { mind: 2, spirit: 1 }, response: "External blame protects you. But it also traps you." },
      { label: "I shut down and go quiet", weights: { spirit: 3, mind: 2 }, response: "Silence can be a shield. Once helps you find your voice." },
      { label: "I try to find a solution immediately", weights: { money: 1 }, response: "Problem-solver instinct. That's a strength worth building on." },
    ],
  },
  {
    id: "values",
    phase: "deep",
    prompt: "Do you have a clear sense of what you stand for?",
    options: [
      { label: "Yes, completely", weights: { spirit: -1 }, response: "That clarity is rare. Let's put it to work." },
      { label: "Somewhat. Ideas but nothing clear.", weights: { spirit: 2, mind: 1 }, response: "Vague values create vague results. Let's sharpen them." },
      { label: "Not really, I live day to day", weights: { spirit: 4, mind: 1 }, response: "Day to day is surviving. Once helps you start living." },
      { label: "I've never thought about it", weights: { spirit: 5 }, response: "That's not a flaw. It's just unfinished business." },
    ],
  },
  {
    id: "habits",
    phase: "deep",
    prompt: "How consistent are you with habits that matter to you?",
    options: [
      { label: "Very consistent", weights: {}, response: "Consistency is rare. You already have the hardest part." },
      { label: "Try but fall off after 1 to 2 weeks", weights: { mind: 3, body: 1 }, response: "The 2-week wall is real. The right system breaks through it." },
      { label: "Start strong then disappear", weights: { mind: 4, spirit: 1 }, response: "Starting is easy. Finishing is what Once is built for." },
      { label: "I don't have consistent habits yet", weights: { mind: 3, body: 2, spirit: 1 }, response: "No habits yet means no bad habits to undo. Fresh start." },
    ],
  },
  // PHASE 3 — FUTURE FOCUS (Q11-15)
  {
    id: "free_time",
    phase: "future",
    prompt: "If money wasn't a concern, what would you spend your time doing?",
    options: [
      { label: "Building something of my own", weights: { money: 3, mind: 1 }, response: "Builders think differently. Once builds with you." },
      { label: "Helping my family and community", weights: { spirit: 3, money: 1 }, response: "Service is the deepest kind of purpose." },
      { label: "Learning and growing constantly", weights: { mind: 3, spirit: 1 }, response: "Growth for its own sake. That's a powerful drive." },
      { label: "Experiencing life. Travel, freedom, adventure.", weights: { spirit: 2, body: 1 }, response: "Freedom requires a foundation. Let's build it." },
    ],
  },
  {
    id: "income_target",
    phase: "future",
    prompt: "What kind of income would actually change your life?",
    options: [
      { label: "An extra ₱5,000 to ₱15,000/month", weights: { money: 2 }, response: "Achievable within 30 to 60 days with the right skills." },
      { label: "A full replacement of my current job", weights: { money: 4, spirit: 1 }, response: "That's not a dream. It's a 6 to 12 month plan." },
      { label: "₱50,000+/month. Real financial freedom.", weights: { money: 5 }, response: "Big goals need big systems. Once gives you both." },
      { label: "I just want stability first", weights: { money: 1, spirit: 1 }, response: "Stability first. Everything else follows." },
    ],
  },
  {
    id: "digital_skills",
    phase: "future",
    prompt: "How comfortable are you learning new digital skills?",
    options: [
      { label: "Very. I pick things up fast.", weights: { money: 1 }, response: "Speed is an advantage. Let's point it in the right direction." },
      { label: "I need clear steps but I can do it", weights: { money: 1, mind: 1 }, response: "Clear steps is exactly what Once delivers." },
      { label: "Nervous but willing", weights: { mind: 2, money: 1 }, response: "Willing is enough. Once handles the rest." },
      { label: "Not sure if I can", weights: { mind: 3, spirit: 1 }, response: "Every skill you have now was once new." },
    ],
  },
  {
    id: "success_def",
    phase: "future",
    prompt: "What does success look like to you, personally?",
    options: [
      { label: "Financial freedom for my family", weights: { money: 3, spirit: 2 }, response: "Family-driven ambition. The strongest kind." },
      { label: "Work that actually means something", weights: { spirit: 4, mind: 1 }, response: "Meaningful work changes more than your income." },
      { label: "Time and energy for the people I love", weights: { body: 2, spirit: 2 }, response: "Time is the real currency. Let's earn more of it." },
      { label: "Being someone I'm proud of", weights: { spirit: 3, mind: 2 }, response: "That's the deepest definition of success there is." },
    ],
  },
  {
    id: "commitment",
    phase: "future",
    prompt: "Last question. The most important one. Are you willing to commit to one path and actually finish it?",
    options: [
      { label: "Yes. I'm done starting things I don't finish.", weights: { mind: 1, spirit: 1 }, response: "That's all Once needs to hear." },
      { label: "I want to be. I just need the right support.", weights: { spirit: 1, mind: 1 }, response: "That's enough. Wanting to is where it starts." },
      { label: "I'm not sure yet.", weights: { spirit: 2 }, response: "Honesty is the first step. Once will meet you where you are." },
    ],
  },
];

export function calculateScores(
  answers: Record<string, number>
): PillarScores {
  const scores: PillarScores = { money: 0, mind: 0, body: 0, spirit: 0 };

  for (const [questionId, optionIndex] of Object.entries(answers)) {
    const question = QUESTIONS.find((q) => q.id === questionId);
    if (!question) continue;

    const option = question.options[optionIndex];
    if (!option) continue;

    for (const [pillar, weight] of Object.entries(option.weights)) {
      scores[pillar as Pillar] += weight;
    }
  }

  return scores;
}

export function determinePaths(scores: PillarScores): {
  primary: Pillar;
  secondary: Pillar;
} {
  const sorted = (Object.entries(scores) as [Pillar, number][]).sort(
    (a, b) => b[1] - a[1]
  );

  return {
    primary: sorted[0][0],
    secondary: sorted[1][0],
  };
}

export function normalizeScores(scores: PillarScores): PillarScores {
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  if (total === 0) return { money: 25, mind: 25, body: 25, spirit: 25 };

  return {
    money: Math.round((scores.money / total) * 100),
    mind: Math.round((scores.mind / total) * 100),
    body: Math.round((scores.body / total) * 100),
    spirit: Math.round((scores.spirit / total) * 100),
  };
}

// ─── Smart Recommendation Engine ───

const TRACK_DATA: Record<string, { skills: string[]; earning: string }> = {
  "AI Business Services": {
    skills: [
      "Build AI chatbots for local businesses",
      "Automate customer service with AI",
      "Create AI-powered quotes and proposals",
      "Set up AI follow-up systems",
      "Land your first AI consulting client",
    ],
    earning: "₱20,000–₱50,000 per project",
  },
  "AI Web & No-Code": {
    skills: [
      "Build professional websites with AI in 48 hours",
      "Create dashboards and web apps without coding",
      "Use AI to write and debug code for you",
      "Deploy and host sites for clients",
      "Price and sell web development services",
    ],
    earning: "₱15,000–₱40,000 per project",
  },
  "AI Content & Design": {
    skills: [
      "Create logos and brand identities with AI",
      "Design social media content in minutes",
      "Build marketing materials clients pay for",
      "Master AI image and video tools",
      "Package and price creative services",
    ],
    earning: "₱8,000–₱25,000 per month",
  },
  "Social Media Management": {
    skills: [
      "Manage Facebook and Instagram for businesses",
      "Create content calendars that drive engagement",
      "Run and optimize paid ad campaigns",
      "Build analytics reports clients understand",
      "Scale to 3–5 clients at ₱5,000–₱8,000 each",
    ],
    earning: "₱15,000–₱40,000 per month",
  },
  "Shopee/Lazada E-Commerce": {
    skills: [
      "Find winning products Filipino buyers want",
      "Set up and optimize your Shopee/Lazada store",
      "Write listings that convert browsers to buyers",
      "Master dropship and warehouse fulfillment",
      "Scale with Shopee Ads and flash sales",
    ],
    earning: "₱10,000–₱50,000 per month",
  },
  "Freelancing": {
    skills: [
      "Choose your highest-value freelance skill",
      "Build a portfolio in 7 days with real samples",
      "Land clients on Upwork and OnlineJobs.ph",
      "Price your work at market rate (not below)",
      "Turn side gigs into full replacement income",
    ],
    earning: "₱15,000–₱60,000 per month",
  },
};

export function determineRecommendation(
  answers: Record<string, number>,
  primaryPath: Pillar
): { plan: Plan; track: string } {
  const incomeTarget = answers["income_target"] ?? 0;
  const digitalComfort = answers["digital_skills"] ?? 1;

  // Q12 option 2 (₱50K+) = high income ambition
  if (incomeTarget === 2) {
    if (digitalComfort === 0) {
      return { plan: "ai", track: "AI Business Services" };
    }
    if (digitalComfort === 1) {
      return { plan: "ai", track: "AI Web & No-Code" };
    }
    // digitalComfort 2 or 3 (nervous/not sure)
    return { plan: "pro", track: "Social Media Management" };
  }

  // Q12 option 3 (I just want stability) → Core
  if (incomeTarget === 3) {
    return { plan: "core", track: "" };
  }

  // Q12 option 0 or 1 (₱5K-15K or job replacement) → Pro, track by pillar
  if (primaryPath === "money") {
    return { plan: "pro", track: "Shopee/Lazada E-Commerce" };
  }
  if (primaryPath === "mind") {
    return { plan: "pro", track: "Social Media Management" };
  }
  // body or spirit
  return { plan: "pro", track: "Freelancing" };
}

export function buildRecommendation(
  plan: Plan,
  track: string,
  answers: Record<string, number>,
  primaryPath: Pillar
): Recommendation {
  const trackInfo = TRACK_DATA[track];

  if (plan === "core" || !trackInfo) {
    return {
      plan: "core",
      track: "",
      why: `Your focus right now is building a strong ${primaryPath} foundation. Core gives you the structured path to get there.`,
      skills: [
        "Full 4-pillar assessment and personalized profile",
        `5 structured ${primaryPath} modules`,
        "25 actionable lessons with daily exercises",
        "Progress tracking and reflections",
        "Lifetime access to your path",
      ],
      earning: "",
    };
  }

  // Build the "why" sentence connecting their answers
  const incomeTarget = answers["income_target"] ?? 0;
  let why = "";

  if (plan === "ai") {
    if (incomeTarget === 2) {
      why = `You want ₱50,000+ per month and you're comfortable with digital tools. ${track} is the fastest path to that income level with AI doing the heavy lifting.`;
    } else {
      why = `Your ambition and digital comfort point to AI-powered skills. ${track} lets you earn premium rates while AI handles the complexity.`;
    }
  } else {
    // Pro
    const incomePhrase = incomeTarget === 0
      ? "You want extra income on the side"
      : "You want to replace your current income";
    why = `${incomePhrase}, and your ${primaryPath} profile matches perfectly with ${track}. This is the most direct path to real earnings.`;
  }

  return {
    plan,
    track,
    why,
    skills: trackInfo.skills,
    earning: trackInfo.earning,
  };
}
