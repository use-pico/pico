# `@use-pico/cls`

## Introduction ✨ <a id="introduction"></a>

`@use-pico/cls` is a class-first styling system built for modern design systems and production apps. It works with existing CSS utilities (like Tailwind), _not_ CSS-in-JS. Its core ideas are: **design tokens** as first‑class citizens, **multi-slot** components, **explicit variants** with strong TypeScript guarantees, and a powerful **multi-level inheritance** model for scalable systems. ✨

- 🧱 **Contracts, not configs**: declare **tokens · slots · variants** once → get full IntelliSense everywhere
- 🎯 **Design tokens** as first-class citizens with **inheritance** and validation
- 🎛️ **Rules that read like UI**: map variant combos → slot styles with predictable overrides
- 🧩 **Extend anything**: multi‑level inheritance across tokens/slots/variants with types intact
- 🧠 **Type-safety first**: compile‑time checks across contracts, rules, and overrides
- ⚡️ **Lazy by default**: slots are computed on demand via Proxy; no wasted work
- 🚀 **Cached slots**: per-slot memoization; repeated `slot()` calls with identical inputs are near‑zero cost
- 🎨 **Runtime flexibility**: override variants/slots/tokens at `create()` time
- 🌀 **Tailwind‑native**: powered by `tailwind-merge` for sane, deduped class strings
- 📦 **Built for production**: framework‑agnostic, tiny runtime, excellent React integration
- 🧭 **Where this fits**: honest comparison with CVA, TV, Stitches, and vanilla-extract

> **Who is this for**: teams building design systems, component libraries, and apps that want predictable styling with a friendly, type-safe developer experience. 🎯

> **Note**: `cls` is not `CSS‑in‑JS`; it returns class strings and works with your existing CSS (e.g., Tailwind). No runtime style injection. 🚫

## Table of Contents 🧭
<a id="toc"></a>

