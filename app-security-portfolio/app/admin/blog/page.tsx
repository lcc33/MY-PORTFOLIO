import type { Metadata } from "next";
import { createPostAction } from "@/app/admin/blog/actions";
import { adminEmail, supabaseEnv } from "@/lib/server/env";
import { getAdminSession, listAdminPosts } from "@/lib/server/supabase";

export const metadata: Metadata = {
  title: "Admin Blog",
  robots: { index: false, follow: false },
};

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const session = await getAdminSession();
  const isConfigured = Boolean(supabaseEnv() && adminEmail());
  const posts = session ? await listAdminPosts() : [];

  return (
    <>
      <h1>Admin blog</h1>
      <p className="lede">Only the email in <code>ADMIN_EMAIL</code> can request a sign-in link or create posts.</p>

      {!isConfigured ? (
        <section className="section callout">
          <h2>Configure first</h2>
          <p>
            Add Supabase and Plunk variables to <code>.env.local</code> before
            using the editor.
          </p>
        </section>
      ) : null}

      {!session ? (
        <section className="section form-block">
          <h2>Sign in</h2>
          {params.sent ? <p className="muted">If that email is allowed, a sign-in link was sent.</p> : null}
          {params.error ? <p className="muted">Sign-in failed. Request a fresh link.</p> : null}
          <form action="/api/admin/sign-in" method="post">
            <label>
              Admin email
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <button type="submit">Send sign-in link</button>
          </form>
        </section>
      ) : (
        <>
          <section className="section callout">
            <h2>Signed in</h2>
            <p className="muted">{session.email}</p>
          </section>

          <section className="section form-block">
            <h2>New post</h2>
            {params.created ? <p className="muted">Post created.</p> : null}
            {params.error ? <p className="muted">Could not complete that action.</p> : null}
            <form action={createPostAction}>
              <label>
                Title
                <input name="title" required />
              </label>
              <label>
                Slug
                <input name="slug" />
              </label>
              <label>
                Excerpt
                <textarea name="excerpt" />
              </label>
              <label>
                Markdown body
                <textarea name="contentMd" required />
              </label>
              <label>
                Status
                <select name="status" defaultValue="draft">
                  <option value="draft">draft</option>
                  <option value="published">published</option>
                </select>
              </label>
              <button type="submit">Save post</button>
            </form>
          </section>

          <section className="section">
            <h2>Posts</h2>
            {posts.length ? (
              <ol className="post-list">
                {posts.map((post) => (
                  <li key={post.id}>
                    <strong>{post.title}</strong>
                    <p>{post.excerpt || "No excerpt yet."}</p>
                    <small>{post.status} / {post.slug}</small>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="muted">No Supabase posts found yet.</p>
            )}
          </section>
        </>
      )}
    </>
  );
}
