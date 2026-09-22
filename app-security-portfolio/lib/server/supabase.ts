import { cookies } from "next/headers";
import { adminEmail, siteUrl, supabaseEnv } from "@/lib/server/env";

export const accessCookie = "portfolio-admin-access-token";
export const refreshCookie = "portfolio-admin-refresh-token";

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

export async function generateAdminMagicLink(email: string) {
  const env = supabaseEnv();
  if (!env) {
    throw new Error("Supabase environment variables are not configured.");
  }

  const redirectTo = `${siteUrl()}/auth/confirm`;
  const response = await fetch(`${env.url}/auth/v1/admin/generate_link`, {
    method: "POST",
    headers: baseHeaders(env.serviceRoleKey),
    body: JSON.stringify({
      type: "magiclink",
      email,
      options: { redirect_to: redirectTo },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase magic link failed: ${response.status} ${text}`);
  }

  const data = await response.json();
  const actionLink = data.action_link || data.properties?.action_link;
  if (!actionLink) {
    throw new Error("Supabase did not return an action link.");
  }

  return actionLink as string;
}

export async function verifyTokenHash(tokenHash: string, type: string) {
  const env = supabaseEnv();
  if (!env) {
    throw new Error("Supabase environment variables are not configured.");
  }

  const response = await fetch(`${env.url}/auth/v1/verify`, {
    method: "POST",
    headers: baseHeaders(env.anonKey),
    body: JSON.stringify({
      token_hash: tokenHash,
      type,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase verification failed: ${response.status} ${text}`);
  }

  return response.json();
}

export async function getAdminSession() {
  const env = supabaseEnv();
  const allowedEmail = adminEmail();
  if (!env || !allowedEmail) {
    return null;
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get(accessCookie)?.value;
  if (!accessToken) {
    return null;
  }

  const response = await fetch(`${env.url}/auth/v1/user`, {
    headers: {
      apikey: env.anonKey,
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const user = await response.json();
  const email = String(user.email || "").toLowerCase();

  if (email !== allowedEmail) {
    return null;
  }

  return { email, id: user.id as string };
}

export async function listAdminPosts() {
  const env = supabaseEnv();
  if (!env) {
    return [];
  }

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
