# ARQUITECTURA TÉCNICA COMPLETA — Mimundomagico.es
**Versión 1.0 | Abril 2026**

---

## ÍNDICE

1. [Tech Stack Recomendado](#1-tech-stack-recomendado)
2. [Arquitectura del Sitio](#2-arquitectura-del-sitio)
3. [Esquema de Base de Datos](#3-esquema-de-base-de-datos)
4. [Integraciones de Terceros](#4-integraciones-de-terceros)
5. [Requisitos SEO Técnicos](#5-requisitos-seo-técnicos)
6. [Seguridad y Rendimiento](#6-seguridad-y-rendimiento)
7. [Configuración de Analytics](#7-configuración-de-analytics)
8. [Timeline de Implementación](#8-timeline-de-implementación)

---

## 1. TECH STACK RECOMENDADO

### 1.1 Opción Primaria: Headless CMS + Framework Moderno (RECOMENDADA)

#### **Frontend: Next.js 14 (React)**
**Por qué:**
- ✅ Rendimiento excepcional (App Router, Server Components)
- ✅ SEO nativo (meta tags dinámicos, sitemap automático)
- ✅ Incremental Static Generation (ISG) para blog escalable
- ✅ Image optimization built-in (WebP, AVIF)
- ✅ Vercel hosting integrado (despliegue con Git)
- ✅ API Routes para webhooks y automatizaciones

**Alternativa válida:** Nuxt 3 si prefieres Vue

---

#### **Backend/CMS: Sanity.io**
**Por qué:**
- ✅ Headless CMS ideal para contenido de blog
- ✅ Interfaz visual intuitiva (no necesitas desarrollador para editar)
- ✅ GROQ query language (queries más simples que GraphQL)
- ✅ Flexible schema (puedes evolucionarlo)
- ✅ Plan gratuito: 3 datasets, 500k API calls/mes (suficiente para MVP)
- ✅ Webhooks nativos para integración con Brevo
- ✅ Versionado y draft/publish workflow
- ✅ Assets hosting incluido (fotos blog)

**Costo:** Gratuito (hasta escalamiento importante)

**Alternativa válida:** Strapi (self-hosted) si necesitas máximo control, pero requiere servidor

---

#### **Base de Datos: PostgreSQL (Supabase o Railway)**
**Por qué:**
- ✅ Estructura relacional para newsletter, suscriptores, productos digitales
- ✅ Supabase: PostgreSQL + Auth + Real-time (gratuito hasta 500MB)
- ✅ Railway: PostgreSQL managed, interfaz simple ($5-10/mes)
- ✅ Mejor que SQLite en producción (concurrencia)

**Recomendación:** **Supabase** para inicio (gratuito, integraciones con Auth)

---

#### **Hosting Frontend: Vercel**
**Por qué:**
- ✅ Optimizado nativamente para Next.js
- ✅ Deployment automático desde GitHub
- ✅ CDN global incluido
- ✅ Serverless Functions (API Routes)
- ✅ Plan Hobby: gratuito para prototipos
- ✅ Plan Pro: $20/mes (más que suficiente para tu escala)

---

### 1.2 Opción Alternativa: All-in-One (Más Simple)

Si prefieres algo **todo incluido** sin configurar múltiples servicios:

#### **WordPress con Tema Premium + Plugins**
**Stack:**
- WordPress.com Business ($25/mes) O Kinsta/Cloudways ($15/mes self-hosted)
- Tema: Neve / Divi / GeneratePress
- Plugins: Rank Math (SEO), WP Forms, MC4WP (Mailchimp)

**Ventajas:**
- ✅ Curva aprendizaje muy baja
- ✅ Miles de plugins prehechos
- ✅ No necesitas programador para mantenimiento

**Desventajas:**
- ❌ Menos optimizado SEO que Next.js
- ❌ Más lento (sin optimizaciones agresivas)
- ❌ Plugin hell (conflictos frecuentes)

**Recomendación:** No. Para tu case use, Next.js + Sanity es superior.

---

### 1.3 Comparativa Resumen

| Aspecto | Next.js + Sanity | WordPress | Wix/Squarespace |
|--------|------------------|-----------|-----------------|
| **Costo inicial** | $0 (gratuito) | $15-25/mes | $20-50/mes |
| **SEO** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Escalabilidad** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Flexibilidad** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| **Curva aprendizaje** | Media | Baja | Muy baja |
| **Para e-commerce futuro** | Excelente | Bueno | Limitado |
| **Automatización marketing** | Excelente | Bueno | Medio |

---

## 2. ARQUITECTURA DEL SITIO

### 2.1 Estructura de Carpetas Next.js

```
mimundomagico/
├── app/                              # App Router (Next.js 14)
│   ├── layout.tsx                    # Layout principal
│   ├── page.tsx                      # Homepage
│   │
│   ├── blog/
│   │   ├── page.tsx                  # Listado blog (con paginación)
│   │   ├── [slug]/
│   │   │   └── page.tsx              # Artículo individual (ISG)
│   │   └── rss.xml/route.ts          # Feed RSS para SEO
│   │
│   ├── descargas/
│   │   ├── page.tsx                  # Landing lead magnet (PDF)
│   │   └── layout.tsx                # Diferente header/footer
│   │
│   ├── sobre-nosotros/
│   │   └── page.tsx
│   │
│   ├── contacto/
│   │   └── page.tsx
│   │
│   ├── api/
│   │   ├── newsletter/
│   │   │   ├── subscribe.ts          # Endpoint POST para suscripción
│   │   │   └── confirm.ts            # Confirmación double-opt-in
│   │   ├── contact/
│   │   │   └── route.ts              # Formulario contacto
│   │   ├── webhooks/
│   │   │   └── sanity.ts             # Webhook desde Sanity (invalidar cache)
│   │   └── og-image/
│   │       └── [slug].ts             # OG images dinámicas
│   │
│   └── sitemap.xml/route.ts          # Sitemap dinámico
│
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── NavigationMenu.tsx
│   ├── BlogCard.tsx
│   ├── NewsletterForm.tsx
│   ├── CTASection.tsx
│   └── ...
│
├── lib/
│   ├── sanity.ts                     # Cliente Sanity GROQ
│   ├── supabase.ts                   # Cliente Supabase
│   ├── analytics.ts                  # GA4, Meta Pixel utils
│   └── constants.ts                  # URLs, slugs, etc
│
├── public/
│   ├── sitemap.xml
│   ├── robots.txt
│   └── images/
│
├── styles/
│   └── globals.css                   # Tailwind
│
└── package.json
```

---

### 2.2 Mapa de Navegación del Sitio

```
mimundomagico.es/
│
├── / (Homepage)
│   ├── Hero + CTA "Descargar PDF Gratis"
│   ├── 3 artículos destacados del blog
│   ├── Sección "Sobre Nosotros" breve
│   ├── Newsletter signup
│   └── Links redes sociales
│
├── /blog
│   ├── Listado posts (12 por página)
│   ├── Filtros: por categoría (Magia Cotidiana, Cuentos, etc)
│   ├── Buscador
│   └── Paginación
│
├── /blog/[slug]
│   ├── Artículo completo
│   ├── Meta tags dinámicos (SEO)
│   ├── Imagen destacada
│   ├── Autor + fecha
│   ├── Newsletter CTA inline
│   ├── Artículos relacionados (links internos)
│   ├── Comentarios (Disqus o comentarios nativos)
│   └── Breadcrumb: Home > Blog > Título
│
├── /descargas (Landing optimizada para conversión)
│   ├── Hero: "El Gran Libro de Magia Cotidiana"
│   ├── Descripción de valor + beneficios
│   ├── Formulario email (nombre + email)
│   ├── Guarantee: "Sin spam"
│   ├── Testimonios (si tienes)
│   └── Footer minimalista (menos distracciones)
│
├── /sobre-nosotros
│   ├── Story de marca
│   ├── Foto/avatar creador
│   ├── Valores y misión
│   ├── Redes sociales links
│   └── Email contacto
│
├── /contacto
│   ├── Formulario: nombre + email + mensaje
│   ├── Datos contacto (email principal)
│   ├── Links redes
│   └── Mapa integrado (Google Maps)
│
└── /[páginas dinámicas]
    ├── /politica-privacidad
    ├── /terminos-servicio
    ├── /politica-cookies
    └── /desuscribirse
```

---

### 2.3 Estructura de URLs (Slugs)

| Página | URL | Objetivo |
|--------|-----|----------|
| Homepage | `/` | Conversión general |
| Artículo 1 | `/rituales-familiares-ninos-magia-cotidiana` | SEO orgánico |
| Artículo 2 | `/mama-perfecta-mama-magica-maternidad-real` | Resonancia emocional |
| Blog listado | `/blog` | Hub SEO |
| Descargas | `/descargas` | Lead magnet |
| Sobre nosotros | `/sobre-nosotros` | Trust building |
| Contacto | `/contacto` | Feedback |

**Regla:** slugs siempre **lowercase**, con guiones, descriptivos para SEO.

---

## 3. ESQUEMA DE BASE DE DATOS

### 3.1 Sanity.io Schema (Contenido)

```typescript
// Tipo: blog (posts)
{
  _type: "post",
  title: string,
  slug: string,              // único
  content: array[blocks],    // Portable Text (rich text)
  excerpt: string,           // Meta description
  mainImage: image,
  author: string,
  publishedAt: date,
  category: string,          // "Magia Cotidiana", "Cuentos", etc
  tags: array[string],       // ["rituales", "familia", ...]
  seo: {
    metaTitle: string,
    metaDescription: string,
    keywords: array[string]
  },
  relatedPosts: array[reference], // links a otros posts
  _createdAt: datetime,
  _updatedAt: datetime
}

// Tipo: page (estáticas)
{
  _type: "page",
  title: string,
  slug: string,              // "sobre-nosotros", "contacto"
  content: array[blocks],
  seo: { ... }
}

// Tipo: lead-magnet
{
  _type: "leadMagnet",
  title: string,             // "El Gran Libro de Magia Cotidiana"
  description: string,
  pdfFile: file,
  image: image,
  downloadCount: number      // contador
}
```

---

### 3.2 Supabase/PostgreSQL Schema (Aplicación)

```sql
-- Tabla: newsletter_subscribers
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  status ENUM('subscribed', 'unsubscribed', 'bounced') DEFAULT 'subscribed',
  source VARCHAR(100),      -- 'homepage', 'blog-post', 'landing-page'
  subscribed_at TIMESTAMP DEFAULT NOW(),
  unsubscribed_at TIMESTAMP,
  confirmation_token VARCHAR(255),
  confirmed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: lead_magnet_downloads
CREATE TABLE lead_magnet_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  magnet_slug VARCHAR(100),     -- 'el-gran-libro'
  downloaded_at TIMESTAMP DEFAULT NOW(),
  ip_address VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla: contact_messages
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('new', 'read', 'replied') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW(),
  replied_at TIMESTAMP
);

-- Tabla: products (para e-commerce futuro)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  description TEXT,
  price DECIMAL(10, 2),
  type ENUM('digital', 'physical', 'workshop'),
  image_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: analytics_events (eventos custom)
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name VARCHAR(100),  -- 'newsletter_signup', 'pdf_download'
  event_value DECIMAL(10, 2),
  user_id VARCHAR(100),     -- GA4 Client ID
  page_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### 3.3 Relaciones y Flujos

```
Sanity (Contenido)
  ├─ Posts de blog
  ├─ Páginas estáticas
  └─ Lead magnet metadata

       ↓ (API queries)

Next.js App
  ├─ Renderiza contenido
  ├─ Envía eventos a GA4 / Meta Pixel
  └─ Guarda conversiones en Supabase

       ↓ (formularios)

Supabase (Datos operacionales)
  ├─ Suscriptores newsletter
  ├─ Descargas PDFs
  ├─ Mensajes contacto
  └─ Productos digitales

       ↓ (webhooks/API)

Brevo (Email automation)
  ├─ Recibe suscriptores desde Supabase
  ├─ Envía secuencia bienvenida
  └─ Newsletter semanal
```

---

## 4. INTEGRACIONES DE TERCEROS

### 4.1 Newsletter: Brevo (Mailchimp alternativa)

**Recomendación:** **Brevo** (ex-Sendinblue) sobre Mailchimp

**Por qué Brevo:**
- ✅ Plan gratuito: 300 emails/día ilimitados
- ✅ Automation workflows: 1 flujo automático gratuito
- ✅ SMTP integrado (envío transaccional)
- ✅ API REST clara
- ✅ Double opt-in nativo
- ✅ Mejor en España (soporte ES)
- ✅ Template builder visual

**Alternativa:** Mailchimp (plan gratuito: 500 contactos, 1000 emails/mes)

---

### 4.2 Implementación Brevo en Next.js

```typescript
// lib/brevo.ts
import SibApiV3Sdk from 'sib-api-v3-sdk';

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const contactsApi = new SibApiV3Sdk.ContactsApi();

export async function subscribeNewsletter(email: string, name: string) {
  try {
    const contact = new SibApiV3Sdk.CreateContact();
    contact.email = email;
    contact.attributes = { FNAME: name };
    contact.listIds = [parseInt(process.env.BREVO_LIST_ID!)];
    
    // Double opt-in: envía email de confirmación
    contact.emailBlacklisted = false;
    
    await contactsApi.createContact(contact);
    
    // Inicia workflow de bienvenida
    const automationApi = new SibApiV3Sdk.ContactsApi();
    // ...workflow logic
    
    return { success: true };
  } catch (error) {
    console.error('Brevo error:', error);
    return { success: false, error };
  }
}
```

---

### 4.3 Google Analytics 4 (GA4)

**Implementación:**

```typescript
// lib/analytics.ts
import { GoogleAnalytics } from '@next/third-parties/google';

export default function GA({ children }) {
  return (
    <>
      {children}
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
    </>
  );
}
```

**Eventos a trackear:**

| Evento | Dispara cuando | Valor |
|--------|----------------|-------|
| `newsletter_signup` | Envía formulario newsletter | email |
| `pdf_download` | Descarga lead magnet | magnet_name |
| `blog_post_view` | Lee artículo > 30s | post_slug |
| `blog_scroll_depth` | Scroll 50%, 75%, 100% | post_slug |
| `cta_click` | Click en botones primarios | button_label |
| `contact_form_submit` | Envía contacto | form_name |

**Implementación evento custom:**

```typescript
// components/NewsletterForm.tsx
import { event } from 'nextjs-google-analytics';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Track event
  event('newsletter_signup', {
    'email': email,
    'source': 'homepage'
  });
  
  // Submit to API
  const res = await fetch('/api/newsletter/subscribe', { ... });
};
```

---

### 4.4 Meta Pixel (Facebook Conversiones)

**Implementación:**

```typescript
// lib/pixel.ts
export function initPixel() {
  (window as any).fbq('init', process.env.NEXT_PUBLIC_PIXEL_ID);
}

export function trackEvent(eventName: string, data?: object) {
  (window as any).fbq('track', eventName, data);
}

// Eventos recomendados:
// - PageView (automático)
// - Lead (newsletter signup)
// - ViewContent (blog post)
// - CustomEvent (pdf download)
```

---

### 4.5 Integración Sanity + Brevo

**Flujo automático:**

1. Artículo nuevo publicado en Sanity
2. Webhook dispara → `/api/webhooks/sanity`
3. Crea post de blog post + notifica newsletter
4. Brevo envía email: "Nuevo artículo: [Título]"
5. Revalidate cache en Vercel

```typescript
// app/api/webhooks/sanity.ts
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  const secret = req.headers.get('x-webhook-secret');
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await req.json();
  
  if (data._type === 'post') {
    // Revalidate blog pages
    revalidatePath('/blog');
    revalidatePath(`/blog/${data.slug}`);
    
    // Optional: Send announcement email via Brevo
    if (data.publishedAt) {
      await fetch(process.env.BREVO_API_URL + '/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: [{ email: process.env.ADMIN_EMAIL }],
          subject: `Nuevo post: ${data.title}`,
          htmlContent: `<p>Se publicó: ${data.title}</p>`
        })
      });
    }
  }

  return Response.json({ success: true });
}
```

---

### 4.6 Integración con Redes Sociales

**Instagram/TikTok/Pinterest:**
No requieren integración backend. Usa **botones simples a URLs:**

```tsx
// components/SocialLinks.tsx
<a href="https://instagram.com/mimundomagico" target="_blank" rel="noopener">
  <Instagram size={24} />
</a>
```

**Meta Business Suite:** Conecta tu cuenta Instagram → permite compartir links con preview automático

**Pinterest:** Instala el Pin/Save button en artículos blog

```html
<!-- En artículos blog -->
<a data-pin-do="buttonPin" 
   href="https://www.pinterest.com/pin/create/button/?url=https://mimundomagico.es/blog/...&media=...&description=...">
  Save
</a>
```

---

## 5. REQUISITOS SEO TÉCNICOS

### 5.1 Meta Tags Dinámicos

```typescript
// app/blog/[slug]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  return {
    title: post.seo.metaTitle || post.title,
    description: post.seo.metaDescription || post.excerpt,
    keywords: post.seo.keywords?.join(', '),
    
    // Open Graph para redes sociales
    openGraph: {
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      url: `https://mimundomagico.es/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: post.mainImage.url,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      images: [post.mainImage.url]
    },
    
    // Canonical (important para evitar duplicados)
    canonical: `https://mimundomagico.es/blog/${post.slug}`
  };
}
```

---

### 5.2 Structured Data (JSON-LD)

```typescript
// lib/schema.ts
export function generateBlogSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.mainImage.url,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author
    },
    articleBody: post.content, // texto sin HTML
    url: `https://mimundomagico.es/blog/${post.slug}`
  };
}

