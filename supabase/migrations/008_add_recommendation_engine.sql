-- Migration 008: Smart Recommendation Engine
-- Adds columns to store the recommendation result from the questionnaire

ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS recommendation_plan text,
  ADD COLUMN IF NOT EXISTS recommendation_track text,
  ADD COLUMN IF NOT EXISTS income_target integer,
  ADD COLUMN IF NOT EXISTS digital_comfort integer;

-- Add constraint for recommendation_plan values
ALTER TABLE public.users
  ADD CONSTRAINT users_recommendation_plan_check
  CHECK (recommendation_plan IS NULL OR recommendation_plan IN ('core', 'pro', 'ai'));
