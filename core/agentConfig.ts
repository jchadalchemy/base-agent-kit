// File: core/agentConfig.ts

import { Tool } from "./tools/tool";
import { Planner } from "./reasoning/planner";

export interface AgentConfig {
  id: string;
  name: string;
  goals: string[];
  memory: any;
  planner: Planner;
  tools: Tool[];
}
