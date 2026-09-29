import { cookies } from "next/headers";
import { adminEmail, supabaseEnv } from "@/lib/server/env";

export type SupabasePost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content_md: string;
  tags: string[] | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

function baseHeaders(key: string) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

export async function getAdminSession() {
  const allowedEmail = adminEmail();
  if (!allowedEmail) {
    return null;
  }

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("portfolio-admin-session")?.value;
  const sessionEmail = cookieStore.get("portfolio-admin-email")?.value;

  if (!sessionToken || !sessionEmail) {
    return null;
  }

  if (sessionEmail.toLowerCase() !== allowedEmail) {
    return null;
  }

  return { email: sessionEmail };
}

export async function listAdminPosts(): Promise<SupabasePost[]> {
  const env = supabaseEnv();
  if (!env) {
    return [];
  }

  try {
    const response = await fetch(
      `${env.url}/rest/v1/posts?select=*&order=created_at.desc`,
      {
        headers: baseHeaders(env.serviceRoleKey),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return [];
    }

    return (await response.json()) as SupabasePost[];
  } catch {
    return [];
  }
}

export async function listPublishedPosts(): Promise<
  Array<{
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readingTime: string;
    tags: string[];
  }>
> {
  const env = supabaseEnv();
  if (!env) return [];

  try {
    const response = await fetch(
      `${env.url}/rest/v1/posts?status=eq.published&select=*&order=published_at.desc,created_at.desc`,
      {
        headers: baseHeaders(env.serviceRoleKey),
        cache: "no-store",
      },
    );

    if (!response.ok) return [];
    const rows = (await response.json()) as SupabasePost[];
    return rows.map((p) => {
      const words = (p.content_md || "").trim().split(/\s+/).length;
      const readingMinutes = Math.max(1, Math.ceil(words / 200));
      return {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt || "",
        date: p.published_at ? p.published_at.slice(0, 10) : p.created_at.slice(0, 10),
        readingTime: `${readingMinutes} min read`,
        tags: p.tags && p.tags.length > 0 ? p.tags : ["appsec"],
      };
    });
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<SupabasePost | null> {
  const env = supabaseEnv();
  if (!env) return null;

  try {
    const response = await fetch(
      `${env.url}/rest/v1/posts?slug=eq.${encodeURIComponent(slug)}&select=*`,
      {
        headers: baseHeaders(env.serviceRoleKey),
        cache: "no-store",
      },
    );

    if (!response.ok) return null;
    const rows = (await response.json()) as SupabasePost[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function createPost(input: {
  title: string;
  slug: string;
  excerpt: string;
  contentMd: string;
  status: "draft" | "published";
}) {
  const env = supabaseEnv();
  if (!env) {
    throw new Error("Supabase environment variables are not configured.");
  }

  const now = new Date().toISOString();
  const response = await fetch(`${env.url}/rest/v1/posts`, {
    method: "POST",
    headers: {
      ...baseHeaders(env.serviceRoleKey),
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt,
      content_md: input.contentMd,
      status: input.status,
      published_at: input.status === "published" ? now : null,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Post create failed: ${response.status} ${text}`);
  }

  return response.json();
}
