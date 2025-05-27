-- File: supabase/tools_schema.sql
create table if not exists tools (
  id text primary key,
  description text,
  enabled boolean default true,
  created_at timestamp default now()
);
