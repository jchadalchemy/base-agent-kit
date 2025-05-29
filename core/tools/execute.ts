// File: core/tools/execute.ts

import { Tool } from "../types";

export async function executeTool(
  toolId: string,
  args: Record<string, any>,
  tools: Tool[]
): Promise<string> {
  const tool = tools.find((t) => t.id === toolId);
  if (!tool) {
    console.error(`[ToolExecutor] ❌ Tool "${toolId}" not found.`);
    return `❌ Tool "${toolId}" not found.`;
  }

  try {
    const result = await tool.run(args);
    return result;
  } catch (err: any) {
    console.error(`[ToolExecutor] ❌ Error running tool "${toolId}":`, err);
    return `❌ Error running tool "${toolId}": ${err.message || err}`;
  }
}
