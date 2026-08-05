---
stack: [Python, Qt, WebSockets]
description: >-
  A desktop app for transferring data between machines on the same network,
  using WebSockets (RFC 6455) for full-duplex text and binary transfer.
---

## The problem

Moving data between machines on the same network usually means USB sticks, cloud round-trips, or `scp`-and-remember syntax. I wanted a desktop tool that moves text and binary data directly over the LAN, with a UI designed before the code.

## How it works

A Python + Qt desktop application. Two machines on the same network connect over **WebSockets** — a full-duplex channel over a single TCP connection, standardized as RFC 6455 — to send text and binary data. The UI was designed in Figma first, then implemented in Qt. `build.sh` / `build.ps1` set up the virtual env, install packages, compile the Qt resource file, and run the app; passing `--package` produces distributable executables for Linux and Windows.

## Decisions worth explaining

- **WebSockets over a raw socket**: full-duplex over one TCP connection, and it's a standard — no custom wire protocol to invent, document, and debug.
- **Designed before built**: the Figma file is linked from the README. The UI came first; the implementation had a target to hit instead of growing organically into a mess.
- **Scripted builds**: one command from clone to running app on both platforms, with a packaging path. Setup friction is documented as code, not tribal knowledge.

## Challenges (documented in the README, on purpose)

The repo's README lists its own known issues, which I think is the right habit — ship the limitations with the code:

- **Message queuing is not perfect**: the previous message isn't reliably triggered after the first one is sent. That's a state-machine bug in the queue/receiver path — the first thing I'd fix on a rewrite.
- **The UI freezes on large file transfers**: the transfer is blocking the UI thread. The clear fix is moving it off-thread — worker or async — so the window stays responsive while bytes move.

## What's next

Rewrite the transfer path to be asynchronous, fix the message-queue ordering, and pick the UI back up from the Figma file. The build scripts make the project easy to return to after a hiatus.
