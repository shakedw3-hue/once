import { z } from "zod";

// Strip HTML tags helper
function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim();
}

export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().min(1).max(100).transform(stripHtml),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const questionnaireAnswersSchema = z.record(
  z.string(),
  z.number().int().min(0).max(3)
);

export const reflectionSchema = z.string().max(2000).transform(stripHtml);

export const couponSchema = z.object({
  code: z.string().regex(/^[A-Za-z0-9]+$/).max(20),
  discount_type: z.enum(["percent", "fixed"]),
  discount_value: z.number().positive(),
  applicable_plans: z.array(z.enum(["core", "pro", "ai"])).optional(),
  max_uses: z.number().int().positive().optional(),
  expires_at: z.string().datetime().optional(),
});
