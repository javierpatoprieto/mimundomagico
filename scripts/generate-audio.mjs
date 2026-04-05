import { readFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CHILD_NAME = 'David'
const USER_ID = '3e19c07e-fade-433e-9ff7-bf982a404492'
const CHILD_ID = '67a0cd36-c0d2-4c60-8ca6-47cc02fb5427'
const SUPABASE_URL = 'https://ptrpvghhvoaudddqgkyx.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0cnB2Z2hodm9hdWRkZHFna3l4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI0Mzc5MCwiZXhwIjoyMDkwODE5NzkwfQ.1hVcZL-gPeHTjFbo6gWbqqySBZXVntrGEwwwdO2nZyM'
const APP_URL = 'https://mimundomagico.es'

const headers = { 'Authorization': `Bearer ${SERVICE_KEY}`, 'apikey': SERVICE_KEY, 'Content-Type': 'application/json' }

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// Get classic stories from Supabase
const storiesRes = await fetch(`${SUPABASE_URL}/rest/v1/stories?is_ai_generated=eq.false&select=id,title,content_template`, { headers })
const stories = await storiesRes.json()
console.log(`Found ${stories.length} classic stories`)

for (const story of stories) {
  if (!story.content_template) {
    console.log(`SKIP (no content): ${story.title}`)
    continue
  }

  // Personalize content
  const text = story.content_template
    .replace(/\{childName\}/g, CHILD_NAME)
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, '') // remove emojis
    .substring(0, 4500)

  // Get or create user_story
  const usRes = await fetch(`${SUPABASE_URL}/rest/v1/user_stories?user_id=eq.${USER_ID}&story_id=eq.${story.id}&child_profile_id=eq.${CHILD_ID}&select=id,audio_url`, { headers })
  const usData = await usRes.json()
  let userStoryId

  if (usData.length > 0) {
    userStoryId = usData[0].id
    if (usData[0].audio_url) {
      console.log(`SKIP (audio exists): ${story.title}`)
      continue
    }
  } else {
    const createRes = await fetch(`${SUPABASE_URL}/rest/v1/user_stories`, {
      method: 'POST',
      headers: { ...headers, 'Prefer': 'return=representation' },
      body: JSON.stringify({ user_id: USER_ID, child_profile_id: CHILD_ID, story_id: story.id, custom_content: text })
    })
    const created = await createRes.json()
    userStoryId = created[0]?.id || created.id
  }

  if (!userStoryId) {
    console.log(`FAIL (no userStoryId): ${story.title}`)
    continue
  }

  // Generate audio
  console.log(`Generating: ${story.title}...`)
  const audioRes = await fetch(`${APP_URL}/api/stories/narrate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userStoryId, text })
  })
  const audioData = await audioRes.json()

  if (audioData.audioUrl) {
    console.log(`OK: ${story.title}`)
  } else {
    console.log(`FAIL: ${story.title} - ${JSON.stringify(audioData)}`)
  }

  await sleep(2000)
}

console.log('Done!')
