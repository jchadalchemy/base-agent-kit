# Changelog

All notable changes to the Base Agent Kit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## \[v0.5-foundation-rebuild] - 2025-05-27

### Added

* Reconstructed core system after data wipe
* Agent Supervisor with sequential execution
* Working agent loop for `Review Agent`, `Inbox Strategist`, and `Calendar Agent`
* Static planner with default reasoning logic
* `toolRegistry` with `LogTool`, `ReplyDraftTool`, and `CalendarTool`
* `resolveTool()` for alias mapping (e.g., `email-response` → `reply-draft`)
* `trySelfPatch()` fallback mechanism for tool recovery
* Self-healing test harness (`agent_sanity_test.ts`) to validate routing and patching logic

### Changed

* Modularized tool loading structure for clarity

### Removed

* N/A

---

## \[Unreleased]

### Planned

* Reintegration of OpenAI-powered planner
* Memory hooks using Supabase (`recall()` and `remember()`)
* Agent-to-agent task submission support
* Agent registry from Supabase
* Constitution enforcement runtime logic
* Dashboard UI scaffolding

---

> Changelog initialized from rebuild baseline. All future updates will branch from `v0.5-foundation-rebuild`.
