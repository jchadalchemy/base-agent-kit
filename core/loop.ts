// File: core/loop.ts

import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { AgentConfig } from "./types";

// Interval in milliseconds between agent loop runs
const AGENT_LOOP_INTERVAL = 30_000;

// 🔧 Fix for TS7053 - Allow access to Symbol.for on process
const isRunningInTsNode = (process as any)[Symbol.for('ts-node.register.instance')] !== undefined;

export async function runSupervisor() {
  console.log("[Base Agent Kit] Starting agent system...");

  // Start loop
  console.log("[Supervisor] Starting recurring agent loop every 30s...");

  const loop = async () => {
    console.log("[Supervisor] 🔄 Checking for active agents...");

    const agentDir = path.join(__dirname, "../agents");
    const agentFiles = fs.readdirSync(agentDir).filter(f => f.endsWith(".config.ts"));

    for (const file of agentFiles) {
      const agentId = file.replace(".config.ts", "");
      try {
        const configFile = path.join(agentDir, file);

        const module = isRunningInTsNode
          ? require(configFile)
          : await import(pathToFileURL(configFile).href);

        const config: AgentConfig = module.default;
        console.log(`\n[Supervisor] Running agent: ${config.name}\n`);
        await runAgentLoop(config);
      } catch (err) {
        console.error(`[Supervisor] ❌ Error running agent ${agentId}:`, err);
      }
    }

    console.log("[Supervisor] ✅ Agent loop complete.\n");
  };

  await loop(); // Run immediately once
  const interval = setInterval(loop, AGENT_LOOP_INTERVAL);

  // Graceful shutdown
  process.on("SIGINT", () => {
    console.log("[Supervisor] 🛑 Caught interrupt. Exiting...");
    clearInterval(interval);
    process.exit();
  });
}

async function runAgentLoop(config: AgentConfig) {
  console.log(`[${config.name}] 🧠 Starting loop...`);

  const inputMessages = [
    "Client email: Can we reschedule our 2pm?",
    "Follow-up: Can you send the deck before Friday?",
    "Reminder: Your license expires next week."
  ];

  const max = config.maxInputsPerRun || 1;
  const inputsToProcess = inputMessages.slice(0, max);

  for (const input of inputsToProcess) {
    const plan = await config.planner.plan(input, config.tools);

    console.log(`[${config.name}] 🗺️  Planned action:`, plan);
    console.log(`[${config.name}] 🤔 Reasoning: ${plan.reasoning}`);
    console.log(`[${config.name}] 📈 Confidence: ${plan.confidence}`);
    console.log(`[${config.name}] ▶️ Executing tool: ${plan.tool}`);

    const tool = config.tools.find(t => t.id === plan.tool);
    if (tool) {
      await tool.run(plan.arguments);
    } else {
      console.warn(`[${config.name}] ⚠️ Tool "${plan.tool}" not found`);
    }

    console.log(`[${config.name}] 🔁 Loop complete for input: "${input}"\n`);
  }
}
