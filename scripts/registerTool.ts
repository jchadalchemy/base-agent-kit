// File: scripts/registerTool.ts

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

async function registerTool() {
  const { error } = await supabase.from("tools_registry").upsert({
    tool_id: "calendar",
    description: "Handles scheduling, rescheduling, and other calendar operations.",
    handler_path: "core/tools/calendarTool.ts",
    enabled: true
  });

  if (error) {
    console.error("[RegisterTool] Failed:", error.message);
  } else {
    console.log("[RegisterTool] Tool registered successfully.");
  }
}

registerTool();
