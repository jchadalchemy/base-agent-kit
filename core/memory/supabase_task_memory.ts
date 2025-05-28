// File: core/memory/supabase_task_memory.ts

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

export class SupabaseTaskMemory {
  async createTask(task: {
    agent_id: string;
    payload: any;
    status?: string;
    priority?: number;
  }) {
    const { error } = await supabase.from("agent_tasks").insert({
      agent_id: task.agent_id,
      payload: task.payload,
      status: task.status || "pending",
      priority: task.priority || 1,
    });
    if (error) {
      console.error("[TaskMemory] Failed to create task:", error.message);
    } else {
      console.log("[TaskMemory] Task created for agent:", task.agent_id);
    }
  }

  async claimNextTask(agentId: string) {
    const { data, error } = await supabase
      .from("agent_tasks")
      .select("*")
      .eq("agent_id", agentId)
      .eq("status", "pending")
      .order("priority", { ascending: false })
      .limit(1);

    if (error || !data?.length) return null;

    const task = data[0];
    await this.updateTaskStatus(task.id, "claimed");
    return task;
  }

  async updateTaskStatus(taskId: string, status: string) {
    const { error } = await supabase
      .from("agent_tasks")
      .update({ status })
      .eq("id", taskId);

    if (error) {
      console.error("[TaskMemory] Failed to update task status:", error.message);
    }
  }
}
