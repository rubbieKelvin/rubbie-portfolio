---
stack: [Rust, GPUI]
description: >-
  A minimal, GPU-accelerated Pomodoro timer built with Rust and GPUI — focus
  sessions, breaks, session tracking, and a dark-themed desktop UI.
---

## The problem

Pomodoro timers are everywhere, but I wanted one that felt like a native desktop citizen: fast, dark-themed, and built with the stack I'm actively learning — Rust. The name is the personality: BMO, the little robot from Adventure Time who's always ready to help you stay focused.

## How it works

A Rust desktop app on **GPUI**, a GPU-accelerated UI framework. Focus and break modes with visual indicators, session tracking (default: 4 focus sessions before a longer break), start/pause/continue and stop controls, a dark theme with custom SVG icons, and a live countdown that updates smoothly. The README is explicit that it's a work in progress — features may be incomplete and the API may change.

## Decisions worth explaining

- **GPUI over a web stack**: the whole UI is GPU-accelerated native — no browser, no JavaScript. It's also a deliberate learning bet: native desktop UI in Rust is where I want to spend time.
- **Custom SVG icons instead of an icon font**: crisp at any scale, no runtime dependency, and themable with the dark UI.
- **Session tracking as a first-class concept**: the 4-session default encodes the actual Pomodoro rhythm, not just a countdown.

## Challenges

- **Timer state under a UI framework**: start/pause/continue/stop is a small state machine that has to stay in sync with the render loop — the README honestly flags the stop button as "currently being improved."
- **Scope discipline on a WIP**: settings, notifications, persistence, and sound effects are all designed for but not yet implemented. The TODO list is in the repo — the project knows what it's not doing yet, which is how side projects stay finishable.

## What's next

The README's TODO is the roadmap: settings menu (custom durations and session count), notifications on session transitions, persistent settings across restarts, and optional sound cues. It's open for contributions.
