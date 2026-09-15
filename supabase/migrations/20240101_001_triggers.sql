-- supabase/migrations/20240101_001_triggers.sql
-- dues_summary view, on_auth_user_created trigger, audit trigger
-- Req: 1.2, 1.3, 16.1–16.3, 5.8 | Design §4

-- ============================================================
-- dues_summary VIEW
-- Joins dues_payments + users + dues_periods (non-archived only)
-- ============================================================

CREATE OR REPLACE VIEW public.dues_summary AS
SELECT
  dp.id,
  dp.student_id,
  u.name,
  u.email,
  dp.due_period_id AS period_id,
  dper.name        AS period_name,
  dper.amount,
  dp.status,
  dp.paid_at,
  dp.proof_image_url
FROM public.dues_payments dp
JOIN public.users        u    ON u.id    = dp.student_id
JOIN public.dues_periods dper ON dper.id = dp.due_period_id
WHERE dper.is_archived = FALSE;

-- ============================================================
-- on_auth_user_created — auto-create public.users row
-- SECURITY DEFINER: runs as function owner (superuser), bypasses RLS
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'name'), ''), NEW.email),
    'murid',
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- audit_dues_payment — write audit_log on dues_payments changes
-- SECURITY DEFINER: bypasses RLS write-lock on audit_log
-- Atomicity: if INSERT into audit_log fails, exception propagates
-- and rolls back the dues_payments mutation
-- ============================================================

CREATE OR REPLACE FUNCTION public.audit_dues_payment()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_action    TEXT;
  v_old_vals  JSONB;
  v_new_vals  JSONB;
BEGIN
  IF TG_OP = 'INSERT' THEN
    v_action   := 'payment_created';
    v_old_vals := NULL;
    v_new_vals := to_jsonb(NEW);
  ELSIF TG_OP = 'UPDATE' THEN
    v_action   := 'payment_updated';
    v_old_vals := to_jsonb(OLD);
    v_new_vals := to_jsonb(NEW);
  ELSE
    v_action   := 'payment_deleted';
    v_old_vals := to_jsonb(OLD);
    v_new_vals := NULL;
  END IF;

  INSERT INTO public.audit_log (
    id,
    user_id,
    action,
    table_name,
    record_id,
    old_values,
    new_values,
    created_at
  )
  VALUES (
    gen_random_uuid()::text,
    auth.uid(),
    v_action,
    'dues_payments',
    COALESCE(NEW.id, OLD.id),
    v_old_vals,
    v_new_vals,
    NOW()
  );

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER audit_dues_payment_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.dues_payments
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_dues_payment();
