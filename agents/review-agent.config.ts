// File: agents/review-agent.config.ts
import { LogTool, ReplyDraftTool, CalendarTool } from "../core/tools/tool";
import { SupabaseMemory } from "../core/memory/supabase";
import { Planner } from "../core/reasoning/planner";
import { AgentConfig } from "../core/types";

const ReviewAgentConfig: AgentConfig = {
  id: "review-agent",
  name: "Review Agent",
  goals: [
    "Provide backup perspective",
    "Propose secondary insights for decisions",
    "Ensure decisions are not missed"
  ],
  memory: new SupabaseMemory(),
  planner: new Planner(),
  tools: [new LogTool(), new ReplyDraftTool(), new CalendarTool()]
};

export default ReviewAgentConfig;
