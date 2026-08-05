---
stack: [Rust]
description: >-
  A Brainfuck interpreter in Rust: all eight commands, file input, and an
  optional debug mode that dumps raw byte output.
---

## The problem

Brainfuck is a language with exactly eight commands, designed to challenge and amuse programmers. Building an interpreter for it is a compact way to practice parsers, tape semantics, and error handling in a new language — no framework, no dependencies, just the spec.

## How it works

The interpreter reads a `.bf` file and executes the full command set: `>`, `<`, `+`, `-`, `.`, `,`, `[`, and `]`. Loops are bracket-matched: `[` executes while the current cell is non-zero, `]` jumps back while non-zero. A `--debug` flag prints the raw output as a vector of bytes instead of ASCII — useful when a program manipulates values that aren't printable.

## Decisions worth explaining

- **The command table is the whole spec**: eight commands, no syntax tree needed. The interesting parts are loop semantics and getting input/output exactly right — which is where interpreters for "trivial" languages actually earn their keep.
- **Debug mode as a first-class flag**: raw byte output turns a toy into a tool for verifying programs that work below the ASCII layer.
- **Input validation**: invalid commands are caught and reported. The README is honest about the one edge case: unmatched loops `[`/`]` "may produce unintended behavior" — the diagnostics story is the natural next step.

## What's next

Better diagnostics for unmatched brackets, and MIT-licensed if anyone wants to pick it up. For me it was the right-sized first Rust project: finishable in a weekend, testable, and it made the borrow checker earn its keep on a real (if small) program.
