import { trySelfPatch } from '../core/self_patch';
import { toolRegistry, resolveTool } from '../core/tools/toolRegistry';

const mockPlannerOutputs = [
  {
    name: 'Alias Resolution Test',
    plan: {
      tool: 'email-response', // should resolve to 'reply-draft'
      arguments: { message: 'Compose response: Sure, let’s reschedule.' },
      confidence: 0.9,
      reasoning: 'Detected user is asking to reply to an email.'
    }
  },
  {
    name: 'SelfPatch Fallback Test',
    plan: {
      tool: 'banana-cannon', // unknown tool
      arguments: { message: 'This tool does not exist.' },
      confidence: 0.7,
      reasoning: 'Intentionally broken tool for self-healing validation.'
    }
  }
];

async function runTest() {
  console.log('\n==== 🧪 AGENT SANITY TEST ====');
  for (const { name, plan } of mockPlannerOutputs) {
    console.log(`\n→ ${name}`);
    let { id: resolvedToolId, found } = resolveTool(plan.tool);
    let tool = toolRegistry[resolvedToolId];

    if (!tool || !found) {
      console.warn(`[System] Tool '${plan.tool}' not found. Attempting self-patch...`);
      const fallbackPlan = trySelfPatch(plan, Object.keys(toolRegistry));
      if (fallbackPlan) {
        console.log(`[System] Self-patch succeeded. New plan:`, fallbackPlan);
        tool = toolRegistry[fallbackPlan.tool];
        if (tool) {
          await tool.run(fallbackPlan.arguments);
        } else {
          console.error(`[System] Patched tool '${fallbackPlan.tool}' still not found.`);
        }
      } else {
        console.error(`[System] No valid fallback plan found.`);
      }
    } else {
      console.log(`[System] Resolved tool: '${resolvedToolId}'`);
      await tool.run(plan.arguments);
    }
  }
  console.log('\n==== ✅ TEST COMPLETE ====');
}

runTest().catch((err) => console.error('[Test Error]', err));
