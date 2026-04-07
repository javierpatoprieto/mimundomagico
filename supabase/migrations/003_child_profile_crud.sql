-- ============================================================
-- Mi Mundo Mágico — Migration 003: Child Profile CRUD + Gender
-- Run this in your Supabase SQL editor
-- ============================================================

-- Add gender column to child_profiles
ALTER TABLE public.child_profiles
  ADD COLUMN IF NOT EXISTS gender text
    CHECK (gender IN ('niño', 'niña'))
    DEFAULT 'niño';

-- ── RLS Policies for UPDATE and DELETE ────────────────────────────────────────

-- UPDATE: users can only update their own child profiles
CREATE POLICY "Users can update their own child profiles"
  ON public.child_profiles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: users can only delete their own child profiles
-- (user_stories will cascade-delete due to ON DELETE CASCADE on child_profile_id)
CREATE POLICY "Users can delete their own child profiles"
  ON public.child_profiles
  FOR DELETE
  USING (auth.uid() = user_id);
