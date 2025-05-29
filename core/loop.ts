// File: core/loop.ts

import { AgentConfig } from "./types";
import { executeTool } from "./tools/execute";

export async function runAgentLoop(agentConfig: AgentConfig) {
  console.log(`[${agentConfig.name}] 🧠 Starting loop...`);

  const input = "Client email: Can we reschedule our 2pm?"; // Placeholder or actual logic to pull input

  // ✅ Save input to Supabase
  if (agentConfig.memory?.saveInput) {
    try {
      await agentConfig.memory.saveInput(agentConfig.id, input);
    } catch (err) {
      console.error(`[${agentConfig.name}] ❌ Error saving input:`, err);
    }
  }

  const plan = await agentConfig.planner.plan(input, agentConfig.tools);

  console.log(`[${agentConfig.name}] 🗺️  Planned action:`, plan);
  console.log(`[${agentConfig.name}] 🤔 Reasoning: ${plan.reasoning}`);
  console.log(`[${agentConfig.name}] 📈 Confidence: ${plan.confidence}`);

  const result = await executeTool(plan.tool, plan.arguments, agentConfig.tools);
  console.log(`[${agentConfig.name}] 🛠️ Tool result:`, result);

  // ✅ Save decision to Supabase with logs for debugging
  if (agentConfig.memory?.saveDecision) {
    console.log(`[${agentConfig.name}] 🧪 About to call saveDecision...`);
    try {
      await agentConfig.memory.saveDecision(agentConfig.id, plan);
      console.log(`[${agentConfig.name}] ✅ saveDecision call completed.`);
    } catch (err) {
      console.error(`[${agentConfig.name}] ❌ Error saving decision:`, err);
    }
  } else {
    console.log(`[${agentConfig.name}] 🚫 No saveDecision method found`);
  }

  console.log(`[${agentConfig.name}] 🔁 Loop complete for input: "${input}"`);
}

// ✅ Add this to allow index.ts to import and run all agents
export async function runSupervisor(agents: AgentConfig[]) {
  console.log("[Supervisor] Starting recurring agent loop every 30s...");

  const loop = async () => {
    console.log("[Supervisor] 🔄 Checking for active agents...");
    for (const agent of agents) {
      console.log(`\n[Supervisor] Running agent: ${agent.name}`);
      try {
        await runAgentLoop(agent);
      } catch (err) {
        console.error(`[Supervisor] ❌ Error running agent ${agent.id}:`, err);
      }
    }
    console.log("\n[Supervisor] ✅ Agent loop complete.\n");
  };

  await loop();

  const interval = setInterval(loop, 30_000);

  process.on("SIGINT", () => {
    console.log("[Supervisor] 🛑 Caught interrupt. Exiting...");
    clearInterval(interval);
    process.exit();
  });
}
