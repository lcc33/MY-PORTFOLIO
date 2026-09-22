import type { Metadata } from "next";
import { PostList } from "@/components/post-list";

export const metadata: Metadata = {
  title: "Blog",
  description: "Application security notes and build logs.",
};

export default function BlogPage() {
  return (
    <>
      <h1>Blog</h1>
      <p className="lede">
        Short notes on secure design, web bugs, and the portfolio as it grows.
      </p>
      <PostList />
    </>
  );
}
