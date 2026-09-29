import Link from "next/link";
import { posts as staticPosts } from "@/lib/content";

export type PostItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
};

export function PostList({
  items,
  limit,
}: {
  items?: PostItem[];
  limit?: number;
}) {
  const source = items && items.length > 0 ? items : staticPosts;
  const visiblePosts = limit ? source.slice(0, limit) : source;

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
