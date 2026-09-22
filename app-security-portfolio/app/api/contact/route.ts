import { NextResponse } from "next/server";
import { sendPlunkEmail } from "@/lib/server/plunk";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || message.length < 10) {
    return NextResponse.json({ message: "Invalid message." }, { status: 400 });
  }

  await sendPlunkEmail({
    to: process.env.CONTACT_TO ?? process.env.ADMIN_EMAIL ?? email,
    subject: `Portfolio contact from ${name}`,
    body: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>`,
    idempotencyKey: `contact-${Date.now()}`,
  });

  return NextResponse.json({ message: "Thanks. Your note was sent." }, { status: 202 });
}
