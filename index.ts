// File: index.ts

import fs from "fs";
import path from "path";
import { runSupervisor } from "./core/loop";
import { AgentConfig } from "./core/types";
import { SupabaseMemory } from "./core/tools/SupabaseMemory"; // ✅ ADD THIS

console.log("[Base Agent Kit] Starting agent system...");

async function loadAgentConfigs(): Promise<AgentConfig[]> {
  const agentDir = path.resolve(__dirname, "agents");
  const files = fs.readdirSync(agentDir).filter(f => f.endsWith(".config.ts"));

  const configs: AgentConfig[] = [];

  for (const file of files) {
    const fullPath = path.join(agentDir, file);
    try {
      const module = await import(fullPath);

      // Find first export that resembles an AgentConfig
      const agentExport = Object.values(module).find(obj =>
        obj &&
        typeof obj === "object" &&
        "id" in obj &&
        "name" in obj &&
        "planner" in obj &&
        "tools" in obj
      );

      if (agentExport) {
        // ✅ Attach SupabaseMemory dynamically
        const memory = new SupabaseMemory();
        configs.push({
          ...agentExport,
          memory,
        } as AgentConfig);
      } else {
        console.warn(`[Startup] ⚠️ No valid AgentConfig found in ${file}`);
      }
    } catch (err) {
      console.error(`[Startup] ❌ Error loading ${file}:`, err);
    }
  }

  return configs;
}

(async () => {
  const agents = await loadAgentConfigs();
  console.log(`[Startup] ✅ Loaded ${agents.length} agent config(s)`);

  await runSupervisor(agents);
})();
