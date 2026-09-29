import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/server/supabase";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt || undefined,
  };
}

export default async function DynamicBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const date = post.published_at
    ? post.published_at.slice(0, 10)
    : post.created_at.slice(0, 10);
  const words = (post.content_md || "").trim().split(/\s+/).length;
  const readingTime = `${Math.max(1, Math.ceil(words / 200))} min read`;

  return (
    <article>
      <h1>{post.title}</h1>
      <p className="muted">
        {date} / {readingTime}
        {post.tags && post.tags.length > 0 ? ` / ${post.tags.join(", ")}` : ""}
      </p>

      {post.excerpt ? (
        <p className="lede" style={{ fontStyle: "italic", marginBottom: 28 }}>
          {post.excerpt}
        </p>
      ) : null}

      <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.75 }}>
        {post.content_md}
      </div>
    </article>
  );
}
