import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { owner } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    default: `${owner.name} / AppSec Portfolio`,
    template: `%s / ${owner.name}`,
  },
  description:
    "A minimalist application security portfolio with a blog, projects, resume, contact, and public security notes.",
  authors: [{ name: owner.name }],
  creator: owner.name,
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeScript = `
    try {
      const stored = window.localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') {
        document.documentElement.dataset.theme = stored;
      } else {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.dataset.theme = systemDark ? 'dark' : 'light';
      }
    } catch (_) {}
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
