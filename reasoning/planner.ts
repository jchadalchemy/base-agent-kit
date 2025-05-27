// File: core/reasoning/planner.ts

import { AgentConfig } from "../core/agentConfig";
import { ToolPlan } from "../core/types";

export class Planner {
  async plan(input: any, config: AgentConfig): Promise<ToolPlan> {
    return {
      tool: "log",
      arguments: {
        message: `Planning based on input: ${input.text || input}`
      },
      confidence: 1,
      reasoning: "This is a default reasoning from Planner."
    };
  }
}
