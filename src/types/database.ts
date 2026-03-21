export type Pillar = "money" | "mind" | "body" | "spirit";

export type UserRole = "user" | "admin";

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export type Plan = "core" | "pro" | "ai";

export type MarketLevel =
  | "UNTESTED"
  | "OPEN"
  | "ENTERING"
  | "COMPETITIVE"
  | "SATURATED";

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  primaryPath: Pillar | null;
  secondaryPath: Pillar | null;
  plan: Plan | null;
  hasPaid: boolean;
  recommendationPlan: Plan | null;
  recommendationTrack: string | null;
  incomeTarget: number | null;
  digitalComfort: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Recommendation {
  plan: Plan;
  track: string;
  why: string;
  skills: string[];
  earning: string;
}

export interface QuestionnaireAnswer {
  id: string;
  userId: string;
  answers: Record<string, string | number>;
  scores: PillarScores;
  completedAt: string;
}

export interface PillarScores {
  money: number;
  mind: number;
  body: number;
  spirit: number;
}

export interface Path {
  id: string;
  pillar: Pillar;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface Module {
  id: string;
  pathId: string;
  title: string;
  description: string;
  order: number;
  lessonCount: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  actionStep: string;
  reflectionPrompt: string;
  order: number;
}

export interface UserProgress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  reflection: string | null;
  completedAt: string | null;
}

export interface Payment {
  id: string;
  userId: string;
  stripeSessionId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  createdAt: string;
}

export interface AnalyticsEvent {
  id: string;
  userId: string | null;
  event: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}
