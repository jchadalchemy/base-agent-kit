// File: core/tools/log_tool.ts

import { Tool } from "../types";

export const LogTool: Tool = {
  id: "log",
  run: async ({ message }: { message: string }) => {
    console.log(`[LogTool] ${message}`);
  }
};
