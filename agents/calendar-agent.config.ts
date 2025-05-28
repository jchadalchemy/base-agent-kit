// File: agents/calendar-agent.config.ts
import { AgentConfig } from "../core/types";
import { SupabaseMemory } from "../core/memory/supabase";
import { Planner } from "../core/reasoning/planner";
import { RuleBasedPlanner } from "../core/planners/rule_based_planner";
import { LogTool } from "../core/tools/log_tool";
import { ReplyDraftTool } from "../core/tools/reply_draft_tool";
import { TaskCreateTool } from "../core/tools/task_create_tool";

const config: AgentConfig = {
  id: "calendar-agent",
  name: "Calendar Agent",
  goals: ["Manage calendar events", "Handle rescheduling requests"],
  memory: new SupabaseMemory(),
  planner: RuleBasedPlanner,
  tools: [LogTool, ReplyDraftTool],
  maxInputsPerRun: 1
};

export default config;