- [Introduction](#introduction)
- [Chapter 1. Foundations](#chapter-1)
  - [1.1 What is `@use-pico/cls`?](#1-1-what-is)
  - [1.2 Motivation](#1-2-motivation)
  - [1.3 Install & Quick Start](#1-3-install-quick-start)
  - [1.4 Mental model: contracts, tokens, slots, variants](#1-4-mental-model)
  - [1.5 How it works (at a glance)](#1-5-how-it-works)
  - [1.6 Performance](#1-6-performance)
  
- [Chapter 2. Core API](#chapter-2)
  - [2.1 `cls(contract, definition)`](#2-1-cls)
  - [2.2 `create(options)`](#2-2-create)
  - [2.3 `extend(contract, definition)`](#2-3-extend)
  - [2.4 `use(sub)`](#2-4-use)
  - [2.5 `merge(a, b)`](#2-5-merge)
  - [2.6 `tvc(...classes)`](#2-6-tvc)
  
- [Chapter 3. Rules & Precedence](#chapter-3)
  - [3.1 `rules` callback: helpers and intent](#3-1-rules-callback)
  - [3.2 Precedence: who wins and when](#3-2-precedence)
  - [3.3 Slots and per-variant targeting](#3-3-slots-variant-targeting)
  
- [Chapter 4. Tokens, Variants, Slots](#chapter-4)
  - [4.1 Tokens](#4-1-tokens)
  - [4.2 Variants](#4-2-variants)
  - [4.3 Slots](#4-3-slots)
  - [4.4 Create-time overrides](#4-4-create-time-overrides)
  
- [Chapter 5. Inheritance System](#chapter-5)
  - [5.1 Overview](#5-1-overview)
  - [5.2 Inheritance rules (authoritative)](#5-2-inheritance-rules)
  - [5.3 Method peek (where it hooks into the API)](#5-3-method-peek)
  - [5.4 No‑code patterns](#5-4-no-code-patterns)
  - [5.5 Notes and guidance](#5-5-notes)

- [Chapter 6. React Integration](#chapter-6)
  - [6.1 Overview](#6-1-overview)
  - [6.2 `useCls` hook](#6-2-usecls-hook)
  - [6.3 `ClsProvider` context](#6-3-clsprovider-context)
  - [6.4 `withCls` HOC](#6-4-withcls-hoc)
  - [6.5 Patterns and best practices](#6-5-patterns-and-best-practices)
  - [6.6 Advanced React patterns](#6-6-advanced-react-patterns)

- [Chapter 7. Advanced Features & Patterns](#chapter-7)
  - [7.1 Overview](#7-1-overview)
  - [7.2 Dynamic contracts and runtime composition](#7-2-dynamic-contracts)
  - [7.3 Conditional inheritance chains](#7-3-conditional-inheritance)
  - [7.4 Performance optimization strategies](#7-4-performance-optimization)
  - [7.5 Integration patterns](#7-5-integration-patterns)
  - [7.6 Advanced rules patterns](#7-6-advanced-rules-patterns)
  - [7.7 Anti-patterns and what to avoid](#7-7-anti-patterns)

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

Why another styling library? Because as projects grow, the tiny decisions add up: a class swapped here, a variant misspelled there, a theme forked "just for now". After a while, you can't tell what wins, or why.

- **Fewer surprises**: types flag the "did you mean...?" moments before you hit save.
- **Clear order of operations**: the same inputs always lead to the same classes.
- **Grows with you**: inheritance means you can add layers without losing your footing.
- **Feels like the UI**: rules read like the component you're styling.
- **Theme without branching**: change tokens, not components.
- **Compose without fear**: `use(sub)` lets you plug pieces together safely.
- **Fits real React code**: `useCls` and `withCls` work with common file and export patterns.

_Net effect: fewer "how did we get here?" moments, more time shipping UI you can trust._

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
      rule({ size: ["sm"] }, { root: classes(["px-2", "py-1", "text-sm"]) }),
      rule({ size: ["md"] }, { root: classes(["px-4", "py-2", "text-base"]) }),
      rule({ intent: ["primary"] }, { root: classes(["bg-blue-600", "text-white"]) }),
    ],
    defaults: { size: ["md"], intent: ["neutral"] },
  },
);

// Usage
const a = Button.create();
a.root(); // "inline-flex items-center rounded px-4 py-2 text-base"

const b = Button.create({ variant: { size: ["sm"], intent: ["primary"] } });
b.root(); // "inline-flex items-center rounded px-2 py-1 text-sm bg-blue-600 text-white"
```

> **What to expect next**: ➡️ Chapter 2 covers the core API (`cls`, `extend`, `create`, `merge`, `use`, `tvc`). Chapter 3 explains the rule helpers and precedence. Then we dive into tokens, variants, slots, and inheritance, followed by React integration, theming, and recipes.¥

<a id="1-5-how-it-works"></a>
### 1.5 How it works (at a glance) 🧭

- You describe a component's shape with a **contract** (tokens · slots · variants).
- You provide concrete **definitions** (token classes, rules, defaults).
- At `create()` time, the library walks the rules, applies matches, and builds class strings per slot.
- **Variants can target specific slots**: rules apply per-slot, so a variant can tweak `label` without touching `root`, and vice‑versa.
- Classes are deduped and normalized so that "last wins" is consistent.

> **Note**: under the hood `cls` uses `tailwind-merge` for class string merging. `tvc` is exposed as a direct re-export for when you need it.

<a id="1-6-performance"></a>
### 1.6 Performance ⚡️

High-level, work is split between the one-time `create()` call and each `slot()` call.

- **`create()` cost (one-time per instance)**
  - Walks the inheritance chain to build indexes (tokens, rules, defaults, slots).
  - Computes a token lookup table with correct replace/append semantics.
  - Gathers all rules from every layer. No slot classes are generated yet.
  - Complexity roughly scales with: number of layers, tokens, rules, and slots.

- **`slot()` cost (per call)**
  - Merges effective variants (defaults → `create().variant` → per-call overrides).
  - Scans the full rule list, checks matches, and applies only the entries for this slot.
  - Resolves any referenced tokens via the precomputed token table (cheap lookups).
  - Applies `slot` appends and `override` hard overrides from `create()` options.
  - Runs `tailwind-merge` at the end to normalize/dedupe class strings.
  - Dominant work here is "iterate rules + merge classes". The `tvc` pass is linear in class count.
  - ⚡️ **Memoized per slot**: results are cached by variant overrides; repeated calls with identical inputs are near‑zero cost.

Practical guidance:

- **Prefer calling `create()` once per render** and then use many `slot()` calls. `create()` does more upfront work; `slot()` does the cheaper per-slot computation.
- **In loops**, avoid `create()` inside the tightest loop unless variants truly differ per item. If they do, it's expected but that's where cost concentrates.
- **Know the cache model**: each `slot()` has its own cache, and each `create()` call creates fresh slot functions (with fresh caches). Repeated calls with identical inputs are extremely fast.
- **Keep rules purposeful**: many tiny rules are fine, but remember each `slot()` scans the list. Coarser rules or fewer combinations reduce per-call work.
- **Tokens are inexpensive**: token classes are fetched from a prebuilt map; using tokens does not add significant overhead.

> **Note**: class normalization uses `tailwind-merge` (exposed as `tvc`). There's no extra layer on top — it's a direct re-export.

---

<a id="chapter-2"></a>
## Chapter 2. Core API 🔧

This is the quick map of the surface area you'll use daily.

<a id="2-1-cls"></a>
### 2.1 `cls(contract, definition)`

- **What it does**: creates a `cls` instance from a contract and definition.
- **Returns**: an object with `create()`, `extend()`, `use()`, and `contract`.
- **Contract**: `{ tokens, slot, variant }` describe structure.
- **Definition**: `{ token, rules, defaults }` provide values and behavior.

```ts
import { cls } from "@use-pico/cls";

const Button = cls({ /* contract */ }, { /* definition */ });
```

<a id="2-2-create"></a>
### 2.2 `create(options)`

- **What it does**: resolves classes for each slot using defaults + your overrides.
- **Options**: `{ variant?, slot?, override?, token? }`.
- **Precedence**: base → variant rules → slot appends → hard overrides.

```ts
const b = Button.create({ variant: { size: ["sm"] } });
b.root();
```

<a id="2-3-extend"></a>
### 2.3 `extend(contract, definition)`

- **What it does**: creates a derived `cls` with added/overridden tokens/slots/variants.
- **Why**: build a lineage (e.g., `Button` → `PrimaryButton` → `IconButton`).
- **Types stay intact** across generations.

```ts
const PrimaryButton = Button.extend({ /* contract delta */ }, { /* definition delta */ });
```

<a id="2-4-use"></a>
### 2.4 `use(sub)`

- **What it does**: narrows a `cls` to a specific derived subtype for composition.
- **Why**: safely plug a child `cls` where a parent shape is expected (React composition, etc.).

```ts
function Toolbar({ button }: { button: ReturnType<typeof Button.use<typeof PrimaryButton>> }) { /* ... */ }
```

<a id="2-5-merge"></a>
### 2.5 `merge(a, b)`

- **What it does**: pre-compose two `create()` configs; later values win.
- **Use case**: library defaults + app overrides merged into a single options object.

```ts
import { merge } from "@use-pico/cls";
const opts = merge({ variant: { size: ["sm"] } }, { variant: { intent: ["primary"] } });
Button.create(opts);
```

<a id="2-6-tvc"></a>
### 2.6 `tvc(...classes)`

- **What it is**: a direct re-export of `tailwind-merge` with no alterations.
- **Why**: normalize/dedupe classes when you must concatenate manually.

```ts
import { tvc } from "@use-pico/cls";
const clsName = tvc("px-2 px-4", "text-sm"); // "px-4 text-sm"
```
 
---

<a id="chapter-3"></a>
## Chapter 3. Rules & Precedence 🎛️

<a id="3-1-rules-callback"></a>
### 3.1 `rules` callback: helpers and intent

The `rules` callback is where you describe styling in small, readable steps. It returns an array of steps created by helper functions:

- **`root(slotMap, override?)`**: base styles; `override: true` clears classes collected so far for targeted slots.
- **`rule(match, slotMap, override?)`**: conditional styles applied when `match` (e.g., `{ size: "sm" }`) is satisfied.
- **`classes(className, tokens?)`**: ergonomic helper to supply `class` and optional `token` together.

> **Intent**: keep rule authoring simple, make variant intent obvious, and let types guide you to valid slots/tokens/variants.

<a id="3-2-precedence"></a>
### 3.2 Precedence: who wins and when

From lowest to highest within a single `create()` call:

1. Base `root(...)` rules
2. Matching `rule(...)` steps (in authoring order)
3. `slot` appends from `create({ slot: ... })`
4. `override` hard overrides from `create({ override: ... })` or `root/ rule` with `override: true`
5. Final class normalization via `tvc`

Across inheritance layers, parent rules run first, then child rules, etc., preserving author order per layer.

<a id="3-3-slots-variant-targeting"></a>
### 3.3 Slots and per-variant targeting

Every rule targets a map of slots. That means variants can adjust individual slots without affecting others.

Examples in words:

- "When `size` is `sm`, make `root` padding smaller; leave `label` alone."
- "When `intent` is `primary`, apply `color` tokens to `root` and add weight to `label`."

This keeps styling changes local and predictable, and mirrors how components are structured.

---

<a id="chapter-4"></a>
## Chapter 4. Tokens, Variants, Slots 🎨

<a id="4-1-tokens"></a>
### 4.1 Tokens

- **What**: semantic class lists referenced by name (e.g., `color.text.default`).
- **Why**: change themes without editing rules; reuse across components.
- **Where**: declared in `contract.tokens`, values provided in `definition.token`.
- **Inheritance semantics**: if a child contract re-declares a token value, that value is a *REPLACE*; otherwise the child *APPENDS*.
- **Create-time overrides**: `create({ token: { group: { value: ["...classes"] } } })` replaces that token's class list for the instance.

<a id="4-2-variants"></a>
### 4.2 Variants

- **What**: typed switches (e.g., `size: ["sm","md","lg"]`, `disabled: ["bool"]`).
- **Defaults**: each layer declares `defaults`; later layers can change them.
- **Use in rules**: `rule({ size: ["sm"] }, ...)` or `rule({ disabled: true }, ...)`.
- **Merging**: variant domains union across inheritance; defaults follow last layer.

<a id="4-3-slots"></a>
### 4.3 Slots

- **What**: named parts of a component (e.g., `root`, `label`, `icon`). Each slot returns a class string.
- **Rules target slots**: pass a slot map to `root(...)`/`rule(...)`.
- **Usage**: `const c = Button.create(); c.root(); c.label();`
- **Composition**: using slots makes partial overrides ergonomic at `create()` time.

<a id="4-4-create-time-overrides"></a>
### 4.4 Create-time overrides

- **variant**: set or change variant values for an instance.
- **slot**: append to specific slot classes after rules.
- **override**: hard replace a slot's classes, ignoring earlier steps.
- **token**: replace selected token values for this instance.
- **Order**: base → rules → slot → override; tokens resolve where referenced.

---

<a id="chapter-5"></a>
## Chapter 5. Inheritance System 🧬

<a id="5-1-overview"></a>
### 5.1 Overview

Inheritance lets you stack intent across layers: `Base` → `Child` → `Grandchild`. Each layer can add tokens, slots, variants, rules, and adjust defaults — while preserving types.

> Use cases: platform theming, product skins, brand variations, component specializations.

<a id="5-2-inheritance-rules"></a>
### 5.2 Inheritance rules (authoritative)

- **Evaluation order**: parent rules run first, then children — preserving each layer's authoring order.
- **Tokens**:
  - If a child contract re‑declares a token value, that value is a REPLACE at that layer.
  - If not re‑declared, the child APPENDS classes to that token value.
  - Create-time token overrides always replace just the specified values for the instance.
- **Variants**:
  - Domains merge by union across layers (you can add new values in children).
  - Defaults are re-stated each layer; last layer wins for the instance's base.
- **Slots**:
  - The slot list is the union of all layers.
  - Rules can target any slot present in the union.
- **Rules**:
  - Collected from each layer in order: parent → child → grandchild.
  - Authoring order within each layer is preserved.
  - `override: true` in a rule step clears classes collected so far for targeted slots.
- **Create-time precedence** (per slot): base → rules → slot appends → hard overrides.

<a id="5-3-method-peek"></a>
### 5.3 Method peek (where it hooks into the API)

Cross-link: see [2.3 `extend(contract, definition)`](#2-3-extend) and [2.4 `use(sub)`](#2-4-use).

- **`extend(...)`** wires the inheritance chain by storing references to parent contract and definition. When you later call `create()`, the library walks this chain to build the combined indexes (tokens, rules, defaults, slots) in parent→child order.
- **`use(sub)`** lets you assign a derived `cls` where a parent shape is expected — a safe, typed narrowing for composition.

> Think of `extend` as building the family tree, and `create()` as reading it top-to-bottom at call time.

<a id="5-4-no-code-patterns"></a>
### 5.4 No‑code patterns

Common real-life hierarchies you can model without changing code structure:

- **Branding**: `BaseButton` → `BrandButton` (tokens override colors) → `CampaignButton` (rules adjust prominence).
- **Product tiers**: `BaseCard` → `ProCard` → `EnterpriseCard` (variants added per tier; defaults differ).
- **Platform skins**: `BaseInput` → `MobileInput` (slot spacing) → `iOSInput` (token tweaks).

Guidance:

- Prefer token changes for theme/brand differences; reach for rules when layout or structure changes.
∆- Keep every layer's `defaults` explicit for quick auditing.
- Avoid duplicating parent rules; add small deltas instead.

<a id="5-5-notes"></a>
### 5.5 Notes and guidance

- Re-state defaults at each layer so intent is visible where you read.
- Prefer tokens for theme-like differences; prefer rules for structural differences.
- Keep child layers focused: add/override what you need; avoid duplicating parent rules.

---

<a id="chapter-6"></a>
## Chapter 6. React Integration ⚛️

<a id="6-1-overview"></a>
### 6.1 Overview

`@use-pico/cls` provides React-specific utilities that make styling components feel natural and type-safe. The integration includes hooks, context providers, and higher-order components designed to eliminate the gap between your `cls` definitions and React components.

> **Key benefits**: Type-safe styling, no prop drilling, automatic re-renders on theme changes, and seamless integration with existing component patterns.

<a id="6-2-usecls-hook"></a>
### 6.2 `useCls` hook

The primary hook for consuming `cls` instances in React components:

```tsx
import { useCls } from '@use-pico/cls/react';

function Button({ variant = 'default', children }) {
  const cls = useCls(ButtonCls);
  
  return (
    <button className={cls.create({ variant }).root()}>
      {children}
    </button>
  );
}
```

**Features**:
- **Automatic re-renders**: When the `ClsProvider` context changes, components using `useCls` automatically update.
- **Type safety**: Full TypeScript support with your contract definitions.
- **Performance**: Hooks into React's context system for efficient updates.

<a id="6-3-clsprovider-context"></a>
### 6.3 `ClsProvider` context

The context provider that enables theme switching and global styling overrides:

```tsx
import { ClsProvider } from '@use-pico/cls/react';

function App() {
  return (
    <ClsProvider>
      <YourApp />
    </ClsProvider>
  );
}
```

**Use cases**:
- **Theme switching**: Change between light/dark modes, brand variations, or product tiers.
- **Global overrides**: Apply system-wide styling adjustments without component changes.
- **Context isolation**: Multiple providers can coexist for different styling contexts.

<a id="6-4-withcls-hoc"></a>
### 6.4 `withCls` HOC

The higher-order component that attaches `cls` instances directly to React components, eliminating export pollution and enabling tight coupling:

```tsx
import { withCls } from '@use-pico/cls/react';

const Button = withCls(ButtonCls)(function Button({ variant = 'default', children }) {
  return (
    <button className={Button.cls.create({ variant }).root()}>
      {children}
    </button>
  );
});
```

**Why it exists**:
- **Export pollution prevention**: UI libraries can export only the component, not both `Button` and `ButtonCls`.
- **Tight coupling**: The component and its styling are inherently connected — they're designed together.
- **Developer experience**: Access styling directly from the component: `Button.cls.create().root()`.

**Phantom properties**:
- **`~slots`**: Access to slot definitions for type checking and tooling.
- **`~contract`**: The contract shape for validation.
- **`~definition`**: The styling definition for inspection.

> **Note**: These properties exist only at type-checking time and are not available at runtime.

<a id="6-5-patterns-and-best-practices"></a>
### 6.5 Patterns and best practices

**File organization**:
```
components/
  Button/
    ButtonCls.ts      # Styling definition
    Button.tsx        # React component (imports ButtonCls)
    index.ts          # Export only Button
```

**Component composition**:
```tsx
// ButtonCls.ts
export const ButtonCls = cls(buttonContract, buttonDefinition);

// Button.tsx
import { ButtonCls } from './ButtonCls';
export const Button = withCls(ButtonCls)(function Button({ ... }) {
  // Component implementation
});

// Usage
<Button variant="primary" size="large" />
```

**Theme switching**:
```tsx
function ThemeToggle() {
  const { setTheme } = useClsContext();
  
  return (
    <button onClick={() => setTheme('dark')}>
      Switch to Dark Mode
    </button>
  );
}
```

<a id="6-6-advanced-react-patterns"></a>
### 6.6 Advanced React patterns

**Conditional styling with state**:
```tsx
function InteractiveButton({ isActive, children }) {
  const cls = useCls(ButtonCls);
  
  return (
    <button 
      className={cls.create({ 
        variant: isActive ? 'active' : 'default' 
      }).root()}
    >
      {children}
    </button>
  );
}
```

**Dynamic slot targeting**:
```tsx
function ComplexButton({ icon, label, showBadge }) {
  const cls = useCls(ButtonCls);
  
  return (
    <button className={cls.create().root()}>
      {icon && <span className={cls.icon()}>{icon}</span>}
      <span className={cls.label()}>{label}</span>
      {showBadge && <span className={cls.badge()}>New</span>}
    </button>
  );
}
```

**Composition with other styling systems**:
```tsx
function HybridButton({ className, ...props }) {
  const cls = useCls(ButtonCls);
  
  return (
    <button 
      className={cls.create().root()}
      style={{ /* CSS custom properties */ }}
      {...props}
    />
  );
}
```

---

<a id="chapter-7"></a>
## Chapter 7. Advanced Features & Patterns 🚀

<a id="7-1-overview"></a>
### 7.1 Overview

Beyond the core API lies a world of advanced patterns and sophisticated use cases. This chapter explores complex inheritance scenarios, dynamic styling, performance optimizations, and integration patterns that unlock the full potential of `@use-pico/cls`.

> **When to use**: Advanced users building complex design systems, performance-critical applications, or integrating with other styling solutions.

> **💡 Pro tip**: Always use `as const` when defining contracts and variants to get proper TypeScript type inference and prevent accidental mutations.

<a id="7-2-dynamic-contracts"></a>
### 7.2 Dynamic contracts and runtime composition

Create contracts that adapt based on runtime conditions or user preferences:

```tsx
// Dynamic contract based on user role
function createUserContract(userRole: 'admin' | 'user' | 'guest') {
  const baseContract = {
    tokens: { color: 'primary', spacing: 'medium' },
    slots: ['root', 'content'],
    variants: { size: ['small', 'medium', 'large'] } // ✅ Always use arrays for variants
  } as const;

  if (userRole === 'admin') {
    return {
      ...baseContract,
      tokens: { ...baseContract.tokens, color: 'admin' },
      variants: { ...baseContract.variants, size: ['medium', 'large', 'xl'] }
    } as const;
  }

  return baseContract;
}

// Usage
const userCls = cls(createUserContract('admin'), userDefinition);
const guestCls = cls(createUserContract('guest'), userDefinition);
```

**Use cases**:
- **Role-based theming**: Different visual treatments for admin vs. regular users
- **Feature flags**: Enable/disable styling variants based on feature availability
- **Runtime configuration**: Adapt styling based on device capabilities or user preferences

<a id="7-3-conditional-inheritance"></a>
### 7.3 Conditional inheritance chains

Build inheritance hierarchies that branch based on conditions:

```tsx
// Base styling for all buttons
const BaseButton = cls(buttonContract, baseButtonDefinition);

// Platform-specific styling
const WebButton = BaseButton.extend(webButtonContract, webButtonDefinition);
const MobileButton = BaseButton.extend(mobileButtonContract, mobileButtonDefinition);

// Feature-specific variations
const ProButton = WebButton.extend(proButtonContract, proButtonDefinition);
const EnterpriseButton = WebButton.extend(enterpriseButtonContract, enterpriseButtonDefinition);

// Runtime selection
function getButtonCls(platform: 'web' | 'mobile', tier: 'basic' | 'pro' | 'enterprise') {
  if (platform === 'mobile') {
    return tier === 'basic' ? MobileButton : MobileButton.extend(proButtonContract, proButtonDefinition);
  }
  
  if (tier === 'enterprise') return EnterpriseButton;
  if (tier === 'pro') return ProButton;
  return WebButton;
}
```

**Benefits**:
- **Conditional styling**: Different inheritance paths based on runtime conditions
- **Feature gating**: Enable advanced styling only when features are available
- **Platform optimization**: Tailor styling to specific platforms or contexts

<a id="7-4-performance-optimization"></a>
### 7.4 Performance optimization strategies

Optimize your `@use-pico/cls` usage for performance-critical scenarios:

**Memoization patterns**:
```tsx
import { useMemo } from 'react';

function OptimizedButton({ variant, size, className }) {
  // Memoize the cls instance to avoid recreation on every render
  const buttonCls = useMemo(() => {
    return ButtonCls.create({ variant, size });
  }, [variant, size]);

  return (
    <button className={buttonCls.root()}>
      {/* Button content */}
    </button>
  );
}
```

**Batch operations**:
```tsx
// Instead of multiple individual calls
const cls = ButtonCls.create();
const rootClass = cls.root();
const iconClass = cls.icon();
const labelClass = cls.label();

// Batch all slot calls at once
const classes = cls.create().allSlots();
// Returns: { root: '...', icon: '...', label: '...' }
```

**Lazy evaluation**:
```tsx
// Only create cls instances when actually needed
function LazyButton({ variant, children }) {
  const getClasses = useCallback(() => {
    return ButtonCls.create({ variant });
  }, [variant]);

  return (
    <button className={getClasses().root()}>
      {children}
    </button>
  );
}
```

<a id="7-5-integration-patterns"></a>
### 7.5 Integration with other styling systems

Combine `@use-pico/cls` with existing styling solutions:

**CSS Modules integration**:
```tsx
import styles from './Button.module.css';

const Button = withCls(ButtonCls)(function Button({ variant, className, ...props }) {
  return (
    <button 
      className={clsx(
        Button.cls.create({ variant }).root(),
        styles.button,
        className
      )}
      {...props}
    />
  );
});
```

**Styled-components compatibility**:
```tsx
import styled from 'styled-components';

const StyledButton = styled.button`
  /* Base styles from styled-components */
  ${props => props.theme.button.base}
  
  /* Dynamic classes from @use-pico/cls */
  &.${ButtonCls.create({ variant: 'primary' }).root()} {
    /* Primary-specific overrides */
  }
`;
```

**CSS-in-JS hybrid approach**:
```tsx
function HybridButton({ variant, customStyles }) {
  const cls = useCls(ButtonCls);
  
  return (
    <button 
      className={cls.create({ variant }).root()}
      style={{
        // CSS custom properties for dynamic values
        '--button-accent': customStyles.accent,
        '--button-radius': customStyles.radius,
      }}
    >
      {/* Button content */}
    </button>
  );
}
```

<a id="7-6-advanced-rules-patterns"></a>
### 7.6 Advanced rules patterns

Leverage the full power of the rules system for complex styling logic:

**Multi-variant rules**:
```tsx
const ComplexButton = cls(buttonContract, {
  // ... other definition properties
  rules: ({ root, rule, classes }) => [
    // Complex multi-variant combinations
    rule(
      { variant: 'primary', size: 'large', disabled: true },
      classes('bg-blue-600 text-white text-lg px-8 py-4 opacity-50 cursor-not-allowed')
    ),
    
    // Conditional rules based on variant combinations
    rule(
      { variant: 'secondary', size: 'small' },
      classes('bg-gray-200 text-gray-800 text-sm px-3 py-1')
    ),
    
    // Fallback rules with partial matches
    rule(
      { variant: 'primary' },
      classes('bg-blue-500 text-white')
    ),
  ]
});
```

**Conditional rule application**:
```tsx
const ConditionalButton = cls(buttonContract, {
  rules: ({ root, rule, classes }) => [
    // Apply different rules based on variant combinations
    rule(
      { variant: 'primary', size: 'large' },
      classes('bg-blue-600 text-white text-lg px-8 py-4')
    ),
    
    // Fallback rules with partial matches
    rule(
      { variant: 'primary' },
      classes('bg-blue-500 text-white')
    ),
    
    // Default fallback
    rule(
      {},
      classes('bg-gray-500 text-white px-4 py-2')
    )
  ]
});
```

**Slot-specific variant rules**:
```tsx
const AdvancedCard = cls(cardContract, {
  rules: ({ root, rule, classes }) => [
    // Root-level rules
    root({ variant: 'elevated' }, classes('shadow-lg border-0')),
    root({ variant: 'outlined' }, classes('shadow-none border-2')),
    
    // Header slot rules
    rule(
      { variant: 'elevated' },
      { header: classes('bg-gradient-to-r from-blue-500 to-purple-600 text-white') }
    ),
    
    // Content slot rules
    rule(
      { variant: 'outlined' },
      { content: classes('border-l-4 border-blue-500 pl-4') }
    )
  ]
});
```

<a id="7-7-anti-patterns"></a>
### 7.7 Anti-patterns and what to avoid

> **💡 Important**: Always use arrays for variant values, even single ones, to maintain type safety and consistency.

**❌ Dynamic rule generation (breaks typing)**:
```tsx
// DON'T DO THIS - Object.entries() destroys type information
function createResponsiveRules(breakpoints) {
  return ({ root, rule, classes }) => [
    ...Object.entries(breakpoints).map(([breakpoint, styles]) =>
      rule(
        { breakpoint }, // ❌ 'breakpoint' becomes 'string' instead of literal union
        classes(styles)
      )
    )
  ];
}
```

**✅ Proper approach - explicit variant definitions**:
```tsx
const ResponsiveButton = cls(buttonContract, {
  variants: {
    breakpoint: ['sm', 'md', 'lg', 'xl'] as const
  },
  rules: ({ root, rule, classes }) => [
    rule({ breakpoint: 'sm' }, classes('text-xs px-2 py-1')),
    rule({ breakpoint: 'md' }, classes('text-sm px-4 py-2')),
    rule({ breakpoint: 'lg' }, classes('text-base px-6 py-3')),
    rule({ breakpoint: 'xl' }, classes('text-lg px-8 py-4'))
  ]
});
```

**❌ Single string variants (inconsistent)**:
```tsx
// DON'T DO THIS
const BadButton = cls(buttonContract, {
  variants: {
    size: 'large' // ❌ Should be ['large']
  }
});
```

**✅ Array-based variants (consistent)**:
```tsx
// DO THIS
const GoodButton = cls(buttonContract, {
  variants: {
    size: ['large'] as const // ✅ Consistent with multi-value variants
  }
});
```

**Why arrays for everything**:
- **Consistency**: All variants follow the same pattern
- **Type safety**: TypeScript can properly infer literal union types
- **Extensibility**: Easy to add more values later
- **Pattern matching**: Consistent with how variants are used in rules
