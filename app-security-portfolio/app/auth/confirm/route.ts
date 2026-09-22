import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminEmail, siteUrl } from "@/lib/server/env";
import {
  accessCookie,
  refreshCookie,
  verifyTokenHash,
} from "@/lib/server/supabase";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") || "magiclink";
  const redirectUrl = new URL("/admin/blog", siteUrl());

  if (!tokenHash) {
    redirectUrl.searchParams.set("error", "missing-token");
    return NextResponse.redirect(redirectUrl);
  }

  try {
    const data = await verifyTokenHash(tokenHash, type);
    const email = String(data.user?.email || "").toLowerCase();

    if (email !== adminEmail()) {
      redirectUrl.searchParams.set("error", "not-allowed");
      return NextResponse.redirect(redirectUrl);
    }

    const cookieStore = await cookies();
    cookieStore.set(accessCookie, data.access_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: data.expires_in || 3600,
    });
    cookieStore.set(refreshCookie, data.refresh_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    redirectUrl.searchParams.set("signed_in", "1");
    return NextResponse.redirect(redirectUrl);
  } catch {
    redirectUrl.searchParams.set("error", "auth-failed");
    return NextResponse.redirect(redirectUrl);
  }
}
