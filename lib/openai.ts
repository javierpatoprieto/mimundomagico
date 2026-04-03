import OpenAI from 'openai'

// ─── Story Creation Types ────────────────────────────────────────────────────

export interface StoryCreationParams {
  childName: string
  childDescription: string
  childMood: string
  char1Name?: string
  char1Role?: string
  char1Description?: string
  char2Name?: string
  char2Description?: string
  hasVillain: boolean
  villainName?: string
  villainDescription?: string
  scenario: string
  adventure: string
  tone: string
  length: 'short' | 'normal' | 'long'
  magicElement: boolean
  favoriteFood?: string
  specialObject?: string
  moral?: string
  dedication?: string
}

export function buildStoryPrompt(params: StoryCreationParams): string {
  const {
    childName,
    childDescription,
    childMood,
    char1Name,
    char1Role,
    char1Description,
    char2Name,
    char2Description,
    hasVillain,
    villainName,
    villainDescription,
    scenario,
    adventure,
    tone,
    length,
    magicElement,
    favoriteFood,
    specialObject,
    moral,
    dedication,
  } = params

  const wordCount = length === 'short' ? '~200 palabras' : length === 'long' ? '~600 palabras' : '~400 palabras'

  const toneMap: Record<string, string> = {
    funny: 'divertido y lleno de humor',
    exciting: 'emocionante y lleno de acción',
    calm: 'tranquilo y poético, ideal para antes de dormir',
    mysterious: 'misterioso y lleno de intriga',
    tender: 'tierno y lleno de ternura',
  }
  const toneDescription = toneMap[tone] ?? tone

  const moodMap: Record<string, string> = {
    happy: 'alegre y feliz',
    brave: 'valiente y decidido/a',
    curious: 'muy curioso/a y explorador/a',
    magical: 'mágico/a y especial',
    adventurous: 'aventurero/a y sin miedo',
  }
  const moodDescription = moodMap[childMood] ?? childMood

  const lines: string[] = []

  lines.push(`Escribe un cuento mágico en español con estas características:`)
  lines.push(``)
  lines.push(`**PROTAGONISTA:**`)
  lines.push(`- Nombre: ${childName}`)
  lines.push(`- Personalidad y descripción: ${childDescription || `Es ${moodDescription}`}`)
  lines.push(`- Estado de ánimo principal: ${moodDescription}`)

  if (char1Name) {
    lines.push(``)
    lines.push(`**PERSONAJE 1:**`)
    lines.push(`- Nombre: ${char1Name}`)
    lines.push(`- Rol: ${char1Role || 'mejor amigo/a'}`)
    if (char1Description) lines.push(`- Descripción: ${char1Description}`)
  }

  if (char2Name) {
    lines.push(``)
    lines.push(`**PERSONAJE 2:**`)
    lines.push(`- Nombre: ${char2Name}`)
    if (char2Description) lines.push(`- Descripción: ${char2Description}`)
  }

  if (hasVillain && villainName) {
    lines.push(``)
    lines.push(`**ANTAGONISTA/VILLANO:**`)
    lines.push(`- Nombre: ${villainName}`)
    if (villainDescription) lines.push(`- Descripción: ${villainDescription}`)
    lines.push(`- El villano debe ser vencido al final de forma ingeniosa, no violenta`)
  }

  lines.push(``)
  lines.push(`**ESCENARIO:**`)
  lines.push(scenario)

  lines.push(``)
  lines.push(`**AVENTURA:**`)
  lines.push(adventure)

  lines.push(``)
  lines.push(`**ESTILO Y FORMATO:**`)
  lines.push(`- Tono: ${toneDescription}`)
  lines.push(`- Longitud: ${wordCount}`)
  lines.push(`- Divide el cuento en párrafos cortos de 2-3 oraciones`)
  lines.push(`- Usa emojis ocasionalmente 🌟✨ para dar magia`)
  lines.push(`- Lenguaje simple, poético y adaptado a niños pequeños`)
  lines.push(`- Final siempre feliz y cálido`)

  if (magicElement) {
    lines.push(`- Incluye un elemento mágico sorpresa que cambie el rumbo de la historia de forma inesperada y maravillosa`)
  }

  if (favoriteFood || specialObject) {
    lines.push(``)
    lines.push(`**DETALLES ESPECIALES A INCLUIR:**`)
    if (favoriteFood) lines.push(`- Comida favorita de ${childName}: ${favoriteFood} (inclúyela de forma divertida en la historia)`)
    if (specialObject) lines.push(`- Objeto especial: ${specialObject} (dale un papel importante o mágico en la aventura)`)
  }

  if (moral && moral !== 'none') {
    const moralMap: Record<string, string> = {
      friendship: 'la amistad y el valor de los amigos',
      courage: 'el valor y la valentía',
      honesty: 'la honestidad y ser sincero',
      creativity: 'la creatividad y la imaginación',
      effort: 'el esfuerzo y la perseverancia',
      kindness: 'la bondad y ayudar a los demás',
    }
    const moralText = moralMap[moral] ?? moral
    lines.push(``)
    lines.push(`**MORALEJA:**`)
    lines.push(`El cuento debe transmitir de forma natural el valor de ${moralText}. No lo digas explícitamente, muéstralo a través de las acciones de los personajes.`)
  }

  if (dedication) {
    lines.push(``)
    lines.push(`**DEDICATORIA:**`)
    lines.push(`Al final del cuento, incluye una pequeña dedicatoria: "Este cuento es para ${dedication}" de forma poética y cálida.`)
  }

  lines.push(``)
  lines.push(`El protagonista siempre es ${childName}. Hazlo completamente único, mágico e irrepetible. 🪄`)

  return lines.join('\n')
}

