create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  plan text not null default 'free',
  account_status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_companies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  template_key text not null,
  company_name text not null,
  company_type text not null,
  target_customer text,
  service_type text,
  primary_language text,
  pricing_direction text,
  description text,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists ai_companies_user_id_idx on public.ai_companies(user_id);
create index if not exists ai_companies_created_at_idx on public.ai_companies(created_at desc);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
      and account_status = 'active'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name')
  )
  on conflict (id) do update
    set email = excluded.email,
        updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.protect_profile_fields()
returns trigger
language plpgsql
as $$
begin
  if auth.uid() is not null and not public.is_admin() then
    new.role = old.role;
    new.plan = old.plan;
    new.account_status = old.account_status;
  end if;

  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.protect_profile_fields();

create or replace function public.protect_profile_insert_fields()
returns trigger
language plpgsql
as $$
begin
  if auth.uid() is not null and not public.is_admin() then
    new.role = 'user';
    new.plan = 'free';
    new.account_status = 'active';
  end if;

  return new;
end;
$$;

drop trigger if exists profiles_protect_insert_fields on public.profiles;
create trigger profiles_protect_insert_fields
before insert on public.profiles
for each row execute function public.protect_profile_insert_fields();

drop trigger if exists ai_companies_set_updated_at on public.ai_companies;
create trigger ai_companies_set_updated_at
before update on public.ai_companies
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.ai_companies enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (id = auth.uid());

drop policy if exists "profiles_select_admin" on public.profiles;
create policy "profiles_select_admin"
on public.profiles
for select
to authenticated
using (public.is_admin());

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (id = auth.uid());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "profiles_update_admin" on public.profiles;
create policy "profiles_update_admin"
on public.profiles
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "ai_companies_select_own" on public.ai_companies;
create policy "ai_companies_select_own"
on public.ai_companies
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "ai_companies_select_admin" on public.ai_companies;
create policy "ai_companies_select_admin"
on public.ai_companies
for select
to authenticated
using (public.is_admin());

drop policy if exists "ai_companies_insert_own" on public.ai_companies;
create policy "ai_companies_insert_own"
on public.ai_companies
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "ai_companies_update_own" on public.ai_companies;
create policy "ai_companies_update_own"
on public.ai_companies
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "ai_companies_update_admin" on public.ai_companies;
create policy "ai_companies_update_admin"
on public.ai_companies
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "ai_companies_delete_own" on public.ai_companies;
create policy "ai_companies_delete_own"
on public.ai_companies
for delete
to authenticated
using (user_id = auth.uid());

drop policy if exists "ai_companies_delete_admin" on public.ai_companies;
create policy "ai_companies_delete_admin"
on public.ai_companies
for delete
to authenticated
using (public.is_admin());

grant usage on schema public to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.ai_companies to authenticated;
grant execute on function public.is_admin() to authenticated;
