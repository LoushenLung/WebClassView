-- Run once in the Supabase SQL Editor before enabling public email sign-up.
-- This creates a profile automatically and keeps direct Data API access scoped
-- to the authenticated user's own profile. Prisma's server-only connection is
-- intentionally unaffected by the authenticated/anon grants below.

begin;

alter table public.users enable row level security;

-- Do not expose broad table privileges through the Data API. In particular,
-- clients must never be allowed to change their own role.
revoke all on table public.users from anon, authenticated;
grant select (id, email, name, role, "avatarUrl", created_at, updated_at)
  on table public.users to authenticated;
grant update (name, "avatarUrl") on table public.users to authenticated;

drop policy if exists "Users can view their own profile" on public.users;
create policy "Users can view their own profile"
  on public.users
  for select
  to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "Users can update their own profile" on public.users;
create policy "Users can update their own profile"
  on public.users
  for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- The trigger runs under its owner because auth.users cannot insert into a
-- protected public table. User metadata is used only as a display name, never
-- for authorization.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.users (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'name'), ''),
      split_part(new.email, '@', 1)
    )
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Give users created before this trigger a profile as well. Existing rows keep
-- their role and other profile data because conflicts are left untouched.
insert into public.users (id, email, name)
select
  id,
  email,
  coalesce(
    nullif(trim(raw_user_meta_data ->> 'name'), ''),
    split_part(email, '@', 1)
  )
from auth.users
where email is not null
on conflict (id) do nothing;

commit;
