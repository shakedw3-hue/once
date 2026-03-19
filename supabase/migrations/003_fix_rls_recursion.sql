-- Fix infinite recursion in RLS policies on users table.
-- The "Admins read all users" policy queries public.users to check role,
-- which triggers the same RLS policies again → infinite loop.
--
-- Solution: create a SECURITY DEFINER function that bypasses RLS
-- to check admin role, then use it in all admin policies.

create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.users
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- Drop and recreate the recursive policies

-- users table
drop policy if exists "Admins read all users" on public.users;
create policy "Admins read all users" on public.users
  for select using (public.is_admin());

-- paths table
drop policy if exists "Admins manage paths" on public.paths;
create policy "Admins manage paths" on public.paths
  for all using (public.is_admin());

-- modules table
drop policy if exists "Admins manage modules" on public.modules;
create policy "Admins manage modules" on public.modules
  for all using (public.is_admin());

-- lessons table
drop policy if exists "Admins manage lessons" on public.lessons;
create policy "Admins manage lessons" on public.lessons
  for all using (public.is_admin());

-- analytics table
drop policy if exists "Admins read analytics" on public.analytics;
create policy "Admins read analytics" on public.analytics
  for select using (public.is_admin());
