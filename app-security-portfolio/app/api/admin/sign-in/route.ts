import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminEmail, adminPassword, siteUrl } from "@/lib/server/env";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  const allowedEmail = adminEmail();
  const allowedPassword = adminPassword();
  const redirectUrl = new URL("/admin/blog", request.url);

  if (
    !allowedEmail ||
    !allowedPassword ||
    email !== allowedEmail ||
    password !== allowedPassword
  ) {
    redirectUrl.searchParams.set("error", "invalid-credentials");
    return NextResponse.redirect(redirectUrl);
  }

  // Generate a simple session token (hash of email + timestamp + password)
  const encoder = new TextEncoder();
  const data = encoder.encode(`${email}:${Date.now()}:${password}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const sessionToken = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  const cookieStore = await cookies();
  cookieStore.set("portfolio-admin-session", sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  // Store the valid session token so we can verify it later
  cookieStore.set("portfolio-admin-email", email, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirectUrl.searchParams.set("signed_in", "1");
  return NextResponse.redirect(redirectUrl);
}
