"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createPost, getAdminSession } from "@/lib/server/supabase";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function createPostAction(formData: FormData) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/blog?error=not-authorized");
  }

  const title = String(formData.get("title") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const contentMd = String(formData.get("contentMd") || "").trim();
  const status =
    String(formData.get("status") || "draft") === "published"
      ? "published"
      : "draft";

  if (!title || !contentMd) {
    redirect("/admin/blog?error=missing-fields");
  }

  await createPost({
    title,
    slug: slugify(slugInput || title),
    excerpt,
    contentMd,
    status,
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog?created=1");
}
