// File: core/types.ts

import { Tool } from "./tools/tool";
import { Planner } from "./reasoning/planner";

export interface ToolPlan {
  tool: string;
  arguments: any;
  confidence?: number;
  reasoning?: string;
}

export interface EscalationTask {
  from: string;
  input: any;
  decision: ToolPlan;
  reasoning: string;
}

export interface AgentConfig {
  id: string;
  name: string;
  goals: string[];
  memory: any;
  planner: Planner;
  tools: Tool[];
}
