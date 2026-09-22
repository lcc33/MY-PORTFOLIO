import Link from "next/link";
import { posts } from "@/lib/content";

export function PostList({ limit }: { limit?: number }) {
  const visiblePosts = limit ? posts.slice(0, limit) : posts;

  return (
    <ol className="post-list">
      {visiblePosts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          <p>{post.excerpt}</p>
          <small>
            {post.date} / {post.readingTime} / {post.tags.join(", ")}
          </small>
        </li>
      ))}
    </ol>
  );
}
