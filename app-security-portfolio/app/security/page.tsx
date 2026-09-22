import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security",
  description: "Responsible disclosure policy for this application security portfolio.",
};

export default function SecurityPage() {
  return (
    <article>
      <h1>Security</h1>
      <p className="lede">
        Please report vulnerabilities privately. Do not open a public issue for
        security bugs.
      </p>

      <h2>Report</h2>
      <p>
        Email <a href="mailto:security@example.com">security@example.com</a>{" "}
        with a description, impact, steps to reproduce, and relevant URLs,
        screenshots, or request logs.
      </p>

      <h2>Scope</h2>
      <p>
        The main site, blog, admin editor, API routes, authentication,
        newsletter flows, comments, and likes are in scope. Third-party services
        such as Supabase, Vercel, Resend, and Cloudflare should be reported to
        those vendors directly.
      </p>

      <h2>Response</h2>
      <p>
        I aim to acknowledge reports within 3 business days and provide an
        initial assessment within 7 days.
      </p>
    </article>
  );
}
