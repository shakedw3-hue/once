-- Add plan column to users table for Core/Pro distinction
-- Default null (unpaid), 'core' for Core, 'pro' for Pro

alter table public.users
  add column if not exists plan text
  check (plan in ('core', 'pro'));

-- Update existing paid users to 'core' (safe default)
update public.users set plan = 'core' where has_paid = true and plan is null;

-- Fix analytics insert policy to require user_id match
drop policy if exists "Users insert analytics" on public.analytics;
create policy "Users insert analytics" on public.analytics
  for insert with check (auth.uid() = user_id);