// En componente:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(generateBlogSchema(post))
  }}
/>
```

---

### 5.3 Sitemap Dinámico

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mimundomagico.es';
  
  // Páginas estáticas
  const staticPages = [
    { url: baseUrl, changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/blog`, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/descargas`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/sobre-nosotros`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/contacto`, changeFrequency: 'monthly' as const, priority: 0.7 },
  ];
  
  // Artículos dinámicos desde Sanity
  const posts = await getAllPosts();
  const postPages = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post._updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));
  
  return [...staticPages, ...postPages];
}
```

---

### 5.4 Robots.txt

```txt
# /public/robots.txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: https://mimundomagico.es/sitemap.xml
```

---

### 5.5 Estrategia de Links Internos

**Regla:** Cada artículo debe linkear a 2-3 artículos relacionados

```typescript
// En artículos blog
<section className="related-posts">
  {relatedPosts.map(post => (
    <Link href={`/blog/${post.slug}`} key={post._id}>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
    </Link>
  ))}
</section>
```

**Links internos estratégicos:**
- Homepage → Blog (descubrimiento)
- Blog → Homepage (conversión)
- Artículos → Lead magnet (conversión)
- Descargas → Blog (engagement)

---

## 6. SEGURIDAD Y RENDIMIENTO

