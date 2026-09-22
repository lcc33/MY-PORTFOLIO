import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact form for application security work and vulnerability reports.",
};

export default function ContactPage() {
  return (
    <>
      <h1>Contact</h1>
      <p className="lede">
        Send a note about work, security research, or a vulnerability report.
      </p>
      <form className="form-block" action="/api/contact" method="post">
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
        <button type="submit">Send</button>
      </form>
      <p className="muted section">
        Production contact submissions should verify Turnstile, rate-limit by
        IP and email, validate with Zod, and send through Resend server-side.
      </p>
    </>
  );
}
