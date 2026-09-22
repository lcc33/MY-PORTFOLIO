import Link from "next/link";
import { QuoteRotator } from "@/components/controls/quote-rotator";
import { owner } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <QuoteRotator />
      <div className="footer-row">
        <span>{new Date().getFullYear()} {owner.name}</span>
        <span>
          <Link href="/security">security</Link>
          {" / "}
          <a href={owner.github}>github</a>
        </span>
      </div>
    </footer>
  );
}
