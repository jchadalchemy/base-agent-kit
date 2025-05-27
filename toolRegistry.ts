// File: toolRegistry.ts

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
    "email-communication": "reply-draft",
    "email-responder": "reply-draft"
  };

  const normalized = toolMap[normalizedInput] || normalizedInput;
  const found = Object.values(toolMap).includes(normalized) || toolMap.hasOwnProperty(normalizedInput);

  if (!found) {
    console.warn(`[ToolRegistry] Unknown tool: '${toolId}' → defaulting to '${normalized}'`);
  }

  return { id: normalized, found };
}
