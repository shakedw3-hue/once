-- Migration 011: Advanced analytics fields

-- Track where users come from
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS utm_source text,
  ADD COLUMN IF NOT EXISTS utm_medium text,
  ADD COLUMN IF NOT EXISTS utm_campaign text,
  ADD COLUMN IF NOT EXISTS referrer text,
  ADD COLUMN IF NOT EXISTS device_type text,
  ADD COLUMN IF NOT EXISTS signup_page text;

-- Add more event types to analytics
-- (table already exists, just adding index for faster queries)
CREATE INDEX IF NOT EXISTS idx_analytics_created ON public.analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_event_created ON public.analytics(event, created_at);
