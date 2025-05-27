-- File: supabase/tool_registry_schema.sql
create table if not exists tool_registry (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  mapped_tool text not null,
  source_agent text,
  created_at timestamp default now()
);
