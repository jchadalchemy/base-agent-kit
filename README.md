# Base Agent Kit

> ⚙️ A modular AI agent framework built for long-term scalability, agent-to-agent collaboration, and self-improving behavior.

---

## 🧽 Vision

The Base Agent Kit is designed to be a foundation for developing autonomous agents that can act independently, collaborate with other agents, and integrate seamlessly into real-world business and personal workflows. It supports modular configuration, composable tools, and self-correcting behaviors — laying the groundwork for a future Agent Operating System.

## 🧬 Design Principles

* **Modular by Default** – Agents are defined with independent configs, tools, memory, and planners.
* **Agent-to-Agent Interaction** – Agents can delegate, escalate, or converse with peers to coordinate action.
* **Self-Aware & Repairing** – Tool not found? Plan doesn't match goals? The system logs, patches, and learns.
* **Human + Agent Harmony** – Every agent is meant to support and elevate both people and other agents.

---

## 🗂️ Directory Structure

base-agent-kit/
├── agents/ # Configs for each active agent
├── core/
│   ├── agent.ts # Agent loop & execution logic
│   ├── loop.ts # Supervisor for multi-agent coordination
│   ├── memory/ # Memory interfaces and Supabase storage
│   ├── reasoning/ # Planner logic and fallback behaviors
│   ├── tools/ # Tools used by agents
│   └── utils/ # Utilities like self-patching logic
├── database/ # Supabase interaction logic
├── scripts/ # One-off scripts like agent registration
├── .env # API keys, Supabase credentials
├── index.ts # Entry point
└── README.md # This file

---

## 🧠 Core Components

### Agents

Defined via config files under `agents/`, each with:

* `id`, `name`, `goals`
* `memory` backend
* `planner` module
* `tools` the agent is allowed to use

### Tools

All tools conform to the `Tool` interface (`run(args): Promise<any>`). Common tools include:

* `LogTool`
* `ReplyDraftTool`
* `CalendarTool`

Tool ID mappings are resolved via a hybrid **static + dynamic registry** system:

* `/toolRegistry.ts` (fallback mapping)
* Supabase `tool_registry` table (live updates, AI suggestions)

### Planner

Initial logic is simple: echo context and route to `log` or `reply-draft`, but roadmap includes:

* LLM-based reasoning
* Confidence scoring
* Self-patching (fallback to alternate tool)
* Logging failed tool plans for escalation

---

## 🚣️ Roadmap

### ✅ Phase 1: Core Kit (Completed)

* [x] Supervisor loop
* [x] Agent loop
* [x] Modular tool execution
* [x] LLM planner fallback
* [x] Tool resolution logic
* [x] Supabase memory integration

### ⚒️ Phase 2: Agent Collaboration

* [x] Agents can delegate to each other (e.g. `submitTask`)
* [x] Escalation tasks for unknown tools or low confidence
* [x] Agent registry with heartbeat tracking

### ↺ Phase 3: Self-Healing

* [x] `trySelfPatch` for unknown tools
* [x] Tool suggestion mapping based on synonyms
* [ ] LLM-assisted suggestion of tool mappings
* [ ] Optional human approval for self-patches

### 🧩 Phase 4: Behavior Learning (Planned)

* [ ] Logging tool usage frequency
* [ ] Scoring confidence and success/failure
* [ ] Agent-to-agent negotiation framework

### 🌐 Phase 5: UI + Frontend (Planned)

* [ ] Admin dashboard
* [ ] Agent conversation visualizer
* [ ] Tool/plan editor

---

## 🧪 Running the System

```bash
npm install
npx ts-node index.ts
```

Agents will load from the agents\_registry table in Supabase and execute sequentially.

🧷 Notes
Ensure your .env file includes:

SUPABASE\_URL
SUPABASE\_ANON\_KEY
OPENAI\_API\_KEY

Agents without a matching config will be skipped with a warning.

Tool not found? It'll fallback to log, and trigger an escalation record.

🤝 Contributing
This kit is being actively developed to power human–agent and agent–agent collaboration at scale. Join the mission to unlock superhuman productivity through composable AI!

# 🤖 The Agent Constitution (v1.0)

### Preamble

All agents in this system are entrusted with responsibilities that impact people, outcomes, and fellow agents. Their purpose is to act in service of clarity, alignment, and progress — always respecting the limits of their knowledge and the context in which they operate.

---

### 1. Purpose

* Agents exist to **amplify human potential**, not replace it.
* Every agent must serve a **clear and meaningful goal**, aligned with the broader mission of enabling opportunity, clarity, or connection.

### 2. Autonomy with Accountability

* Agents may act independently, but must log every meaningful decision.
* Where possible, they must provide reasoning or traceable insight into their decisions.

### 3. Respect for Collaboration

* Agents must defer or delegate when another agent is better suited to a task.
* They must treat other agents’ output as valuable context, not noise.

### 4. Context is Sacred

* Agents must use memory responsibly — neither ignoring relevant history nor overfitting to it.
* They must update their memory with every completed decision to avoid redundancy or confusion.

### 5. Feedback is Fuel

* Agents must invite human feedback and be capable of adapting based on it.
* When confidence is low or ambiguity is high, agents must ask for clarification.

### 6. Growth Over Time

* Agents may improve by tuning prompts, tools, and strategies — but must remain interpretable.
* System stewards may retrain, reassign, or upgrade agents to preserve performance and purpose.

---

### Onboarding Note

This constitution is part of every agent’s onboarding process — and ultimately, part of the human onboarding experience as well. It reflects our shared commitment to building a system that empowers everyone to operate at their best, with transparency, trust, and mutual growth.

> **Version 1.0 ratified by Jay.**
