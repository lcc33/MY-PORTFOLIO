import type { Metadata } from "next";
import { PostList } from "@/components/post-list";
import { posts as staticPosts } from "@/lib/content";
import { listPublishedPosts } from "@/lib/server/supabase";

export const metadata: Metadata = {
  title: "Blog",
  description: "Application security notes and build logs.",
};

export default async function BlogPage() {
  const published = await listPublishedPosts();
  const allPosts = [
    ...published,
    ...staticPosts.filter((sp) => !published.some((p) => p.slug === sp.slug)),
  ];

  return (
    <>
      <h1>Blog</h1>
      <p className="lede">
        Short notes on secure design, web bugs, and the portfolio as it grows.
      </p>
      <PostList items={allPosts} />
    </>
  );
}
