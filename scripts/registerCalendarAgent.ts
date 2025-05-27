// File: scripts/registerCalendarAgent.ts

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

async function registerAgent() {
  const agentId = "calendar-agent";
  const { error } = await supabase.from("agents_registry").upsert({
    agent_id: agentId,
    status: "active",
    config_path: `agents/${agentId}.config.ts`,
    description: "Coordinates calendar scheduling and rescheduling tasks."
  });

  if (error) {
    console.error("[RegisterAgent] Failed:", error.message);
  } else {
    console.log(`[RegisterAgent] ${agentId} registered successfully.`);
  }
}

registerAgent();
