/**
 * OpenAI Integration Service
 * Handles story generation with Claude-style prompts
 */

import OpenAI from 'openai'
import { z } from 'zod'
import { logOperation, logError } from './api-utils'

let openai: OpenAI | null = null

function getOpenAIClient(): OpenAI {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }
  return openai
}

/**
 * Validation schema for story generation input
 * Prevents prompt injection by validating input format and content
 */
const StoryGenerationInputSchema = z.object({
  childName: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name is too long')
    .regex(/^[a-zA-Z0-9\s\-'áéíóúàèìòùäëïöüñ]+$/, 'Name can only contain letters, numbers, spaces, hyphens, and apostrophes'),
  age: z.number().int().min(2, 'Age must be at least 2').max(10, 'Age must be at most 10'),
  interests: z
    .array(
      z
        .string()
        .min(1, 'Interest cannot be empty')
        .max(100, 'Interest is too long')
        .regex(/^[a-zA-Z0-9\s\-áéíóúàèìòùäëïöüñ]+$/, 'Interests can only contain letters, numbers, spaces, and hyphens')
    )
    .min(1, 'At least one interest is required')
    .max(10, 'Too many interests'),
  theme: z
    .string()
    .min(1, 'Theme is required')
    .max(50, 'Theme is too long')
    .regex(/^[a-zA-Z\s\-áéíóúàèìòùäëïöüñ]+$/, 'Theme can only contain letters, spaces, and hyphens')
    .optional()
    .default('adventure'),
})

export interface StoryGenerationInput {
  childName: string
  age: number
  interests: string[]
  theme?: string
}

export interface StoryGenerationOutput {
  title: string
  story: string
  tokenCount: number
}

/**
 * Generate a personalized story for a child
 */
export async function generateStory(input: StoryGenerationInput): Promise<StoryGenerationOutput> {
  // Validate input to prevent prompt injection attacks
  const validatedInput = StoryGenerationInputSchema.parse(input)
  const { childName, age, interests, theme = 'adventure' } = validatedInput

  logOperation('generateStory', {
    childName,
    age,
    interestCount: interests.length,
    theme,
  })

  // Build the system prompt for story generation
  const systemPrompt = `Eres un narrador de cuentos mágico especializado en crear historias personalizadas para niños entre 2 y 10 años.
Tu tarea es generar cuentos cortos, emocionantes e inspiradores donde el niño es el protagonista principal.

REQUISITOS IMPORTANTES:
- El cuento debe ser apropiado para la edad del niño
- Incluye el nombre del niño como protagonista
- Duración: 800-1200 palabras
- Lenguaje simple y accesible
- Mensajes positivos y educativos
- Final feliz y emocionante

ESTRUCTURA DEL CUENTO:
1. Introducción (el niño descubre algo mágico)
2. Desarrollo (aventura y desafíos)
3. Clímax (momento más emocionante)
4. Resolución (final feliz)`

  // Build the user prompt
  const userPrompt = `Genera un cuento personalizado con los siguientes datos:

Nombre del niño: ${childName}
Edad: ${age} años
Intereses: ${interests.join(', ')}
Tema: ${theme}

Por favor, genera:
1. Un título creativo y atractivo para el cuento
2. El cuento completo

Responde en formato JSON con esta estructura:
{
  "title": "Título del cuento",
  "story": "El contenido completo del cuento aquí..."
}`

  try {
    const response = await getOpenAIClient().chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 2000,
    })

    // Parse the response
    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No content received from OpenAI')
    }

    // Extract JSON from the response (handle markdown code blocks)
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Invalid JSON format in response')
    }

    const parsed = JSON.parse(jsonMatch[0])
    const tokenCount = response.usage?.total_tokens || 0

    logOperation('generateStory_success', {
      title: parsed.title,
      storyLength: parsed.story.length,
      tokenCount,
    })

    return {
      title: parsed.title,
      story: parsed.story,
      tokenCount,
    }
  } catch (error) {
    logError('generateStory', error, {
      childName,
      age,
      interestCount: interests.length,
    })
    throw error
  }
}

/**
 * Count tokens for a prompt (rough estimation)
 * Actual token counting uses OpenAI's tokenizer, but we provide a simple estimation here
 */
export function estimateTokens(text: string): number {
  // Rough estimation: 1 token ≈ 4 characters
  return Math.ceil(text.length / 4)
}
