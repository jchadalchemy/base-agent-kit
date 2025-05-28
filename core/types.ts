// File: core/types.ts

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
  reasoning?: string;
}

export interface AgentConfig {
  id: string;
  name: string;
  goals: string[];
  memory: any;
  planner: any;
  tools: Tool[];
  maxInputsPerRun?: number;
}

export interface ToolInvocation {
  tool: string;
  arguments: Record<string, any>;
  confidence: number;
  reasoning: string;
}

// 👇 Add this line to re-export the Tool type
export type { Tool } from "./tools/tool";
