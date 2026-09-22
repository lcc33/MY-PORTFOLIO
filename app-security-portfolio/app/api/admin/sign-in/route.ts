import { NextResponse } from "next/server";
import { adminEmail, siteUrl } from "@/lib/server/env";
import { sendPlunkEmail } from "@/lib/server/plunk";
import { generateAdminMagicLink } from "@/lib/server/supabase";

function normalizeEmail(value: FormDataEntryValue | null) {
  return String(value || "").trim().toLowerCase();
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = normalizeEmail(formData.get("email"));
  const allowedEmail = adminEmail();
  const redirectUrl = new URL("/admin/blog", siteUrl());

  if (!allowedEmail || email !== allowedEmail) {
    redirectUrl.searchParams.set("sent", "1");
    return NextResponse.redirect(redirectUrl);
  }

  const actionLink = await generateAdminMagicLink(email);
  await sendPlunkEmail({
    to: email,
    subject: "Sign in to your AppSec portfolio",
    body: `<p>Use this private link to sign in:</p><p><a href="${actionLink}">Sign in</a></p><p>If you did not request this, ignore it.</p>`,
    idempotencyKey: `admin-sign-in-${Date.now()}`,
  });

  redirectUrl.searchParams.set("sent", "1");
  return NextResponse.redirect(redirectUrl);
}
