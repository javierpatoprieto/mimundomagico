# 🌟 Mi Mundo Mágico

> **"El cuento donde tu hijo/a es el héroe"**
>
> Cuentos infantiles clásicos personalizados con el nombre de tu hijo/a, y cuentos únicos generados por IA para usuarios Premium.

---

## ✨ Features

### Free Tier
- 5 cuentos clásicos en español con el nombre del niño como protagonista
- Perfiles de niños con avatar emoji + color personalizable
- Lector inmersivo con modo noche 🌙, luz cálida 🕯️ y tamaño de fuente ajustable
- Favoritos y seguimiento de progreso de lectura
- Navegación por páginas con atajos de teclado (←/→)

### Premium ($4,99/mes)
- IA genera cuentos únicos con GPT-4o (12 temas: dinosaurios, espacio, sirenas...)
- Personajes extra: amigos, mascotas, familia
- 20+ cuentos clásicos (biblioteca completa)
- Cuento nuevo semanal automático
- Descarga como PDF
- Sin publicidad

### 🔊 Fase 2 — Narración de audio (incluido en Premium)
La arquitectura ya está lista. Ver sección debajo.

---

---

## 🔐 Habilitar Login Social (Google + Apple OAuth)

Para activar el login con Google y Apple en producción, sigue estos pasos en el **dashboard de Supabase**:

### Google OAuth
1. Ve a **Authentication → Providers → Google** en tu proyecto Supabase
2. Activa el proveedor y anota la **Redirect URL** (ej: `https://<tu-proyecto>.supabase.co/auth/v1/callback`)
3. En [Google Cloud Console](https://console.cloud.google.com/):
   - Crea un proyecto OAuth 2.0 en **APIs & Services → Credentials**
   - Tipo: _Web application_
   - Añade la Redirect URL de Supabase como **Authorized redirect URI**
4. Copia el **Client ID** y **Client Secret** en el dashboard de Supabase
5. Asegúrate de configurar `redirectTo: window.location.origin + '/auth/callback'` (ya está en el código)

### Apple OAuth
1. Ve a **Authentication → Providers → Apple** en tu proyecto Supabase
2. Anota la **Redirect URL** de Supabase
3. En [Apple Developer Portal](https://developer.apple.com/):
   - Crea un **App ID** con la capability _Sign In with Apple_
   - Crea un **Service ID** con la Redirect URL de Supabase
   - Genera una **Private Key** (.p8) con _Sign in with Apple_
4. Rellena en Supabase: Team ID, Bundle ID (Service ID), Key ID y Private Key
5. El callback `/auth/callback` ya está configurado en el código (`app/auth/callback/route.ts`)

### Callback URL
El callback route ya está creado en `app/auth/callback/route.ts` y redirige a `/library` tras el login exitoso.

---

## 🚀 Setup

### 1. Clonar e instalar

```bash
git clone <repo-url>
cd mimundomagico
npm install
```

### 2. Variables de entorno

Copia `.env.local` y rellena los valores:

```bash
cp .env.local .env.local
```

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# OpenAI (GPT-4o para generación + TTS para audio en Fase 2)
OPENAI_API_KEY=sk-...

# Stripe
STRIPE_SECRET_KEY=sk_live_...  (o sk_test_... para desarrollo)
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_PREMIUM_PRICE_ID=price_...

# App
NEXT_PUBLIC_APP_URL=https://tudominio.com  (o http://localhost:3000)

# ── Fase 2: Audio (añadir cuando implementes narración) ──────────────────
# ELEVENLABS_API_KEY=...
# ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM   # Rachel — cálida, perfecta para niños
# AUDIO_STORAGE_BUCKET=story-audio            # Bucket en Supabase Storage
```

### 3. Base de datos (Supabase)

Abre tu proyecto Supabase → **SQL Editor** y ejecuta:

```
supabase/migrations/001_initial_schema.sql
```

Esto crea las tablas, RLS policies, índices y el trigger de auto-profile.

### 4. Stripe

1. Crea un producto en Stripe: **Mi Mundo Mágico Premium**
2. Precio: $4,99 / mes (recurrente)
3. Copia el `price_ID` → `STRIPE_PREMIUM_PRICE_ID`
4. Configura el webhook en Stripe Dashboard:
   - URL: `https://tudominio.com/api/stripe/webhook`
   - Eventos: `checkout.session.completed`, `customer.subscription.deleted`, `customer.subscription.paused`, `customer.subscription.resumed`, `invoice.payment_succeeded`
5. Copia el webhook secret → `STRIPE_WEBHOOK_SECRET`

Para desarrollo local con webhooks:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### 5. Ejecutar

```bash
npm run dev
```

---

## 🔊 Fase 2 — Audio Narration

La arquitectura está **completamente lista** en el código. Solo hay que conectar el proveedor.

### Cómo funciona

1. El campo `audio_url` ya existe en `user_stories` (DB schema)
2. El `StoryReader` ya tiene el reproductor completo con play/pause, barra de progreso y control de volumen
3. La API route `/api/stories/narrate` está scaffolded y documentada

### Wiring en Fase 2 — 3 pasos

**Paso 1:** Elige el proveedor TTS en `/app/api/stories/narrate/route.ts`

El archivo tiene ambas opciones comentadas:

#### Opción A: OpenAI TTS (más fácil, ya tienes la clave)
```typescript
// Ya tienes OPENAI_API_KEY configurado
// Voz recomendada: 'nova' (cálida, suave)
// Velocidad: 0.85 (más lenta = mejor para niños)
// Calidad: tts-1-hd para mayor calidad
```

#### Opción B: ElevenLabs (más expresiva, mejor para español)
```env
ELEVENLABS_API_KEY=tu_clave
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM   # Rachel
# Modelo: eleven_multilingual_v2 (soporte nativo español)
```

**Paso 2:** Crea el bucket en Supabase Storage
```sql
-- En Supabase Dashboard → Storage → New Bucket
-- Nombre: story-audio
-- Público: true (para URLs directas)
```

**Paso 3:** Triggerear la generación

En `/app/story/[id]/page.tsx`, donde dice `// Phase 2: trigger narration generation here`:

```typescript
// Después de crear el user_story, llamar:
await fetch('/api/stories/narrate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userStoryId: created.id,
    text: personalizedContent,
    provider: 'openai',  // o 'elevenlabs'
  }),
})
```

Y para IA stories, en `/app/api/stories/generate/route.ts`, donde dice `// Phase 2: trigger narration`:

```typescript
// Tras crear el user_story, disparar narración en background:
fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stories/narrate`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userStoryId: userStory.id, text: content }),
})
// No await — background generation
```

### Costes estimados de audio (Fase 2)

| Proveedor | Modelo | Coste por 1000 chars | Cuento completo (~2000 chars) |
|-----------|--------|---------------------|-------------------------------|
| OpenAI TTS | tts-1 | $0.015 | ~$0.03 |
| OpenAI TTS | tts-1-hd | $0.030 | ~$0.06 |
| ElevenLabs | eleven_multilingual_v2 | ~$0.024 | ~$0.05 |

Recomendación: cachear el audio por `user_story_id` (ya lo hace el campo `audio_url`).

---

## 📁 Estructura del proyecto

```
mimundomagico/
├── app/
│   ├── page.tsx                    # Landing page con nombre dinámico animado
│   ├── layout.tsx
│   ├── globals.css                 # Animaciones mágicas, glass morphism, etc.
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── dashboard/page.tsx          # Biblioteca + selector de niños
│   ├── story/[id]/page.tsx         # Lector con audio scaffold
│   ├── create/page.tsx             # Generador IA (Premium)
│   ├── premium/page.tsx            # Página de venta Premium
│   └── api/
│       ├── stories/generate/       # OpenAI GPT-4o story generation
│       ├── stories/narrate/        # 🔊 TTS scaffold (Fase 2 ready)
│       └── stripe/
│           ├── checkout/           # Crear sesión de pago
│           └── webhook/            # Gestionar eventos de suscripción
├── components/
│   ├── StoryCard.tsx               # Card con gradientes por tema
│   ├── StoryReader.tsx             # Lector paginado + audio player
│   ├── ChildProfile.tsx            # Formulario + avatar picker
│   ├── Navbar.tsx
│   └── ui/
│       ├── Button.tsx              # Variants: magic, premium, secondary...
│       └── Stars.tsx               # Estrellas flotantes animadas
├── lib/
│   ├── supabase.ts                 # Cliente browser + tipos
│   ├── supabase-server.ts          # Service role para server-side
│   ├── openai.ts                   # GPT-4o + TTS helper
│   ├── stripe.ts                   # Checkout + portal sessions
│   ├── utils.ts
│   ├── hooks/useAuth.ts            # useAuth, useProfile, useChildProfiles
│   └── stories/                   # Plantillas completas en español
│       ├── caperucita-roja.ts      # ~350 palabras
│       ├── tres-cerditos.ts        # ~350 palabras
│       ├── patito-feo.ts           # ~400 palabras
│       ├── blancanieves.ts         # ~400 palabras
│       ├── tortuga-liebre.ts       # ~380 palabras
│       └── index.ts                # personalizeStory(), getStoryBySlug()
├── supabase/
│   └── migrations/001_initial_schema.sql
└── README.md
```

---

## 🌍 Despliegue (Vercel)

```bash
# 1. Push a GitHub
git add .
git commit -m "🌟 Initial Mi Mundo Mágico"
git push

