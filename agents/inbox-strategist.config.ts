// File: agents/inbox-strategist.config.ts
import { LogTool, ReplyDraftTool, CalendarTool } from "../core/tools/tool";
import { SupabaseMemory } from "../core/memory/supabase";
import { Planner } from "../core/reasoning/planner";
import { AgentConfig } from "../core/types";

const InboxStrategistConfig: AgentConfig = {
  id: "inbox-strategist",
  name: "Inbox Strategist",
  goals: [
    "Interpret incoming emails",
    "Determine urgency and purpose",
    "Respond with clarity and professionalism"
  ],
  memory: new SupabaseMemory(),
  planner: new Planner(),
  tools: [new LogTool(), new ReplyDraftTool(), new CalendarTool()]
};

export default InboxStrategistConfig;
