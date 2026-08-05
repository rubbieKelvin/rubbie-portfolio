---
stack: [Rust]
description: >-
  A minimal CLI task manager: add, check, uncheck, rename, and remove tasks by
  stable ID, with a minimal output mode for the daily glance.
---

## The problem

I wanted a task manager that lives in the terminal. No windows, no sync, no onboarding — just add, check, remove, and a glanceable daily view.

## How it works

`progress` is a small Rust CLI. Tasks get stable IDs (`TSK-1`, `TSK-2`, …). Commands: `--add <label>` creates a task, `--task <id> --check` / `--uncheck` / `--remove` / `--rename <label>` manage it, `--task <id>` alone shows its details, and `--minimal` prints essential information about today, including pending tasks. `--help` documents everything.

## Decisions worth explaining

- **Stable task IDs instead of indexes**: references survive renames and reordering. `TSK-1` is a handle, not a position — the same reason databases don't use row numbers as keys.
- **Two output modes**: `--minimal` for the daily glance, detailed output when you need it — the CLI equivalent of a collapsed vs. expanded view.
- **Subcommand style that reads like a sentence**: `progress --task TSK-1 --check` is self-documenting in shell history and easy to compose with other commands.

## What's next

The README keeps scope deliberately small, and that's the point — it's a tool, not a platform. The ID-based command surface gives it room to grow (due dates, priorities, export) without reworking the core.
