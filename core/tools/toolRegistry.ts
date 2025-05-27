// File: core/tools/toolRegistry.ts

import { LogTool } from './log_tool';
import { CalendarTool } from './calendar_tool';
import { ReplyDraftTool } from './reply_draft_tool';

// ✅ 1. Tool Registry (actual implementations)
export const toolRegistry: Record<string, any> = {
  log: LogTool,
  calendar: CalendarTool,
  'reply-draft': ReplyDraftTool
};

// ✅ 2. Tool Alias Resolution Logic
export function resolveTool(toolId: string): { id: string; found: boolean } {
  const normalizedInput = toolId.toLowerCase();
  const toolMap: Record<string, string> = {
    "calendar_management": "calendar",
    "calendar-management": "calendar",
    "calendar": "calendar",
    "calendarmanagementtool": "calendar",
    "reschedule": "calendar",
    "scheduler": "calendar",
    "scheduling_tool": "calendar",
    "email": "reply-draft",
    "email-client": "reply-draft",
    "emailclient": "reply-draft",
    "email-reply": "reply-draft",
    "email-response": "reply-draft",
    "email-responder": "reply-draft",
    "email-communication": "reply-draft"
  };

  const normalized = toolMap[normalizedInput] || normalizedInput;
  const found = Object.values(toolMap).includes(normalized) || toolMap.hasOwnProperty(normalizedInput);

  if (!found) {
    console.warn(`[ToolRegistry] Unknown tool: '${toolId}' → defaulting to '${normalized}'`);
  }

  return { id: normalized, found };
}
