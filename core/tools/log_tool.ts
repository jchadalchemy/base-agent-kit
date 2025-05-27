// File: core/tools/log_tool.ts

export const LogTool = {
    run: async ({ message }: { message: string }) => {
      console.log(`[LogTool] ${message}`);
    }
  };
  