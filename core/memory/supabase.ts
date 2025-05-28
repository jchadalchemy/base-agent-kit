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
      input_text: decision.input,
      tool_used: decision.tool,
      tool_args: decision.arguments,
      confidence: decision.confidence,
      reasoning: decision.reasoning,
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

  async createTask(payload: object, type: string, assigned_to: string) {
    const { error } = await supabase.from("agent_tasks").insert({
      payload,
      type,
      assigned_to,
      created_by: "system",
      status: "queued",
      created_at: new Date().toISOString(),
    });
    if (error) {
      console.error("[Task] Failed to queue task:", error.message);
    } else {
      console.log("[Task] Task queued for agent:", assigned_to);
    }
  }

  async fetchPendingTasks(agentId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from("agent_tasks")
      .select("*")
      .eq("assigned_to", agentId)
      .eq("status", "queued");
    if (error) {
      console.error("[Task] Failed to fetch tasks:", error.message);
      return [];
    }
    return data || [];
  }

  async markTaskComplete(taskId: string) {
    const { error } = await supabase
      .from("agent_tasks")
      .update({ status: "done" })
      .eq("id", taskId);
    if (error) {
      console.error("[Task] Failed to mark task done:", error.message);
    }
  }
}
