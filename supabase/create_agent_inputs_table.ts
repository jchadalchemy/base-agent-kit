// File: supabase/create_agent_inputs_table.ts

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

async function createAgentInputsTable() {
  const { error } = await supabase.rpc("execute_sql", {
    sql: `
      create table if not exists agent_inputs (
        id uuid default gen_random_uuid() primary key,
        agent_id text not null,
        input text not null,
        timestamp timestamp with time zone default timezone('utc', now())
      );
    `
  });

  if (error) {
    console.error("❌ Failed to create agent_inputs table:", error.message);
  } else {
    console.log("✅ agent_inputs table created or already exists.");
  }
}

createAgentInputsTable();
