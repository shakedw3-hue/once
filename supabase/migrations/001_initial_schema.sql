-- BetterLife Database Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (extends Supabase auth.users)
create table public.users (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text not null default '',
  role text not null default 'user' check (role in ('user', 'admin')),
  primary_path text check (primary_path in ('money', 'mind', 'body', 'spirit')),
  secondary_path text check (secondary_path in ('money', 'mind', 'body', 'spirit')),
  has_paid boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Questionnaire answers
create table public.questionnaire_answers (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  answers jsonb not null default '{}',
  scores jsonb not null default '{"money": 0, "mind": 0, "body": 0, "spirit": 0}',
  completed_at timestamptz not null default now()
);

-- Paths (4 pillars)
create table public.paths (
  id uuid default uuid_generate_v4() primary key,
  pillar text not null unique check (pillar in ('money', 'mind', 'body', 'spirit')),
  title text not null,
  description text not null default '',
  icon text not null default '',
  "order" integer not null default 0
);

-- Modules
create table public.modules (
  id uuid default uuid_generate_v4() primary key,
  path_id uuid references public.paths(id) on delete cascade not null,
  title text not null,
  description text not null default '',
  "order" integer not null default 0
);

-- Lessons
create table public.lessons (
  id uuid default uuid_generate_v4() primary key,
  module_id uuid references public.modules(id) on delete cascade not null,
  title text not null,
  description text not null default '',
  action_step text not null default '',
  reflection_prompt text not null default '',
  "order" integer not null default 0
);

-- User progress
create table public.user_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  completed boolean not null default false,
  reflection text,
  completed_at timestamptz,
  unique(user_id, lesson_id)
);

-- Payments
create table public.payments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  stripe_session_id text unique,
  amount integer not null,
  currency text not null default 'PHP',
  status text not null default 'pending' check (status in ('pending', 'completed', 'failed', 'refunded')),
  created_at timestamptz not null default now()
);

-- Analytics events
create table public.analytics (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete set null,
  event text not null,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

-- Indexes
create index idx_questionnaire_user on public.questionnaire_answers(user_id);
create index idx_modules_path on public.modules(path_id);
create index idx_lessons_module on public.lessons(module_id);
create index idx_progress_user on public.user_progress(user_id);
create index idx_progress_lesson on public.user_progress(lesson_id);
create index idx_payments_user on public.payments(user_id);
create index idx_analytics_event on public.analytics(event);
create index idx_analytics_user on public.analytics(user_id);

-- Row Level Security
alter table public.users enable row level security;
alter table public.questionnaire_answers enable row level security;
alter table public.paths enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.user_progress enable row level security;
alter table public.payments enable row level security;
alter table public.analytics enable row level security;

-- Helper function for admin checks (SECURITY DEFINER bypasses RLS, avoids recursion)
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.users
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- RLS Policies

-- Users: read own, admins read all
create policy "Users read own" on public.users for select using (auth.uid() = id);
create policy "Users update own" on public.users for update using (auth.uid() = id);
create policy "Admins read all users" on public.users for select using (public.is_admin());

-- Questionnaire: own data
create policy "Users read own answers" on public.questionnaire_answers for select using (auth.uid() = user_id);
create policy "Users insert own answers" on public.questionnaire_answers for insert with check (auth.uid() = user_id);

-- Paths, Modules, Lessons: public read
create policy "Public read paths" on public.paths for select using (true);
create policy "Public read modules" on public.modules for select using (true);
create policy "Public read lessons" on public.lessons for select using (true);

-- Admin write for content
create policy "Admins manage paths" on public.paths for all using (public.is_admin());
create policy "Admins manage modules" on public.modules for all using (public.is_admin());
create policy "Admins manage lessons" on public.lessons for all using (public.is_admin());

-- Progress: own data
create policy "Users read own progress" on public.user_progress for select using (auth.uid() = user_id);
create policy "Users insert own progress" on public.user_progress for insert with check (auth.uid() = user_id);
create policy "Users update own progress" on public.user_progress for update using (auth.uid() = user_id);

-- Payments: own data
create policy "Users read own payments" on public.payments for select using (auth.uid() = user_id);

-- Analytics: insert for logged-in, admin read
create policy "Users insert analytics" on public.analytics for insert with check (true);
create policy "Admins read analytics" on public.analytics for select using (public.is_admin());

-- Seed paths
insert into public.paths (pillar, title, description, icon, "order") values
  ('money', 'Money', 'Build financial direction, opportunity thinking, and decision frameworks for your future.', 'DollarSign', 1),
  ('mind', 'Mind', 'Develop focus, emotional resilience, and clarity for better decisions every day.', 'Brain', 2),
  ('body', 'Body', 'Reset your energy, build consistency, and simplify nutrition for lasting health.', 'Heart', 3),
  ('spirit', 'Spirit', 'Find meaning, practice gratitude, and align your daily life with your values.', 'Sparkles', 4);

-- Function to create user profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
