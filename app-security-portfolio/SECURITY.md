# Security Policy

This site is a personal portfolio and blog. It's also something I built to demonstrate secure engineering practice, so I take vulnerability reports seriously and appreciate anyone who takes the time to send one.

## Reporting a Vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

Instead, report privately:

- **Email:** security@YOURDOMAIN.com *(replace with your real address, or use your primary contact email)*
- **PGP:** *(optional — add a key fingerprint here if you want encrypted reports)*

Please include:
- A description of the vulnerability and its potential impact
- Steps to reproduce (proof-of-concept code or requests are welcome)
- Any relevant URLs, screenshots, or logs
- Your assessment of severity, if you have one

## Scope

**In scope:**
- The main site and blog at `https://YOURDOMAIN.com`
- The admin editor at `/admin/blog`
- API routes under `/api/*` (subscribe, like, comment, contact, newsletter send)
- Authentication and session handling
- The newsletter subscribe/unsubscribe flow

**Out of scope:**
- Third-party services this site depends on (Supabase, Vercel, Resend, Cloudflare) — please report those directly to the respective vendor
- Denial-of-service or volumetric attacks
- Social engineering, phishing, or physical attacks
- Vulnerabilities requiring physical access to a user's device
- Issues only reproducible with an out-of-date or unofficial browser/plugin
- Missing security headers or best-practice suggestions with no demonstrated impact (feel free to mention these, but they won't be treated as vulnerabilities)

## What to Expect

- **Acknowledgment:** within 3 business days
- **Initial assessment:** within 7 days, including whether it's confirmed, its severity, and next steps
- **Fix timeline:** depends on severity, but critical issues (auth bypass, data exposure, RCE) are prioritized immediately
- **Updates:** I'll keep you posted on progress until it's resolved

## Disclosure

This is a personal project without a formal bug bounty program, so there's no monetary reward. I'm glad to:
- Credit you publicly (in this file or a blog post) once the issue is fixed, if you'd like
- Support coordinated disclosure — please give me a reasonable window to fix the issue before publishing details publicly (90 days is a reasonable default, but I'm happy to discuss)

Please don't access, modify, or delete data beyond what's needed to demonstrate the vulnerability, and don't use automated scanners that could disrupt the site for other visitors without checking with me first.

## Thank You

I'm actively building a career in application security, so a well-written report is genuinely valuable to me, not just a courtesy. Thank you for helping keep this site (and its readers' data) safe.