// ─── OpenAI Client ───────────────────────────────────────────────────────────

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface StoryGenerationParams {
  name: string
  age: number
  theme: string
  // preferences
  favoriteColors?: string[]
  bestFriendName?: string | null
  petName?: string | null
  favoriteFood?: string | null
  // legacy extra characters field
  characters?: string
}

export async function generateStory(params: StoryGenerationParams): Promise<string> {
  const {
    name,
    age,
    theme,
    favoriteColors,
    bestFriendName,
    petName,
    favoriteFood,
    characters,
  } = params

  const friendLine = bestFriendName
    ? `Su mejor amigo/a se llama ${bestFriendName} (inclúyelo/la como personaje importante).`
    : ''
  const petLine = petName
    ? `Su mascota se llama ${petName} (inclúyela de forma adorable en la historia).`
    : ''
  const foodLine = favoriteFood
    ? `Su comida favorita es ${favoriteFood} (inclúyela de forma divertida y mágica en la historia).`
    : ''
  const colorLine =
    favoriteColors && favoriteColors.length > 0
      ? `Sus colores favoritos son ${favoriteColors.join(', ')} (úsalos para describir el entorno mágico).`
      : ''
  const extraLine = characters ? `Personajes adicionales: ${characters}.` : ''

  const prompt = `Escribe un cuento mágico en español para un niño/a de ${age} años llamado/a ${name}.

Tema favorito: ${theme}
${friendLine}
${petLine}
${foodLine}
${colorLine}
${extraLine}

El cuento debe tener ~400 palabras, lenguaje simple y poético, emojis ocasionales, final feliz.
Protagonista siempre es ${name}. Hazlo único y mágico.

Estructura:
- Párrafo 1-2: Introducción mágica donde ${name} descubre algo extraordinario
- Párrafo 3-5: La emocionante aventura, con los personajes especiales
- Párrafo 6-7: El momento de magia donde todo se resuelve
- Párrafo final: Final feliz y cálido, ${name} se va a dormir lleno/a de felicidad

Divide el cuento en párrafos cortos de 2-3 oraciones. Usa emojis ocasionalmente 🌟✨.`

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content:
          'Eres un narrador de cuentos infantiles mágico y poético. Creas historias llenas de amor, aventura y ternura para que los padres las lean a sus hijos a la hora de dormir. Cada cuento debe sentirse como un abrazo cálido y especial. Usa los detalles personales del niño/a para hacer la historia completamente única e irrepetible.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 900,
    temperature: 0.85,
  })

  return response.choices[0]?.message?.content || ''
}

export async function generateAudio(text: string): Promise<Buffer> {
  const response = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'nova',
    input: text,
    speed: 0.9,
  })

  const buffer = Buffer.from(await response.arrayBuffer())
  return buffer
}
