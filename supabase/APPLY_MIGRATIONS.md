# Applying Supabase Migrations

> **Task 2.5 — Apply SQL migrations to the Supabase project**
>
> _Req: 2.1, 16.1 | Design §4_

---

## Status

| Migration | File | Status |
|-----------|------|--------|
| RLS policies + helper functions | `20240101_000_rls_policies.sql` | ⏳ Pending — project paused |
| Triggers, view, audit function | `20240101_001_triggers.sql` | ⏳ Pending — project paused |

---

## Why Migrations Are Pending

The Supabase project (`yppecdnnuitfkmojlrmy`) is currently **paused** (Supabase free tier auto-pauses after ~1 week of inactivity). The pooler host resolves in DNS but the project tenant is not running, so no connections can be established.

**Resolution:** Resume the project from the Supabase dashboard, then follow the steps below.

---

## Step 1 — Resume the Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Find project **`yppecdnnuitfkmojlrmy`** (region: ap-southeast-2)
3. Click **Resume** and wait ~2 minutes for the project to fully start
4. Verify: the project dashboard should show green status indicators

---

## Step 2 — Apply Migrations

### Option A: Automated script (recommended)

A Node.js script is available at `supabase/apply-migrations.js`. It applies both migrations and runs verification queries automatically.

```bash
node supabase/apply-migrations.js
```

Expected output:
```
Connecting to Supabase (pooler)...
Connected successfully.

Applying: 20240101_000_rls_policies.sql
  ✓ 20240101_000_rls_policies.sql applied successfully.

Applying: 20240101_001_triggers.sql
  ✓ 20240101_001_triggers.sql applied successfully.

=== Verification ===

Tables found (12/12):
  - announcements
  - attendances
  - audit_log
  - dues_payments
  - dues_periods
  - forum_comments
  - forum_posts
  - materials
  - photo_galleries
  - photos
  - schedule
  - users
  ✓ All 12 tables present

  ✓ dues_summary view exists

Triggers found (2/2):
  - audit_dues_payment_changes on dues_payments
  - on_auth_user_created on users  (may show auth schema separately)

Helper functions found (2/2):
  - is_admin()
  - is_treasurer_or_admin()
  ✓ Both helper functions present

RLS enabled on 12/12 tables
  ✓ RLS enabled on all tables

=== Migration complete ===
```

### Option B: Supabase SQL Editor

1. Open [Supabase Dashboard → SQL Editor](https://supabase.com/dashboard/project/yppecdnnuitfkmojlrmy/sql/new)
2. Copy the contents of `supabase/migrations/20240101_000_rls_policies.sql`
3. Paste and click **Run**
4. Verify no errors in the output
5. Repeat for `supabase/migrations/20240101_001_triggers.sql`

### Option C: Supabase CLI (`supabase db push`)

This requires CLI authentication. Run once to authenticate:

```bash
npx supabase login
```

Then link the project and push:

```bash
npx supabase link --project-ref yppecdnnuitfkmojlrmy
npx supabase db push
```

> **Note:** `supabase db push` uses migrations tracked in `supabase/migrations/`. Both files are already present there.

### Option D: `prisma db execute` (requires port 5432)

Once the project is resumed, the direct connection (port 5432) should also work:

```bash
npx prisma db execute --file supabase/migrations/20240101_000_rls_policies.sql
npx prisma db execute --file supabase/migrations/20240101_001_triggers.sql
```

> This uses `DIRECT_URL` from `.env` (port 5432, bypasses pgbouncer).

---

## Step 3 — Verification Checklist

After applying migrations, verify the following in the Supabase dashboard:

### Tables (Table Editor)

All 12 tables must exist in the `public` schema:

- [ ] `users`
- [ ] `dues_periods`
- [ ] `dues_payments`
- [ ] `announcements`
- [ ] `schedule`
- [ ] `photo_galleries`
- [ ] `photos`
- [ ] `audit_log`
- [ ] `attendances`
- [ ] `materials`
- [ ] `forum_posts`
- [ ] `forum_comments`

### View

Run in SQL Editor:
```sql
SELECT * FROM public.dues_summary LIMIT 1;
```
Should return without error (empty result is fine if no data yet).

### Triggers

Run in SQL Editor:
```sql
SELECT trigger_name, event_object_schema, event_object_table, action_timing, event_manipulation
FROM information_schema.triggers
WHERE trigger_name IN ('on_auth_user_created', 'audit_dues_payment_changes')
ORDER BY trigger_name;
```

Expected: 2 rows (one per trigger). The `on_auth_user_created` trigger is on `auth.users` (may not appear in `information_schema.triggers` which only shows `public` schema — check via Supabase Dashboard → Database → Triggers).

### Helper Functions

Run in SQL Editor:
```sql
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name IN ('is_admin', 'is_treasurer_or_admin');
```

Expected: 2 rows.

### RLS Policies

Run in SQL Editor:
```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
```

All 12 tables must have `rowsecurity = true`.

---

## Migration File Contents

The migration files are:

| File | What it does |
|------|-------------|
| `supabase/migrations/20240101_000_rls_policies.sql` | Creates `is_admin()` and `is_treasurer_or_admin()` helper functions. Enables + forces RLS on all 12 tables. Creates all RLS policies per design §4. |
| `supabase/migrations/20240101_001_triggers.sql` | Creates `dues_summary` view. Creates `handle_new_user()` function + `on_auth_user_created` trigger on `auth.users`. Creates `audit_dues_payment()` function + `audit_dues_payment_changes` trigger on `dues_payments`. |

---

## Idempotency

Both migration files use `CREATE OR REPLACE` for functions, triggers, and the view — they are **safe to re-run** if partially applied. The RLS `ENABLE`/`FORCE` and `CREATE POLICY` statements are not idempotent; if policies already exist, you will see `ERROR: policy "..." for table "..." already exists`. This is safe to ignore on a re-run.

To apply idempotently on a database that may already have partial policies, prefix each `CREATE POLICY` with:
```sql
DROP POLICY IF EXISTS "policy name" ON public.table_name;
```
Or simply apply via the SQL Editor and ignore duplicate policy errors.

---

## Free-Tier Notes

- **Auto-pause:** Supabase free tier pauses projects after ~1 week of inactivity. Resume from dashboard before applying migrations.
- **Keep-alive:** After applying migrations, ensure the `/api/ping` Vercel cron (configured in `vercel.json`) is running — it prevents future pausing by querying the DB every 5 minutes.
- **Port 5432 unavailable while paused:** The direct connection (DIRECT_URL, port 5432) will show `ENOTFOUND` or connection refused when the project is paused. Port 6543 (pooler) resolves in DNS but rejects auth while paused.