### 6.1 SSL/HTTPS

**Vercel:** Automático con certificado Let's Encrypt

**Configuración recomendada:**
```
- HSTS header: max-age=31536000
- Content-Security-Policy headers
- X-Frame-Options: DENY (evita clickjacking)
```

**En next.config.js:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
```

---

### 6.2 Optimización de Imágenes

**Next.js Image Component:**

```typescript
import Image from 'next/image';

export default function BlogImage({ src, alt, title }) {
  return (
    <Image
      src={src}
      alt={alt}
      title={title}
      width={800}
      height={450}
      priority={false}         // lazy loading
      quality={85}             // JPEG 85% (balance size/quality)
      placeholder="blur"       // blur-up effect
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
      style={{ objectFit: 'cover' }}
    />
  );
}
```

**Beneficios:**
- ✅ Conversión automática WebP/AVIF
- ✅ Responsive images (srcset)
- ✅ Lazy loading
- ✅ Compresión automática

---

### 6.3 Caching Estrategia

**Next.js 14 caching:**

```typescript
// Artículos blog: caché 24 horas (ISG)
export const revalidate = 86400; // segundos

// Homepage: revalidar cada 1 hora
export const revalidate = 3600;

// Pages estáticas: caché indefinido
export const revalidate = false;
```

**Vercel Edge Cache:**
- Imágenes: 365 días
- Assets estáticos: 365 días
- HTML dinámico: 60 segundos

---

### 6.4 CDN y Compresión

**Vercel + Cloudflare (gratuito):**

Configuración Cloudflare:
- Auto Minify: ON (HTML, CSS, JS)
- Brotli compression: ON
- Cache Level: Standard

---

### 6.5 Core Web Vitals Target

| Métrica | Objetivo | Cómo lograr |
|---------|----------|-----------|
| LCP (2.5s) | < 2.5s | Image optimization, lazy loading |
| FID (100ms) | < 100ms | Minimizar JS, server components |
| CLS (0.1) | < 0.1 | Fijar dimensiones imágenes, fonts |

**Monitoreo:**
- Vercel Analytics (gratuito)
- Google PageSpeed Insights

---

## 7. CONFIGURACIÓN DE ANALYTICS

### 7.1 Métricas Clave a Trackear

#### KPIs de Negocio
```
1. Newsletter Subscribers
   - Signup rate (%)
   - Fuente de conversión (homepage, blog, landing)
   - Open rate (desde Brevo)
   - Click rate (desde Brevo)

