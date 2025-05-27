// File: core/database/registry.ts
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { EscalationTask } from "../types";
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

export async function submitEscalationTask(task: EscalationTask) {
  const { error } = await supabase.from("agent_tasks").insert({
    created_by: task.from,
    assigned_to: "human-review",
    type: "uncertain-decision",
    status: "open",
    needs_review: true,
    payload: {
      context: "Agent flagged low-confidence decision.",
      original_input: task.input,
      proposed_action: {
        tool: task.decision.tool,
        arguments: task.decision.arguments
      },
      confidence: task.decision.confidence,
      reasoning: task.reasoning
    },
    notes: `Escalation by ${task.from}`
  });

  if (error) {
    console.error("[submitEscalationTask] Failed to log escalation:", error.message);
  } else {
    console.log(`[submitEscalationTask] Escalation task submitted for ${task.from}.`);
  }
}
