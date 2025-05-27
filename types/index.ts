// File: types/index.ts

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
