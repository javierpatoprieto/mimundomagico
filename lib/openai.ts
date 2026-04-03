import OpenAI from 'openai'

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
