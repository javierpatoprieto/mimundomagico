-- ============================================================
-- Mi Mundo Mágico — Migration 002: Child Preferences & AI Trial
-- Run this in your Supabase SQL editor after 001_initial_schema.sql
-- ============================================================

-- Add preferences columns to child_profiles
alter table public.child_profiles
  add column if not exists favorite_themes text[] default array[]::text[],
  add column if not exists favorite_colors text[] default array[]::text[],
  add column if not exists best_friend_name text,
  add column if not exists pet_name text,
  add column if not exists favorite_food text;

-- Add AI trial tracking to profiles
alter table public.profiles
  add column if not exists ai_trial_used boolean not null default false,
  add column if not exists ai_trial_used_at timestamptz;

-- Update stories table to support free trial stories
alter table public.stories
  add column if not exists is_trial_story boolean not null default false;
