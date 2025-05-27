// File: core/utils/trySelfPatch.ts
import { ToolPlan } from "../types";
import { resolveTool } from "../../toolRegistry";

export async function trySelfPatch(plan: ToolPlan): Promise<ToolPlan | null> {
  const { id: resolvedId, found } = resolveTool(plan.tool);

  if (!found) {
    console.warn(`[trySelfPatch] Could not resolve tool: ${plan.tool}`);
    return null;
  }

  return {
    ...plan,
    tool: resolvedId
  };
}
