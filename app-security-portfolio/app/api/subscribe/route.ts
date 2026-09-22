import { NextResponse } from "next/server";
import { siteUrl } from "@/lib/server/env";
import { sendPlunkEmail } from "@/lib/server/plunk";
import { generateAdminMagicLink } from "@/lib/server/supabase";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim().toLowerCase();

  if (email && email === process.env.ADMIN_EMAIL?.toLowerCase()) {
    const actionLink = await generateAdminMagicLink(email);
    await sendPlunkEmail({
      to: email,
      subject: "Confirm your AppSec portfolio access",
      body: `<p>This confirms newsletter/admin access for the portfolio.</p><p><a href="${actionLink}">Confirm access</a></p>`,
      idempotencyKey: `subscribe-${Date.now()}`,
    });
  }

  return NextResponse.json(
    {
      message:
        "Check your email. If this address can receive mail, a confirmation link will arrive shortly.",
      next: `${siteUrl()}/newsletter/confirm`,
    },
    { status: 202 },
  );
}
