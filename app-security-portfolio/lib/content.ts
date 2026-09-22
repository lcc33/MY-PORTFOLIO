export const owner = {
  name: "Muhammad Is'haq",
  title: "Application Security Engineer",
  email: "muhammadhabbibi24434@gmail.com",
  location: "Lagos, Nigeria",
  github: "https://github.com/lcc33",
  linkedin: "https://www.linkedin.com/in/muhammadishaq-d3v/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3Bdowi21QvTMG2dnbDfG8gNw%3D%3D",
};

export const posts = [
  {
    slug: "first-principles-appsec",
    title: "First principles for a small secure blog",
    excerpt:
      "A short threat model for this portfolio: what can go wrong, what matters first, and what I am deliberately keeping boring.",
    date: "2026-09-22",
    readingTime: "4 min read",
    tags: ["threat-modeling", "portfolio", "secure-by-design"],
  },
];

export const grugNotes = [
  "complex thing hide bug. small thing let bug stand in sun.",
  "auth check in browser feel nice. auth check on server save skin.",
  "sanitize twice if must. trust raw html never.",
  "log enough for future you. not enough to leak user.",
  "if role can change itself, role is not role. role is costume.",
  "boring form with rate limit beat fancy form with inbox fire.",
];

export const projects = [
  {
    title: "AppSec Portfolio",
    summary:
      "This site: a plain blog and newsletter product used to document secure design decisions in public.",
    href: "/blog/first-principles-appsec",
  },
  {
    title: "Secure Notes API",
    summary:
      "A deliberately small API for practicing auth boundaries, RLS-style ownership tests, and audit logging.",
    href: "#",
  },
  {
    title: "XSS Payload Lab",
    summary:
      "A local playground for testing Markdown rendering, sanitizer policies, and browser security headers.",
    href: "#",
  },
];

export const resumeHighlights = [
  "Application security focus: authentication, access control, secure SDLC, and web exploitation.",
  "Frontend and full-stack background with React, Next.js, TypeScript, and API integration.",
  "Comfortable writing threat models, security checklists, and plain-English engineering notes.",
];
