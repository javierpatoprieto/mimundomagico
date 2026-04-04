/**
 * 🔊 Audio Narration API — ElevenLabs
 * POST /api/stories/narrate
 * Body: { userStoryId, text }
 * Returns: { audioUrl }
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const VOICE_ID = process.env.ELEVENLABS_VOICE_ID ?? 'MF3mGyEYCl7XYWbV9V6O' // Elli — warm, expressive, multilingual

async function generateWithElevenLabs(text: string): Promise<Buffer> {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY!,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.70,
          similarity_boost: 0.80,
          style: 0.35,
          use_speaker_boost: true,
        },
      }),
    }
  )
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`ElevenLabs error ${res.status}: ${err}`)
  }
  return Buffer.from(await res.arrayBuffer())
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userStoryId, text } = body

    if (!userStoryId || !text) {
      return NextResponse.json(
        { error: 'userStoryId and text are required' },
        { status: 400 }
      )
    }

    // Trim text to ElevenLabs limit (5000 chars on free tier)
    const trimmedText = text.slice(0, 4900)

    // 1. Generate audio
    const buffer = await generateWithElevenLabs(trimmedText)

    // 2. Upload to Supabase Storage
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const fileName = `audio/${userStoryId}.mp3`
    const { error: uploadError } = await supabase.storage
      .from('stories-audio')
      .upload(fileName, buffer, {
        contentType: 'audio/mpeg',
        upsert: true,
      })

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('stories-audio')
      .getPublicUrl(fileName)

    // 3. Persist URL on the user_story row
    await supabase
      .from('user_stories')
      .update({ audio_url: publicUrl })
      .eq('id', userStoryId)

    return NextResponse.json({ audioUrl: publicUrl })
  } catch (err) {
    console.error('[narrate]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
