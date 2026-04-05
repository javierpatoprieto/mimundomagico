import { readFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const STORIES_DIR = join(__dirname, '..', 'lib', 'stories')
const CHILD_NAME = 'David'
const USER_ID = '3e19c07e-fade-433e-9ff7-bf982a404492'
const CHILD_ID = '67a0cd36-c0d2-4c60-8ca6-47cc02fb5427'
const SUPABASE_URL = 'https://ptrpvghhvoaudddqgkyx.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0cnB2Z2hodm9hdWRkZHFna3l4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI0Mzc5MCwiZXhwIjoyMDkwODE5NzkwfQ.1hVcZL-gPeHTjFbo6gWbqqySBZXVntrGEwwwdO2nZyM'
const APP_URL = 'https://mimundomagico.es'

const headers = { 'Authorization': `Bearer ${SERVICE_KEY}`, 'apikey': SERVICE_KEY, 'Content-Type': 'application/json' }

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// Slug -> Supabase UUID mapping
const SLUG_TO_ID = {
  'caperucita-roja': '00000000-0000-0000-0000-000000000001',
  'tres-cerditos':   '00000000-0000-0000-0000-000000000002',
  'patito-feo':      '00000000-0000-0000-0000-000000000003',
  'blancanieves':    '00000000-0000-0000-0000-000000000004',
  'tortuga-liebre':  '00000000-0000-0000-0000-000000000005',
  'cenicienta':      '00000000-0000-0000-0000-000000000006',
  'hansel-gretel':   '00000000-0000-0000-0000-000000000007',
}

// Parse story files
const storyFiles = readdirSync(STORIES_DIR).filter(f =>
  f.endsWith('.ts') && f !== 'index.ts' && f !== 'free-stories.ts'
)

const stories = []
for (const file of storyFiles) {
  const content = readFileSync(join(STORIES_DIR, file), 'utf8')
  const slugMatch = content.match(/slug:\s*['"]([^'"]+)['"]/)
  const templateMatch = content.match(/template:\s*`([\s\S]+?)`/)
  if (slugMatch && templateMatch && SLUG_TO_ID[slugMatch[1]]) {
    stories.push({
      id: SLUG_TO_ID[slugMatch[1]],
      slug: slugMatch[1],
      template: templateMatch[1]
    })
  }
}

console.log(`Found ${stories.length} stories to process`)

for (const story of stories) {
  // Check existing user_story
  const usRes = await fetch(
    `${SUPABASE_URL}/rest/v1/user_stories?user_id=eq.${USER_ID}&story_id=eq.${story.id}&child_profile_id=eq.${CHILD_ID}&select=id,audio_url`,
    { headers }
  )
  const usData = await usRes.json()
  let userStoryId

  if (usData.length > 0) {
    userStoryId = usData[0].id
    if (usData[0].audio_url) {
      console.log(`SKIP (audio exists): ${story.slug}`)
      continue
    }
  } else {
    const personalizedText = story.template.replace(/\{childName\}/g, CHILD_NAME)
    const createRes = await fetch(`${SUPABASE_URL}/rest/v1/user_stories`, {
      method: 'POST',
      headers: { ...headers, 'Prefer': 'return=representation' },
      body: JSON.stringify({
        user_id: USER_ID,
        child_profile_id: CHILD_ID,
        story_id: story.id,
        custom_content: personalizedText
      })
    })
    const created = await createRes.json()
    userStoryId = Array.isArray(created) ? created[0]?.id : created?.id
    if (!userStoryId) {
      console.log(`FAIL create: ${story.slug} - ${JSON.stringify(created)}`)
      continue
    }
    console.log(`Created: ${userStoryId}`)
  }

  // Clean text for TTS
  const text = story.template
    .replace(/\{childName\}/g, CHILD_NAME)
    .replace(/[\u{1F000}-\u{1FFFF}]/gu, '')
    .trim()
    .substring(0, 4500)

  console.log(`Generating: ${story.slug} (${text.length} chars)...`)

  const audioRes = await fetch(`${APP_URL}/api/stories/narrate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userStoryId, text })
  })

  const audioData = await audioRes.json()
  if (audioData.audioUrl) {
    console.log(`✅ ${story.slug}`)
  } else {
    console.log(`❌ ${story.slug} - ${JSON.stringify(audioData)}`)
  }

  await sleep(3000)
}

console.log('Done!')
