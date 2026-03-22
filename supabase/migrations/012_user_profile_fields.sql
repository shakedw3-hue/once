-- Migration 012: Extended user profile for marketing insights

ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS age integer,
  ADD COLUMN IF NOT EXISTS location text,
  ADD COLUMN IF NOT EXISTS occupation text,
  ADD COLUMN IF NOT EXISTS bought_courses_before boolean,
  ADD COLUMN IF NOT EXISTS profile_completed boolean DEFAULT false;
