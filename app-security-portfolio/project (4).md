# AppSec Portfolio: Minimalist Blog + Newsletter

A stripped-down, text-first portfolio for an application security career, styled like grug.so: plain background, one accent color, no clutter. The blog is the main content. Newsletter signup doubles as account creation, letting registered readers like and comment under their name.

> The site is part of the portfolio. Treat every feature as a chance to show good security practice, documented in a public `SECURITY.md`.

---

## 1. Goals

- A calm, fast, text-first site: name, short bio, blog, projects, resume, contact.
- One combined newsletter + account signup: subscribing creates a user; that user can like and comment on posts under their name.
- A single-admin blog: only one specific email can sign in and post.
- Secure by design: RLS, sanitized input, rate limiting, and abuse controls, documented publicly.

**Non-goals (v1):** multi-author support, threaded/nested comments, real-time updates, paid tiers, a CMS UI beyond a simple editor.

---

## 2. Design Direction: Grug-Minimal

Inspired by grug.so: plain, quiet, almost no ornamentation. Content and whitespace do the work.

- **Layout:** single column, generous whitespace, max content width around 640-680px. No sidebar, no hero image, no animation beyond simple fades.
- **Background:** flat light background (`#FAFAFA`-style), dark mode as a flat near-black, no gradients or blur.
- **Color:** near-monochrome. One accent color for links and buttons; everything else is text and background.
- **Type:** the grug TTF fonts you have (place them in `public/fonts/` — e.g. `grug-regular.ttf`, `grug-bold.ttf`; update filenames to match what you actually have) loaded via `@font-face`, used for headings and body. Fall back to a plain system sans-serif stack.
- **Chrome:** a one-line header (name + nav: blog, projects, resume, contact) and a one-line footer (socials, copyright). No dock, no windows, no icons.
- **Motion:** none beyond a short fade/slide on page load and hover underline on links. Respect `prefers-reduced-motion`.
- **Voice:** short sentences, plain language, on-brand with the grug aesthetic if you want (optional, not required for function).

A separate `DESIGN.md` (grug-minimal token file) should back this, so any AI tool or teammate builds consistently. Say the word and I'll generate it.

---

## 3. Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS, minimal custom CSS for `@font-face` and fine type tuning |
| Backend | Next.js Route Handlers / Server Actions |
| Database + Auth | Supabase (Postgres, Auth, Row Level Security) |
| Email | Resend (newsletter sends + magic-link-style confirmation) |
| Bot protection | Cloudflare Turnstile on subscribe/comment/contact |
| Rate limiting | Upstash Redis (`@upstash/ratelimit`) |
| Content | Markdown stored in Supabase, rendered server-side with sanitization |
| Hosting | Vercel |
| Analytics | Plausible or Umami (privacy-friendly, optional) |

---

## 4. Site Map

| Page | Route | Access |
|------|-------|--------|
| Home | `/` | Public — name, one-line bio, latest 3 posts, subscribe box |
| Blog list | `/blog` | Public |
| Blog post | `/blog/[slug]` | Public — like/comment requires registration |
| Projects | `/projects` | Public |
| Resume | `/resume` | Public |
| Contact | `/contact` | Public |
| Admin blog editor | `/admin/blog` | Single admin email only |
| Newsletter confirm | `/newsletter/confirm` | Token-based |
| Unsubscribe | `/newsletter/unsubscribe` | Token-based |

---

## 5. Auth Model

Two distinct roles, both via Supabase Auth (email magic link):

### 5.1 Admin (you)
- One allow-listed email (e.g. stored in an env var `ADMIN_EMAIL` and/or a `role = 'admin'` row).
- Signs in at `/admin/blog` via magic link.
- **Server-side check on every admin route/action:** confirm `session.user.email === process.env.ADMIN_EMAIL` (or check `profiles.role = 'admin'`) before allowing create/edit/publish/delete. Never trust a client-side check alone.
- Can create, edit, publish/unpublish, and delete posts.

