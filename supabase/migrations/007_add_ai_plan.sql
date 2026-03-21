-- Add 'ai' as a valid plan option
alter table public.users drop constraint if exists users_plan_check;
alter table public.users add constraint users_plan_check check (plan in ('core', 'pro', 'ai'));
