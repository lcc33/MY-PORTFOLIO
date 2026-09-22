export function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export function adminEmail() {
  return process.env.ADMIN_EMAIL?.trim().toLowerCase() || "";
}

export function supabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !anonKey || !serviceRoleKey) {
    return null;
  }

  return { url, anonKey, serviceRoleKey };
}

export function plunkEnv() {
  const apiKey = process.env.PLUNK_SECRET_KEY;
  let from = process.env.PLUNK_FROM || process.env.NEWSLETTER_FROM;

  if (!apiKey || !from) {
    return null;
  }

  from = from.trim();
  if (!from.includes("@")) {
    from = `noreply@${from}`;
  }

  return { apiKey, from };
}
