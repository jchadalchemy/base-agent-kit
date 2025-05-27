// File: index.ts

import { runSupervisor } from "./core/loop";

async function main() {
  console.log("[Base Agent Kit] Starting agent system...");
  await runSupervisor();
}

main().catch((err) => {
  console.error("[Base Agent Kit] Unhandled error:", err);
});
