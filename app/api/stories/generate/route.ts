import { NextRequest, NextResponse } from 'next/server'
import { generateStory } from '@/lib/openai'
import { createServerClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name, age, theme, characters, childProfileId, userId,
      favoriteColors, bestFriendName, petName, favoriteFood,
    } = body

    if (!name || !age || !theme || !userId || !childProfileId) {
      return NextResponse.json(
        { error: 'Missing required fields: name, age, theme, userId, childProfileId' },
        { status: 400 }
      )
    }

    const supabaseAdmin = createServerClient()

    // Check user's status (premium or trial available)
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('is_premium, ai_trial_used')
      .eq('id', userId)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const canGenerate = profile.is_premium || !profile.ai_trial_used
    const isTrial = !profile.is_premium && !profile.ai_trial_used

    if (!canGenerate) {
      return NextResponse.json(
        { error: 'Premium subscription required. Free trial already used.' },
        { status: 403 }
      )
    }

    // Generate the story with OpenAI, including preferences
    const content = await generateStory({
      name,
      age: Number(age),
      theme,
      characters,
      favoriteColors,
      bestFriendName,
      petName,
      favoriteFood,
    })

    if (!content) {
      return NextResponse.json({ error: 'Failed to generate story' }, { status: 500 })
    }

    // Save the story to the DB
    const { data: story, error: storyError } = await supabaseAdmin
      .from('stories')
      .insert({
        title: `La aventura de ${name} — ${theme}`,
        slug: `ai-${userId}-${Date.now()}`,
        content_template: content,
        cover_emoji: themeEmoji(theme),
        theme,
        is_premium: true,
        is_ai_generated: true,
        is_trial_story: isTrial,
      })
      .select()
      .single()

    if (storyError) throw storyError

    // Create the user_story join record
    const { data: userStory, error: userStoryError } = await supabaseAdmin
      .from('user_stories')
      .insert({
        user_id: userId,
        child_profile_id: childProfileId,
        story_id: story.id,
        custom_content: content,
      })
      .select()
      .single()

    if (userStoryError) throw userStoryError

    // Mark trial as used if this was a trial generation
    if (isTrial) {
      await supabaseAdmin
        .from('profiles')
        .update({ ai_trial_used: true, ai_trial_used_at: new Date().toISOString() })
        .eq('id', userId)
    }

    return NextResponse.json({
      storyId: story.id,
      userStoryId: userStory.id,
      content,
      isTrial,
    })
  } catch (err) {
    console.error('[generate]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function themeEmoji(theme: string): string {
  const map: Record<string, string> = {
    dinosaurios: '🦕',
    espacio: '🚀',
    sirenas: '🧜‍♀️',
    superhéroes: '🦸',
    animales: '🐾',
    magia: '🪄',
    piratas: '🏴‍☠️',
    hadas: '🧚',
    robots: '🤖',
    princesas: '👸',
    dragones: '🐉',
    océano: '🌊',
    bosque: '🌲',
  }
  return map[theme.toLowerCase()] ?? '✨'
}