2. Blog Traffic
   - Sesiones mensuales (GA4)
   - Usuarios nuevos
   - Bounce rate por artículo
   - Tiempo en página (engagement)
   - Scroll depth (% completo)

3. Lead Magnet
   - Downloads por mes
   - Conversion rate (visitors → downloads)
   - Fuente de tráfico que convierte

4. Social Referrals
   - Tráfico desde Instagram, TikTok, Pinterest
   - Engagement (clics a blog, descargas)
```

---

### 7.2 Plan de Eventos GA4

```typescript
// events.ts — Catalogo de eventos
export const GA_EVENTS = {
  // Conversiones principales
  NEWSLETTER_SIGNUP: 'newsletter_signup',
  PDF_DOWNLOAD: 'pdf_download',
  CONTACT_SUBMIT: 'contact_submit',
  
  // Engagement blog
  BLOG_POST_VIEW: 'blog_post_view',
  BLOG_SCROLL_DEPTH: 'blog_scroll_depth',
  BLOG_TIME_ON_PAGE: 'blog_time_on_page',
  
  // Navigation
  MENU_CLICK: 'menu_click',
  SOCIAL_CLICK: 'social_click',
  
  // E-commerce futuro
  PRODUCT_VIEW: 'product_view',
  ADD_TO_CART: 'add_to_cart',
  PURCHASE: 'purchase'
};

