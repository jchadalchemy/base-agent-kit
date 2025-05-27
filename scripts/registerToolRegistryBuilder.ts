// File: scripts/registerToolRegistryBuilder.ts

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

const mappings = [
  { alias: "calendar", tool_id: "calendar" },
  { alias: "calendar_management", tool_id: "calendar" },
  { alias: "calendar-management", tool_id: "calendar" },
  { alias: "calendar-tool", tool_id: "calendar" },
  { alias: "calendar_management_tool", tool_id: "calendar" },
  { alias: "reschedule", tool_id: "calendar" },
  { alias: "scheduling_tool", tool_id: "calendar" },
  { alias: "scheduler", tool_id: "calendar" },
  { alias: "log", tool_id: "log" },
  { alias: "logger", tool_id: "log" },
  { alias: "email", tool_id: "reply-draft" },
  { alias: "email-reply", tool_id: "reply-draft" },
  { alias: "email-client", tool_id: "reply-draft" },
  { alias: "emailclient", tool_id: "reply-draft" },
  { alias: "email-responder", tool_id: "reply-draft" },
  { alias: "email-response", tool_id: "reply-draft" }
];

async function seedRegistry() {
  for (const entry of mappings) {
    const { error } = await supabase.from("tool_registry").upsert(entry);
    if (error) {
      console.error(`[RegistryBuilder] Failed to insert mapping for ${entry.alias}:`, error.message);
    } else {
      console.log(`[RegistryBuilder] Inserted: ${entry.alias} -> ${entry.tool_id}`);
    }
  }
}

seedRegistry();
