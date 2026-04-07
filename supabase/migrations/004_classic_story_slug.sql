-- ============================================================
-- Mi Mundo Mágico — Migration 004: Classic story slug support
-- Allows user_stories to reference static stories without FK
-- Run this in your Supabase SQL editor
-- ============================================================

-- Make story_id nullable (classic stories don't have a DB row)
ALTER TABLE public.user_stories
  ALTER COLUMN story_id DROP NOT NULL;

-- Add slug column for static/classic stories
ALTER TABLE public.user_stories
  ADD COLUMN IF NOT EXISTS classic_story_slug text;

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_user_stories_classic_slug
  ON public.user_stories(user_id, child_profile_id, classic_story_slug);
