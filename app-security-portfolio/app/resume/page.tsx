import type { Metadata } from "next";
import { owner, resumeHighlights } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume highlights for an application security portfolio.",
};

export default function ResumePage() {
  return (
    <>
      <h1>Resume</h1>
      <p className="lede">
        {owner.name} / {owner.title} / {owner.location}
      </p>
      <section className="section">
        <h2>Highlights</h2>
        <ul className="plain-list">
          {resumeHighlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="section callout">
        <h2>PDF</h2>
        <p>
          Add <code>public/resume.pdf</code> when the final resume is ready.
          This page is intentionally plain so the downloadable version remains
          the source of truth.
        </p>
      </section>
    </>
  );
}
