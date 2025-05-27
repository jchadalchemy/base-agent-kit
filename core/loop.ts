// File: core/loop.ts

import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { Agent } from "./agent";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

export async function runSupervisor() {
  console.log("[Supervisor] Fetching active agents...");

  const { data: agents, error } = await supabase
    .from("agents_registry")
    .select("*")
    .eq("status", "active");

  if (error || !agents || agents.length === 0) {
    console.error("[Supervisor] No agents to run or error fetching:", error?.message);
    return;
  }

  for (const record of agents) {
    const agentId = record.agent_id;
    const configFile = path.resolve(__dirname, `../agents/${agentId}.config.ts`);

    if (!fs.existsSync(configFile)) {
      console.warn(`[Supervisor] Config file not found for agent_id: ${agentId}`);
      continue;
    }

    try {
      const module = await import(`../agents/${agentId}.config.ts`);
      const config = module.default;
      const agent = new Agent(config);

      console.log(`[Supervisor] Running agent: ${config.name}`);
      await agent.loop({ text: "Client email: Can we reschedule our 2pm?" });
    } catch (err) {
      console.error(`[Supervisor] Failed to start agent ${agentId}:`, err);
    }
  }

  console.log("[Supervisor] All active agents complete.");
}
