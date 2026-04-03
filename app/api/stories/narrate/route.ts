/**
 * 🔊 Phase 2 — Audio Narration API
 *
 * This route is scaffolded and ready for wiring. The DB schema already stores
 * `audio_url` on `user_stories`. When Phase 2 ships, simply un-comment the
 * provider block you want (OpenAI TTS or ElevenLabs) and set the env vars.
 *
 * ENV VARS NEEDED (Phase 2):
 *   OPENAI_API_KEY              — already used for story generation
 *   ELEVENLABS_API_KEY          — alternative: richer, more expressive voices
 *   ELEVENLABS_VOICE_ID         — e.g. "21m00Tcm4TlvDq8ikWAM" (Rachel, warm)
 *   AUDIO_STORAGE_BUCKET        — Supabase Storage bucket name for audio files
 *
 * FLOW:
 *   POST /api/stories/narrate
 *   Body: { userStoryId, text, provider? }
 *   1. Generate audio buffer via TTS provider
 *   2. Upload to Supabase Storage
 *   3. Patch user_stories.audio_url with public URL
 *   4. Return { audioUrl }
 */

import { NextRequest, NextResponse } from 'next/server'

// ─── Uncomment for Phase 2 OpenAI TTS ────────────────────────────────────────
// import { openai } from '@/lib/openai'
// import { createServerClient } from '@/lib/supabase-server'
//
// async function generateWithOpenAI(text: string): Promise<Buffer> {
//   const response = await openai.audio.speech.create({
//     model: 'tts-1',          // tts-1-hd for higher quality
//     voice: 'nova',           // nova = warm, gentle — perfect for bedtime
//     input: text,
//     speed: 0.85,             // slightly slower = easier for kids to follow
//     response_format: 'mp3',
//   })
//   return Buffer.from(await response.arrayBuffer())
// }

// ─── Uncomment for Phase 2 ElevenLabs ────────────────────────────────────────
// async function generateWithElevenLabs(text: string): Promise<Buffer> {
//   const voiceId = process.env.ELEVENLABS_VOICE_ID ?? '21m00Tcm4TlvDq8ikWAM'
//   const res = await fetch(
//     `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
//     {
//       method: 'POST',
//       headers: {
//         'xi-api-key': process.env.ELEVENLABS_API_KEY!,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         text,
//         model_id: 'eleven_multilingual_v2',   // supports Spanish natively
//         voice_settings: { stability: 0.75, similarity_boost: 0.85, style: 0.4 },
//       }),
//     }
//   )
//   if (!res.ok) throw new Error(`ElevenLabs error: ${res.status}`)
//   return Buffer.from(await res.arrayBuffer())
// }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userStoryId, text, provider = 'openai' } = body

    if (!userStoryId || !text) {
      return NextResponse.json(
        { error: 'userStoryId and text are required' },
        { status: 400 }
      )
    }

    // ── Phase 1 stub ─────────────────────────────────────────────────────────
    // Audio narration is coming in Phase 2.
    // The DB row already has an audio_url column ready to be filled.
    // Remove this block and replace with the provider call above in Phase 2.
    return NextResponse.json(
      {
        message: 'Audio narration coming in Phase 2 🔊',
        phase2: true,
        userStoryId,
        provider,
        // audioUrl will be returned here once implemented
      },
      { status: 202 }
    )

    // ── Phase 2 implementation (replace stub above) ───────────────────────────
    // const supabaseAdmin = createServerClient()
    //
    // // 1. Generate audio
    // const buffer =
    //   provider === 'elevenlabs'
    //     ? await generateWithElevenLabs(text)
    //     : await generateWithOpenAI(text)
    //
    // // 2. Upload to Supabase Storage
    // const fileName = `audio/${userStoryId}.mp3`
    // const { error: uploadError } = await supabaseAdmin.storage
    //   .from(process.env.AUDIO_STORAGE_BUCKET!)
    //   .upload(fileName, buffer, { contentType: 'audio/mpeg', upsert: true })
    //
    // if (uploadError) throw uploadError
    //
    // const { data: { publicUrl } } = supabaseAdmin.storage
    //   .from(process.env.AUDIO_STORAGE_BUCKET!)
    //   .getPublicUrl(fileName)
    //
    // // 3. Persist URL on the user_story row
    // await supabaseAdmin
    //   .from('user_stories')
    //   .update({ audio_url: publicUrl })
    //   .eq('id', userStoryId)
    //
    // return NextResponse.json({ audioUrl: publicUrl })
  } catch (err) {
    console.error('[narrate]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
