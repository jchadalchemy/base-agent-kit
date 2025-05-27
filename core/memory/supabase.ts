// File: core/memory/supabase.ts

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

export class SupabaseMemory {
  async getLatestInput(): Promise<any> {
    const { data, error } = await supabase
      .from("agent_inputs")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(1);
    return error ? null : data?.[0];
  }

  async saveDecision(agentId: string, decision: any) {
    const { error } = await supabase.from("agent_logs").insert({
      agent_id: agentId,
      decision,
    });
    if (error) {
      console.error("[Memory] Failed to save decision:", error.message);
    } else {
      console.log("[LogDecision] Agent decision saved.");
    }
  }

  async pingRegistry(agentId: string) {
    await supabase
      .from("agents_registry")
      .update({ last_seen: new Date().toISOString() })
      .eq("agent_id", agentId);
  }
}
