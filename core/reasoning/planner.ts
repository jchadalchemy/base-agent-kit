// File: core/reasoning/planner.ts

import { ToolPlan } from "../types";

export class Planner {
  async plan(input: any, config: any): Promise<ToolPlan> {
    const text = input.text || "No input";
    return {
      tool: "log",
      arguments: {
        message: `Planning based on input: ${text}`
      },
      confidence: 1,
      reasoning: "This is a default reasoning from Planner."
    };
  }
}
