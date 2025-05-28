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
  description: "Creates a new task and assigns it to another agent.",

  async run(args: any) {
    const { message, target_agent_id } = args;

    const { error } = await supabase.from("tasks").insert({
      input: message,
      target_agent_id,
      status: "pending",
    });

    if (error) {
      console.error("[TaskCreateTool] Error creating task:", error.message);
      return `❌ Failed to create task: ${error.message}`;
    }

    return `✅ Task delegated to ${target_agent_id}`;
  },
};
