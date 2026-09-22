import Link from "next/link";
import { AmbientAudioToggle } from "@/components/controls/ambient-audio-toggle";
import { SiteClock } from "@/components/controls/site-clock";
import { ThemeToggle } from "@/components/controls/theme-toggle";
import { owner } from "@/lib/content";

const navItems = [
  { href: "/blog", label: "blog" },
  { href: "/projects", label: "projects" },
  { href: "/resume", label: "resume" },
  { href: "/contact", label: "contact" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-top">
        <Link href="/" className="site-name" aria-label={`${owner.name} home`}>
          {owner.name}
        </Link>
        <SiteClock />
      </div>
      <div className="header-bottom">
        <nav aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-controls" aria-label="Site controls">
          <ThemeToggle />
          <AmbientAudioToggle />
        </div>
      </div>
    </header>
  );
}
