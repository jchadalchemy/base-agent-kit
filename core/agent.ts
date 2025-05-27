// File: core/agent.ts

import { AgentConfig } from "./agentConfig";
import { ToolPlan } from "./types";
import { submitEscalationTask } from "../database/registry";
import { trySelfPatch } from "./utils/trySelfPatch";

export class Agent {
  config: AgentConfig;

  constructor(config: AgentConfig) {
    this.config = config;
  }

  async loop(input: any): Promise<void> {
    console.log(`[${this.config.name}] Starting loop...`);

    const plan: ToolPlan = await this.config.planner.plan(input, this.config);
    console.log(`[${this.config.name}] Planned action:`, plan);

    let tool = this.config.tools.find(t => t.id === plan.tool);
    if (!tool) {
      console.warn(`[${this.config.name}] Tool not found: ${plan.tool} — attempting self-patch...`);

      const patchedPlan = await trySelfPatch(plan);
      if (patchedPlan) {
        plan.tool = patchedPlan.tool;
        tool = this.config.tools.find(t => t.id === plan.tool);
        if (tool) {
          console.log(`[${this.config.name}] Self-patch successful. Using tool: ${plan.tool}`);
        }
      }

      if (!tool) {
        console.warn(`[${this.config.name}] Tool still not found after patch attempt: ${plan.tool}`);
        await submitEscalationTask({
          from: this.config.id,
          input,
          decision: plan,
          reasoning: plan.reasoning ?? "Tool not found. Agent could not complete task."
        });
        return;
      }
    }

    console.log(`[${this.config.name}] Executing tool: ${tool.constructor.name}`);
    const result = await tool.run(plan.arguments);
    console.log(`[${this.config.name}] Loop complete.`);

    return result;
  }
}
