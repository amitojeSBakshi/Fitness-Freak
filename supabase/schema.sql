-- Fit Freak database schema
-- Run this once in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query -> paste -> Run).
--
-- Every table is scoped to the signed-in user via row-level security, so a row is
-- only ever readable or writable by the person who created it.

-- ---------------------------------------------------------------------------
-- profile: one row per user, holds targets and body stats
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  date_of_birth date,
  height_cm numeric(5,1),
  starting_weight_kg numeric(5,2),
  goal text,                                  -- 'fat_loss' | 'recomp' | 'muscle_gain' | 'maintain'
  activity_level text default 'sedentary',
  -- Targets. maintenance_kcal starts as a formula estimate and gets replaced by a
  -- value calibrated from real logged data after 2-3 weeks.
  maintenance_kcal integer,
  maintenance_is_calibrated boolean default false,
  target_kcal integer,
  target_protein_g integer,
  target_carbs_g integer,
  target_fat_g integer,
  target_water_l numeric(3,1) default 3.0,
  target_sleep_h numeric(3,1) default 7.5,
  target_steps integer default 7000,
  training_days_per_week smallint default 4,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- weight_logs: daily bodyweight. Trends matter, single readings do not.
-- ---------------------------------------------------------------------------
create table if not exists public.weight_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  logged_on date not null,
  weight_kg numeric(5,2) not null,
  note text,
  created_at timestamptz default now(),
  unique (user_id, logged_on)
);

-- ---------------------------------------------------------------------------
-- measurements: tape measurements, logged every 2-4 weeks
-- ---------------------------------------------------------------------------
create table if not exists public.measurements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  logged_on date not null,
  waist_cm numeric(5,1),
  neck_cm numeric(5,1),
  chest_cm numeric(5,1),
  hips_cm numeric(5,1),
  left_arm_cm numeric(5,1),
  right_arm_cm numeric(5,1),
  left_thigh_cm numeric(5,1),
  right_thigh_cm numeric(5,1),
  note text,
  created_at timestamptz default now(),
  unique (user_id, logged_on)
);

-- ---------------------------------------------------------------------------
-- workout_sessions + exercise_sets: one session has many logged sets
-- ---------------------------------------------------------------------------
create table if not exists public.workout_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  logged_on date not null,
  session_name text not null,                 -- e.g. 'Full Body A'
  session_type text default 'strength',       -- 'strength' | 'cardio' | 'outdoor' | 'rest'
  duration_min integer,
  perceived_effort smallint,                  -- 1-10, optional
  estimated_kcal integer,
  note text,
  created_at timestamptz default now()
);

create table if not exists public.exercise_sets (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.workout_sessions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  exercise_name text not null,
  set_number smallint not null,
  reps smallint,
  weight_kg numeric(6,2),                     -- null for bodyweight movements
  hold_seconds integer,                       -- for planks and similar
  rir smallint,                               -- reps in reserve
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- food_logs: one row per logged food item
-- ---------------------------------------------------------------------------
create table if not exists public.food_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  logged_on date not null,
  meal_type text,                             -- 'breakfast' | 'lunch' | 'dinner' | 'snack'
  raw_input text not null,                    -- exactly what was typed, e.g. '2 roti with dal'
  matched_food text,                          -- resolved database item, if matched
  quantity numeric(6,2) default 1,
  portion_label text,                         -- '1 medium roti', '1 katori'
  grams numeric(7,1),
  kcal numeric(7,1) not null,
  protein_g numeric(6,1) not null default 0,
  carbs_g numeric(6,1) not null default 0,
  fat_g numeric(6,1) not null default 0,
  -- Honesty about estimate quality. Home-cooked Indian food varies enormously by
  -- oil quantity, so a lot of entries are legitimately 'medium' at best.
  confidence text default 'medium',           -- 'high' | 'medium' | 'low'
  source text default 'text',                 -- 'text' | 'photo' | 'manual'
  photo_path text,                            -- Supabase Storage path, for later photo support
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- habit_logs: one row per day per user
-- ---------------------------------------------------------------------------
create table if not exists public.habit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  logged_on date not null,
  water_l numeric(3,1),
  sleep_h numeric(3,1),
  steps integer,
  -- Tracks the gradual step-down rather than demanding perfection
  sweets_servings smallint,
  fried_servings smallint,
  note text,
  created_at timestamptz default now(),
  unique (user_id, logged_on)
);

-- ---------------------------------------------------------------------------
-- Indexes for the queries the app actually makes (recent-first, by user)
-- ---------------------------------------------------------------------------
create index if not exists weight_logs_user_date_idx on public.weight_logs (user_id, logged_on desc);
create index if not exists measurements_user_date_idx on public.measurements (user_id, logged_on desc);
create index if not exists workout_sessions_user_date_idx on public.workout_sessions (user_id, logged_on desc);
create index if not exists exercise_sets_session_idx on public.exercise_sets (session_id);
create index if not exists food_logs_user_date_idx on public.food_logs (user_id, logged_on desc);
create index if not exists habit_logs_user_date_idx on public.habit_logs (user_id, logged_on desc);

-- ---------------------------------------------------------------------------
-- Row-level security: a user can only ever touch their own rows
-- ---------------------------------------------------------------------------
alter table public.profiles         enable row level security;
alter table public.weight_logs      enable row level security;
alter table public.measurements     enable row level security;
alter table public.workout_sessions enable row level security;
alter table public.exercise_sets    enable row level security;
alter table public.food_logs        enable row level security;
alter table public.habit_logs       enable row level security;

-- profiles keys on id; every other table keys on user_id.
drop policy if exists "own profile" on public.profiles;
create policy "own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "own weight logs" on public.weight_logs;
create policy "own weight logs" on public.weight_logs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own measurements" on public.measurements;
create policy "own measurements" on public.measurements
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own workout sessions" on public.workout_sessions;
create policy "own workout sessions" on public.workout_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own exercise sets" on public.exercise_sets;
create policy "own exercise sets" on public.exercise_sets
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own food logs" on public.food_logs;
create policy "own food logs" on public.food_logs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own habit logs" on public.habit_logs;
create policy "own habit logs" on public.habit_logs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Create a profile row automatically the first time a user signs up
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
