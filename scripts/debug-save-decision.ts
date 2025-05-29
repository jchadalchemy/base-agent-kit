// scriptsdebug-save-decision.ts
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);

(async () => {
  const payload = {
    agent_id: "debug-agent",
    input_text: "Test input for debug",
    tool_used: "reply-draft",
    tool_args: JSON.stringify({ message: "Hello world" }),
    confidence: 0.95,
    reasoning: "Testing insert manually",
    created_at: new Date().toISOString(),
  };

  const { data, error, status } = await supabase
    .from("agent_decisions")
    .insert(payload)
    .select();

  if (error) {
    console.error("❌ Supabase insert error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
      status,
    });
  } else {
    console.log("✅ Insert succeeded. Record:", data);
  }
})();
