import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "First principles for a small secure blog",
  description: "A short threat model for this application security portfolio.",
};

export default function FirstPrinciplesPost() {
  return (
    <article>
      <h1>First principles for a small secure blog</h1>
      <p className="muted">2026-09-22 / 4 min read</p>

      <p>
        A personal blog still has a real attack surface. It accepts email,
        renders content, stores comments, sends mail, and has an admin path.
        That is enough to practice the basics honestly.
      </p>

      <h2>What I protect first</h2>
      <p>
        The admin route gets a server-side allowlist check on every mutation.
        Published posts are public, but drafts are not. Readers can only change
        their own likes, comments, and profile data.
      </p>

      <h2>What stays boring</h2>
      <p>
        Comments are plain text. Markdown is sanitized before rendering. Signup
        returns the same message whether an email already exists. Newsletter
        unsubscribe changes mail preference, not account ownership.
      </p>

      <h2>How I will test it</h2>
      <p>
        I will keep a two-user test checklist for access control, a small XSS
        payload suite for content rendering, and CI scans for dependencies,
        secrets, and obvious static-analysis issues.
      </p>

      <section className="section form-block" aria-labelledby="engage-title">
        <h2 id="engage-title">Like or comment</h2>
        <p>
          The production version will require a confirmed account before this
          form accepts anything. That keeps engagement tied to an accountable
          reader profile without exposing email addresses.
        </p>
        <form>
          <label>
            Comment
            <textarea name="comment" maxLength={2000} />
          </label>
          <button type="button">Sign in to comment</button>
        </form>
      </section>
    </article>
  );
}
