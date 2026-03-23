-- Migration 014: Security Hardening — comprehensive RLS cleanup
-- Drops all existing policies and recreates with principle of least privilege.
-- Also allows nullable user_id on payments for account deletion anonymization.

-- ============================================================
-- Allow payments.user_id to be NULL (for anonymized records after account deletion)
-- ============================================================
ALTER TABLE public.payments ALTER COLUMN user_id DROP NOT NULL;
-- Remove CASCADE on delete so we can anonymize instead of losing records
ALTER TABLE public.payments DROP CONSTRAINT IF EXISTS payments_user_id_fkey;
ALTER TABLE public.payments
  ADD CONSTRAINT payments_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;

-- ============================================================
-- Ensure RLS is enabled on ALL tables
-- ============================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questionnaire_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Drop ALL existing policies (clean slate)
-- ============================================================

-- users
DROP POLICY IF EXISTS "Users read own" ON public.users;
DROP POLICY IF EXISTS "Users update own" ON public.users;
DROP POLICY IF EXISTS "Admins read all users" ON public.users;

-- questionnaire_answers
DROP POLICY IF EXISTS "Users read own answers" ON public.questionnaire_answers;
DROP POLICY IF EXISTS "Users insert own answers" ON public.questionnaire_answers;

-- user_progress
DROP POLICY IF EXISTS "Users read own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users insert own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users update own progress" ON public.user_progress;

-- payments
DROP POLICY IF EXISTS "Users read own payments" ON public.payments;

-- modules
DROP POLICY IF EXISTS "Public read modules" ON public.modules;
DROP POLICY IF EXISTS "Admins manage modules" ON public.modules;

-- lessons
DROP POLICY IF EXISTS "Public read lessons" ON public.lessons;
DROP POLICY IF EXISTS "Admins manage lessons" ON public.lessons;

-- paths
DROP POLICY IF EXISTS "Public read paths" ON public.paths;
DROP POLICY IF EXISTS "Admins manage paths" ON public.paths;

-- coupons
DROP POLICY IF EXISTS "Admins manage coupons" ON public.coupons;

-- user_tracking
DROP POLICY IF EXISTS "Users read own tracking" ON public.user_tracking;
DROP POLICY IF EXISTS "Users insert own tracking" ON public.user_tracking;
DROP POLICY IF EXISTS "Users update own tracking" ON public.user_tracking;

-- push_subscriptions
DROP POLICY IF EXISTS "Users manage own subscriptions" ON public.push_subscriptions;

-- analytics
DROP POLICY IF EXISTS "Users insert analytics" ON public.analytics;
DROP POLICY IF EXISTS "Admins read analytics" ON public.analytics;

-- ============================================================
-- USERS: read/update own only, no self-insert, no delete
-- ============================================================
CREATE POLICY "Users read own" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users update own" ON public.users
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Admin safety net: read all users for admin dashboard
CREATE POLICY "Admin read all users" ON public.users
  FOR SELECT USING (public.is_admin());

-- ============================================================
-- QUESTIONNAIRE_ANSWERS: read/insert own, no update/delete
-- ============================================================
CREATE POLICY "Users read own answers" ON public.questionnaire_answers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own answers" ON public.questionnaire_answers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin safety net
CREATE POLICY "Admin read all answers" ON public.questionnaire_answers
  FOR SELECT USING (public.is_admin());

-- ============================================================
-- USER_PROGRESS: read/insert/update own, no delete
-- ============================================================
CREATE POLICY "Users read own progress" ON public.user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own progress" ON public.user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own progress" ON public.user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Admin safety net
CREATE POLICY "Admin read all progress" ON public.user_progress
  FOR SELECT USING (public.is_admin());

-- ============================================================
-- PAYMENTS: service_role only (webhook handles this)
-- No user INSERT/UPDATE policies — service client bypasses RLS
-- ============================================================
CREATE POLICY "Users read own payments" ON public.payments
  FOR SELECT USING (auth.uid() = user_id);

-- Admin safety net
CREATE POLICY "Admin read all payments" ON public.payments
  FOR SELECT USING (public.is_admin());

-- ============================================================
-- MODULES / LESSONS / PATHS: public read, admin write
-- ============================================================
CREATE POLICY "Public read modules" ON public.modules
  FOR SELECT USING (true);

CREATE POLICY "Admin manage modules" ON public.modules
  FOR ALL USING (public.is_admin());

CREATE POLICY "Public read lessons" ON public.lessons
  FOR SELECT USING (true);

CREATE POLICY "Admin manage lessons" ON public.lessons
  FOR ALL USING (public.is_admin());

CREATE POLICY "Public read paths" ON public.paths
  FOR SELECT USING (true);

CREATE POLICY "Admin manage paths" ON public.paths
  FOR ALL USING (public.is_admin());

-- ============================================================
-- COUPONS: admin only (public can validate via service client)
-- ============================================================
CREATE POLICY "Admin manage coupons" ON public.coupons
  FOR ALL USING (public.is_admin());

-- ============================================================
-- USER_TRACKING: own only
-- ============================================================
CREATE POLICY "Users read own tracking" ON public.user_tracking
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own tracking" ON public.user_tracking
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own tracking" ON public.user_tracking
  FOR UPDATE USING (auth.uid() = user_id);

-- Admin safety net
CREATE POLICY "Admin read all tracking" ON public.user_tracking
  FOR SELECT USING (public.is_admin());

-- ============================================================
-- PUSH_SUBSCRIPTIONS: own only (restricted to specific operations)
-- ============================================================
CREATE POLICY "Users read own subscriptions" ON public.push_subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own subscriptions" ON public.push_subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own subscriptions" ON public.push_subscriptions
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- ANALYTICS: insert for logged-in users, admin read
-- ============================================================
CREATE POLICY "Users insert analytics" ON public.analytics
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin read analytics" ON public.analytics
  FOR SELECT USING (public.is_admin());
