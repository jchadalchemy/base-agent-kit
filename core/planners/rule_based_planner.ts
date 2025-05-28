// core/planners/rule_based_planner.ts

import { ToolInvocation } from "../types";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const useGPTFallback = true;

export const RuleBasedPlanner = {
  async plan(input: string, tools: any[]): Promise<ToolInvocation> {
    const lowerInput = input.toLowerCase();

    const replyTool = tools.find((t) => t.id === "reply-draft");
    const logTool = tools.find((t) => t.id === "log");
    const taskTool = tools.find((t) => t.id === "task-create");

    // Rule-based logic
    if (lowerInput.includes("reschedule")) {
      if (replyTool) {
        return {
          tool: replyTool.id,
          arguments: {
            message: input,
          },
          confidence: 0.9,
          reasoning: `Detected scheduling request, composing a professional reschedule reply.`,
        };
      }
    }

    if (lowerInput.includes("reply") || lowerInput.includes("respond")) {
      if (replyTool) {
        return {
          tool: replyTool.id,
          arguments: {
            message: input,
          },
          confidence: 0.95,
          reasoning: `Rule-based planner matched keyword: \"reply\" or \"respond\"`,
        };
      }
    }

    if (lowerInput.includes("delegate") || lowerInput.includes("handoff")) {
      if (taskTool) {
        return {
          tool: taskTool.id,
          arguments: {
            message: input,
            target_agent_id: "review-agent",
          },
          confidence: 0.85,
          reasoning: "Detected a request to delegate or transfer task responsibility.",
        };
      }
    }

    // GPT fallback if no rule matched
    if (useGPTFallback) {
      const toolNames = tools.map((t) => t.id).join(", ");

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a planning assistant. Based on the user's message, choose one of the following tools to call: ${toolNames}. Respond ONLY with a JSON object including: tool, arguments, confidence (0-1), and reasoning.`,
          },
          {
            role: "user",
            content: `User message: \"${input}\"`,
          },
        ],
        temperature: 0.2,
      });

      try {
        const responseText = completion.choices[0].message?.content?.trim();
        const parsed = JSON.parse(responseText || "{}");

        return {
          tool: parsed.tool || (logTool?.id ?? "log"),
          arguments: parsed.arguments || { message: input },
          confidence: parsed.confidence || 0.6,
          reasoning: parsed.reasoning || "No reasoning provided.",
        };
      } catch (err) {
        return {
          tool: logTool?.id ?? "log",
          arguments: { message: `GPT parsing failed for input: ${input}` },
          confidence: 0.3,
          reasoning: "Failed to parse GPT fallback response.",
        };
      }
    }

    // Final fallback if neither rule nor GPT matched
    return {
      tool: logTool?.id ?? "log",
      arguments: { message: `No rule matched for: ${input}` },
      confidence: 0.5,
      reasoning: "No matching rule and GPT fallback disabled.",
    };
  },
};
