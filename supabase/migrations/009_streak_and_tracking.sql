-- Migration 009: Streak tracking + Personal metrics
-- Tracks daily activity for streaks and personal measurements per pillar

-- User streaks
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS current_streak integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS longest_streak integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_activity_date date;

-- Personal tracking entries (weight, savings, sleep, gratitude, etc.)
CREATE TABLE IF NOT EXISTS public.user_tracking (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  entry_date date NOT NULL DEFAULT CURRENT_DATE,
  metric_type text NOT NULL, -- 'weight', 'savings', 'sleep_hours', 'meditation_minutes', 'gratitude', 'reading_minutes'
  metric_value numeric,
  metric_text text, -- for gratitude entries (text instead of number)
  created_at timestamptz DEFAULT now()
);

-- One entry per metric per day
CREATE UNIQUE INDEX IF NOT EXISTS idx_tracking_user_date_type
  ON public.user_tracking(user_id, entry_date, metric_type);

CREATE INDEX IF NOT EXISTS idx_tracking_user
  ON public.user_tracking(user_id);

-- RLS
ALTER TABLE public.user_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own tracking" ON public.user_tracking
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own tracking" ON public.user_tracking
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own tracking" ON public.user_tracking
  FOR UPDATE USING (auth.uid() = user_id);
