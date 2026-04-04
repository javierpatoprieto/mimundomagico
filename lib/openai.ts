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

  // Build mandatory personal details
  const mandatory: string[] = []
  if (bestFriendName) mandatory.push(`OBLIGATORIO: El mejor amigo/a de ${name} se llama "${bestFriendName}". Debe aparecer con ese nombre exacto al menos 2 veces y tener un papel activo.`)
  if (petName) mandatory.push(`OBLIGATORIO: La mascota de ${name} se llama "${petName}". Debe aparecer con ese nombre exacto y hacer algo importante o gracioso.`)
  if (favoriteFood) mandatory.push(`OBLIGATORIO: La comida favorita de ${name} es "${favoriteFood}". Debe aparecer en la historia (como recompensa, ingrediente magico, o lo que comen al final).`)
  if (favoriteColors && favoriteColors.length > 0) mandatory.push(`OBLIGATORIO: Los colores favoritos de ${name} son ${favoriteColors.join(' y ')}. Usalos para describir escenario, ropa u objetos magicos.`)
  if (characters) mandatory.push(`Personajes adicionales: ${characters}.`)

  const mandatoryBlock = mandatory.length > 0
    ? `\n\nDETALLES PERSONALES - DEBES INCLUIR TODOS (no los omitas):\n${mandatory.join('\n')}`
    : ''

  const prompt = `Escribe un cuento magico en espanol para ${name}, que tiene ${age} annos.\n\nTEMA: ${theme}\n\nPROTAGONISTA: ${name} es el heroe. Usa su nombre con frecuencia.${mandatoryBlock}\n\nINSTRUCCIONES:\n- Exactamente ~400 palabras\n- Parrafos cortos de 2-3 oraciones\n- Lenguaje simple y calido para ninos\n- Emojis ocasionales\n- Final feliz\n- Los nombres deben aparecer exactamente como se indican arriba\n\nESTRUCTURA:\n1. ${name} descubre algo magico relacionado con "${theme}"\n2. Comienza la aventura${bestFriendName ? ` junto a ${bestFriendName}` : ''}${petName ? ` y su mascota ${petName}` : ''}\n3. Se encuentran con un desafio o misterio\n4. Lo resuelven de forma ingeniosa\n5. Final feliz: ${name}${favoriteFood ? ` celebra comiendo ${favoriteFood}` : ' llega a casa contento'} y se duerme sonando con mas aventuras`

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'Eres un narrador de cuentos infantiles. Sigues instrucciones al pie de la letra. Cuando algo es OBLIGATORIO, SIEMPRE lo incluyes usando el nombre exacto indicado. Nunca omites detalles personales del nino/a.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 1000,
    temperature: 0.75,
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
