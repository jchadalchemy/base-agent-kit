// File: core/tools/task_create_tool.ts

import { Tool } from "../types";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

export const TaskCreateTool: Tool = {
  id: "task-create",
  description: "Creates a new task to be picked up by another agent for follow-up.",

  async run(args: {
    from: string;
    input: string;
    decision: {
      tool: string;
      arguments: any;
      confidence?: number;
      reasoning?: string;
    };
    target_agent_id: string;
    reasoning?: string;
  }) {
    const { from, input, decision, target_agent_id, reasoning } = args;

    const { error } = await supabase.from("tasks").insert({
      from,
      input,
      decision,
      reasoning,
      target_agent_id,
      status: "pending",
    });

    if (error) {
      console.error("[TaskCreateTool] ❌ Error creating task:", error.message);
      return `❌ Failed to create task: ${error.message}`;
    }

    return `✅ Task successfully created for ${target_agent_id}`;
  },
};