// Implementación
export function trackNewsletter(email: string, source: string) {
  event(GA_EVENTS.NEWSLETTER_SIGNUP, {
    email_domain: email.split('@')[1],
    source: source,
    campaign: 'may-2026'
  });
}
```

---

### 7.3 UTM Strategy para Redes Sociales

**Formato:** `https://mimundomagico.es/blog/[article]?utm_source=instagram&utm_medium=story&utm_campaign=mayo-2026`

**Tabla de UTMs:**

| Canal | Source | Medium | Campaign |
|-------|--------|--------|----------|
| Instagram Feed | instagram | social | post-magia-cotidiana |
| Instagram Reels | instagram | video | reel-rituales |
| TikTok | tiktok | video | viral-maternidad |
| Pinterest | pinterest | social | pin-rituales |
| Newsletter | brevo | email | boletin-mayo-2026 |
| Email de bienvenida | brevo | email | welcome-sequence |

**En componentes de compartir:**

```typescript
export function generateShareURL(post, platform) {
  const baseURL = `https://mimundomagico.es/blog/${post.slug}`;
  const params = new URLSearchParams({
    utm_source: platform,
    utm_medium: platform === 'email' ? 'email' : 'social',
    utm_campaign: 'content-distribution'
  });
  
  return `${baseURL}?${params.toString()}`;
}
```

---

### 7.4 Dashboard de Monitoreo Recomendado

**Herramienta:** Google Data Studio (gratuito) o Metabase

**Vistas principales:**

1. **Dashboard Ejecutivo (semanal)**
   - Newsletter subscribers (trend line)
   - Blog visitas (vs semana anterior)
   - PDF downloads (fuentes)
   - Social traffic (por red)

2. **Dashboard Blog Performance**
   - Top 5 artículos (visitas, engagement)
   - Nuevos artículos (visitas 7 días)
   - Bounce rate por artículo
   - Scroll depth promedio

3. **Dashboard Conversiones**
   - Newsletter signup funnel (source → conversion)
   - PDF download sources
   - Contact form submissions

---

## 8. TIMELINE DE IMPLEMENTACIÓN

### FASE 1: Semana 1-2 — MVP Web

**Objetivo:** Sitio básico funcionando, blog escalable

**Tareas técnicas:**

- [ ] Crear proyecto Next.js 14
- [ ] Configurar Sanity workspace
  - [ ] Crear schema para posts, pages, lead-magnet
  - [ ] Publicar los 2 artículos iniciales
- [ ] Implementar estructura básica
  - [ ] Header/Footer responsive
  - [ ] Homepage (hero + 3 artículos destacados)
  - [ ] Página blog (listado)
  - [ ] Template artículo individual
  - [ ] Página descargas (lead magnet)
  - [ ] Página sobre/contacto
- [ ] Setup identidad visual
  - [ ] Colores Tailwind CSS (paleta Mimundomagico)
  - [ ] Tipografías Google Fonts (Playfair Display, DM Sans, Caveat)
  - [ ] Logo en componentes
- [ ] Deploy en Vercel + dominio
- [ ] Meta tags estáticos (no dinámicos aún)

**Entregas:**
- ✅ URL activa: mimundomagico.es
- ✅ Blog funcional (posts desde Sanity)
- ✅ Descargas página visible

**Costo:** $0 (gratuito)

---

### FASE 2: Semana 3 — Sistema Newsletter

**Objetivo:** Automatizar captación de leads + secuencia email

**Tareas técnicas:**

- [ ] Setup Brevo
  - [ ] Crear cuenta + API key
  - [ ] Configurar lista principal
  - [ ] Template email bienvenida
  - [ ] Workflow automático: 5 emails (día 1, 3, 7, 14, 30)
  
- [ ] Integración Newsletter en web
  - [ ] Crear componente NewsletterForm
  - [ ] Endpoint API `/api/newsletter/subscribe`
  - [ ] Double opt-in (email confirmación desde Brevo)
  - [ ] Validación frontend (email válido)
  - [ ] Mensajes de éxito/error
  
- [ ] Supabase setup
  - [ ] Crear tablas (newsletter_subscribers, lead_downloads)
  - [ ] Guardar suscripciones en BD
  
- [ ] GA4 eventos
  - [ ] Newsletter signup tracking
  - [ ] PDF download tracking
  
- [ ] Landing page optimizada (/descargas)
  - [ ] Mejor copy, beneficios destacados
  - [ ] Formulario simple (solo email)
  - [ ] Countdown / scarcity element (opcional)

**Entregas:**
- ✅ Formulario newsletter en homepage
- ✅ Landing page descargas
- ✅ Email de bienvenida automático
- ✅ Suscriptores guardados en Supabase

**Costo:** $0 (gratuito) + posiblemente Supabase Pro ($25/mes) si quieres más features

---

### FASE 3: Semana 4 — SEO + Analytics

**Objetivo:** Optimizar para búsqueda orgánica, trackear resultados

**Tareas técnicas:**

- [ ] Meta tags dinámicos
  - [ ] Generar title, description, OG image por artículo
  - [ ] Canonical URLs
  - [ ] Structured data (BlogPosting schema)
  
- [ ] Sitemap + Robots
  - [ ] Sitemap.xml dinámico (desde Sanity)
  - [ ] Robots.txt
  
- [ ] GA4 completo
  - [ ] Google Analytics instalado
  - [ ] Eventos de scroll depth
  - [ ] Timing en páginas
  - [ ] UTMs para redes sociales
  
- [ ] Meta Pixel
  - [ ] Pixel ID instalado
  - [ ] Conversión: newsletter signup
  - [ ] Conversión: PDF download
  
- [ ] Optimizaciones Core Web Vitals
  - [ ] Image optimization (Next.js Image)
  - [ ] Lazy loading
  - [ ] Font caching
  
- [ ] Envíos a Search Console
  - [ ] Verificar sitio
  - [ ] Enviar sitemap.xml
  - [ ] Verificar URLs indexadas

**Entregas:**
- ✅ Sitemap en Google Search Console
- ✅ GA4 dashboard configurado
- ✅ Meta Pixel reportando conversiones
- ✅ PageSpeed Insights > 85

**Costo:** $0

---

### FASE 4: Semana 5+ — Optimizaciones y Escalamiento

**Tareas opcionales (post-lanzamiento):**

- [ ] Sistema de comentarios (Disqus o nativo)
- [ ] Más artículos de blog (2-3 semanales)
- [ ] Webhook Sanity → Brevo (anunciar nuevos posts)
- [ ] Newsletter template profesional
- [ ] Podcast publishing (futura)
- [ ] E-commerce products (productos digitales, workshops)
- [ ] Integraciones avanzadas:
  - [ ] Chatbot (Typeform, Chatbase)
  - [ ] Video embeds optimizados
  - [ ] Testimonios dinámicos

---

### Cronograma Completo

```
ABRIL 2026
├─ Semana 1 (1-7 abril)
│  └─ Setup técnico, primeros artículos
├─ Semana 2 (8-14 abril)
│  └─ Deploy, refinamiento UI, SSL
├─ Semana 3 (15-21 abril)
│  └─ Newsletter system live
├─ Semana 4 (22-28 abril)
│  └─ Analytics, Search Console
└─ Semana 5+ (mayo)
   └─ Monitoreo, optimizaciones

