# Base Agent Kit – Architecture Overview

This document outlines the current working architecture and implementation state of the `base-agent-kit` as of the post-recovery build. It highlights confirmed functionality, stubs, and upcoming priorities.

---

## ✅ CURRENTLY FUNCTIONING

### 🔁 Agent Execution Framework

* **Agent Supervisor (`loop.ts`)** – Sequentially activates and manages all agents
* **Agent Loop (`agent.ts`)** – Each agent plans an action, selects a tool, executes it, and logs the result
* **Agents Registered:**

  * `Review Agent`
  * `Inbox Strategist`
  * `Calendar Agent`

### 🧠 Planner

* **Default planner is active** (static logic with hardcoded fallback to `'log'`)
* Plans include:

  * Tool name (`log`)
  * Reasoning: `'This is a default reasoning from Planner.'`
  * Confidence score: `1`

### 🧰 Tool Registry

* **Static `toolRegistry`** is operational and includes:

  * `log` → `LogTool`
  * `calendar` → `CalendarTool` (placeholder)
  * `reply-draft` → `ReplyDraftTool` (placeholder)
* **Alias support via `resolveTool()`** (e.g. `email-response` → `reply-draft`) exists but is unused in current test input

### 🩹 Self-Healing System

* `trySelfPatch()` implemented
* Can resolve unknown tools to known fallback (`log`)
* **Self-healing logic is wired into agent loop** (tested manually)

### 📝 Logging Tools

* `LogTool` is fully functional and logs input directly to console

### 🔧 Tool Interface

* All tools conform to `{ run(args): Promise<any> }`

---

## ⚠️ FUNCTIONALITY PRESENT BUT UNTESTED / UNDERUTILIZED

### 🔄 Tool Aliasing

* Alias mappings are defined, but no agent input is triggering alias resolution paths

### 🧪 SelfPatch Recovery Logic

* Recovery path has been tested in isolation, but not triggered during actual planner output

### 🧰 ReplyDraftTool / CalendarTool

* Registered and scaffolded, but not triggered by any real plans

### 🧪 Tool Registry Fallback Logic

* Not actively exercised (no plan has yet failed to resolve a tool)

---

## ❌ MISSING OR NOT YET REWIRED

### 🤖 OpenAI-Driven Planner

* No LLM-based planner active
* All planning handled by static fallback logic

### 🧠 Memory

* `Memory.recall()` and `Memory.remember()` present as stubs
* No Supabase storage integrated or called in execution

### 🤝 Agent-to-Agent Collaboration

* No internal delegation (`submitTask()`), escalation, or inter-agent awareness implemented yet

### 🧾 Supabase Agent Registry

* Not wired in or called (agents defined locally or hardcoded)

### ⚖️ Constitution Enforcement

* Agent Constitution defined in README
* No enforcement engine or runtime rules integrated

### 🖥️ UI & Dashboards

* No web interface, CLI dashboard, or visual tool planner available

---

## 📌 NEXT STEPS TO ALIGN BACK TO PRE-WIPE STATE

1. ✅ Test alias resolution with planner output like `"email-response"`
2. ✅ Force planner to output invalid tool to test live `trySelfPatch()`
3. 🔄 Reconnect OpenAI-powered planner module
4. 🔄 Hook up Supabase-based memory backend
5. 🔄 Create new test agent to exercise non-log tools (e.g., FollowUp Agent)
6. 🔄 Restore inter-agent task submission framework
7. 🔄 Re-enable Supabase agent registry (if preferred over local definitions)

---

## 🧾 Summary

The current build is **functionally clean and stable**, representing a strong post-rebuild checkpoint. Core loops, fallback logic, and tool execution are in place. To restore the full pre-wipe architecture, the next step is to **re-enable dynamic planning, memory, and delegation**, followed by formalizing the agent constitution at runtime.

---

**Architecture Status as of:** May 27, 2025
