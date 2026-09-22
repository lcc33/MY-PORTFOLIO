create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content_md text not null,
  tags text[] default '{}',
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table posts enable row level security;

drop policy if exists "published posts are public" on posts;
create policy "published posts are public"
on posts for select
using (status = 'published');

-- Admin writes are performed server-side with SUPABASE_SERVICE_ROLE_KEY after
-- checking ADMIN_EMAIL. Do not expose the service role key to the browser.
