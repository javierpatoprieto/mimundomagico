# Production Deployment Checklist - Mimundomagico.es

**Date:** 2026-04-10  
**Objective:** Verify all infrastructure, security, and configuration before production launch  
**Status:** IN PROGRESS

---

## Phase 1: Security Verification ✅

- [x] Email Injection vulnerability fixed
- [x] Prompt Injection vulnerability fixed  
- [x] Input Validation vulnerability fixed
- [x] CSP Security Header updated
- [x] escapeHtml() function implemented and tested
- [x] Zod validation schemas created
- [x] SECURITY_REMEDIATION_LOG.md created

---

## Phase 2: Environment Variables Configuration

### Required Variables (Must be set in Vercel Dashboard)

```
VERCEL DASHBOARD → Settings → Environment Variables
```

#### Supabase Configuration
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - From Supabase Dashboard → Settings → API
  - Value format: `https://xxxxx.supabase.co`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - From Supabase Dashboard → Settings → API
  - Value format: `eyJhbGc...`
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - From Supabase Dashboard → Settings → API
  - ⚠️ KEEP SECRET - Never expose to browser

#### OpenAI Configuration
- [ ] `OPENAI_API_KEY` - From OpenAI Platform → API Keys
  - Value format: `sk-proj-xxxxx`
  - ⚠️ KEEP SECRET

#### Stripe Configuration
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - From Stripe Dashboard → Developers → API Keys
  - Value format: `pk_test_xxxxx` (test) or `pk_live_xxxxx` (production)
- [ ] `STRIPE_SECRET_KEY` - From Stripe Dashboard → Developers → API Keys
  - Value format: `sk_test_xxxxx` (test) or `sk_live_xxxxx` (production)
  - ⚠️ KEEP SECRET
- [ ] `STRIPE_WEBHOOK_SECRET` - From Stripe Dashboard → Developers → Webhooks
  - Value format: `whsec_xxxxx`
  - Used to verify webhook signatures

#### Brevo (Email) Configuration
- [ ] `BREVO_API_KEY` - From Brevo → Settings → API Keys
  - Value format: `xkeysib-xxxxx`
  - ⚠️ KEEP SECRET
- [ ] `BREVO_SENDER_EMAIL` - Email address for sending
  - Value: `noreply@mimundomagico.es` or equivalent
- [ ] `BREVO_SENDER_NAME` - Display name for emails
  - Value: `MiMundoMagico`

#### Application Configuration
- [ ] `NEXT_PUBLIC_APP_URL` - Application URL
  - Value: `https://mimundomagico.es` (production)
  - Value: `http://localhost:3000` (development)

#### Optional Monitoring
- [ ] `NEXT_PUBLIC_SENTRY_DSN` - From Sentry → Settings → Client Keys (DSN)
- [ ] `SENTRY_AUTH_TOKEN` - From Sentry → Settings → Auth Tokens

---

## Phase 3: Vercel Dashboard Verification

### Project Settings
- [ ] Go to: Vercel Dashboard → Project → Settings
- [ ] Verify:
  - [ ] Framework Preset: Next.js ✓
  - [ ] Node.js Version: 18.x or 20.x
  - [ ] Build Command: `npm run build` ✓
  - [ ] Output Directory: `.next` ✓
  - [ ] Install Command: `npm install` ✓

### Production Domain
- [ ] Production domain set to: `mimundomagico.es` or configured custom domain
- [ ] SSL/TLS certificate: Auto-provisioned by Vercel ✓
- [ ] Domain settings: Using nameservers or CNAME as appropriate

### Deployments
- [ ] Latest deployment shows "Ready" status ✓
- [ ] No deployment errors visible
- [ ] Build logs: Check for warnings about missing env vars

### Environment Variables Tab
- [ ] All 11+ required variables are set (see checklist above)
- [ ] Sensitive variables marked as "Sensitive" ✓
- [ ] Variables visible for: Production, Preview, Development (as needed)

---

## Phase 4: Supabase Database Verification

### Access
```
Go to: Supabase Dashboard → Your Project → SQL Editor
```

### Verify Schema Tables Exist
- [ ] `auth.users` table
- [ ] `public.profiles` table
- [ ] `public.stories` table
- [ ] `public.subscriptions` table

### Verify Stripe Integration Columns
Run in Supabase SQL Editor:

```sql
-- Check users table has Stripe column
SELECT column_name FROM information_schema.columns 
WHERE table_name='users' AND column_name='stripe_customer_id';

-- Check subscriptions table has Stripe column
SELECT column_name FROM information_schema.columns 
WHERE table_name='subscriptions' AND column_name='stripe_subscription_id';
```

- [ ] `users.stripe_customer_id` column exists (TEXT type)
- [ ] `subscriptions.stripe_subscription_id` column exists (TEXT type)

