import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete("portfolio-admin-session");
  cookieStore.delete("portfolio-admin-email");

  const redirectUrl = new URL("/admin/blog", request.url);
  return NextResponse.redirect(redirectUrl);
}
