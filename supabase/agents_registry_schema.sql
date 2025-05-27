-- File: supabase/agents_registry_schema.sql
create table if not exists agents_registry (
  agent_id text primary key,
  name text not null,
  status text default 'active',
  last_seen timestamp,
  created_at timestamp default now()
);
