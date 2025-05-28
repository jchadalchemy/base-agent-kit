// File: agents/inbox-strategist.config.ts

import { AgentConfig } from "../core/types";
import { SupabaseMemory } from "../core/memory/supabase";
import { RuleBasedPlanner } from "../core/planners/rule_based_planner";
import { LogTool } from "../core/tools/log_tool";
import { ReplyDraftTool } from "../core/tools/reply_draft_tool";

const config: AgentConfig = {
  id: "inbox-strategist",
  name: "Inbox Strategist",
  goals: ["Interpret email intent", "Prioritize responses"],
  memory: new SupabaseMemory(),
  planner: RuleBasedPlanner,
  tools: [LogTool, ReplyDraftTool],
  maxInputsPerRun: 1,
};

export default config;
