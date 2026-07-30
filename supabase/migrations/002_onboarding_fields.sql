-- Adds the fields the onboarding form collects to an already-deployed profiles
-- table. Run once in the Supabase SQL Editor. Safe to re-run (IF NOT EXISTS).

alter table public.profiles add column if not exists age smallint;
alter table public.profiles add column if not exists sex text;
alter table public.profiles add column if not exists equipment text;
alter table public.profiles add column if not exists diet_preference text;
alter table public.profiles add column if not exists onboarding_completed boolean default false;
