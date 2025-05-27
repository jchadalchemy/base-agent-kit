-- File: supabase/agent_registry_index.sql
create index if not exists idx_agents_registry_status on agents_registry(status);
