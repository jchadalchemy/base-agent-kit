// File: agents/calendar-agent.config.ts
import { LogTool, ReplyDraftTool, CalendarTool } from "../core/tools/tool";
import { SupabaseMemory } from "../core/memory/supabase";
import { Planner } from "../core/reasoning/planner";
import { AgentConfig } from "../core/types";

const CalendarAgentConfig: AgentConfig = {
  id: "calendar-agent",
  name: "Calendar Agent",
  goals: [
    "Manage scheduling requests",
    "Coordinate meeting reschedules",
    "Support Inbox Strategist with time coordination"
  ],
  memory: new SupabaseMemory(),
  planner: new Planner(),
  tools: [new LogTool(), new ReplyDraftTool(), new CalendarTool()]
};

export default CalendarAgentConfig;