# 2. Conectar en vercel.com → New Project → Import from GitHub

# 3. Añadir variables de entorno en Vercel Dashboard

# 4. Actualizar NEXT_PUBLIC_APP_URL al dominio de Vercel

# 5. Actualizar webhook URL en Stripe al dominio de Vercel
```

### Variables de entorno en Vercel

Añade todas las del `.env.local` en **Settings → Environment Variables**.

---

## 🎨 Design System

| Token | Valor | Uso |
|-------|-------|-----|
| `gradient-text` | purple → pink → gold | Títulos principales |
| `glass` | white/15 + blur | Cards en fondo oscuro |
| `glass-dark` | black/30 + blur | UI sobre imágenes |
| `float` | translateY oscillation | Emojis decorativos |
| `twinkle` | opacity + scale | Estrellas |
| Night mode `dark` | indigo-950 bg | Lectura nocturna |
| Night mode `warm` | amber-950 bg | Hora de dormir |

---

## 🛡️ Seguridad

- RLS habilitado en todas las tablas
- Los usuarios solo acceden a sus propios datos
- Webhook de Stripe verificado con firma HMAC
- Service role solo en rutas server-side
- OpenAI y Stripe keys solo en server (no `NEXT_PUBLIC_`)

---

## 📝 Notas de desarrollo

### Añadir más cuentos
1. Crea `/lib/stories/nuevo-cuento.ts` siguiendo la estructura existente
2. Exporta desde `/lib/stories/index.ts`
3. La DB ya tiene el story_id semilla; añade la row al SQL de migración

### Personalización avanzada
El sistema de plantillas usa `{childName}` como placeholder. En Fase 3 se puede extender con:
- `{childGender}` — para acuerdo gramatical (valiente/a)
- `{petName}` — mascota como personaje
- `{friendName}` — mejor amigo/a

---

Hecho con ❤️ para todas las noches de "un cuento más, papi". 🌙
