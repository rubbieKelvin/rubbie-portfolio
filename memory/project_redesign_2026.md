---
name: project-redesign-2026
description: Complete blog/portfolio redesign in Sep 2026 — brutalist builder aesthetic replacing terminal/CLI style
metadata:
  type: project
---

Redesigned the Rubbie Kelvin portfolio/blog from scratch in September 2026.

**Why:** User wanted a complete redesign, "nothing like what we currently have." They chose brutalist/raw aesthetic and builder & founder vibe.

**What changed:**
- Old: 3-column layout, terminal/CLI aesthetic (~ $, grep filter, monospace everywhere), yellow accent, Google Sans Code font
- New: Single-column centered layout (max-w-5xl), brutalist bold typography, orange-red accent (#cc3a00/#ff5533 light/dark), Syne 800 font for headings, Space Grotesk for body
- AppFooter moved to Layout.astro (global, no longer per-page)
- No more terminal metaphors; filter is plain "Filter" not `~ $ ls -la | grep`
- Projects shown as bordered card grid
- Blog as numbered list grouped by year
- Hero: huge viewport-filling name in Syne Black

**How to apply:** New changes go in this direction. Don't reintroduce terminal metaphors, monospace UI text, or the 3-column layout.
