import { plunkEnv } from "@/lib/server/env";

type SendEmailInput = {
  to: string;
  subject: string;
  body: string;
  idempotencyKey?: string;
};

export async function sendPlunkEmail({
  to,
  subject,
  body,
  idempotencyKey,
}: SendEmailInput) {
  const env = plunkEnv();

  if (!env) {
    return { skipped: true, reason: "Missing PLUNK_SECRET_KEY or PLUNK_FROM" };
  }

  const response = await fetch("https://next-api.useplunk.com/v1/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.apiKey}`,
      "Content-Type": "application/json",
      ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    },
    body: JSON.stringify({
      to,
      from: env.from,
      subject,
      body,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Plunk send failed: ${response.status} ${text}`);
  }

  return { skipped: false };
}