MAYO 2026
├─ Lanzamiento social media (TikTok, Instagram)
├─ Campaign newsletter "El Gran Libro"
└─ Primeros suscriptores

JUNIO 2026+
├─ Escalamiento: más artículos
├─ Análisis de datos (qué convierte)
└─ Decisión: e-commerce, workshops, cursos
```

---

## RESUMEN EJECUTIVO

### Tech Stack Final

| Componente | Solución | Costo | Razón |
|------------|----------|-------|-------|
| **Frontend** | Next.js 14 | $0 | SEO, rendimiento, escalable |
| **Hosting** | Vercel | $0-20/mes | Integrado Next.js, CDN global |
| **CMS** | Sanity.io | $0-99/mes | Headless, flexible, fácil de usar |
| **Base Datos** | Supabase | $0-25/mes | PostgreSQL managed, API |
| **Email** | Brevo | $0-30/mes | Automation, double opt-in |
| **Analytics** | GA4 + Meta Pixel | $0 | Tracking conversiones |
| **TOTAL MVP** | | **$0-50/mes** | Completamente funcional |

---

### Ventajas Competitivas

1. ✅ **SEO Nativo** — Next.js es mejor que WordPress para posicionamiento
2. ✅ **Performance** — Core Web Vitals excelentes (LCP < 2s)
3. ✅ **Escalabilidad** — Diseño modular, fácil agregar funcionalidades
4. ✅ **Mantenibilidad** — Pocos dependencias, código limpio
5. ✅ **Bajo Costo** — MVP completamente gratuito (sin suscripciones premium)
6. ✅ **Marketing-Ready** — Pixels, UTMs, webhooks nativos
7. ✅ **Content-Driven** — Sanity perfecto para blogs con evolución

---

### Next Steps

1. **Crear repositorio GitHub** con Next.js template
2. **Setup Sanity workspace** y migrar artículos
3. **Diseñar componentes** en Figma (basados en identidad visual)
4. **Implementar** semana por semana según cronograma
5. **Testing:** Lighthouse, GTmetrix, Search Console
6. **Launch:** Enviar URL a lista de espera existente

---

*Documento preparado para Mimundomagico.es | Abril 2026*
*Revisar y actualizar: Julio 2026*