### 5.2 Reader (visitors who subscribe)
- Subscribing to the newsletter **is** account creation: entering an email on the subscribe form triggers a Supabase magic-link sign-in/sign-up, which:
  1. Creates a `profiles` row (name, avatar optional) if new.
  2. Creates a `subscribers` row with status `pending`.
  3. Sends one email containing both the login confirmation and newsletter opt-in confirmation (a single, clear email; don't send two separate confusing emails).
- Once confirmed, the reader is both a **registered user** (can like/comment) and a **subscriber** (receives newsletter emails). These are tracked as separate flags so a reader can unsubscribe from emails later without losing their account, comments, or likes.
- Display name: prompt for one at first login (defaults to the email's local part, e.g. `aisha` from `aisha@example.com`, if skipped).

**Why combine them:** simpler UX, one signup flow, and it satisfies "register for the newsletter → become a user who can like/comment" as you described.

---

## 6. Data Model (Supabase / Postgres)

```sql
-- profiles: one row per authenticated reader/admin
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  email text unique not null,
  display_name text not null,
  role text not null default 'reader' check (role in ('reader','admin')),
  created_at timestamptz default now()
);

create table posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content_md text not null,
  tags text[] default '{}',
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table likes (
  post_id uuid references posts on delete cascade,
  user_id uuid references profiles on delete cascade,
  created_at timestamptz default now(),
  primary key (post_id, user_id)
);

create table comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts on delete cascade,
  user_id uuid references profiles on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  status text not null default 'visible' check (status in ('visible','hidden','flagged')),
  created_at timestamptz default now()
);

-- subscribers: newsletter opt-in state, linked 1:1 to a profile
create table subscribers (
  user_id uuid primary key references profiles on delete cascade,
  email text unique not null,
  status text not null default 'pending' check (status in ('pending','confirmed','unsubscribed')),
  unsubscribe_token_hash text not null,
  confirmed_at timestamptz,
  created_at timestamptz default now()
);

create table newsletter_sends (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts,
  sent_at timestamptz default now(),
  recipient_count int
);
```

### Row Level Security

| Table | Read | Write |
|-------|------|-------|
| `posts` | Anyone: `status = 'published'` only | Admin only (server checks `role = 'admin'`) |
| `profiles` | `display_name` public; email restricted to owner | Own row only; `role` not user-writable |
| `likes` | Anyone (for counts) | Authenticated, own rows only |
| `comments` | Anyone: `status = 'visible'` | Authenticated insert (own `user_id`); edit/delete own; admin moderates |
| `subscribers` | No client access | Server only (service role) |
| `newsletter_sends` | Admin only | Server only |

The Supabase service-role key is server-only, never shipped to the client.

---

## 7. Feature Specs

### 7.1 Admin blog editor (`/admin/blog`)
- Magic-link sign-in gated to the admin email.
- List of posts (draft/published), create/edit form: title, slug (auto-generated, editable), excerpt, Markdown body with preview, tags, publish toggle.
- On publish: sets `published_at`, and optionally triggers "send to subscribers" (see 7.4).

### 7.2 Public blog (`/blog`, `/blog/[slug]`)
- List shows published posts only, newest first, with title, excerpt, tags, date, reading time.
- Post page renders sanitized Markdown (`rehype-sanitize`); no raw HTML from any source.
- Like button and comment form both prompt registration (see 7.3) if the visitor isn't signed in.

### 7.3 Register-to-engage flow
- Visitor clicks "Like" or tries to comment without an account.
- A simple inline form appears: email (+ optional display name).
- Submitting triggers the combined signup/subscribe flow from Section 5.2.
- After confirming via the emailed link, they're redirected back to the same post, signed in, and their like/comment action completes automatically (store the pending action, e.g. in a short-lived signed cookie or query param, and complete it on return).

### 7.4 Newsletter
- Double opt-in via the combined signup email (Section 5.2).
- Every send includes a one-click unsubscribe link (per-subscriber token) and a `List-Unsubscribe` header. Unsubscribing sets `subscribers.status = 'unsubscribed'` but keeps the `profiles` row (comments/likes stay intact).
- Sending: admin action "Send to subscribers" on publish, via a server-only route/Resend, recorded in `newsletter_sends` to prevent double sends.
- Configure SPF, DKIM, DMARC on your sending domain so mail doesn't land in spam.

### 7.5 Likes and comments
- Both require a confirmed account (Section 5.2).
- Comments: plain text or restricted Markdown, 2000-character limit, rate-limited per user, Turnstile on submission, report/flag option, admin moderation queue.
- Display name (not email) shown next to comments and nowhere exposes another user's email.

### 7.6 Contact
- Simple form (name, email, message) with Turnstile + rate limit, delivered via Resend. No public mailto scraping surface.

### 7.7 Resume and Projects
- Static pages: resume as inline preview + PDF download; projects as a simple list (title, one-line description, link).

---

## 8. Threat Model (Summary)

| Threat | Where | Mitigation |
|--------|-------|------------|
| Admin impersonation | `/admin/blog` | Server-side email/role check on every request, not just UI hiding |
| Stored XSS | Comments, post content | Sanitize on render, strict CSP, no raw HTML |
| Broken access control / IDOR | Comments, likes | RLS on all tables, own-row policies, server-side ownership checks |
| Privilege escalation | `profiles.role` | Not user-writable; only changed via DB/admin |
| Service key leakage | Env/config | Server-only env vars, secret scanning in CI |
| Spam/bot signup or comments | Subscribe, comment, contact | Turnstile, rate limits, double opt-in |
| Email enumeration | Signup flow | Generic "check your email" response regardless of whether the email exists |
| CSRF | Mutations | SameSite cookies, Server Actions with origin checks |
| Dependency compromise | Supply chain | Dependabot, `npm audit`, Trivy in CI |
| Info leakage | Errors, headers | Generic error messages, no stack traces in prod, security headers |

---

## 9. Security Hardening Checklist

- [ ] RLS enabled and tested on every table (test with two different user accounts)
- [ ] Admin routes verify `role = 'admin'` server-side on every request
- [ ] Content Security Policy, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`
- [ ] Cookies: `HttpOnly`, `Secure`, `SameSite=Lax`
- [ ] Rate limiting on comment, like, subscribe, contact, and admin login
- [ ] Turnstile on subscribe, comment, contact
- [ ] Input validation with Zod on every route/action
- [ ] Markdown sanitization tested with XSS payloads
- [ ] Secrets scanning (Gitleaks), SAST (Semgrep), dependency scan (Trivy) in CI
- [ ] Audit log for admin actions (publish, delete, moderate, send)
- [ ] `SECURITY.md` with a responsible disclosure policy and `/.well-known/security.txt`
- [ ] Public write-up: "How I secured my own portfolio"

---

## 10. Suggested Project Structure

```
appsec-portfolio/
├─ app/
│  ├─ page.tsx                     # home
│  ├─ blog/
│  │  ├─ page.tsx                  # list
│  │  └─ [slug]/page.tsx           # post + like/comment UI
│  ├─ projects/page.tsx
│  ├─ resume/page.tsx
│  ├─ contact/page.tsx
│  ├─ admin/blog/
│  │  ├─ page.tsx                  # post list (admin)
│  │  └─ [id]/page.tsx             # editor
│  ├─ newsletter/{confirm,unsubscribe}/page.tsx
│  └─ api/
│     ├─ subscribe/route.ts
│     ├─ like/route.ts
│     ├─ comment/route.ts
│     ├─ contact/route.ts
│     └─ newsletter/send/route.ts
├─ components/
│  ├─ layout/ (Header, Footer)
│  ├─ blog/ (PostCard, Markdown, LikeButton, CommentForm, CommentList)
│  └─ forms/ (RegisterInline, ContactForm)
├─ lib/
│  ├─ supabase/{server,client,admin}.ts
│  ├─ email/ (resend, templates)
│  ├─ security/ (ratelimit, turnstile, sanitize, tokens, is-admin)
│  └─ validators.ts
├─ public/fonts/                   # grug-*.ttf files go here
├─ styles/fonts.css                # @font-face declarations
├─ supabase/migrations/
├─ .github/workflows/security.yml
├─ SECURITY.md
├─ DESIGN.md                       # grug-minimal design tokens (separate file)
└─ project.md
```

---

## 11. Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # server only
ADMIN_EMAIL=                      # the one allowed admin login
RESEND_API_KEY=                   # server only
NEWSLETTER_FROM=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=             # server only
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
TOKEN_HASH_SECRET=                # for HMAC of unsubscribe tokens
NEXT_PUBLIC_SITE_URL=
```

---

## 12. Build Plan

**Phase 1: Shell and content (Days 1-3)**
- [ ] Next.js + TS + Tailwind setup, deploy to Vercel
- [ ] Load grug fonts via `@font-face`, set up base type/spacing scale
- [ ] Header, footer, home, projects, resume, contact (static)

**Phase 2: Blog (Days 4-7)**
- [ ] Supabase project, schema, RLS for `posts`/`profiles`
- [ ] Admin auth gated to `ADMIN_EMAIL`, editor at `/admin/blog`
- [ ] Blog list and post pages, Markdown rendering + sanitization
- [ ] SEO: metadata, sitemap, RSS

**Ship v1 here and publish your first post.**

**Phase 3: Accounts, likes, comments (Days 8-11)**
- [ ] Combined signup/subscribe flow (magic link + subscriber row)
- [ ] Register-to-engage inline flow on posts
- [ ] Likes and comments with RLS, rate limits, Turnstile, moderation queue

**Phase 4: Newsletter sending (Days 12-13)**
- [ ] "Send to subscribers" on publish via Resend, logged in `newsletter_sends`
- [ ] Unsubscribe flow, domain email auth (SPF/DKIM/DMARC)

**Phase 5: Hardening and launch (Days 14-16)**
- [ ] Complete the security checklist, CSP tuning
- [ ] CI security pipeline (Semgrep, Trivy, Gitleaks)
- [ ] Self-test with Burp/XSS payloads/IDOR checks between two accounts
- [ ] Write and publish "How I built and secured my AppSec portfolio"

---

## 13. Definition of Done (v1)

- Blog posts are indexable with correct metadata.
- Only `ADMIN_EMAIL` can create/publish posts; verified server-side, not just hidden in the UI.
- Liking/commenting requires a confirmed account; RLS verified with two-account tests.
- Newsletter uses double opt-in with working unsubscribe that preserves the reader's account and comments.
- Passes Lighthouse accessibility ≥ 90.
- CI security scans run on every PR.
- `SECURITY.md` and `security.txt` published.

---

## 14. Risks and Watch-outs

- **Admin check must be server-side.** A client-only "if admin email, show editor" check is trivially bypassed; always verify in Server Actions/Route Handlers.
- **Combined signup/subscribe email must be clear.** Don't send two separate confusing emails for one click; explain in the email that this both logs them in and subscribes them, with an easy way to unsubscribe from mail without deleting their account.
- **Email deliverability:** without SPF/DKIM/DMARC, newsletters land in spam.
- **Font licensing:** confirm the grug TTF files you downloaded are licensed for web embedding before shipping `@font-face`.
- **Portfolio vs learning:** the write-ups are the priority; ship the plain v1 blog fast rather than polishing design longer than needed.

---

## 15. References

- Supabase docs: Row Level Security, Auth with Next.js (`@supabase/ssr`), magic link auth
- OWASP ASVS, OWASP Cheat Sheet Series (XSS, CSRF, Session Management, Authentication)
- OWASP Top 10 (2025)
- Resend docs: broadcasts and domain authentication
- Cloudflare Turnstile docs
