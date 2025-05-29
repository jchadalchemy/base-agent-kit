// File: agents/review-agent.config.ts
import { AgentConfig } from "../core/types";
import { SupabaseMemory } from "../core/memory/supabase";
import { Planner } from "../core/reasoning/planner";
import { RuleBasedPlanner } from "../core/planners/rule_based_planner";
import { LogTool } from "../core/tools/log_tool";
import { ReplyDraftTool } from "../core/tools/reply_draft_tool";
import { TaskCreateTool } from "../core/tools/task_create_tool";

const config: AgentConfig = {
  id: "review-agent",
  name: "Review Agent",
  goals: ["Review plans", "Provide second opinions"],
  memory: new SupabaseMemory(),
  planner: RuleBasedPlanner,
  tools: [LogTool, ReplyDraftTool, TaskCreateTool],
  maxInputsPerRun: 1
};

export default config;
