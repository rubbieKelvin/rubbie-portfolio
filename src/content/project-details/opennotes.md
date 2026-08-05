---
stack: [Python, Poetry, PostgreSQL, Yarn]
description: >-
  A dead-simple notes app focused on reducing distractions, with pluggable
  editors (Markdown, Code) and a Python backend. Live at opennotes.one.
---

## The problem

Most note apps fight you with features. Notes is a "dead-simple paper for keeping notes" — the whole product bet is that distraction-free beats powerful. The README's summary: simple, extensible, open-source, minimal.

## How it works

A Python backend (Poetry-managed, PostgreSQL via psycopg2) with a web frontend served by Yarn. The frontend is **extensible with editors** — Markdown and Code are the shipped ones — so the core stays small while the tool adapts to the content you put in it. Live at [opennotes.one](https://opennotes.one/).

## Decisions worth explaining

- **Editor-as-plugin**: notes are just content; the editor is swappable. This keeps the core simple without capping the feature set — the "distraction-free" constraint becomes an architecture, not a marketing line.
- **Minimal UI as a first-class constraint**: the product is defined by what it *doesn't* show you, which is a harder design target than adding features.
- **Setup as a copy-paste path**: the README walks through venv, Poetry, and the classic psycopg2/libpq header dance (with distro-specific commands). Setup friction is documented as code, not tribal knowledge.

## What's next

The repo points at a backlog of open issues and welcomes contributions — the shape of the project is stable, and the open-source loop is where it grows next.
