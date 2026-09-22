"use client";

import { useEffect, useState } from "react";
import { grugNotes } from "@/lib/content";

const TYPE_MS = 35;
const HOLD_MS = 3600;

export function QuoteRotator() {
  const [noteIndex, setNoteIndex] = useState(0);
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    const note = grugNotes[noteIndex];

    let characterIndex = 0;
    const reset = window.setTimeout(() => {
      setVisibleText("");
    }, 0);
    const typing = window.setInterval(() => {
      characterIndex += 1;
      setVisibleText(note.slice(0, characterIndex));

      if (characterIndex >= note.length) {
        window.clearInterval(typing);
        window.setTimeout(() => {
          setNoteIndex((current) => (current + 1) % grugNotes.length);
        }, HOLD_MS);
      }
    }, TYPE_MS);

    return () => {
      window.clearTimeout(reset);
      window.clearInterval(typing);
    };
  }, [noteIndex]);

  return (
    <p className="quote-rotator" aria-live="polite">
      <span>{visibleText}</span>
      <span className="typing-caret" aria-hidden="true" />
    </p>
  );
}
