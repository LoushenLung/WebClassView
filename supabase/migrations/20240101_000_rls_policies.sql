-- supabase/migrations/20240101_000_rls_policies.sql
-- RLS helper functions and policies for all 12 tables
-- Req: 2.1–2.6 | Design §4

-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN FALSE;
  END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;

CREATE OR REPLACE FUNCTION is_treasurer_or_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN FALSE;
  END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role IN ('bendahara', 'admin')
  );
END;
$$;

-- ============================================================
-- ENABLE + FORCE ROW LEVEL SECURITY ON ALL 12 TABLES
-- ============================================================

ALTER TABLE public.users              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users              FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.dues_periods       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dues_periods       FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.dues_payments      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dues_payments      FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.announcements      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements      FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.schedule           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedule           FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.photo_galleries    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photo_galleries    FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.photos             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos             FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.audit_log          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log          FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.attendances        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendances        FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.materials          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials          FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts        FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.forum_comments     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_comments     FORCE  ROW LEVEL SECURITY;

-- ============================================================
-- USERS
-- ============================================================

CREATE POLICY "users: select own" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users: admin select all" ON public.users
  FOR SELECT USING (is_admin());

CREATE POLICY "users: update own" ON public.users
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "users: admin update all" ON public.users
  FOR UPDATE USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "users: no direct insert" ON public.users
  FOR INSERT WITH CHECK (FALSE);

-- ============================================================
-- DUES_PERIODS
-- ============================================================

CREATE POLICY "dues_periods: all select active" ON public.dues_periods
  FOR SELECT USING (auth.uid() IS NOT NULL AND NOT is_archived);

CREATE POLICY "dues_periods: treasurer select all" ON public.dues_periods
  FOR SELECT USING (is_treasurer_or_admin());

CREATE POLICY "dues_periods: treasurer insert" ON public.dues_periods
  FOR INSERT WITH CHECK (is_treasurer_or_admin());

CREATE POLICY "dues_periods: treasurer update" ON public.dues_periods
  FOR UPDATE USING (is_treasurer_or_admin()) WITH CHECK (is_treasurer_or_admin());

-- ============================================================
-- DUES_PAYMENTS (no DELETE for any role)
-- ============================================================

CREATE POLICY "dues_payments: student select own" ON public.dues_payments
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "dues_payments: treasurer select all" ON public.dues_payments
  FOR SELECT USING (is_treasurer_or_admin());

CREATE POLICY "dues_payments: treasurer insert" ON public.dues_payments
  FOR INSERT WITH CHECK (is_treasurer_or_admin());

CREATE POLICY "dues_payments: treasurer update" ON public.dues_payments
  FOR UPDATE USING (is_treasurer_or_admin()) WITH CHECK (is_treasurer_or_admin());

CREATE POLICY "dues_payments: no delete" ON public.dues_payments
  FOR DELETE USING (FALSE);

-- ============================================================
-- ANNOUNCEMENTS
-- ============================================================

CREATE POLICY "announcements: all select published" ON public.announcements
  FOR SELECT USING (auth.uid() IS NOT NULL AND status = 'published');

CREATE POLICY "announcements: treasurer select all" ON public.announcements
  FOR SELECT USING (is_treasurer_or_admin());

CREATE POLICY "announcements: treasurer insert" ON public.announcements
  FOR INSERT WITH CHECK (is_treasurer_or_admin() OR author_id = auth.uid());

CREATE POLICY "announcements: treasurer or author update" ON public.announcements
  FOR UPDATE
  USING (is_treasurer_or_admin() OR author_id = auth.uid())
  WITH CHECK (is_treasurer_or_admin() OR author_id = auth.uid());

CREATE POLICY "announcements: treasurer or author delete" ON public.announcements
  FOR DELETE USING (is_treasurer_or_admin() OR author_id = auth.uid());

-- ============================================================
-- SCHEDULE
-- ============================================================

CREATE POLICY "schedule: all select" ON public.schedule
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "schedule: treasurer insert" ON public.schedule
  FOR INSERT WITH CHECK (is_treasurer_or_admin());

CREATE POLICY "schedule: treasurer update" ON public.schedule
  FOR UPDATE USING (is_treasurer_or_admin()) WITH CHECK (is_treasurer_or_admin());

CREATE POLICY "schedule: treasurer delete" ON public.schedule
  FOR DELETE USING (is_treasurer_or_admin());

-- ============================================================
-- PHOTO_GALLERIES + PHOTOS
-- ============================================================

CREATE POLICY "photo_galleries: all select" ON public.photo_galleries
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "photos: all select" ON public.photos
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "photo_galleries: treasurer write" ON public.photo_galleries
  FOR ALL USING (is_treasurer_or_admin()) WITH CHECK (is_treasurer_or_admin());

CREATE POLICY "photos: treasurer write" ON public.photos
  FOR ALL USING (is_treasurer_or_admin()) WITH CHECK (is_treasurer_or_admin());

-- ============================================================
-- AUDIT_LOG (write-locked — trigger only)
-- ============================================================

CREATE POLICY "audit_log: admin select" ON public.audit_log
  FOR SELECT USING (is_admin());

CREATE POLICY "audit_log: no direct insert" ON public.audit_log
  FOR INSERT WITH CHECK (FALSE);

CREATE POLICY "audit_log: no direct update" ON public.audit_log
  FOR UPDATE USING (FALSE);

CREATE POLICY "audit_log: no direct delete" ON public.audit_log
  FOR DELETE USING (FALSE);

-- ============================================================
-- ATTENDANCES
-- ============================================================

CREATE POLICY "attendances: student select own" ON public.attendances
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "attendances: treasurer all" ON public.attendances
  FOR ALL USING (is_treasurer_or_admin()) WITH CHECK (is_treasurer_or_admin());

-- ============================================================
-- MATERIALS
-- ============================================================

CREATE POLICY "materials: all select" ON public.materials
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "materials: treasurer write" ON public.materials
  FOR ALL USING (is_treasurer_or_admin()) WITH CHECK (is_treasurer_or_admin());

-- ============================================================
-- FORUM_POSTS
-- ============================================================

CREATE POLICY "forum_posts: all select" ON public.forum_posts
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "forum_posts: all insert" ON public.forum_posts
  FOR INSERT WITH CHECK (created_by_id = auth.uid());

CREATE POLICY "forum_posts: author or treasurer delete" ON public.forum_posts
  FOR DELETE USING (created_by_id = auth.uid() OR is_treasurer_or_admin());

-- ============================================================
-- FORUM_COMMENTS
-- ============================================================

CREATE POLICY "forum_comments: all select" ON public.forum_comments
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "forum_comments: all insert" ON public.forum_comments
  FOR INSERT WITH CHECK (created_by_id = auth.uid());

CREATE POLICY "forum_comments: author or treasurer delete" ON public.forum_comments
  FOR DELETE USING (created_by_id = auth.uid() OR is_treasurer_or_admin());

CREATE POLICY "forum_comments: treasurer update" ON public.forum_comments
  FOR UPDATE USING (is_treasurer_or_admin()) WITH CHECK (is_treasurer_or_admin());
