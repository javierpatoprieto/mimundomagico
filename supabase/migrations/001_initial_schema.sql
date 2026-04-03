-- ============================================================
-- Mi Mundo Mágico — Initial Schema
-- Run this in your Supabase SQL editor
-- ============================================================

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  is_premium boolean not null default false,
  stripe_customer_id text unique,
  created_at timestamptz not null default now()
);

-- Child profiles
create table if not exists public.child_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  age int check (age >= 0 and age <= 18),
  avatar_emoji text not null default '⭐',
  avatar_color text not null default '#FFD700',
  created_at timestamptz not null default now()
);

-- Stories (classic templates + AI-generated)
create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content_template text,          -- Uses {childName} placeholder for classic stories
  cover_emoji text not null default '📖',
  theme text not null default 'general',
  is_premium boolean not null default false,
  is_ai_generated boolean not null default false,
  created_at timestamptz not null default now()
);

-- User stories (reading state + personalization + Phase 2 audio)
create table if not exists public.user_stories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  child_profile_id uuid references public.child_profiles(id) on delete cascade not null,
  story_id uuid references public.stories(id) on delete cascade not null,
  custom_content text,            -- Personalized version of the story
  audio_url text,                 -- Phase 2: populated by /api/stories/narrate
  is_favorite boolean not null default false,
  progress int not null default 0 check (progress >= 0 and progress <= 100),
  created_at timestamptz not null default now(),
  unique(user_id, child_profile_id, story_id)
);

-- ── Row-Level Security ─────────────────────────────────────────────────────

alter table public.profiles enable row level security;
alter table public.child_profiles enable row level security;
alter table public.stories enable row level security;
alter table public.user_stories enable row level security;

-- Profiles: users can only read/write their own
create policy "profiles: own row" on public.profiles
  for all using (auth.uid() = id);

-- Child profiles: users can only access their own children
create policy "child_profiles: own rows" on public.child_profiles
  for all using (auth.uid() = user_id);

-- Stories: everyone can read, only service role can write
create policy "stories: public read" on public.stories
  for select using (true);

-- User stories: users can only access their own
create policy "user_stories: own rows" on public.user_stories
  for all using (auth.uid() = user_id);

-- ── Auto-create profile on signup ──────────────────────────────────────────

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Indexes ────────────────────────────────────────────────────────────────

create index if not exists idx_child_profiles_user_id on public.child_profiles(user_id);
create index if not exists idx_user_stories_user_id on public.user_stories(user_id);
create index if not exists idx_user_stories_child on public.user_stories(child_profile_id);
create index if not exists idx_stories_slug on public.stories(slug);

-- ── Seed: classic stories ──────────────────────────────────────────────────
-- These correspond to the templates in /lib/stories/*.ts
-- The content_template is intentionally null here (served from code).
-- Populate it if you want DB-driven templates in the future.

insert into public.stories (id, title, slug, cover_emoji, theme, is_premium, is_ai_generated)
values
  ('00000000-0000-0000-0000-000000000001', '{childName} y el Bosque Encantado',         'caperucita-roja', '🧺', 'bosque',         false, false),
  ('00000000-0000-0000-0000-000000000002', '{childName} y la Casa Más Fuerte del Mundo', 'tres-cerditos',   '🏠', 'construcción',   false, false),
  ('00000000-0000-0000-0000-000000000003', 'La Historia Mágica de {childName}',          'patito-feo',      '🦢', 'autoestima',     false, false),
  ('00000000-0000-0000-0000-000000000004', '{childName} y los Siete Amigos del Bosque',  'blancanieves',    '🍎', 'amistad',        false, false),
  ('00000000-0000-0000-0000-000000000005', '{childName} y la Gran Carrera',              'tortuga-liebre',  '🐢', 'perseverancia',  false, false)
on conflict (slug) do nothing;
