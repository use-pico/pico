# `@use-pico/cls`

<a id="introduction"></a>
## Introduction ✨

`@use-pico/cls` is a class-first styling system built for modern design systems and production apps. It works with existing CSS utilities (like Tailwind), _not_ CSS-in-JS. Its core ideas are: **design tokens** as first‑class citizens, **multi-slot** components, **explicit variants** with strong TypeScript guarantees, and a powerful **multi-level inheritance** model for scalable systems. ✨

- 🧱 **Contracts, not configs**: declare **tokens · slots · variants** once → get full IntelliSense everywhere
- 🎯 **Design tokens** as first-class citizens with **inheritance** and validation
- 🎛️ **Rules that read like UI**: map variant combos → slot styles with predictable overrides
- 🧩 **Extend anything**: multi‑level inheritance across tokens/slots/variants with types intact
- 🧠 **Type-safety first**: compile‑time checks across contracts, rules, and overrides
- ⚡️ **Lazy by default**: slots are computed on demand via Proxy; no wasted work
- 🎨 **Runtime flexibility**: override variants/slots/tokens at `create()` time
- 🌀 **Tailwind‑native**: powered by `tailwind-merge` for sane, deduped class strings
- 📦 **Built for production**: framework‑agnostic, tiny runtime, excellent React integration
- 🧭 **Where this fits**: honest comparison with CVA, TV, Stitches, and vanilla-extract

> **Who is this for**: teams building design systems, component libraries, and apps that want predictable styling with a friendly, type-safe developer experience. 🎯

> **Note**: `cls` is not CSS‑in‑JS; it returns class strings and works with your existing CSS (e.g., Tailwind). No runtime style injection. 🚫

## Table of Contents 🧭
<a id="toc"></a>

- [Introduction](#introduction)
- [Chapter 1. Foundations](#chapter-1)
  - [1.1 What is `@use-pico/cls`?](#1-1-what-is)
  - [1.2 Motivation](#1-2-motivation)
  - [1.3 Install & Quick Start](#1-3-install-quick-start)
  - [1.4 Mental model: contracts, tokens, slots, variants](#1-4-mental-model)

---

<a id="chapter-1"></a>
## Chapter 1. Foundations 🏗️

<a id="1-1-what-is"></a>
### 1.1 What is `@use-pico/cls`? ❓

A class-based styling library that uses your existing CSS classes (e.g., Tailwind). It is _not_ CSS‑in‑JS. You declare a **contract** (tokens, slots, variants), provide a **definition** (token values, rules, defaults), and get lazily computed class functions for every slot. The system emphasizes **type safety**, **explicitness**, and **scalable inheritance**. 💡

- 🎨 **Not Tailwind-bound**, but designed to work great with it
- 🛡️ **TypeScript-first**: contracts and definitions are validated at compile time
- 🧮 **Predictable merging**: last-wins and deduplication via tailwind-merge

<a id="1-2-motivation"></a>
### 1.2 Motivation 💫

Why another styling library? Because as projects grow, the tiny decisions add up: a class swapped here, a variant misspelled there, a theme forked “just for now”. After a while, you can’t tell what wins, or why.

- **Fewer surprises**: types flag the “did you mean...?” moments before you hit save.
- **Clear order of operations**: the same inputs always lead to the same classes.
- **Grows with you**: inheritance means you can add layers without losing your footing.
- **Feels like the UI**: rules read like the component you’re styling.
- **Theme without branching**: change tokens, not components.
- **Compose without fear**: `use(sub)` lets you plug pieces together safely.
- **Fits real React code**: `useCls` and `withCls` work with common file and export patterns.

_Net effect: fewer “how did we get here?” moments, more time shipping UI you can trust._

<a id="1-4-mental-model"></a>
### 1.4 Mental model: contracts, tokens, slots, variants 🧠

- 📦 **Contract**: structure of a module
  - 🎨 **tokens**: named groups with values (e.g., `color.bg`: [`default`, `hover`]) used as semantic building blocks
  - 🧩 **slot**: parts of a component (e.g., `root`, `label`, `icon`) that each return a class string
  - 🎚️ **variant**: typed switches that alter appearance (e.g., `size`: [`sm`,`md`,`lg`], `loading`: [`bool`])
- 🛠️ **Definition**: concrete values and behavior
  - 🎯 **token**: map each token value to classes
  - 📐 **rules**: `root(...)` for base styling; `rule(match, ...)` for variant-driven deltas
  - 📌 **defaults**: required per layer to keep a single source of truth
- 🛎️ **Create-time overrides**: safely tweak a single instance (`variant`/`slot`/`override`/`token`) with clear precedence
- 🧬 **Inheritance**: `extend(...)` adds or overrides tokens/slots/variants while keeping types correct end-to-end

**Why explicit defaults**: each layer (base, child, grandchild) restates defaults so you always see the current truth in one place, which is essential in long chains. 👉 This keeps surprises low and readability high.

<a id="1-3-install-quick-start"></a>
### 1.3 Install & Quick Start 🚀

**Install**: 🚀

```bash
npm i @use-pico/cls
# or
pnpm add @use-pico/cls
# or
bun add @use-pico/cls
```

**Minimal example**: ✨

```ts
import { cls } from "@use-pico/cls";

// Contract + definition
const Button = cls(
  {
    tokens: {},
    slot: ["root"],
    variant: { size: ["sm", "md"], intent: ["primary", "neutral"] },
  },
  {
    token: {},
    rules: ({ root, rule, classes }) => [
      // Base styling
      root({ root: classes(["inline-flex", "items-center", "rounded"]) }),
      // Variant deltas
      rule({ size: "sm" }, { root: classes(["px-2", "py-1", "text-sm"]) }),
      rule({ size: "md" }, { root: classes(["px-4", "py-2", "text-base"]) }),
      rule({ intent: "primary" }, { root: classes(["bg-blue-600", "text-white"]) }),
    ],
    defaults: { size: "md", intent: "neutral" },
  },
);

// Usage
const a = Button.create();
a.root(); // "inline-flex items-center rounded px-4 py-2 text-base"

const b = Button.create({ variant: { size: "sm", intent: "primary" } });
b.root(); // "inline-flex items-center rounded px-2 py-1 text-sm bg-blue-600 text-white"
```

> **What to expect next**: ➡️ Chapter 2 covers the core API (`cls`, `extend`, `create`, `merge`, `use`, `tvc`). Chapter 3 explains the rule helpers and precedence. Then we dive into tokens, variants, slots, and inheritance, followed by React integration, theming, and recipes.
 