/**
 * Demo mode utilities for Mi Mundo Mágico
 * Allows users to explore the app without a real Supabase account
 */

'use client'

export const DEMO_STORY_ID = 'demo-story-david-spike'

export const DEMO_USER = {
  id: 'demo',
  email: 'demo@mimundomagico.com',
  is_premium: false,
  ai_trial_used: false,
  ai_trial_used_at: null,
  stripe_customer_id: null,
  created_at: new Date().toISOString(),
}

export const DEMO_CHILD_PROFILE = {
  id: 'demo-child-david',
  user_id: 'demo',
  name: 'David',
  age: 1,
  avatar_emoji: '⭐',
  avatar_color: '#7c3aed',
  favorite_themes: ['dinosaurios', 'espacio'],
  favorite_colors: ['morado', 'azul'],
  best_friend_name: null,
  pet_name: null,
  favorite_food: null,
  created_at: new Date().toISOString(),
}

// Pre-written ~400 word demo story: David and Spike in a Starbucks ☕🦕
export const DEMO_PERSONALIZED_STORY_CONTENT = `Era un martes mágico cuando David entró al Starbucks de la calle Mayor con su mochila de dinosaurios y su mejor cara de explorador. ✨

El local olía a canela, a chocolate caliente y a algo más... algo antiguo. Algo grande.

David pidió su batido de fresa favorito y buscó una mesa junto a la ventana. Pero cuando se giró, se quedó sin palabras: en la mesa del rincón, bebiendo tranquilamente un frappuccino de vainilla con dos pajas, estaba **Spike** — un triceratops verde de tres metros con los cuernos decorados con pegatinas de estrellas.

—¿Te importa si me siento aquí? —preguntó David con toda la calma del mundo, como si fuera lo más normal del universo.

Spike agitó su enorme cola de felicidad y señaló el asiento de enfrente con una de sus patas delanteras.

—¡Claro! Llevaba siglos esperando a alguien que no saliera corriendo —dijo Spike con una voz ronca pero amable, como el trueno cuando viene de lejos y sabes que no hay que tener miedo.

Así empezó la amistad más increíble que jamás había visto ningún barista.

Spike llevaba millones de años viajando por el tiempo. Había visto los volcanes nacer, había bailado bajo lluvia de meteoritos, y había dormido bajo el mismo cielo que las primeras estrellas. Pero nunca, jamás, había probado un croissant de mantequilla.

—Tienes que probarlo —insistió David muy serio.

Spike lo intentó. El croissant desapareció en un solo bocado. Sus ojos se pusieron como platos.

—Es... es... ¡mejor que un helecho jurásico! —exclamó, y toda la cafetería se giró a mirarle.

David se rio tanto que casi se le cayó el batido.

Durante aquella tarde mágica, Spike le contó a David cómo era el cielo antes de que existieran los aviones, y David le enseñó a Spike a hacerse un selfie con la cámara del móvil de mamá (tardaron doce intentos porque los brazos de Spike eran demasiado cortos).

Cuando llegó la hora de irse, Spike se agachó hasta el nivel de David y le miró a los ojos.

—Cada vez que veas una estrella —dijo—, soy yo, saludándote desde el pasado. 🌟

David asintió muy serio, con el corazón lleno de aventura.

Y desde ese día, cada vez que David pasa por delante de un Starbucks, siempre, siempre, echa un vistazo al rincón del fondo.

Por si acaso. ☕🦕

*Fin* ✨`

export const DEMO_PERSONALIZED_STORY = {
  id: DEMO_STORY_ID,
  title: 'David y Spike en el Starbucks Mágico',
  coverEmoji: '🦕',
  theme: 'dinosaurios',
  isPremium: false,
  isAiStory: true,
  readingTime: 4,
  content: DEMO_PERSONALIZED_STORY_CONTENT,
}

export const DEMO_CLASSIC_STORIES_PROGRESS = [
  { story_id: 'caperucita-roja', is_favorite: true, progress: 65, audio_url: null },
  { story_id: 'tres-cerditos', is_favorite: false, progress: 100, audio_url: null },
  { story_id: 'patito-feo', is_favorite: false, progress: 0, audio_url: null },
  { story_id: 'blancanieves', is_favorite: false, progress: 0, audio_url: null },
  { story_id: 'tortuga-liebre', is_favorite: false, progress: 0, audio_url: null },
  { story_id: 'cenicienta', is_favorite: false, progress: 0, audio_url: null },
  { story_id: 'hansel-gretel', is_favorite: false, progress: 0, audio_url: null },
]

// ─── Helpers ────────────────────────────────────────────────────────────────

export function isDemoMode(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('demo_mode') === 'true'
}

export function enterDemoMode() {
  localStorage.setItem('demo_mode', 'true')
  localStorage.setItem('demo_user', JSON.stringify(DEMO_USER))
}

export function exitDemoMode() {
  localStorage.removeItem('demo_mode')
  localStorage.removeItem('demo_user')
}

export function getDemoUser() {
  return DEMO_USER
}

export function getDemoStories() {
  return DEMO_CLASSIC_STORIES_PROGRESS
}

export function getDemoChildProfile() {
  return DEMO_CHILD_PROFILE
}

export function getDemoPersonalizedStory() {
  return DEMO_PERSONALIZED_STORY
}
