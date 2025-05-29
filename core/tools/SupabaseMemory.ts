// File: core/tools/SupabaseMemory.ts

import { createClient } from "@supabase/supabase-js";
import { ToolInvocation } from "../types";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

export class SupabaseMemory {
  async saveInput(agentId: string, input: string) {
    const { error } = await supabase.from("agent_inputs").insert({
      agent_id: agentId,
      input_text: input,
    });

    if (error) {
      console.error("[Memory] ❌ Error saving input:", error.message);
    } else {
      console.log("[Memory] ✅ Input saved.");
    }
  }

  async saveDecision(agentId: string, plan: ToolInvocation) {
    try {
      const payload = {
        agent_id: agentId,
        input_text: plan.arguments?.message ?? "[Unknown input]",
        tool_used: plan.tool ?? "[Unknown tool]",
        tool_args: JSON.stringify(plan.arguments ?? {}),
        confidence: plan.confidence ?? 0,
        reasoning: plan.reasoning ?? "[No reasoning provided]",
        created_at: new Date().toISOString(),
      };

      console.log("[Memory] 📦 Payload to insert:", payload);

      const { data, error } = await supabase
        .from("agent_decisions")
        .insert(payload)
        .select();

      if (error) {
        console.error("[Memory] ❌ Supabase insert error:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });
        throw error;
      }

      console.log("[Memory] ✅ Decision saved. Record:", data);
    } catch (err: any) {
      console.error("[Memory] ❌ Exception saving decision:", err.message || err);
    }
  }

  async pingRegistry(agentId: string) {
    await supabase
      .from("agents_registry")
      .update({ last_seen: new Date().toISOString() })
      .eq("agent_id", agentId);
  }
}
