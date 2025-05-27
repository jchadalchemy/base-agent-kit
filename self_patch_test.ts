// File: self_patch_test.ts
import { trySelfPatch } from './core/self_patch';
import { toolRegistry } from './core/tools/toolRegistry';

class MockAgent {
  name: string;
  availableTools: string[];

  constructor(name: string, availableTools: string[]) {
    this.name = name;
    this.availableTools = availableTools;
  }

  async run() {
    console.log(`[${this.name}] Starting self-patch test...`);

    // Simulated failed plan
    let plan = {
      tool: 'nonExistentTool',
      arguments: { message: 'Simulating tool failure' },
      confidence: 0.9,
      reasoning: 'Deliberately picked a broken tool'
    };

    console.log(`[${this.name}] Initial plan:`, plan);

    // Attempt to get tool (should fail)
    let tool = toolRegistry[plan.tool];
    if (!tool) {
      console.warn(`[${this.name}] Tool not found: ${plan.tool}`);
      const patchedPlan = trySelfPatch(plan, this.availableTools);

      if (patchedPlan) {
        console.log(`[${this.name}] Patched plan:`, patchedPlan);
        tool = toolRegistry[patchedPlan.tool];

        if (tool) {
          await tool.run(patchedPlan.arguments);
          console.log(`[${this.name}] Self-patch test completed successfully.`);
        } else {
          console.error(`[${this.name}] Tool still not found after patch.`);
        }
      } else {
        console.error(`[${this.name}] No valid fallback plan found.`);
      }
    }
  }
}

// 🧪 Run the test with basic tools (should fallback to 'log')
const testAgent = new MockAgent('PatchTester', Object.keys(toolRegistry));
testAgent.run();
