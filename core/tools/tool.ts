// File: core/tools/tool.ts

export interface Tool {
  id: string;
  run: (args: any) => Promise<any>;
}

export class LogTool implements Tool {
  id = "log";

  async run(args: any): Promise<void> {
    console.log("[LogTool]", args.message);
  }
}

export class ReplyDraftTool implements Tool {
  id = "reply-draft";

  async run(args: any): Promise<void> {
    console.log("[ReplyDraftTool] --- Draft Reply ---");
    console.log(`To: ${args.to}`);
    console.log("\n" + (args.body || args.message));
    console.log("------------------------------");
  }
}

export class CalendarTool implements Tool {
  id = "calendar";

  async run(args: any): Promise<void> {
    const time = args?.original_time || args?.old_time || args?.current_time || "unknown";
    console.log(`[CalendarTool] Rescheduling from ${time}... (simulated)`);
  }
}
