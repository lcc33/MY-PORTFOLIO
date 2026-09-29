import Link from "next/link";
import { PostList } from "@/components/post-list";
import { owner, posts as staticPosts } from "@/lib/content";
import { listPublishedPosts } from "@/lib/server/supabase";

export default async function Home() {
  const published = await listPublishedPosts();
  const allPosts = [
    ...published,
    ...staticPosts.filter((sp) => !published.some((p) => p.slug === sp.slug)),
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-intro">
          <h1 className="hero-title">
            Hi, I&apos;m <span className="hero-name">{owner.name}</span>
          </h1>
          <p className="hero-role">{owner.title}</p>
        </div>
        <p className="hero-description">
          I build small, legible web systems and document how I secure them.
          This portfolio is also a working security case study.
        </p>
      </section>

      <section className="section">
        <h2>Latest notes</h2>
        <PostList items={allPosts} limit={3} />
        <p className="section">
          <Link href="/blog">Read the blog</Link>
        </p>
      </section>
    </>
  );
}
