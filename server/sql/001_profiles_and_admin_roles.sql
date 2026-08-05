-- Run this once in your Supabase project's SQL Editor:
-- https://supabase.com/dashboard/project/latwtizovfklnddabkhh/sql/new

-- 1. Profiles table: one row per auth user, holds their role.
--    New signups default to 'pending' — NOT admin. You promote accounts to
--    admin manually (see the UPDATE statement at the bottom of this file).
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  role text not null default 'pending' check (role in ('pending', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Users can read their own profile row (so the frontend can check its own role).
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- No insert/update/delete policies for regular users — profile rows are only
-- ever written by the trigger below (as the postgres superuser) or by you
-- directly in the SQL editor. This keeps role escalation impossible from the
-- client side.

-- 2. Auto-create a profile row whenever someone signs up via Supabase Auth.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Promote an account to admin after they've signed up once.
-- Replace the email below and run this manually whenever you want to grant
-- someone admin access:
--
-- update public.profiles set role = 'admin' where email = 'you@example.com';
