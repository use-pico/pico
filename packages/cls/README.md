# @use-pico/cls

> **Stable API**: The core API of this library is stable and production-ready. Future updates may only add convenience helpers around the existing API.

> **Learning Curve**: This library has a bit of a steep learning curve, but many concepts are shared with competitors like class-variance-authority and tailwind-variants. Once you get it, you'll love the power and type safety it provides.

✨ **Design-token powered, type-safe class builder for modern UI.** Ship consistent styles without the boilerplate.

🚀 **What you'll love**

- 🧱 **Contracts, not configs**: Describe tokens, slots, and variants once — get full IntelliSense everywhere
- ⚡️ **Lazy by default**: Slots are computed on-demand via Proxy; no wasted work
- 🎛️ **Rules that read like UI**: Map variant combos → classes/tokens, with predictable override semantics
- 🧩 **Extend anything**: Inherit tokens/slots/variants across components and keep types intact
- 🌀 **Tailwind-native**: Merged with tailwind-merge (last-wins, duplicates deduped)
- 🧠 **Heavy type checking**: Compile-time validation ensures design system consistency

Perfect for design systems, component libraries, and apps that want predictable styling without sacrificing DX.

## What is @use-pico/cls?

This is a **CSS class-based styling solution** that requires existing CSS classes (like Tailwind CSS) - it's not a pure CSS-in-JS solution. It works great with TailwindCSS but isn't directly bound to it.

The library's main motivation is using **design tokens with strict type checking**. When you add a token in children with a new value, you're forced to add this value to the definition too, ensuring design system consistency.

## Install

```bash
npm i @use-pico/cls
# or
pnpm add @use-pico/cls
# or
bun add @use-pico/cls
```

## Quick Start

```ts
import { cls } from "@use-pico/cls";

const Button = cls(
  {
    tokens: {
      "primary.text": ["default", "hover"],
      "primary.bg": ["default", "hover"],
    },
    slot: ["root", "label"],
    variant: { size: ["sm", "md"], variant: ["primary", "secondary"] },
  },
  {
    token: {
      "primary.text": { default: ["text-white"], hover: ["text-blue-100"] },
      "primary.bg": { default: ["bg-blue-600"], hover: ["bg-blue-700"] },
    },
    rules: ({ root, rule }) => [
      root({
        root: { token: ["primary.bg.default"], class: ["inline-flex", "items-center"] },
        label: { token: ["primary.text.default"], class: ["font-medium"] },
      }),
      rule({ size: "sm" }, { root: { class: ["px-2", "py-1"] } }),
      rule({ size: "md" }, { root: { class: ["px-4", "py-2"] } }),
    ],
    defaults: { size: "md", variant: "primary" },
  },
);

const classes = Button.create({});
// classes.root()  => "inline-flex items-center bg-blue-600 px-4 py-2"
// classes.label() => "font-medium text-white"

const classes2 = Button.create({ variant: { size: "sm" } });
// classes2.root() => "inline-flex items-center bg-blue-600 px-2 py-1"
```

## Core Concepts

### Design Tokens

Design tokens are the foundation of your styling system - reusable values organized by groups and variants:

```ts
// Token structure: group.variant
tokens: {
  "color.text": ["default", "primary", "secondary"],
  "color.bg": ["default", "primary", "secondary"],
  "spacing.padding": ["sm", "md", "lg"]
}
```

**Heavy Type Checking**: When you reference a token in rules, TypeScript ensures it exists in your contract. Add a new token variant? You must update the definition too.

### Slots

Slots are named parts of your component that can receive independent styling:

```ts
slot: ["root", "icon", "label", "badge"]
```

Each slot becomes a function that returns CSS classes, computed lazily when accessed.

### Variants

Variants control component appearance through configurable properties:

```ts
variant: {
  size: ["sm", "md", "lg"],
  variant: ["primary", "secondary"],
  disabled: ["bool"] // Special "bool" type becomes boolean
}
```

### Rules

Rules define conditional styling based on variant combinations:

```ts
rules: ({ root, rule }) => [
  root({
    root: { class: ["base-styles"], token: ["color.bg.default"] }
  }),
  rule(
    { size: "lg", variant: "primary" },
    { root: { class: ["text-lg"], token: ["color.bg.primary"] } }
  )
]
```

## Framework-Agnostic Core

The core library is framework-agnostic and provides:

### Main API

- `cls(contract, definition)` → Create a style module
- `extend(contract, definition)` → Inherit and add/override (types flow through)
- `create(userConfig?, internalConfig?)` → Get lazily-resolved classes for each slot
- `merge(user, internal)` → Merge two create-configs (user wins)

### Helper Functions

- `classes(value)` → Tiny helper to declare `class` arrays succinctly
- `match(...)` → Typed rule builder with 2-arg (base) and 3-arg (conditional) overloads

### Inheritance System

```ts
const Base = cls(baseContract, baseDefinition);
const Extended = Base.extend(childContract, childDefinition);

// Extended inherits all tokens, slots, and variants from Base
// Child can add new ones or override inherited values
// Full type safety maintained through inheritance chain
```

### Create-time Overrides

```ts
const classes = Button.create({
  variant: { size: "sm" },           // Override variants
  slot: { root: { class: ["px-2"] } }, // Append to slots
  override: { root: { class: ["block"] } }, // Hard override
  token: { "primary.bg": { default: ["bg-red-500"] } } // Override tokens
});
```

## React Integration

### useCls Hook

For React components, use the `useCls` hook with automatic memoization:

```tsx
import { useCls } from "@use-pico/cls";
import { useMemo } from "react";

function Button({ variant = "primary", size = "md", children, ...props }) {
  const config = useMemo(() => ({
    variant: { variant, size }
  }), [variant, size]);
  
  const classes = useCls(ButtonCls, config);

  return (
    <button className={classes.root()} {...props}>
      <span className={classes.label()}>{children}</span>
    </button>
  );
}
```

### Context Integration

Provide token overrides at the app level:

```tsx
import { ClsProvider } from "@use-pico/cls";

function App() {
  return (
    <ClsProvider value={ThemedButtonCls}>
      <Button variant="primary">Uses themed tokens</Button>
    </ClsProvider>
  );
}
```

### Component Pattern

```tsx
import { TransferCls } from "./TransferCls";

export const Transfer = <TItem,>({ 
  tva = TransferCls, 
  cls, 
  groups, 
  onChange 
}: Transfer.Props<TItem>) => {
  const classes = tva.create(cls);

  return (
    <div className={classes.base}>
      <div className={classes.panel}>
        {/* Component content */}
      </div>
    </div>
  );
};
```

## Comparison with Similar Tools

| Feature | @use-pico/cls | class-variance-authority | tailwind-variants | @stitches/react | vanilla-extract |
|---------|---------------|-------------------------|-------------------|-----------------|-----------------|
| **Type Safety** | 🔥 Full compile-time validation | ✅ Basic TypeScript | ✅ TypeScript support | ✅ TypeScript | ✅ TypeScript |
| **Design Tokens** | 🔥 First-class with inheritance | ❌ No built-in support | ❌ No built-in support | ✅ CSS variables | ✅ CSS variables |
| **Inheritance** | 🔥 Multi-level with type safety | ❌ No inheritance | ❌ No inheritance | ✅ Component composition | ❌ No inheritance |
| **Framework** | 🔥 Framework-agnostic + React | ✅ Framework-agnostic | ✅ Framework-agnostic | 🔥 React-focused | ✅ Framework-agnostic |
| **CSS-in-JS** | ❌ Class-based only | ❌ Class-based only | ❌ Class-based only | 🔥 Full CSS-in-JS | 🔥 Zero-runtime CSS |
| **Performance** | 🔥 Lazy evaluation + caching | ✅ Good | ✅ Good | ✅ Good | 🔥 Build-time |
| **Bundle Size** | ✅ ~3KB gzipped | ✅ ~1KB gzipped | ✅ ~2KB gzipped | 🔥 ~8KB gzipped | ✅ ~1KB gzipped |
| **Learning Curve** | 🔥 Steep (powerful) | ✅ Easy | ✅ Easy | 🔥 Medium | 🔥 Medium |
| **Design Systems** | 🔥 Built for scale | ✅ Good for components | ✅ Good for components | 🔥 Excellent | ✅ Good |

### Why @use-pico/cls?

- **🧠 Heavy Type Checking**: Unlike other tools, this library enforces design system consistency at compile time
- **🏗️ Design Token System**: First-class support for design tokens with inheritance and validation
- **🔗 Multi-level Inheritance**: Extend components while maintaining full type safety
- **⚡ Performance**: Lazy evaluation and intelligent caching
- **🎯 Framework Agnostic**: Works with any framework, with excellent React integration

## Advanced Features

### Boolean Variants

```ts
const Toggle = cls(
  { tokens: {}, slot: ["root"], variant: { disabled: ["bool"] } },
  {
    token: {},
    rules: ({ root, rule }) => [
      root({ root: { class: ["base"] } }),
      rule({ disabled: true }, { root: { class: ["opacity-50"] } }),
    ],
    defaults: { disabled: false },
  },
);
```

### Multi-slot Components

```ts
slot: ["root", "icon", "label", "description"]
```

### Token Overrides

```ts
const classes = Button.create({
  token: {
    "primary.bg": { default: ["bg-red-500"] } // Override for this instance
  }
});
```

### Deterministic Order

Within one slot step: `class` then `token`. Across steps:
1. Base/default rules (top-down)
2. Variant matched rules (in their order)
3. `create().slot` appends
4. `create().override` replaces

All merged and deduped using `tailwind-merge`.

## Recipes

### Simple Components

```ts
import { component } from "@use-pico/cls";

export const Card = component({
  slots: ["base", "header", "content"] as const,
  slot: {
    base: { class: ["border", "rounded", "p-4"] },
    header: { class: ["font-bold", "mb-2"] },
    content: { class: ["text-sm"] },
  },
});
```

### Variant-only Components

```ts
import { variant } from "@use-pico/cls";

export const Alert = variant({
  slots: ["base", "title", "message"] as const,
  variants: { variant: ["info", "success"], clickable: ["bool"] } as const,
  rule: [
    { slot: { base: { class: ["p-2", "rounded"] } } },
    { match: { variant: "success" }, slot: { base: { class: ["bg-green-100"] } } },
  ],
  defaults: { variant: "info", clickable: false },
});
```

### Token-only Definitions

```ts
import { token } from "@use-pico/cls";

export const ThemeTokens = token({
  tokens: {
    "theme.bg": ["default", "hover"],
    "theme.text": ["default", "muted"],
  },
  token: {
    "theme.bg": { default: ["bg-blue-600"], hover: ["bg-blue-700"] },
    "theme.text": { default: ["text-white"], muted: ["text-slate-400"] },
  },
});
```

## License

MIT © use-pico