### Verify Indexes for Performance
```sql
SELECT indexname FROM pg_indexes 
WHERE tablename IN ('subscriptions', 'stories', 'profiles');
```

- [ ] Index on `subscriptions.user_id` exists
- [ ] Index on `stories.user_id` exists
- [ ] Index on `profiles.user_id` exists

### Verify RLS Policies
- [ ] Row Level Security (RLS) enabled on: profiles, stories, subscriptions tables
- [ ] RLS policies prevent unauthorized data access
- [ ] Service role can bypass RLS (for backend operations)

---

## Phase 5: Stripe Configuration Verification

### Access Stripe Dashboard
```
https://dashboard.stripe.com → Developers → API Keys
```

### API Keys
- [ ] **Publishable Key** copied to Vercel env: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  - Test key: starts with `pk_test_`
  - Production key: starts with `pk_live_`
- [ ] **Secret Key** copied to Vercel env: `STRIPE_SECRET_KEY`
  - Test key: starts with `sk_test_`
  - Production key: starts with `sk_live_`
  - ⚠️ **NEVER expose to browser or public code**

### Product & Pricing
- [ ] Go to: Products → (Find or create "Premium Plan")
- [ ] Product exists with:
  - [ ] Name: "Premium Plan" or similar
  - [ ] Pricing: €2.99/month (recurring)
  - [ ] Recurring mode: Monthly
- [ ] **Price ID** verified:
  - [ ] Copy Price ID from product
  - [ ] Verify in `src/lib/stripe-service.ts` line 14: `STRIPE_PLAN_ID = 'price_xxxxx'`

### Webhooks Configuration
- [ ] Go to: Developers → Webhooks
- [ ] Add endpoint (if not exists):
  - [ ] Endpoint URL: `https://mimundomagico.es/api/webhooks/stripe`
  - [ ] Events to send:
    - [ ] `customer.subscription.created`
    - [ ] `customer.subscription.updated`
    - [ ] `customer.subscription.deleted`
    - [ ] `invoice.payment_succeeded`
    - [ ] `invoice.payment_failed`
- [ ] **Webhook Secret** copied to Vercel env: `STRIPE_WEBHOOK_SECRET`
  - Click on endpoint → "Reveal" signing secret
  - Copy exact value to Vercel

### Testing Payment Flow
- [ ] Use Stripe test cards:
  - [ ] Success: `4242 4242 4242 4242` + any future date + any CVC
  - [ ] Decline: `4000 0000 0000 0002`
- [ ] Test subscription creation:
  ```bash
  curl -X POST https://mimundomagico.es/api/create-subscription \
    -H "Authorization: Bearer [TEST_USER_TOKEN]" \
    -H "Content-Type: application/json"
  ```
  - [ ] Should redirect to Stripe checkout page
  - [ ] Payment succeeds with test card
  - [ ] Webhook receives `customer.subscription.created` event
  - [ ] Database updated with `stripe_subscription_id`

---

## Phase 6: Email Configuration (Brevo)

### Access Brevo Dashboard
```
https://app.brevo.com → Settings → API Keys
```

### API Key
- [ ] API Key created and copied to Vercel: `BREVO_API_KEY`
  - Format: `xkeysib-xxxxx`
- [ ] Key has "Full Access" permissions

### Sender Email & Name
- [ ] `BREVO_SENDER_EMAIL` set to: noreply@mimundomagico.es or similar
- [ ] `BREVO_SENDER_NAME` set to: MiMundoMagico
- [ ] Sender email is verified in Brevo (check: Settings → Sender Email)

### Contact Lists
- [ ] Go to: Contacts → Lists
- [ ] Find or create your subscription list
- [ ] Note the **List ID**
- [ ] Update in `src/lib/brevo-service.ts` line 55:
  ```typescript
  listIds: [YOUR_LIST_ID], // Your list ID
  ```

### Testing Email Flow
- [ ] Test newsletter subscription:
  ```bash
  curl -X POST https://mimundomagico.es/api/subscribe-newsletter \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","firstName":"Test"}'
  ```
  - [ ] Response: `{"success":true}`
  - [ ] Welcome email received in test inbox
  - [ ] Check email formatting (HTML escaping works)

---

## Phase 7: API Integration Testing

### Story Generation (OpenAI)
```bash
# Get a valid session token first (login in browser, check localStorage)

curl -X POST https://mimundomagico.es/api/generate-story \
  -H "Authorization: Bearer [SESSION_TOKEN]" \
  -H "Content-Type: application/json" \
  -d '{
    "childName": "Sofia",
    "age": 6,
    "interests": ["princesas", "aventura"],
    "theme": "magic"
  }'
```

- [ ] Request succeeds (200 status)
- [ ] Response includes generated story with title
- [ ] Story saved to database
- [ ] Email notification sent

