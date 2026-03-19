import type { Pillar, PillarScores } from "@/types/database";

export interface QuestionOption {
  label: string;
  weights: Partial<Record<Pillar, number>>;
}

export interface Question {
  id: string;
  text: string;
  subtitle?: string;
  options: QuestionOption[];
}

export const QUESTIONS: Question[] = [
  {
    id: "primary_goal",
    text: "What's the #1 thing you want to improve right now?",
    subtitle: "Pick the one that feels most urgent.",
    options: [
      { label: "My financial situation", weights: { money: 5, mind: 1 } },
      { label: "My mental clarity and focus", weights: { mind: 5, spirit: 1 } },
      { label: "My energy and physical health", weights: { body: 5, mind: 1 } },
      { label: "My sense of purpose and peace", weights: { spirit: 5, mind: 1 } },
    ],
  },
  {
    id: "daily_struggle",
    text: "What frustrates you most on a daily basis?",
    options: [
      { label: "Not having enough money for my goals", weights: { money: 4, mind: 2 } },
      { label: "Feeling overwhelmed or anxious", weights: { mind: 4, body: 1, spirit: 1 } },
      { label: "Low energy or feeling unhealthy", weights: { body: 4, mind: 2 } },
      { label: "Feeling lost or disconnected from meaning", weights: { spirit: 4, mind: 2 } },
    ],
  },
  {
    id: "morning_wish",
    text: "When you wake up, what do you wish was different?",
    options: [
      { label: "A stable income or side hustle", weights: { money: 5 } },
      { label: "A clearer, calmer mind", weights: { mind: 5 } },
      { label: "More energy to get through the day", weights: { body: 5 } },
      { label: "A stronger sense of direction in life", weights: { spirit: 5 } },
    ],
  },
  {
    id: "free_time",
    text: "If you had 2 extra hours a day, what would you do?",
    options: [
      { label: "Learn about investing or business", weights: { money: 4, mind: 1 } },
      { label: "Read, meditate, or journal", weights: { mind: 3, spirit: 3 } },
      { label: "Work out or prepare healthy meals", weights: { body: 5 } },
      { label: "Reflect, pray, or spend time in nature", weights: { spirit: 4, body: 1 } },
    ],
  },
  {
    id: "biggest_fear",
    text: "What worries you most about the next 5 years?",
    options: [
      { label: "Still being broke or financially stuck", weights: { money: 5, mind: 1 } },
      { label: "Burnout, anxiety, or mental breakdown", weights: { mind: 5, body: 1 } },
      { label: "Health problems or low quality of life", weights: { body: 5, spirit: 1 } },
      { label: "Looking back and feeling like life had no purpose", weights: { spirit: 5, mind: 1 } },
    ],
  },
  {
    id: "family_role",
    text: "How do you see your role in your family?",
    subtitle: "Think about what drives your responsibility.",
    options: [
      { label: "Provider — I need to earn more for them", weights: { money: 4, spirit: 2 } },
      { label: "Anchor — I need to stay mentally strong", weights: { mind: 4, spirit: 2 } },
      { label: "Example — I want to model healthy living", weights: { body: 4, spirit: 1 } },
      { label: "Guide — I want to lead with values and wisdom", weights: { spirit: 4, mind: 2 } },
    ],
  },
  {
    id: "stress_response",
    text: "When you're stressed, what do you usually do?",
    options: [
      { label: "Scroll my phone or online shop", weights: { money: 2, mind: 3, spirit: 1 } },
      { label: "Overthink and lose sleep", weights: { mind: 5, body: 1 } },
      { label: "Eat junk food or skip workouts", weights: { body: 4, mind: 2 } },
      { label: "Withdraw and feel empty", weights: { spirit: 4, mind: 2 } },
    ],
  },
  {
    id: "learning_interest",
    text: "What kind of content do you usually watch or read?",
    options: [
      { label: "Business, investing, money tips", weights: { money: 5 } },
      { label: "Productivity, psychology, self-help", weights: { mind: 5 } },
      { label: "Fitness, nutrition, health", weights: { body: 5 } },
      { label: "Motivation, spirituality, philosophy", weights: { spirit: 5 } },
    ],
  },
  {
    id: "ideal_self",
    text: "In your ideal life, what kind of person are you?",
    options: [
      { label: "Financially free and providing for my family", weights: { money: 4, spirit: 2 } },
      { label: "Focused, disciplined, and in control", weights: { mind: 4, body: 1 } },
      { label: "Fit, energetic, and healthy", weights: { body: 4, mind: 1 } },
      { label: "At peace, grateful, and living with purpose", weights: { spirit: 5 } },
    ],
  },
  {
    id: "commitment",
    text: "How ready are you to work on yourself daily?",
    subtitle: "Be honest — there's no wrong answer.",
    options: [
      { label: "Very ready — I just need a clear plan", weights: { money: 2, mind: 2, body: 1, spirit: 1 } },
      { label: "Ready but I struggle with consistency", weights: { mind: 3, body: 2, spirit: 1 } },
      { label: "I want to but I'm overwhelmed right now", weights: { mind: 2, spirit: 3, body: 1 } },
      { label: "I need motivation and direction first", weights: { spirit: 3, mind: 2, money: 1 } },
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
  const maxPossible = QUESTIONS.reduce((sum, q) => {
    const maxWeight = Math.max(
      ...q.options.flatMap((o) => Object.values(o.weights))
    );
    return sum + maxWeight;
  }, 0);

  return {
    money: Math.round((scores.money / maxPossible) * 100),
    mind: Math.round((scores.mind / maxPossible) * 100),
    body: Math.round((scores.body / maxPossible) * 100),
    spirit: Math.round((scores.spirit / maxPossible) * 100),
  };
}
