import type { Metadata } from "next";
import { createPostAction } from "@/app/admin/blog/actions";
import { adminEmail, adminPassword, supabaseEnv } from "@/lib/server/env";
import { getAdminSession, listAdminPosts } from "@/lib/server/supabase";

export const metadata: Metadata = {
  title: "Admin Blog",
  robots: { index: false, follow: false },
};

const migrationSql = `-- Run this in your Supabase Dashboard > SQL Editor:
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content_md text not null,
  tags text[] default '{}',
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table posts enable row level security;

drop policy if exists "published posts are public" on posts;
create policy "published posts are public"
on posts for select
using (status = 'published');`;

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const session = await getAdminSession();
  const isConfigured = Boolean(supabaseEnv() && adminEmail() && adminPassword());
  const posts = session ? await listAdminPosts() : [];

  return (
    <>
      <h1>Admin blog</h1>
      <p className="lede">
        Only the configured admin email and password can access this page.
      </p>

      {!isConfigured ? (
        <section className="section callout">
          <h2>Configuration required</h2>
          <p>
            Make sure <code>ADMIN_EMAIL</code>, <code>ADMIN_PASSWORD</code>, and
            Supabase variables are configured in <code>.env</code>.
          </p>
        </section>
      ) : null}

      {!session ? (
        <section className="section form-block">
          <h2>Sign in</h2>
          {params.error === "invalid-credentials" ? (
            <p className="error-text">Access denied. Invalid email or password.</p>
          ) : null}
          {params.signed_in ? (
            <p className="muted">Signed in successfully.</p>
          ) : null}
          <form action="/api/admin/sign-in" method="post">
            <label>
              Admin email
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </label>
            <button type="submit">Sign in</button>
          </form>
        </section>
      ) : (
        <>
          <section className="section callout">
            <h2>Signed in</h2>
            <p className="muted">{session.email}</p>
            <form action="/api/admin/sign-out" method="post" style={{ marginTop: 8 }}>
              <button type="submit">Sign out</button>
            </form>
          </section>

          {params.error === "missing-table" ? (
            <section className="section callout" style={{ borderColor: "#e53e3e" }}>
              <h2 style={{ color: "#e53e3e" }}>Database table not found</h2>
              <p>
                The <code>posts</code> table has not been created in Supabase yet.
                Open your <strong>Supabase Dashboard &rarr; SQL Editor</strong> and run this SQL:
              </p>
              <pre
                style={{
                  background: "var(--surface)",
                  padding: 14,
                  borderRadius: 6,
                  overflowX: "auto",
                  fontSize: "0.85rem",
                  border: "1px solid var(--border)",
                }}
              >
                <code>{migrationSql}</code>
              </pre>
            </section>
          ) : null}

          <section className="section form-block">
            <h2>New post</h2>
            {params.created ? <p className="muted" style={{ color: "var(--accent)" }}>✓ Post created successfully.</p> : null}
            {params.error === "missing-fields" ? (
              <p className="error-text">Title and Markdown body are required.</p>
            ) : null}
            {params.error === "not-authorized" ? (
              <p className="error-text">Not authorized. Please sign in again.</p>
            ) : null}
            {params.error === "save-failed" ? (
              <p className="error-text">Could not save post: {params.details ? decodeURIComponent(String(params.details)) : "Database error."}</p>
            ) : null}

            <form action={createPostAction}>
              <label>
                Title
                <input name="title" placeholder="e.g. Threat modeling modern web apps" required />
              </label>
              <label>
                Slug
                <input name="slug" placeholder="optional (auto-generated from title)" />
              </label>
              <label>
                Excerpt
                <textarea name="excerpt" placeholder="A brief summary for previews" rows={2} style={{ minHeight: "80px" }} />
              </label>
              <label>
                Markdown body
                <textarea name="contentMd" placeholder="# Heading&#10;&#10;Write your post content in Markdown here..." required />
              </label>
              <label>
                Status
                <select name="status" defaultValue="draft">
                  <option value="draft">draft (private)</option>
                  <option value="published">published (public)</option>
                </select>
              </label>
              <button type="submit">Save post</button>
            </form>
          </section>

          <section className="section">
            <h2>Existing posts</h2>
            {posts.length ? (
              <ol className="post-list">
                {posts.map((post) => (
                  <li key={post.id}>
                    <strong>{post.title}</strong>
                    <p>{post.excerpt || "No excerpt yet."}</p>
                    <small>
                      status: <code>{post.status}</code> &bull; slug: <code>{post.slug}</code>
                    </small>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="muted">No posts found in database yet.</p>
            )}
          </section>
        </>
      )}
    </>
  );
}
