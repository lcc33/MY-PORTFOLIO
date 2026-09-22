import Link from "next/link";
import { PostList } from "@/components/post-list";
import { owner } from "@/lib/content";

export default function Home() {
  return (
    <>
      <section>
        <h1 className="">Application Security Engineer</h1>
        <p className="lede">
          I build small, legible web systems and document how I secure them.
          This portfolio is also a working security case study.
        </p>
      </section>

      <section className="section">
        <h2>Latest notes</h2>
        <PostList limit={3} />
        <p className="section">
          <Link href="/blog">Read the blog</Link>
        </p>
      </section>

      <section className="section form-block">
        <h2>Newsletter</h2>
        <p>
          Get new security notes by email. In the full build, subscribing also
          creates the account used for likes and comments.
        </p>
        <form action="/api/subscribe" method="post">
          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Display name
            <input name="displayName" type="text" autoComplete="name" />
          </label>
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </>
  );
}
