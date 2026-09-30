---
name: project-redesign-2026
description: Portfolio design history in 2026 — brutalist (Sep) replaced by minimal lowercase monospace single-column theme
metadata:
  type: project
---

**Current design (Sep 30 2026):** minimal, modeled on a reference screenshot of a personal site. IBM Plex Mono at 13px, lowercase copy, ~38rem centered column (42rem for posts/case studies), home uses a label/content grid (about / now / writing / elsewhere), monochrome light/dark, no accent colour. Header: round avatar beside name on home, a small avatar + name + nav strip elsewhere; favicon.svg is a circular crop of the character art. No arrows on links — they use `underline-link`; sections separated by hairline `<hr>`; contact links separated by ` / `. All shared styles are classes in `src/assets/global.css`; `Layout.astro` owns the `.wrap` container, header (a "← home" link on non-home pages) and footer.

**Why:** user asked to redesign the entire portfolio in the style of that reference. This supersedes the earlier brutalist redesign (Syne/Archivo, orange accent, bordered cards, uppercase), which had itself replaced the original terminal/CLI look.

**How to apply:** keep new UI lowercase, monospace, borderless and quiet. Don't reintroduce accent colours, uppercase tracking labels, heavy borders, or bordered cards.
