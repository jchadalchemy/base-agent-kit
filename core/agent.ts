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
    console.log(`\n[${this.config.name}] 🧠 Starting loop...`);

    // Plan action with LLM-based planner
    const plan: ToolPlan = await this.config.planner.plan(input, this.config);
    console.log(`[${this.config.name}] 🗺️  Planned action:`, plan);
    console.log(`[${this.config.name}] 🤔 Reasoning: ${plan.reasoning}`);
    console.log(`[${this.config.name}] 📈 Confidence: ${plan.confidence}`);

    // Tool lookup
    let tool = this.config.tools.find(t => t.id === plan.tool);

    // Attempt fallback if tool not found
    if (!tool) {
      console.warn(`[${this.config.name}] ⚠️ Tool not found: ${plan.tool} — attempting self-patch...`);

      const patchedPlan = await trySelfPatch(plan);
      if (patchedPlan) {
        plan.tool = patchedPlan.tool;
        plan.arguments = patchedPlan.arguments;
        plan.reasoning = patchedPlan.reasoning;
        plan.confidence = patchedPlan.confidence;
        tool = this.config.tools.find(t => t.id === plan.tool);

        if (tool) {
          console.log(`[${this.config.name}] 🛠️  Self-patch successful. Using fallback tool: ${plan.tool}`);
        }
      }

      if (!tool) {
        console.warn(`[${this.config.name}] ❌ Tool still not found after patch attempt: ${plan.tool}`);
        await submitEscalationTask({
          from: this.config.id,
          input,
          decision: plan,
          reasoning: plan.reasoning ?? "Tool not found. Agent could not complete task."
        });
        return;
      }
    }

    // Execute tool
    console.log(`[${this.config.name}] ▶️ Executing tool: ${tool.constructor.name}`);
    const result = await tool.run(plan.arguments);

    // Log tool output
    if (result !== undefined) {
      console.log(`[${this.config.name}] ✅ Tool result:\n${typeof result === 'string' ? result : JSON.stringify(result, null, 2)}`);
    }

    console.log(`[${this.config.name}] 🔁 Loop complete.\n`);
    return result;
  }
}
