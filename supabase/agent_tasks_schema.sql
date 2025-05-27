-- File: supabase/agent_tasks_schema.sql
create table if not exists agent_tasks (
  id uuid primary key default gen_random_uuid(),
  created_by text not null,
  assigned_to text,
  type text,
  status text default 'open',
  needs_review boolean default false,
  payload jsonb,
  notes text,
  created_at timestamp default now()
);
