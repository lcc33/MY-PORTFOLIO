"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <h1>Contact</h1>
      <p className="lede">
        Send a note about work, security research, or a vulnerability report.
      </p>

      {status === "sent" ? (
        <section className="section callout">
          <h2>Message sent</h2>
          <p className="muted">
            Thanks for reaching out. I&apos;ll get back to you as soon as I can.
          </p>
          <button type="button" onClick={() => setStatus("idle")}>
            Send another message
          </button>
        </section>
      ) : (
        <form className="form-block" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" autoComplete="name" required />
          </label>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Message
            <textarea name="message" minLength={10} required />
          </label>

          {status === "error" && (
            <p className="error-text">Something went wrong. Please try again.</p>
          )}

          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send"}
          </button>
        </form>
      )}
    </>
  );
}
