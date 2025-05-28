// File: core/tools/reply_draft_tool.ts

import OpenAI from "openai";
import { Tool } from "../types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const ReplyDraftTool: Tool = {
  id: "reply-draft",

  async run(args: { message?: string; body?: string }) {
    const message = args.message || args.body;

    if (!message) {
      console.warn("[ReplyDraftTool] No valid message provided.");
      return "[AutoReply] Sorry, I couldn't find the original message to respond to.";
    }

    const prompt = `
You are an executive assistant helping a professional reply to a message.

Original message:
"${message}"

Write a polite, professional response. Focus on clarity and helpfulness. Do not include sign-offs like "Best" or names unless explicitly requested.
Only return the body of the reply.
`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.6,
      });

      const reply = response.choices[0].message.content?.trim();
      console.log(`[ReplyDraftTool] Drafted reply:\n${reply}`);
      return reply;
    } catch (err) {
      console.error("[ReplyDraftTool] Failed to generate reply:", err);
      return "[AutoReply] Sorry, I had trouble drafting a response at this time.";
    }
  },
};
