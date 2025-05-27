// File: core/self_patch.ts

import { resolveTool } from './tools/toolRegistry';

export function trySelfPatch(plan: any, availableTools: string[]) {
  const fallbackToolId = 'log';

  // Step 1: Try resolving the intended tool via alias mapping
  const resolved = resolveTool(plan.tool);

  if (resolved.found && availableTools.includes(resolved.id)) {
    return {
      ...plan,
      tool: resolved.id,
      reasoning: `[SelfPatch] Resolved alias '${plan.tool}' to '${resolved.id}'.`
    };
  }

  // Step 2: If resolution fails, fallback to known safe tool
  if (availableTools.includes(fallbackToolId)) {
    return {
      tool: fallbackToolId,
      arguments: {
        message: `[SelfPatch] Unknown tool '${plan.tool}'. Fallback to '${fallbackToolId}'.`
      },
      confidence: 0.5,
      reasoning: `[SelfPatch] Tool '${plan.tool}' not found. Using fallback '${fallbackToolId}'.`
    };
  }

  // Step 3: No fallback possible
  return null;
}
