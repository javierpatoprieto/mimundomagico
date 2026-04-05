import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createServerClient } from '@/lib/supabase-server'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

function buildPrompt(body: Record<string, unknown>, childName: string, age: number): string {
  const {
    childDescription, childMood,
    char1Name, char1Role, char1Description,
    char2Name, char2Description,
    hasVillain, villainName, villainDescription,
    scenario, adventure, tone, length,
    magicElement, favoriteFood, specialObject,
    moral, dedication,
    // legacy fields from profile
    petName, bestFriendName, favoriteColors, characters,
  } = body as Record<string, unknown>

  const wordCount = length === 'short' ? '~200 palabras' : length === 'long' ? '~600 palabras' : '~400 palabras'

  const toneMap: Record<string, string> = {
    funny: 'divertido y lleno de humor',
    exciting: 'emocionante y lleno de acción',
    calm: 'tranquilo y poético, ideal para antes de dormir',
    mysterious: 'misterioso con final feliz',
    tender: 'tierno y lleno de amor',
  }
  const toneDesc = toneMap[tone as string] ?? 'emocionante'

  const moodMap: Record<string, string> = {
    happy: 'alegre y feliz', brave: 'valiente', curious: 'muy curioso/a',
    magical: 'mágico/a', adventurous: 'aventurero/a',
  }
  const moodDesc = moodMap[childMood as string] ?? 'aventurero/a'

  const mandatory: string[] = []

  // From profile (legacy)
  if (bestFriendName) mandatory.push(`OBLIGATORIO: El mejor amigo/a de ${childName} se llama "${bestFriendName}". Debe aparecer por su nombre al menos 2 veces con un papel activo.`)
  if (petName) mandatory.push(`OBLIGATORIO: La mascota de ${childName} se llama "${petName}". Debe aparecer por su nombre y hacer algo importante o gracioso.`)
  if (favoriteFood) mandatory.push(`OBLIGATORIO: La comida favorita de ${childName} es "${favoriteFood}". Debe aparecer en la historia de forma divertida.`)
  if (favoriteColors && Array.isArray(favoriteColors) && favoriteColors.length > 0) mandatory.push(`OBLIGATORIO: Los colores favoritos de ${childName} son ${(favoriteColors as string[]).join(' y ')}. Úsalos para describir el entorno.`)
  if (characters) mandatory.push(`Personajes adicionales: ${characters}.`)

  // From form
  if (char1Name) mandatory.push(`OBLIGATORIO: El personaje "${char1Name}" (${char1Role ?? 'amigo/a'}${char1Description ? `, ${char1Description}` : ''}) debe aparecer con ese nombre exacto y tener un papel importante en la aventura.`)
  if (char2Name) mandatory.push(`OBLIGATORIO: El personaje "${char2Name}"${char2Description ? ` (${char2Description})` : ''} debe aparecer en la historia.`)
  if (hasVillain && villainName) mandatory.push(`OBLIGATORIO: El villano se llama "${villainName}"${villainDescription ? ` (${villainDescription})` : ''}. Debe ser vencido al final de forma ingeniosa, no violenta.`)
  if (specialObject) mandatory.push(`OBLIGATORIO: "${specialObject}" es el objeto especial de ${childName}. Dale un papel mágico o importante en la aventura.`)

  const mandatoryBlock = mandatory.length > 0
    ? `\n\nPERSONAJES Y DETALLES OBLIGATORIOS (inclúyelos todos sin excepción):\n${mandatory.join('\n')}`
    : ''

  const moralMap: Record<string, string> = {
    friendship: 'la amistad', courage: 'la valentía', honesty: 'la honestidad',
    creativity: 'la creatividad', effort: 'el esfuerzo', kindness: 'la bondad',
  }
  const moralDesc = moral && moral !== 'none' ? moralMap[moral as string] : null

  const lines = [
    `Escribe un cuento mágico en español para ${childName}, que tiene ${age} años.`,
    ``,
    `PROTAGONISTA: ${childName} es ${moodDesc}${childDescription ? `. ${childDescription}` : ''}.`,
    `TEMA: ${adventure || scenario || 'una aventura mágica'}`,
    scenario ? `ESCENARIO: ${scenario}` : '',
    mandatoryBlock,
    ``,
    `ESTILO:`,
    `- Tono: ${toneDesc}`,
    `- Longitud: ${wordCount}`,
    `- Párrafos cortos de 2-3 oraciones`,
    `- Emojis ocasionales 🌟✨`,
    `- Final siempre feliz y cálido`,
    magicElement ? `- Incluye un giro mágico inesperado en el punto culminante` : '',
    moralDesc ? `- Transmite de forma natural el valor de ${moralDesc} sin decirlo explícitamente` : '',
    ``,
    `ESTRUCTURA:`,
    `1. ${childName} descubre algo extraordinario`,
    `2. Comienza la aventura${char1Name ? ` con ${char1Name}` : ''}`,
    `3. Se encuentran con un desafío${hasVillain && villainName ? ` (causado por ${villainName})` : ''}`,
    `4. Lo resuelven de forma mágica e ingeniosa`,
    `5. Final feliz: ${childName}${favoriteFood ? ` celebra comiendo ${favoriteFood}` : ' regresa a casa contento/a'} y se duerme soñando con más aventuras`,
    dedication ? `\nDEDICATORIA: Al final añade en cursiva: "Este cuento es para ${dedication}" de forma poética.` : '',
    ``,
    `IMPORTANTE: Usa los nombres de personajes exactamente como se indican. No los cambies ni los omitas.`,
  ].filter(l => l !== '')

  return lines.join('\n')
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, childProfileId } = body

    const name = body.childName || body.name
    const age = body.age || 4

    if (!name || !userId || !childProfileId) {
      return NextResponse.json({ error: 'Missing required fields: name, userId, childProfileId' }, { status: 400 })
    }

    const supabaseAdmin = createServerClient()

    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('is_premium, ai_trial_used')
      .eq('id', userId)
      .single()

    if (!profile) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const canGenerate = profile.is_premium || !profile.ai_trial_used
    const isTrial = !profile.is_premium && !profile.ai_trial_used

    if (!canGenerate) {
      return NextResponse.json({ error: 'Premium subscription required. Free trial already used.' }, { status: 403 })
    }

    const prompt = buildPrompt(body, name, age)

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Eres un narrador de cuentos infantiles. Sigues las instrucciones al pie de la letra. Cuando algo es OBLIGATORIO, siempre lo incluyes usando el nombre exacto indicado. Escribes con lenguaje cálido, poético y adaptado a niños pequeños. Nunca omites los personajes o detalles marcados como obligatorios.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1100,
      temperature: 0.75,
    })

    const content = response.choices[0]?.message?.content || ''
    if (!content) return NextResponse.json({ error: 'Failed to generate story' }, { status: 500 })

    const theme = body.adventure || body.scenario || body.theme || 'aventura'

    const themeEmoji = (t: string) => {
      const map: Record<string, string> = {
        dinosaurios:'🦕', espacio:'🚀', sirenas:'🧜‍♀️', superhéroes:'🦸', animales:'🐾',
        magia:'🪄', piratas:'🏴‍☠️', hadas:'🧚', robots:'🤖', princesas:'👸', dragones:'🐉',
      }
      const key = Object.keys(map).find(k => t.toLowerCase().includes(k))
      return key ? map[key] : '✨'
    }

    const { data: story, error: storyError } = await supabaseAdmin
      .from('stories')
      .insert({
        title: `La aventura de ${name}`,
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

    if (isTrial) {
      await supabaseAdmin
        .from('profiles')
        .update({ ai_trial_used: true, ai_trial_used_at: new Date().toISOString() })
        .eq('id', userId)
    }

    return NextResponse.json({ storyId: story.id, userStoryId: userStory.id, content, isTrial })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[generate]', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
