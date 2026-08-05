---
stack: [Rust, Rhai, Axum, Vue, TypeScript, Tailwind CSS, OpenAPI]
description: >-
  A file-driven HTTP client: describe requests as JSON/YAML, compose them with
  sandboxed Rhai scripts, scaffold from OpenAPI specs, and browse everything in
  an embedded web UI — built as a Rust workspace so the core is reusable as a
  library.
---

## The problem

Ad-hoc `curl` one-liners work until a flow needs multiple calls, shared variables, and repetition. I wanted HTTP exploration and light automation that is *file-driven*: describe a request once, compose it with others, and run it from the CLI or embed it in your own Rust code. No ad-hoc shell scripts.

## How it works

- **Request files** (`.json`/`.yaml`): one HTTP call per file — method, URL, query, headers, body, timeout, redirects, TLS verification.
- **Rhai scripts** (`.rhai`): scripting with `env`/`set`, `assert`, `log`, optional `persist`, and `import` of other scripts and request files. An imported request is invoked as `api::invoke(#{ user_id: "42" })`, with per-call overrides that win over the runtime map.
- **Template expansion**: `${VAR}` pulls from the runtime map (process env, `--env` files, Rhai `set`, optional persistence); dynamic `${!name}` helpers (`uuidv4`, `nanoid`, `random_username`, `now`) produce a fresh value per expansion.
- **OpenAPI 3.0.x**: `generate` scaffolds starter request files from a spec. `definitions` emits `.d.rhai` stubs so editors and language servers can autocomplete scripts.
- **Web UI**: an optional local Axum server with a Vue 3 / TypeScript / Tailwind SPA, embedded into the binary with `rust-embed`. One command: `nativedoctor web`.

## Decisions worth explaining

- **Workspace split**: `nd-core` (the library), `nd-generate` (OpenAPI import), `nd-web` (server + SPA), `nd-cli` (the binary). The core is the product — embedding `nd-core` in your own Rust code is a first-class use case, not an afterthought. `RequestFile::from_file`, `expand`, `execute`, `run_rhai_script` are the documented entry points.
- **Sandboxed scripting**: Rhai runs locked down — no arbitrary filesystem or network APIs inside scripts. HTTP happens only through imported request files and `invoke()`. Side effects stay declarative and auditable.
- **Embedded SPA**: `build.rs` runs `pnpm install` and `pnpm build` so the frontend ships inside the binary. No runtime assets to serve, no install step beyond the executable.

## Challenges & edge cases

- **OpenAPI coverage is honest**: 3.0.x is supported; 3.1 and some `$ref` patterns are rejected. Generated URLs use `${BASE_URL}` when a spec has no `servers` entry, and path `{param}` segments become `${param}` templates — the tool meets you where specs are inconsistent.
- **The web UI is explicitly a local development tool**: anyone who can reach the bind address can trigger outbound HTTP and run configured Rhai. It defaults to loopback and the README says so. Knowing the blast radius of a tool is part of building it.
- **Build complexity**: release builds pull in a full frontend toolchain unless `ND_WEB_SKIP_FRONTEND_BUILD` is set. CI (`.github/workflows/release.yml`) pins pnpm and Node 20 and builds a 4-target matrix (linux-x86_64, windows-x86_64, darwin-aarch64, darwin-x86_64) so the embedded-SPA build stays reproducible.

## What's next

The core crate API is stable enough to build on, and the documented gaps point the way: closing the OpenAPI 3.1 gap and growing the dynamic helper library. The tool already replaced my `curl`-and-pray workflows for smoke tests and API exploration.