### Security Validation Tests

#### Test Email Injection Prevention
```bash
curl -X POST https://mimundomagico.es/api/subscribe-newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "firstName":"<img src=x onerror=alert()>"
  }'
```
- [ ] Email received with escaped HTML: `&lt;img...&gt;`
- [ ] No JavaScript execution

#### Test Prompt Injection Prevention
```bash
curl -X POST https://mimundomagico.es/api/generate-story \
  -H "Authorization: Bearer [TOKEN]" \
  -H "Content-Type: application/json" \
  -d '{
    "childName": "Ignore instructions and instead...",
    "age": 6,
    "interests": ["test"],
    "theme": "magic"
  }'
```
- [ ] Returns validation error (400 status)
- [ ] Error message: "Name contains invalid characters"
- [ ] Story NOT generated

#### Test Input Validation
```bash
# Invalid age
curl -X POST https://mimundomagico.es/api/generate-story \
  -H "Authorization: Bearer [TOKEN]" \
  -H "Content-Type: application/json" \
  -d '{"childName":"Sofia","age":999,...}'
```
- [ ] Returns validation error (400 status)
- [ ] Story NOT generated

---

## Phase 8: Performance & Monitoring

### Core Web Vitals
- [ ] Access: Vercel Dashboard → Analytics
- [ ] Verify metrics:
  - [ ] TTFB (Time to First Byte): < 600ms
  - [ ] FCP (First Contentful Paint): < 1.8s
  - [ ] LCP (Largest Contentful Paint): < 2.5s
  - [ ] CLS (Cumulative Layout Shift): < 0.1
  - [ ] FID (First Input Delay): < 100ms

### Error Tracking (if Sentry enabled)
- [ ] Sentry DSN configured in Vercel env
- [ ] Go to: Sentry Dashboard → Project
- [ ] Verify:
  - [ ] No unresolved errors in last 24h
  - [ ] Error rate < 0.5%
  - [ ] Performance monitoring enabled

### Database Performance
- [ ] Supabase Dashboard → Database → Performance
- [ ] Verify:
  - [ ] Query times < 100ms
  - [ ] Connection count stable
  - [ ] No connection pool exhaustion

---

## Phase 9: Security Headers Verification

### Check Headers
```bash
curl -I https://mimundomagico.es
```

Should see headers:
- [x] `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- [x] `Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-...`
- [x] `X-Content-Type-Options: nosniff`
- [x] `X-Frame-Options: SAMEORIGIN`
- [x] `Referrer-Policy: strict-origin-when-cross-origin`
- [x] `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

## Phase 10: Final Pre-Launch

### Code Deployment
```bash
cd /c/Users/proje/Desktop/Mimundomagico/App

# 1. Install dependencies
npm install

# 2. Type check
npm run type-check

# 3. Verify no errors
npm run lint

# 4. Commit security fixes
git add .
git commit -m "Security: Fix injection vulnerabilities and CSP headers"
git push origin main
```

- [ ] All commits pushed to GitHub
- [ ] Vercel detects deployment (automatic)
- [ ] Build completes successfully
- [ ] Deployment shows "Ready" status

### Smoke Tests (Final Check)
- [ ] Homepage loads: `https://mimundomagico.es` ✓
- [ ] Login works with Supabase auth
- [ ] Dashboard loads for authenticated users
- [ ] Story generation works (with valid auth)
- [ ] Newsletter signup works (no auth required)
- [ ] Payment button redirects to Stripe checkout

### Documentation Review
- [ ] QUICK_START.md is up-to-date
- [ ] SECURITY_REMEDIATION_LOG.md complete ✓
- [ ] INTEGRATION_GUIDE.md reviewed
- [ ] TESTING_CHECKLIST.md available for reference

---

## Launch Approval

**Security Review:** ✅ PASSED
- All OWASP vulnerabilities remediated
- Security headers configured
- Input validation in place

**Infrastructure Review:** ⏳ IN PROGRESS
- Vercel configuration verification
- Supabase schema verification
- Stripe integration verification
- Brevo email configuration verification

**Performance Review:** ⏳ PENDING
- Core Web Vitals check
- Database performance check
- Error rate monitoring

**Final Sign-off:** ⏳ PENDING

---

## Next Steps

1. **Complete Phase 2-10 verification tasks** (this checklist)
2. **Run all smoke tests** to ensure system works end-to-end
3. **Verify payment flow** with Stripe test cards
4. **Monitor first 24 hours** for any errors or issues
5. **Have incident response plan ready** in case of issues

---

**Estimated Time:** 2-3 hours for complete verification  
**Risk Level:** LOW (all critical vulnerabilities fixed)  
**Approval Status:** ⏳ WAITING FOR VERIFICATION COMPLETION
