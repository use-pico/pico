# @use-pico/cls
<a id="top"></a>

> **Stable API**: The core API of this library is stable and production-ready. Future updates may only add convenience helpers around the existing API.

> **Learning Curve**: This library is designed for **real-world usage** solving **real-world problems** in **larger applications**. While it could serve simple todo apps, it's intended for **complex design systems**, **component libraries**, and **production applications** where **type safety** and **maintainability** matter. The learning curve comes with the territory, but **comprehensive documentation** and familiar concepts from competitors like class-variance-authority and tailwind-variants make it approachable. Once you get it, you'll love the **power** and **type safety** it provides.

✨ **Design-token powered, type-safe class builder for modern UI.** Ship consistent styles without the boilerplate.

> **Not CSS-in-JS**: This library is **class-first**. It plays beautifully with Tailwind (and friends) instead of generating CSS at runtime.


🚀 **What you'll love**

- 🧱 **Contracts, not configs** (tokens · slots · variants): describe once → get **full IntelliSense** everywhere (see [Glossary](#glossary-30-seconds-to-fluent))
- 🎯 **Design tokens** as first-class citizens with **inheritance** and validation (see [Token Overloading & Theming](#token-overloading--theming))
- 🎛️ **Rules that read like UI**: map variant combos → slot styles with predictable overrides (see [Create-time Overrides](#create-time-overrides))
- 🧩 **Extend anything**: multi‑level inheritance across tokens/slots/variants with types intact (see [Inheritance System](#inheritance-system) and [Inheritance rules](#inheritance-rules-authoritative))
- 🧠 **Type-safety first**: compile‑time checks across contracts, rules, and overrides (see [Core Concepts](#core-concepts))
- ⚡️ **Lazy by default**: slots are computed on demand via Proxy; no wasted work
- 🎨 **Runtime flexibility**: override variants/slots/tokens at `create()` time (see [Create-time Overrides](#create-time-overrides))
- 🌀 **Tailwind-native**: powered by tailwind-merge for sane, deduped class strings
- 📦 **Built for production**: framework‑agnostic, ~3KB gzipped, minimal runtime, excellent React integration (see [React Integration](#react-integration))
- 🧭 **Where this fits**: honest [comparison](#comparison-with-similar-tools) with CVA, TV, Stitches, and vanilla-extract

_Perfect for design systems, component libraries, and apps that want predictable styling without sacrificing DX._

> ❗ Important: Inheritance is a core part of this library. For precise behavior across tokens, variants, slots, rules, and defaults, see [Inheritance rules (authoritative)](#inheritance-rules-authoritative).

## Versioning

- This package is versioned **independently** within the `@use-pico` namespace (it may not always match sibling packages).
- Starting with **5.0.0**, releases follow **Semantic Versioning (SemVer)**.
- Prior to 5.0, there might have been a few rough edges in the core API; from 5.0 onward, any breaking change will **bump the major version**.

## What is `@use-pico/cls`?

This is a **CSS class‑based styling** solution that works with **existing CSS classes** (like **Tailwind CSS**) — it’s **not** a `CSS‑in‑JS` runtime. It works great with Tailwind, but isn’t bound to it.

The main motivation: **design tokens** with **strict type checking**. The **contract** is the **source of truth** — if you add a token in a child with a new value, the **definition must match**, which keeps your **design system consistent**.

## Install

```bash
npm i @use-pico/cls
# or
pnpm add @use-pico/cls
# or
bun add @use-pico/cls
```

## Quick Start

> We’re starting tiny — **one slot** and a **size** variant — so you can feel the flow before adding tokens, more slots, and complex rules. Keep it simple first; level up fast.

```ts
import { cls } from "@use-pico/cls";

const Button = cls(
  {
    slot: ["root"],
    variant: { size: ["sm", "md"] },
  },
  {
    	rules: ({ root, rule, what }) => [
		root({
			root: what.css(["inline-flex", "items-center", "rounded"]),
		}),
		rule({ size: "sm" }, { root: what.css(["px-2", "py-1"]) }),
		rule({ size: "md" }, { root: what.css(["px-4", "py-2"]) }),
	],
    defaults: { size: "md" },
  },
);

const classes = Button.create({});
// classes.root() => "inline-flex items-center rounded px-4 py-2"

const classes2 = Button.create({ variant: { size: "sm" } });
// classes2.root() => "inline-flex items-center rounded px-2 py-1"
```

## Core Concepts

> **System Design Philosophy**: This system is a **toolbox** — yes, there are a few pieces, but **each one earns its keep**. The design is based on **real-world usage**, so once you get the feel for the **individual pieces**, it becomes a **piece of cake** to use — and the **type system will guide you** the whole way.

### Glossary (30 seconds to fluent)

- **Contract**: The **structure** that declares your `tokens`, `slot`, and `variant`. It’s the **source of truth** the type system validates against. See [Main API](#main-api) and [Inheritance System](#inheritance-system).
- **Tokens**: Named style primitives (e.g., `color.bg.default`, `spacing.padding.md`). See [Token Overloading & Theming](#token-overloading--theming).
- **Slots**: Named component parts (`root`, `label`, `icon`) that each produce a class string. See [Components with Variants](#components-with-variants).
- **Variants**: Appearance knobs (`size`, `variant`, `disabled: bool`). See [Components with Variants](#components-with-variants).
- **Rules**: How variant combos map to slot styles (base `root(...)` + conditional `rule(...)`). See [Rules](#rules).
- **Overrides**: Hard replace a slot’s output at `create()` time (`override` beats everything). See [Create-time Overrides](#create-time-overrides).
- **Create config**: `variant`, `slot`, `override`, `token` (user config always wins over internal). See [Main API → create](#createuserconfig-internalconfig).

> **Why Empty Fields?**: You'll notice that many examples include empty objects like `tokens: {}`, `variant: {}`, `token: {}`, and `defaults: {}`. This is **intentional** — the **type system requires all fields to be present** for consistency and type safety. While it might seem verbose, this design choice **avoids complex conditional type logic** that would make the types harder to understand. The trade-off is **a few extra keystrokes for much better type inference and DX**.

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

> 🔎 Token format note: Token group and value names in the **contract** are **not restricted** — use any naming scheme that fits your design system. The only rule is that **references use dot notation** `group.variant` (e.g., `color.bg.default`) when you apply tokens in rules or slot mappings.

**Heavy Type Checking**: The contract is the source of truth - any changes to the contract forces definitions to match. TypeScript ensures all token references in rules exist in your contract.

#### Example Usage

```ts
// Define tokens in contract
const Button = cls({
  tokens: {
    "color.text": ["default", "hover", "disabled"],
    "color.bg": ["default", "hover", "disabled"],
    "spacing.padding": ["sm", "md", "lg"]
  }
}, {
  // Provide concrete values
  token: {
    "color.text": {
      default: ["text-blue-600"],
      hover: ["text-blue-700"],
      disabled: ["text-gray-400"]
    },
    "color.bg": {
      default: ["bg-blue-100"],
      hover: ["bg-blue-200"],
      disabled: ["bg-gray-100"]
    },
    "spacing.padding": {
      sm: ["px-2", "py-1"],
      md: ["px-4", "py-2"],
      lg: ["px-6", "py-3"]
    }
  },
  // Use tokens in rules
  rules: ({ root, rule }) => [
    root({
        root: { token: ["color.bg.default", "spacing.padding.md"] },
        label: { token: ["color.text.default"] }
    }),
    rule({ disabled: true }, {
        root: { token: ["color.bg.disabled"] },
        label: { token: ["color.text.disabled"] }
    })
  ]
});
```

### Slots

Slots are named parts of your component that can receive independent styling:

```ts
slot: ["root", "icon", "label", "badge"]
```

Each slot becomes a function that returns CSS classes, computed lazily when accessed.

> Naming tip: Prefer naming the main wrapper slot `root` for consistency.

#### Example Usage

```ts
const Card = cls({
  slot: ["root", "header", "content", "footer"]
}, {
    rules: ({ root, what }) => [
    root({
        root: what.css(["border", "rounded-lg", "shadow-sm"]),
        header: what.css(["p-4", "border-b", "font-semibold"]),
        content: what.css(["p-4", "text-sm"]),
        footer: what.css(["p-4", "border-t", "bg-gray-50"])
    })
  ]
});

// Usage in component
const classes = Card.create();
return (
  <div className={classes.root()}>
    <div className={classes.header()}>Title</div>
    <div className={classes.content()}>Content</div>
    <div className={classes.footer()}>Footer</div>
  </div>
);
```

### Variants

Variants control component appearance through configurable properties:

```ts
variant: {
  size: ["sm", "md", "lg"],
  variant: ["primary", "secondary"],
  disabled: ["bool"] // Special "bool" type becomes boolean
}
```

#### Example Usage

```ts
const Button = cls({
  variant: {
    size: ["sm", "md", "lg"],
    variant: ["primary", "secondary", "danger"],
    disabled: ["bool"],
    loading: ["bool"]
  }
}, {
∆  rules: ({ root, rule, what }) => [
    root({
      root: what.css(["inline-flex", "items-center", "rounded"]),
    }),
    // Size variants
    rule({ size: "sm" }, { root: what.css(["px-2", "py-1", "text-sm"]) }),
    rule({ size: "md" }, { root: what.css(["px-4", "py-2", "text-base"]) }),
    rule({ size: "lg" }, { root: what.css(["px-6", "py-3", "text-lg"]) }),
    // Color variants
    rule({ variant: "primary" }, { root: what.css(["bg-blue-500", "text-white"]) }),
    rule({ variant: "secondary" }, { root: what.css(["bg-gray-500", "text-white"]) }),
    rule({ variant: "danger" }, { root: what.css(["bg-red-500", "text-white"]) }),
    // State variants
    rule({ disabled: true }, { root: what.css(["opacity-50", "cursor-not-allowed"]) }),
    rule({ loading: true }, { root: what.css(["cursor-wait"]) }),
  ],
  defaults: { size: "md", variant: "primary", disabled: false, loading: false }
});

// Usage with different variants
const primaryButton = Button.create({ variant: { variant: "primary", size: "lg" } });
const disabledButton = Button.create({ variant: { disabled: true } });
const loadingButton = Button.create({ variant: { loading: true } });
```

#### Boolean variants (minimal)

```ts
const Toggle = cls(
  { tokens: {}, slot: ["root"], variant: { disabled: ["bool"] } },
  {
    token: {},
    rules: ({ root, rule, what }) => [
      root({ root: what.css(["base"]) }),
      rule({ disabled: true }, { root: what.css(["opacity-50"]) }),
    ],
    defaults: { disabled: false },
  },
);
```

### Rules

Rules define conditional styling based on variant combinations:

#### Root Rule

The `root` rule is the default that every component should have (not necessary for pure token definitions). It defines the base styling that always applies:

```ts
root({
  root: what.both(["base-styles"], ["color.bg.default"]),
  label: what.both(["font-medium"], ["color.text.default"])
})
```

#### Variant Rules

The `rule` function creates conditional styling based on variant combinations:

```ts
rule(
  { size: "lg", variant: "primary" },
  { root: what.both(["text-lg"], ["color.bg.primary"]) }
)
```

**Complete Example:**
```ts
rules: ({ root, rule }) => [
  root({
    root: what.both(["base-styles"], ["color.bg.default"])
  }),
  rule(
    { size: "lg", variant: "primary" },
    { root: what.both(["text-lg"], ["color.bg.primary"]) }
  )
]
```

### Rule callback: how it works and why it exists

`rules` is a function that receives a small set of type‑safe helpers and returns an ordered list of rule definitions. These helpers make it easy to write readable, type‑checked styling logic:

- `root(slotMapping, override?)`: Declare base styles that always apply. `override: true` makes it a hard override step for the affected slots.
- `rule(match, slotMapping, override?)`: Declare conditional styles that apply only when `match` equals the current variant values. Fully type‑checked against your `variant` contract.
- `what.css(className)`: Helper for applying raw CSS classes.
- `what.token(tokens)`: Helper for applying design tokens.
- `what.both(className, tokens)`: Helper for applying both CSS classes and tokens together.

> 💡 Why it exists
- **Type‑safe ergonomics**: Author rules with IntelliSense for variants, slots and tokens. Avoid hand‑rolling objects and typos.
- **Readable flow**: Compose base and conditional styles in a linear, top‑down order matching how UI states are usually reasoned about.
- **Consistency**: The same helpers are used across all components and inheritance layers.

What it builds under the hood
- Each call to `root(...)` or `rule(...)` becomes a unified rule object with shape `{ match?, slot, override? }`.
- On `create()`, rules are applied in order (see [Precedence Rules](#precedence-rules)), matching against the effective variants. For each matching rule, slot entries append classes and resolve tokens to concrete classes. If `override: true` is set, previous slot content for that step is cleared before applying the new one.

Example: tidy authoring with helpers

```ts
const Alert = cls(
  {
    tokens: {
      "color.text": ["default", "primary"],
      "color.bg": ["default", "primary"],
    },
    slot: ["root", "icon", "label"],
    variant: { variant: ["default", "primary"], size: ["sm", "md"] },
  },
  {
    token: {
      "color.text": {
        default: ["text-gray-900"],
        primary: ["text-blue-700"],
      },
      "color.bg": {
        default: ["bg-gray-50"],
        primary: ["bg-blue-50"],
      },
    },
    rules: ({ root, rule, what }) => [
      root({
        root: what.both(["block", "rounded", "p-3"], [
          "color.text.default",
          "color.bg.default",
        ]),
        icon: what.css(["mr-2"]),
      }),
      rule({ variant: "primary" }, {
        root: what.both(["shadow-sm"], ["color.text.primary", "color.bg.primary"]),
      }),
      rule({ size: "sm" }, { root: what.css(["text-sm", "p-2"]) }),
      rule({ size: "md" }, { root: what.css(["text-base", "p-3"]) }),
    ],
    defaults: { variant: "default", size: "md" },
  },
);
```

Advanced: hard override for a slot

```ts
rules: ({ rule, what }) => [
  rule(
    { variant: "primary" },
    {
      root: what.both(["border", "border-blue-300", "rounded-lg"], [
        "color.text.primary",
        "color.bg.primary",
      ]),
    },
    true, // override
  ),
]
```

## Framework-Agnostic Core

The core library is framework-agnostic and provides:

### Main API

- `cls(contract, definition)` → Create a style module
- `ClsInstance.extend(contract, definition)` → Inherit and add/override (types flow through)
- `create(userConfig?, internalConfig?)` → Get lazily-resolved classes for each slot
- `merge(user, internal)` → Merge two create-configs (see [Precedence Rules](#precedence-rules))

#### cls(contract, definition)

The main function for creating a style module. This is where you define your component's styling contract and provide the concrete styling values. Use this for most components that need tokens, slots, and variants.

#### extend(contract, definition)

This is an **instance method**. Call it on a `cls(...)` result to create a new style module that inherits from the current one. It’s the foundation of the inheritance system — add tokens/slots/variants or override anything, with **full type safety** flowing through the chain.

```ts
const Base = cls(baseContract, baseDefinition);
const Extended = Base.extend(childContract, childDefinition);
```

#### create(userConfig?, internalConfig?)

Generates the actual CSS classes for your component. This is called at render time and returns **slot functions** that compute classes lazily.

> **Precedence**: User config **overrides** internal config **field‑by‑field** (variant, slot, override, token). See [Precedence Rules](#precedence-rules).

> **Two-Parameter Design**: The intention is to have a component that receives `userConfig` from its props while providing its own variants in `internalConfig`. For example, a button component might receive a `disabled` prop (not a variant) and send it to the `variant` field in its `internalConfig`, while user-land config (e.g., `variant: "primary"`) is supplied through `userConfig`.

```tsx
// user vs internal config in practice
function Link({ active, cls: user }: { active: boolean; cls?: any }) {
  const classes = NavLinkCls.create(
    user, // userConfig (from props)
    { variant: { active } }, // internalConfig (computed by component)
  );
  return <a className={classes.root()} />;
}
```

#### merge(user, internal)

A tiny helper that encapsulates the **same merge semantics** used by `create()`. Use it to **pre‑compose** configs before passing them down (see [Precedence Rules](#precedence-rules)).

> **Convenience Function**: This is primarily a convenience function to prevent object destructuring when you need to merge two configs and pass them to a component's `cls` prop. For example, you might want to provide custom user-land config that overrides one coming from the `cls` prop itself. It's a type-safe way to merge configs without manual object spreading.

```ts
// Pre-compose once, reuse many times
const composed = merge(userOverrides, { slot: { root: what.css(["relative"]) } });
const a = CardCls.create(composed);
const b = PanelCls.create(composed);
```

#### Types at a glance

```ts
function cls(contract, definition): ClsInstance

interface ClsInstance {
  create(userConfig?, internalConfig?): Slots
  extend(contract, definition): ClsInstance
}

function merge(userConfig?, internalConfig?): CreateConfig
```

#### use(sub)

Type-safe assignment of a compatible (derived) cls instance. This lets you swap the underlying styling implementation while keeping the original type and API. It’s validated through the inheritance chain, so only descendants are accepted.

- **What `sub` is**: A cls instance created via `Base.extend(...)` (or further down the inheritance chain). Tests verify that `Base.use(Extended)` yields an instance that produces Extended’s rules and tokens while remaining type-compatible as Base.
- **Why**: Polymorphic composition. You can expose a stable base contract in your component API, and internally swap to a branded/extended variant without changing consumer types.

Example: swap a component’s styling in React

```tsx
// Base list row component expects a base tva API
export function ListRow({ tva = RowCls, cls: user, children }) {
  const classes = tva.create(user);
  return <div className={classes.root()}>{children}</div>;
}

// Later, provide a branded row by assigning a derived cls
const BrandedRow = RowCls.extend({ /* contract additions */ }, { /* definition */ });

// Use keeps the external type as RowCls while routing to the derived implementation
const Row = RowCls.use(BrandedRow);

// App wiring
<ListRow tva={Row} /> // Consumers still see RowCls-compatible API
```

Notes ✍️
- `use(sub)` keeps the public type as the base contract (so downstream code doesn’t change) while producing classes from `sub` at runtime.
- Pairs well with “tva”/“cls” props: you can default to a base module and swap to a submodule centrally without changing component surfaces.

### Utilities: tvc (tailwind-merge)

`tvc` is a tiny export around `tailwind-merge`. Use it to **normalize arbitrary class strings** the same way `cls` does internally.

```ts
import { tvc } from "@use-pico/cls";

// Dedupes and keeps last-wins semantics
const out = tvc("px-2 px-4 md:px-4"); // => "px-4 md:px-4"
```

### Inheritance System

[Back to top](#top)

The inheritance system is where `@use-pico/cls` **truly shines**. While other libraries support inheritance, this one combines it with **design token support** and **heavy type checking**, so you can build **deep, predictable hierarchies** with full **type safety**.

> **Why it matters**: Inheritance lets you keep a **single source‑of‑truth** for tokens and rules, while safely extending components across an entire system.

> **Inheritance Note**: It may look overcomplicated at first — but it solves **real‑world design system challenges**. The examples below show how to use it **in your favor**.

> **Composition or inheritance?** If teams own different layers (or you want looser coupling), prefer **composition** (two smaller `cls` modules used together). Reach for **inheritance** when you need a **single source‑of‑truth** for tokens + rules and want **typed customizations** to flow down safely.

#### Multi-Level Inheritance

```ts
const Base = cls(baseContract, baseDefinition);
const Extended = Base.extend(childContract, childDefinition);
const SuperExtended = Extended.extend(grandChildContract, grandChildDefinition);

// Each level inherits everything from its parent
// Add new tokens, slots, variants - or override existing ones
// TypeScript ensures everything stays consistent!
```

#### Token Inheritance Magic ✨

Tokens follow a sophisticated inheritance pattern:

```ts
// Base defines primary colors
const Base = cls({
  tokens: {
    "primary.text": ["default", "hover"],
    "primary.bg": ["default", "hover"]
  }
}, {
  token: {
    "primary.text": { default: ["text-blue-600"], hover: ["text-blue-700"] },
    "primary.bg": { default: ["bg-blue-100"], hover: ["bg-blue-200"] }
  }
});

// Extended can override the entire token group
const Extended = Base.extend({
  tokens: {
    "primary.text": ["default", "hover"], // Re-declaring replaces parent
    "accent.ring": ["focus"] // Adding new token group
  }
}, {
  token: {
    "primary.text": { default: ["text-red-600"], hover: ["text-red-700"] }, // Override
    "accent.ring": { focus: ["ring-2", "ring-red-500"] } // New token
  }
});
```

> **Gotcha — replacing token groups**: Re‑declaring a token group in a child **replaces the parent’s group** by design (not a merge). It keeps changes intentional and visible. If you want to **append**, leave the group out of the child’s `tokens` and just reference the parent tokens in rules.

> **Type System Enforcement**: The type system will force you to declare all tokens defined in the contract - even (and only) the ones you extend from the parent. This ensures design system consistency and prevents missing token definitions.

#### Variant Inheritance

Variants follow a sophisticated inheritance pattern that's much smarter than simple merging:

```ts
const Base = cls({
  variant: { size: ["sm", "md"] }
}, { /* ... */ });

const Extended = Base.extend({
  variant: { 
    size: ["sm", "md", "lg"], // Extends parent variants
    variant: ["primary", "secondary"] // Adds new variant
  }
}, { /* ... */ });

// Result: size: ["sm", "md", "lg"], variant: ["primary", "secondary"]
```

**The Magic Behind the Scenes:**

- **Union Merging**: Child variants are intelligently combined with parent variants
- **Type Preservation**: String variants stay strings, "bool" variants become booleans
- **Default Inheritance**: Child defaults can override parent defaults with full type safety
- **Variant Resolution**: The system knows about ALL variants from the entire inheritance chain
- **Rule Matching**: Rules can match against any variant from any level in the hierarchy

```ts
// TypeScript knows about the full variant universe
const classes = Extended.create({
  variant: {
    size: "lg",           // ✅ From Extended
    variant: "primary",   // ✅ From Extended  
    disabled: true        // ❌ Type error! Not in contract
  }
});
```

This isn't just inheritance - it's a sophisticated type-aware variant system that maintains full IntelliSense and compile-time safety across the entire design system hierarchy! 🚀

#### Forced Default Declaration

One of `@use-pico/cls`'s key design decisions is that **all variants must have defaults declared, even when inherited from parent**. This might seem redundant at first, but it's a deliberate choice for clarity and maintainability.

**Why This Design?**

```ts
const Base = cls({
  variant: { size: ["sm", "md", "lg"] }
}, {
  defaults: { size: "md" }
});

const Extended = Base.extend({
  variant: { 
    size: ["sm", "md", "lg", "xl"], // Added "xl"
    variant: ["primary", "secondary"]
  }
}, {
  defaults: { 
    size: "lg",     // Must declare even though parent has "md"
    variant: "primary" 
  }
});
```

**Benefits:**
- **Single Source of Truth**: You can see all current defaults in one place
- **Clear Configuration**: No need to hunt through inheritance chains
- **Explicit Overrides**: It's obvious when you're changing parent defaults
- **Long Chain Safety**: Especially important when inheritance chains are deep
- **Type Safety**: TypeScript ensures all variants have defaults

This design philosophy prioritizes **explicit clarity** over **implicit convenience**, making your design system more maintainable and easier to understand! 🎯

#### Slot Inheritance

Slots accumulate through the inheritance chain:

```ts
const Base = cls({
  slot: ["root", "label"]
}, { /* ... */ });

const Extended = Base.extend({
  slot: ["icon", "badge"] // Adds new slots
}, { /* ... */ });

// Result: ["root", "label", "icon", "badge"]
```

#### Type Safety Through Inheritance

The magic happens at compile time - TypeScript ensures:

- All inherited tokens are available in child components
- Variant types are correctly inferred (string vs boolean)
- Slot functions maintain their signatures
- Rule matching works with the full inheritance chain

```ts
const Extended = Base.extend(/* ... */);

// TypeScript knows about ALL tokens from Base + Extended
const classes = Extended.create({
  token: {
    "primary.text": { default: ["text-green-600"] }, // ✅ Valid
    "accent.ring": { focus: ["ring-green-500"] }, // ✅ Valid
    "nonexistent.token": { default: ["text-red"] } // ❌ Type error!
  }
});
```

#### Real-World Inheritance Patterns

**Theme Inheritance:**
```ts
const LightTheme = cls(lightContract, lightDefinition);
const DarkTheme = LightTheme.extend(darkContract, darkDefinition);
const HighContrastTheme = DarkTheme.extend(highContrastContract, highContrastDefinition);
```

**Component Specialization:**
```ts
const Button = cls(buttonContract, buttonDefinition);
const PrimaryButton = Button.extend(primaryContract, primaryDefinition);
const IconButton = Button.extend(iconContract, iconDefinition);
const PrimaryIconButton = PrimaryButton.extend(iconContract, iconDefinition);
```

**Design System Layers:**
```ts
const DesignTokens = cls(tokenContract, tokenDefinition);
const BaseComponents = DesignTokens.extend(baseContract, baseDefinition);
const BrandedComponents = BaseComponents.extend(brandContract, brandDefinition);
const AppSpecificComponents = BrandedComponents.extend(appContract, appDefinition);
```

This inheritance system lets you build complex, maintainable design systems where changes at any level automatically propagate through the entire hierarchy while maintaining full type safety! 🚀

### Inheritance rules (authoritative)

This is the concise, code-less guide to how inheritance behaves across the system. Consider this the single source of truth.

- **Chain order**
  - Base → Child → Grandchild (walked top-down when applying, built bottom-up in code, but applied in base-to-child order).
  - Rules and defaults from later (child) layers override/append earlier (base) ones according to rules below.

- **Tokens (groups and values)**
  - If a child declares a token group in its `contract.tokens`, then that layer’s `definition.token` for that group **replaces the inherited token entry** for each provided token value.
  - If a child provides `definition.token` entries for a group/value that it did not declare in `contract.tokens` (but exists in ancestors), those entries **append** to the inherited token entry for that token value.
  - Adding a new token group in a child expands the token universe (and must be defined in the child’s `definition.token`).
  - Types enforce that all groups/values declared at the current layer are provided in `definition.token`.
  - Effective token classes are resolved after walking all layers with REPLACE/APPEND semantics; `create({ token })` may then override per-instance token values (see below).

- **Variants (keys and choices)**
  - Child variants are a **union merge** with parents (choices accumulate).
  - Variant types are preserved; the special string value `"bool"` is mapped to TypeScript `boolean`.
  - All variants must have defaults declared at each layer (child must restate defaults), and child defaults **override** parent defaults.

- **Slots (shape)**
  - Slots **accumulate** across the chain (set union). `create()` returns functions for every slot in the full chain.

- **Rules (ordering and matching)**
  - Rules are collected in base-to-child order: **base rules first, then child rules** (per layer, in their written order).
  - Rule matching uses exact equality against the effective variant values at `create()` time.
  - When a matching rule for a slot has `override: true`, that rule’s step **clears** prior classes for the affected slot before applying its own.
  - Otherwise, matching rules **append** classes for the slot in order.

- **Defaults (resolution)**
  - Defaults are merged base-to-child, with child values **overwriting** parent values key-by-key.

- **Create-time precedence (interplay with inheritance)**
  - Within one `create()`: user config wins over internal config, field-by-field: `variant` → `slot` → `override` → `token`.
  - Evaluation order for one slot: base/default rules → variant-matched rules → `slot` appends → `override` replaces.
  - `create({ token })` provides per-instance token **REPLACEMENTS** for the specified variants within groups; unspecified variants remain as resolved by inheritance.

- **extend() semantics**
  - `Base.extend(childContract, childDefinition)` creates a child with all the behaviors above; types ensure the child satisfies and extends the parent contract safely.

- **use(sub) assignment**
  - `Base.use(Sub)` only accepts a derived cls; it returns an instance that keeps the Base type, but routes to Sub’s implementation.

- **Class merging**
  - Final class strings are deduped and resolved via Tailwind’s last‑wins semantics using `tailwind-merge` (`tvc`).

#### Code examples (behavior-focused)

Minimal examples that illustrate the rules above. Comments highlight the behavior; code intentionally omits unrelated details.

Tokens: REPLACE vs APPEND

```ts
// Base declares a token group → normal definition
const Base = cls(
  { tokens: { "primary.bg": ["default", "hover"] }, slot: ["root"], variant: {} },
  {
    token: { "primary.bg": { default: ["bg-blue-500"], hover: ["bg-blue-600"] } },
    rules: ({ root }) => [root({ root: { token: ["primary.bg.default"] } })],
    defaults: {},
  },
);

// Child REDECLARES the token group → entries provided here REPLACE inherited entries
const ReplaceDefaultOnly = Base.extend(
  { tokens: { "primary.bg": ["default", "hover"] } },
  {
    token: { "primary.bg": { default: ["bg-red-500"] } }, // replaces default only; hover remains from Base
    rules: ({ root }) => [root({})],
    defaults: {},
  },
);

// Child does NOT redeclare the token group → provided entries APPEND to inherited entries
const AppendHover = Base.extend(
  { tokens: {} },
  {
    token: { "primary.bg": { hover: ["hover:bg-red-600"] } }, // appends to Base hover
    rules: ({ root }) => [root({})],
    defaults: {},
  },
);

// Per-instance token override REPLACES provided token values for this instance
const classes = Base.create({ token: { "primary.bg": { default: ["bg-green-500"] } } });
// Effective default background is now bg-green-500 for this create() call
```

Variants: union merge and defaults override

```ts
const Base = cls(
  { tokens: {}, slot: ["root"], variant: { size: ["sm", "md"] } },
  { token: {}, rules: ({ root }) => [root({})], defaults: { size: "md" } },
);

const Child = Base.extend(
  { variant: { size: ["sm", "md", "lg"] } }, // union adds "lg"
  { token: {}, rules: ({ root }) => [root({})], defaults: { size: "lg" } }, // child default overrides parent
);
```

Slots: accumulate across the chain

```ts
const Base = cls(
  { tokens: {}, slot: ["root", "label"], variant: {} },
  { token: {}, rules: ({ root }) => [root({})], defaults: {} },
);
const Child = Base.extend(
  { slot: ["icon"] }, // adds icon
  { token: {}, rules: ({ root }) => [root({})], defaults: {} },
);
const classes = Child.create();
// classes.root(), classes.label(), classes.icon() → all available
```

Rules: ordering and override

```ts
const Base = cls(
  { tokens: {}, slot: ["root"], variant: {} },
  {
    token: {},
    rules: ({ root, what }) => [root({ root: what.css(["base"]) })], // base applies first
    defaults: {},
  },
);

const Child = Base.extend(
  {},
  {
    token: {},
    rules: ({ rule, what }) => [
      rule(undefined, { root: what.css(["child"]) }), // appends after base
      rule(undefined, { root: what.css(["only-child"]) }, true), // override: clears then applies
    ],
    defaults: {},
  },
);
const classes = Child.create();
// Result at root(): "only-child" (base + child appended, then cleared by override and replaced)
```

use(sub): type-safe assignment

```ts
const Assigned = Base.use(Child); // Child must derive from Base
// Assigned keeps Base’s type for downstream code, but uses Child’s implementation at runtime
```

### Create-time Overrides

The `create()` method gives you incredible flexibility to customize styling at runtime. You can override variants, append to slots, hard override slots, and even override tokens — all with predictable precedence rules!

> **What to reach for when…**
> - **variant**: reflect component state or public API (size, active, disabled)
> - **slot**: add small tweaks (extra padding, ring, gap) — it **appends**
> - **override**: hard replace a slot for one-offs (skeleton, layout swap)
> - **token**: theme/brand level changes (colors, spacing, surfaces)

> **Tip**: Don’t overshare giant override objects in props. Prefer **named variants** for most “features” and keep **overrides** for local, one-off adjustments.

```tsx
// Anti‑pattern: shipping a massive override through props
<Button
  cls={{
    override: {
      root: what.css([
        "px-3",
        "py-2",
        "bg-blue-600",
        "text-white",
        "rounded",
        "shadow",
      ]),
      label: what.css(["font-semibold"]),
    },
  }}
/>

// Better: promote repeated intent to a named variant
const Button = cls(
  {
    tokens: {},
    slot: ["root", "label"],
    variant: { intent: ["primary", "neutral"], dense: ["bool"] },
  },
  {
    token: {},
    rules: ({ root, rule, what }) => [
      root({
        root: what.css(["inline-flex", "items-center", "rounded"]),
        label: what.css(["font-medium"]),
      }),
      rule({ intent: "primary" }, { root: what.css(["bg-blue-600", "text-white", "hover:bg-blue-700", "shadow"]) }),
      rule({ dense: true }, { root: what.css(["px-3", "py-2"]) }),
    ],
    defaults: { intent: "neutral", dense: false },
  },
);

// Consumers express intent with small, typed inputs
<Button cls={{ variant: { intent: "primary", dense: true } }} />
```

#### Variant Overrides

Override the default variant values for this specific instance:

```ts
const classes = Button.create({
  variant: { 
    size: "lg",        // Override default size
    variant: "danger"  // Override default variant
  }
});
```

#### Slot Appends

Add additional classes or tokens to existing slots (appends to the end):

```ts
const classes = Button.create({
  slot: {
    root: { 
      class: ["ring-2", "ring-blue-300"],  // Add border
      token: ["primary.bg.hover"]          // Add hover token
    },
    label: { class: ["font-bold"] }        // Make label bold
  }
});
```

#### Slot Hard Overrides

Completely replace a slot's styling (ignores all previous rules):

```ts
const classes = Button.create({
  override: {
    root: { 
      class: ["block", "w-full", "bg-red-500"],  // Completely new styling
      token: ["primary.text.default"]            // Keep some tokens
    }
  }
});
```

#### Token Overrides

Override token definitions for this specific instance:

```ts
const classes = Button.create({
  token: {
    "primary.bg": { 
      default: ["bg-red-500"],    // Override default background
      hover: ["bg-red-600"]       // Override hover background
    },
    "primary.text": { 
      default: ["text-white"]     // Override default text color
    }
  }
});
```

> Note: create‑time token overrides replace the provided variants for a token group (not append). Supply only the variants you want to replace; others remain as previously defined.

#### Precedence Rules

The override system follows a clear, predictable order. This is the canonical reference for merge semantics used across the docs:

1. **Base/default rules** (from contract definition)
2. **Variant matched rules** (in definition order)
3. **Slot appends** (from `slot` config)
4. **Hard overrides** (from `override` config)

```ts
const classes = Button.create({
  variant: { size: "lg" },                          // Apply variant rules (no-conflict)
  slot: { root: { class: ["ring-1"] } },            // Append to slot (no-conflict)
  token: { "primary.bg": { default: ["bg-red"] } }  // Override tokens (replace existing token)
  override: { root: { class: ["block"] } },         // Hard override (ruthlessly replace - wins!)
});
```

#### Real-World Use Cases

**Conditional Styling:**
```ts
const classes = Button.create({
  variant: { disabled: isDisabled },
  slot: isDisabled ? { root: { class: ["opacity-50"] } } : {}
});
```

**Theme Overrides:**
```ts
const classes = Button.create({
  token: {
    "primary.bg": { default: [theme.colors.primary] },
    "primary.text": { default: [theme.colors.onPrimary] }
  }
});
```

**Responsive Adjustments:**
```ts
const classes = Button.create({
  slot: {
    root: { class: ["md:px-6", "lg:px-8"] }  // Responsive padding
  }
});
```

**State-based Customization:**
```ts
const classes = Button.create({
  variant: { variant: "primary" },
  slot: isActive ? { 
    root: { class: ["ring-2", "ring-blue-500"] } 
  } : {}
});
```

This override system makes `@use-pico/cls` incredibly flexible - you can customize any aspect of your components at runtime while maintaining the design system's structure and type safety! 🎨

## Token Overloading & Theming

[Back to top](#top)

One of the most powerful features of `@use-pico/cls` is the ability to overload tokens at runtime with full type safety. This enables dynamic theming and one-time token replacements. For context merges and strict typing guidance, see [Type-safety note (context)](#type-safety-note-context).

> **Team usage tip**: Keep theme objects in your **design system package**, give teams a **typed Theme shape**, and let apps **partially** override only what they need.

### One-Time Token Replacement

You can replace any token definition for a specific component instance:

```ts
const Button = cls({
  tokens: {
    "color.bg": ["default", "hover"],
    "color.text": ["default"],
  },
  slot: ["root"],
  variant: { variant: ["primary", "secondary"] },
}, {
  token: {
    "color.bg": { default: ["bg-blue-600"], hover: ["bg-blue-700"] },
    "color.text": { default: ["text-white"] },
  },
  rules: ({ root, rule, what }) => [
    root({
      root: what.both(["inline-flex", "items-center", "rounded"], [
        "color.bg.default",
        "color.text.default",
      ]),
    }),
  ],
  defaults: { variant: "primary" },
});

// One-time token replacement
const classes = Button.create({
  token: {
    "color.bg": { 
      default: ["bg-red-600"], // Override default background
      hover: ["bg-red-700"]    // Override hover background
    },
    "color.text": { 
      default: ["text-yellow-200"] // Override text color
    }
  }
});
```

### External Theme Integration

You can create external theme definitions and apply them to any component:

```ts
// External theme definition
const DarkTheme = {
  "color.bg": { 
    default: ["bg-gray-800"], 
    hover: ["bg-gray-700"] 
  },
  "color.text": { 
    default: ["text-gray-100"] 
  },
  "color.border": { 
    default: ["border-gray-600"] 
  },
};

// Apply theme to any component
const buttonClasses = Button.create({
  token: DarkTheme
});

const cardClasses = Card.create({
  token: DarkTheme
});
```

### Partial themes (override only what you need)

You don’t need to provide every token group. Supply just the groups you want to change; the rest use defaults.

```ts
const PartialTheme = {
  "color.text": { default: ["text-amber-100"] },
};

const classes = Button.create({ token: PartialTheme });
```

### Context-Based Theming

Combine with React context for app-wide theming:

```tsx
// Theme context
const ThemeContext = createContext({
  theme: {
    "color.bg": { default: ["bg-blue-600"], hover: ["bg-blue-700"] },
    "color.text": { default: ["text-white"] },
  }
});

// Theme provider
function ThemeProvider({ children, theme }) {
  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Component using theme from context
function ThemedButton({ variant = "primary", children }) {
  const { theme } = useContext(ThemeContext);
  
  const classes = Button.create({
    variant: { variant },
    token: theme // Apply theme from context
  });

  return (
    <button className={classes.root()}>
      {children}
    </button>
  );
}

// Usage
<ThemeProvider theme={DarkTheme}>
  <ThemedButton>Dark themed button</ThemedButton>
</ThemeProvider>
```

### Type-Safe Token Overloading

The type system ensures you can only override tokens that exist in the component's contract:

```ts
const classes = Button.create({
  token: {
    "color.bg": { default: ["bg-green-600"] }, // ✅ Valid
    "color.text": { default: ["text-white"] }, // ✅ Valid
    "nonexistent.token": { default: ["bg-red"] } // ❌ Type error!
  }
});
```

### Merging theme with internal and user tokens

User tokens override internal tokens; internal tokens override context tokens. This keeps component state in control, but lets apps layer their preferences.

```ts
// In a component file
function Card({ accent, cls: user }: { accent?: boolean; cls?: any }) {
  const classes = CardCls.create(
    user, // user config (wins)
    {
      // internal config (wins over context tokens)
      token: accent ? { "color.border": { default: ["border-fuchsia-500"] } } : undefined,
    },
  );
  return <div className={classes.root()} />;
}
```

### Dynamic Theme Switching

You can switch themes dynamically based on user preferences:

```tsx
function App() {
  const [theme, setTheme] = useState('light');
  
  const currentTheme = theme === 'dark' ? DarkTheme : LightTheme;
  
  return (
    <ThemeProvider theme={currentTheme}>
      <div>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle Theme
        </button>
        <ThemedButton>Theme-aware button</ThemedButton>
      </div>
    </ThemeProvider>
  );
}
```

#### Mini FAQ

- **Do I need `useMemo`?** Yes — if your config object changes every render. Memoize it so `create()` doesn’t recompute needlessly.
- **Is context required?** **No.** It’s handy for app‑wide themes, but you can pass tokens directly to `create({ token })`. See [Type-safety note (context)](#type-safety-note-context).
- **Can I mix user + internal overrides?** That’s exactly what `create(userConfig, internalConfig)` is for — see [Precedence Rules](#precedence-rules).

### Trade-offs & Considerations

**Advantages:**
- **Full type safety** - TypeScript ensures token compatibility
- **Runtime flexibility** - Change themes without rebuilding
- **Component isolation** - Each component can have its own theme
- **Performance** - No CSS-in-JS runtime overhead

**Trade-offs:**
- **Context dependency** - Every component must read from context
- **Manual application** - Need to explicitly pass theme to `create()`
- **Bundle size** - Theme definitions included in bundle

**Best Practices:**
- Create reusable theme objects for consistency
- Use TypeScript to ensure theme compatibility
- Consider performance implications of context usage
- Keep theme definitions close to component definitions

This token overloading system provides the flexibility of CSS-in-JS theming while maintaining the performance and type safety benefits of class-based styling! 🚀

## React Integration

### useCls Hook

For React components, use the `useCls` hook to **bind a cls instance to React context tokens**. This hook’s main benefit is its **automatic integration with `ClsProvider`** (theme tokens), not memoization. You should still memoize your config if it changes every render.

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

### withCls HOC

Attach a cls instance to a React component without exporting the cls separately. This keeps your public surface clean (export one component, e.g., a UI library can export only `Button` and not `Button` + `ButtonCls`) while still allowing advanced consumers, composition layers, or tests to access the styling instance via `Component.cls`.

> 💡 Why it exists
- **Two-file pattern**: Define styling in `ButtonCls.ts` and component logic in `Button.tsx`. The component imports its cls for rendering, but you don’t want to re-export the cls publicly.
- **Opt-in advanced usage**: Consumers who need the cls (for composition, theming, or testing) can access it from the component itself.
 - **Tight coupling by design**: The component and its cls are intentionally coupled as the default pairing. They could even live in the same file when small; extracting `ButtonCls` allows the style module to grow independently while `Button` stays lean.

Example

```tsx
// ButtonCls.ts
export const ButtonCls = cls(contract, definition);

// Button.tsx
import { withCls } from "@use-pico/cls";
import { ButtonCls } from "./ButtonCls";

function Button({ cls: user, children, ...props }) {
  const classes = ButtonCls.create(user);
  return (
    <button className={classes.root()} {...props}>
      <span className={classes.label()}>{children}</span>
    </button>
  );
}

export const ModernButton = withCls(Button, ButtonCls);

// Usage
<ModernButton>Click me</ModernButton>

// Advanced composition: pass ModernButton.cls to a composed component expecting a tva/cls prop
<ListRow tva={ModernButton.cls} />

// Direct access (e.g., tests/tooling)
const classes = ModernButton.cls.create({ variant: { size: "lg" } });
```

Notes ✍️
- `withCls(Component, clsInstance)` attaches `cls` and also exposes `~contract`, `~definition`, and `~slots` for tooling/testing (not public API).
- Use when you want a single export (the component) while still enabling advanced, type‑safe styling composition.
 - `~slots` is particularly useful for type‑level access: `typeof ModernButton["~slots"]` provides strongly‑typed slot keys and slot function signatures for the attached cls. You can pass these around to composed utilities without importing the cls directly. At runtime these are proxies (via `proxyOf()`), but TypeScript infers the correct shapes, as covered by tests.

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

### Type-safety note (context)

Tokens provided via React context are **merged at runtime** and are **not type‑validated** against a specific component’s contract. Keep your theme keys aligned with your contracts. If you need strict typing on token overrides, pass them **directly to `create({ token: ... })`** instead of relying on context. When both are present, a component’s **internal tokens win** over context tokens by design. See [Precedence Rules](#precedence-rules).

### Component Pattern

```tsx
import { TransferCls } from "./TransferCls";

export const Transfer = <TItem,>({ 
  tva = TransferCls, // tva: tailwind-variants-style naming (historical), here it means the styling instance
  cls, 
  groups, 
  onChange 
}: Transfer.Props<TItem>) => {
  const classes = tva.create(cls);

  return (
    <div className={classes.root()}>
      <div className={classes.panel()}>
        {/* Component content */}
      </div>
    </div>
  );
};
```

## When to Use What and How

[Back to top](#top)

This section shows you practical scenarios and how to approach them with `@use-pico/cls`. Each example is complete and ready to use!

> **Migrate from CVA/TVA (mini playbook)**
> 1) Start with **variant‑only components** (no tokens, just `rule(...)`) →
> 2) Add **slots** for structure →
> 3) **Unify styles into tokens** where reuse appears →
> 4) Introduce **inheritance** to share tokens/rules across components.

### Simple Static Components

**When**: You need a basic component with static styling, no variants or tokens.

```ts
import { cls } from "@use-pico/cls";

const Card = cls({
  tokens: {}, // No design tokens needed for this simple component
  slot: ["root", "header", "content", "footer"],
  variant: {}, // No variants needed - static styling only
}, {
  token: {}, // No token definitions since we have no tokens
  rules: ({ root, what }) => [
    root({
      root: what.css(["border", "rounded-lg", "shadow-sm", "bg-white"]),
      header: what.css(["p-4", "border-b", "font-semibold"]),
      content: what.css(["p-4", "text-sm"]),
      footer: what.css(["p-4", "border-t", "bg-gray-50"]),
    }),
  ],
  defaults: {}, // No defaults needed since we have no variants
});

// Usage
const classes = Card.create();
return (
  <div className={classes.root()}>
    <div className={classes.header()}>Title</div>
    <div className={classes.content()}>Content</div>
    <div className={classes.footer()}>Footer</div>
  </div>
);
```

### Components with Variants

**When**: You need different styles based on props like size, color, state.

```ts
import { cls } from "@use-pico/cls";

const Alert = cls({
  tokens: {}, // No design tokens needed - using direct classes
  slot: ["root", "title", "message"],
  variant: { 
    variant: ["info", "success", "warning", "error"],
    size: ["sm", "md"] 
  },
}, {
  token: {}, // No token definitions since we have no tokens
  rules: ({ root, rule, what }) => [
    root({
      root: what.css(["rounded", "p-2"]),
    }),
    rule({ variant: "info" }, { root: what.css(["bg-blue-100", "border-blue-400", "text-blue-700"]) }),
    rule({ variant: "success" }, { root: what.css(["bg-green-100", "border-green-400", "text-green-700"]) }),
    rule({ variant: "warning" }, { root: what.css(["bg-yellow-100", "border-yellow-400", "text-yellow-700"]) }),
    rule({ variant: "error" }, { root: what.css(["bg-red-100", "border-red-400", "text-red-700"]) }),
    rule({ size: "sm" }, { root: what.css(["text-sm"]) }),
    rule({ size: "md" }, { root: what.css(["text-base"]) }),
  ],
  defaults: { variant: "info", size: "md" },
});

// Usage
const classes = Alert.create({ variant: { variant: "success", size: "sm" } });
```

### Design Token System

**When**: You want reusable design values that can be inherited and overridden.

```ts
import { cls } from "@use-pico/cls";

const Button = cls({
  tokens: {
    "color.text": ["default", "hover", "disabled"],
    "color.bg": ["default", "hover", "disabled"],
    "spacing.padding": ["sm", "md", "lg"],
  },
  slot: ["root", "label"],
  variant: { size: ["sm", "md", "lg"], disabled: ["bool"] },
}, {
  token: {
    "color.text": {
      default: ["text-white"],
      hover: ["text-blue-100"],
      disabled: ["text-gray-400"],
    },
    "color.bg": {
      default: ["bg-blue-600"],
      hover: ["bg-blue-700"],
      disabled: ["bg-gray-300"],
    },
    "spacing.padding": {
      sm: ["px-2", "py-1"],
      md: ["px-4", "py-2"],
      lg: ["px-6", "py-3"],
    },
  },
  rules: ({ root, rule, what }) => [
    root({
      root: what.both(["inline-flex", "items-center", "rounded"], [
        "color.bg.default",
        "spacing.padding.md",
      ]),
      label: what.both(["font-medium"], ["color.text.default"]),
    }),
    rule({ size: "sm" }, { root: { token: ["spacing.padding.sm"] } }),
    rule({ size: "lg" }, { root: { token: ["spacing.padding.lg"] } }),
    rule({ disabled: true }, { 
      root: { token: ["color.bg.disabled"] },
      label: { token: ["color.text.disabled"] }
    }),
  ],
  defaults: { size: "md", disabled: false },
});
```

### Component Inheritance

**When**: You want to extend existing components with new variants or styling.

```ts
// Base button with common styling
const BaseButton = cls({
  tokens: {
    "color.text": ["default", "hover"],
    "color.bg": ["default", "hover"],
  },
  slot: ["root", "label"],
  variant: { size: ["sm", "md"] },
}, {
  token: {
    "color.text": { default: ["text-white"], hover: ["text-blue-100"] },
    "color.bg": { default: ["bg-blue-600"], hover: ["bg-blue-700"] },
  },
  rules: ({ root, rule, what }) => [
    root({
      root: what.both(["inline-flex", "items-center", "rounded"], [
        "color.bg.default",
        "spacing.padding.md",
      ]),
      label: what.both(["font-medium"], ["color.text.default"]),
    }),
    rule({ size: "sm" }, { root: what.css(["px-2", "py-1"]) }),
    rule({ size: "md" }, { root: what.css(["px-4", "py-2"]) }),
  ],
  defaults: { size: "md" },
});

// Extended button with new variants
const PrimaryButton = BaseButton.extend({
  tokens: {
    "color.text": ["default", "hover"], // Override parent tokens
    "accent.ring": ["focus"], // Add new tokens
  },
  slot: ["icon"], // Add new slot
  variant: { 
    size: ["sm", "md", "lg"], // Extend parent variants
    loading: ["bool"] // Add new variant
  },
}, {
  token: {
    "color.text": { default: ["text-white"], hover: ["text-white"] }, // Override
    "accent.ring": { focus: ["ring-2", "ring-blue-500"] }, // New token
  },
  rules: ({ root, rule, what }) => [
    root({
      icon: what.css(["w-4", "h-4", "mr-2"]), // New slot styling
    }),
    rule({ size: "lg" }, { root: what.css(["px-6", "py-3"]) }), // New variant
    rule({ loading: true }, { 
      root: what.css(["opacity-75", "cursor-wait"]),
      icon: what.css(["animate-spin"])
    }),
  ],
  defaults: { size: "md", loading: false },
});
```

### Theme System

**When**: You need different themes (light/dark) or brand variations.

```ts
// Base theme tokens
const BaseTheme = cls({
  tokens: {
    "color.text": ["default", "muted"],
    "color.bg": ["default", "secondary"],
    "color.border": ["default"],
  },
  slot: ["root"],
  variant: {},
}, {
  token: {
    "color.text": { default: ["text-gray-900"], muted: ["text-gray-600"] },
    "color.bg": { default: ["bg-white"], secondary: ["bg-gray-50"] },
    "color.border": { default: ["border-gray-200"] },
  },
  rules: ({ root, what }) => [root({ root: what.css(["border", "rounded"]) })],
  defaults: {},
});

// Light theme
const LightTheme = BaseTheme.extend({
  tokens: {
    "color.text": ["default", "muted"],
    "color.bg": ["default", "secondary"],
    "color.border": ["default"],
  },
}, {
  token: {
    "color.text": { default: ["text-gray-900"], muted: ["text-gray-600"] },
    "color.bg": { default: ["bg-white"], secondary: ["bg-gray-50"] },
    "color.border": { default: ["border-gray-200"] },
  },
  rules: ({ root, what }) => [root({ root: what.css(["border", "rounded"]) })],
  defaults: {},
});

// Dark theme
const DarkTheme = BaseTheme.extend({
  tokens: {
    "color.text": ["default", "muted"],
    "color.bg": ["default", "secondary"],
    "color.border": ["default"],
  },
}, {
  token: {
    "color.text": { default: ["text-white"], muted: ["text-gray-400"] },
    "color.bg": { default: ["bg-gray-900"], secondary: ["bg-gray-800"] },
    "color.border": { default: ["border-gray-700"] },
  },
  rules: ({ root, what }) => [root({ root: what.css(["border", "rounded"]) })],
  defaults: {},
});
```

### Runtime Customization

**When**: You need to customize components at runtime based on props or state.

```ts
// Component with runtime customization
function CustomButton({ 
  variant = "primary", 
  size = "md", 
  disabled = false,
  customColors,
  children 
}) {
  const classes = Button.create({
    variant: { variant, size, disabled },
    token: customColors ? {
      "color.bg": { 
        default: [customColors.background],
        hover: [customColors.backgroundHover]
      },
      "color.text": { 
        default: [customColors.text],
        hover: [customColors.textHover]
      }
    } : undefined,
  });

  return (
    <button className={classes.root()}>
      <span className={classes.label()}>{children}</span>
    </button>
  );
}

// Usage with custom colors
<CustomButton 
  variant="primary" 
  customColors={{
    background: "bg-purple-600",
    backgroundHover: "bg-purple-700",
    text: "text-white",
    textHover: "text-purple-100"
  }}
>
  Custom Button
</CustomButton>
```

### Complex Component with Multiple States

**When**: You have a component with many states and interactions.

```ts
const ComplexButton = cls({
  tokens: {
    "color.text": ["default", "hover", "active", "disabled"],
    "color.bg": ["default", "hover", "active", "disabled"],
    "color.border": ["default", "focus"],
    "spacing.padding": ["sm", "md", "lg"],
  },
  slot: ["root", "icon", "label", "spinner"],
  variant: { 
    size: ["sm", "md", "lg"],
    variant: ["primary", "secondary", "danger"],
    disabled: ["bool"],
    loading: ["bool"],
    active: ["bool"],
  },
}, {
  token: {
    "color.text": {
      default: ["text-white"],
      hover: ["text-blue-100"],
      active: ["text-blue-200"],
      disabled: ["text-gray-400"],
    },
    "color.bg": {
      default: ["bg-blue-600"],
      hover: ["bg-blue-700"],
      active: ["bg-blue-800"],
      disabled: ["bg-gray-300"],
    },
    "color.border": {
      default: ["border-transparent"],
      focus: ["border-blue-500"],
    },
    "spacing.padding": {
      sm: ["px-2", "py-1"],
      md: ["px-4", "py-2"],
      lg: ["px-6", "py-3"],
    },
  },
  rules: ({ root, rule, what }) => [
    root({
      root: what.both([
        "inline-flex",
        "items-center",
        "rounded",
        "border-2",
        "focus:outline-none",
      ], [
        "color.bg.default",
        "color.text.default",
        "color.border.default",
        "spacing.padding.md",
      ]),
      icon: what.css(["w-4", "h-4", "mr-2"]),
      label: what.css(["font-medium"]),
      spinner: what.css(["w-4", "h-4", "mr-2", "animate-spin"]),
    }),
    // Size variants
    rule({ size: "sm" }, { root: { token: ["spacing.padding.sm"] } }),
    rule({ size: "lg" }, { root: { token: ["spacing.padding.lg"] } }),
    // Color variants
    rule({ variant: "secondary" }, { 
      root: what.both(["bg-gray-600", "text-white"], ["color.bg.default", "color.text.default"]) 
    }),
    rule({ variant: "danger" }, { 
      root: what.both(["bg-red-600", "text-white"], ["color.bg.default", "color.text.default"]) 
    }),
    // State variants
    rule({ disabled: true }, { 
      root: what.both(["cursor-not-allowed"], ["color.bg.disabled", "color.text.disabled"]) 
    }),
    rule({ loading: true }, { 
      root: what.css(["cursor-wait"]),
      icon: what.css(["hidden"]),
      spinner: what.css(["block"]),
    }),
    rule({ active: true }, { 
      root: { 
        token: ["color.bg.active", "color.text.active"]
      }
    }),
  ],
  defaults: { size: "md", variant: "primary", disabled: false, loading: false, active: false },
});
```

## Comparison with Similar Tools

> **Honest Comparison Disclaimer**: This comparison is written by the `@use-pico/cls` author and is inherently biased toward highlighting this library's strengths. While we strive for accuracy, **every tool has its trade‑offs**. `@use-pico/cls` prioritizes **type safety** and **design system consistency** over **conciseness**. For **simple projects**, competitors like CVA or TVA might be more appropriate. For **complex design systems** and **production apps** where **type safety** and **maintainability** are crucial, `@use-pico/cls` provides unique value. **Choose the tool that fits your needs.**

| Feature | @use-pico/cls | class-variance-authority (CVA) | tailwind-variants (TV) | @stitches/react | vanilla-extract |
|---------|---------------|------------------------------|-------------------------|-----------------|-----------------|
| **TypeScript** | 🔥 Advanced compile-time validation across tokens/slots/variants | ✅ TypeScript support | ✅ TypeScript support | ✅ TypeScript | ✅ TypeScript |
| **Approach** | ❌ Class-based (no CSS-in-JS) | ❌ Class-based (no CSS-in-JS) | ❌ Class-based (no CSS-in-JS) | 🔥 CSS-in-JS runtime | 🔥 Build-time CSS (zero runtime) |
| **Design tokens** | 🔥 Built-in token system with inheritance | ❌ Not built-in | ❌ Not built-in | ✅ Theming via CSS variables | ✅ Theming via CSS variables |
| **Inheritance model** | 🔥 Multi-level, type-safe `extend()` | ❌ No formal inheritance model | ❌ No formal inheritance model (composition/extend API exists) | ✅ Component composition (no typed inheritance chain) | ❌ No inheritance model |
| **Slots** | 🔥 Multi-slot API | ❌ Not provided | ✅ Slots API provided | — | — |
| **Composition/extend** | 🔥 `extend(contract, definition)` | ✅ Composition via function usage; supports compound variants | ✅ `extend` API to build on top of tv config | 🔥 Compose via `styled()` and variants | ✅ Recipes/compose at build-time |
| **Runtime theming** | 🔥 Per-instance token overrides at `create()` | ❌ Not built-in | ❌ Not built-in | ✅ Theming via CSS variables | ✅ Theming via CSS variables |
| **Runtime characteristics** | 🔥 Class merge/lazy evaluation; no runtime CSS | ✅ Class merge; no runtime CSS | ✅ Class merge; no runtime CSS | 🔥 Runtime style system | 🔥 Build-time extraction |
| **Learning Curve** | 🔥 Steep (powerful) | ✅ Easy | ✅ Easy | 🔥 Medium | 🔥 Medium |

> **Callouts**
> - **CVA** is a minimal, variant-focused class builder; if you don’t need tokens or typed inheritance, it’s simple and effective.
> - **TV** adds a slots model and ergonomics on top of class composition; it doesn’t model typed inheritance or design tokens.
> - **Stitches** is a full CSS-in-JS solution (React-first) with tokens/theming via CSS variables.
> - **vanilla-extract** is a build-time CSS solution with theming via CSS variables and zero runtime.

### Code Comparison Showcase

Let's see how different libraries handle the same scenarios:

#### Simple Button Component

**class-variance-authority:**
```ts
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center rounded font-medium",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-600 text-white hover:bg-gray-700",
      },
      size: {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// Usage
<button className={buttonVariants({ variant: "primary", size: "lg" })}>
  Click me
</button>
```

**@use-pico/cls:**
```ts
import { cls } from "@use-pico/cls";

const Button = cls({
  tokens: {},
  slot: ["root"],
  variant: { 
    variant: ["primary", "secondary"],
    size: ["sm", "md", "lg"] 
  },
}, {
  token: {},
  rules: ({ root, rule, what }) => [
    root({
      root: what.css(["inline-flex", "items-center", "rounded", "font-medium"])
    }),
    rule({ variant: "primary" }, { root: what.css(["bg-blue-600", "text-white", "hover:bg-blue-700"]) }),
    rule({ variant: "secondary" }, { root: what.css(["bg-gray-600", "text-white", "hover:bg-gray-700"]) }),
    rule({ size: "sm" }, { root: what.css(["px-2", "py-1", "text-sm"]) }),
    rule({ size: "md" }, { root: what.css(["px-4", "py-2", "text-base"]) }),
    rule({ size: "lg" }, { root: what.css(["px-6", "py-3", "text-lg"]) }),
  ],
  defaults: { variant: "primary", size: "md" },
});

// Usage
const classes = Button.create({ variant: { variant: "primary", size: "lg" } });
<button className={classes.root()}>Click me</button>
```

> **Note**: `@use-pico/cls` is more verbose here, but provides better type safety and extensibility.

#### Multi-slot Component

**tailwind-variants:**
```ts
import { tv } from "tailwind-variants";

const card = tv({
  slots: {
    base: "border rounded-lg shadow-sm bg-white",
    header: "p-4 border-b font-semibold",
    content: "p-4 text-sm",
    footer: "p-4 border-t bg-gray-50",
  },
});

// Usage
const { base, header, content, footer } = card();
<div className={base()}>
  <div className={header()}>Title</div>
  <div className={content()}>Content</div>
  <div className={footer()}>Footer</div>
</div>
```

**@use-pico/cls:**
```tsx
import { cls } from "@use-pico/cls";

const Card = cls({
  tokens: {},
  slot: ["root", "header", "content", "footer"],
  variant: {},
}, {
  token: {},
  rules: ({ root, what }) => [
    root({
      root: what.css(["border", "rounded-lg", "shadow-sm", "bg-white"]),
      header: what.css(["p-4", "border-b", "font-semibold"]),
      content: what.css(["p-4", "text-sm"]),
      footer: what.css(["p-4", "border-t", "bg-gray-50"]),
    }),
  ],
  defaults: {},
});

// Usage
const classes = Card.create();
<div className={classes.root()}>
  <div className={classes.header()}>Title</div>
  <div className={classes.content()}>Content</div>
  <div className={classes.footer()}>Footer</div>
</div>
```

> **Note**: Very similar complexity, but `@use-pico/cls` provides better type safety and inheritance capabilities.

#### Design Tokens & Inheritance

**@stitches/react:**
```ts
import { styled } from "@stitches/react";

const Button = styled("button", {
  // Base styles
  display: "inline-flex",
  alignItems: "center",
  borderRadius: "0.375rem",
  fontWeight: "500",
  
  variants: {
    variant: {
      primary: {
        backgroundColor: "$blue600",
        color: "white",
        "&:hover": { backgroundColor: "$blue700" },
      },
      secondary: {
        backgroundColor: "$gray600",
        color: "white",
        "&:hover": { backgroundColor: "$gray700" },
      },
    },
    size: {
      sm: { padding: "$2 $3", fontSize: "$sm" },
      md: { padding: "$3 $4", fontSize: "$base" },
      lg: { padding: "$4 $6", fontSize: "$lg" },
    },
  },
  
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

// Extended button
const IconButton = styled(Button, {
  // Override and extend
  variants: {
    size: {
      sm: { padding: "$2", width: "$8", height: "$8" },
      md: { padding: "$3", width: "$10", height: "$10" },
      lg: { padding: "$4", width: "$12", height: "$12" },
    },
  },
});
```

**@use-pico/cls:**
```ts
import { cls } from "@use-pico/cls";

const Button = cls({
  tokens: {
    "color.bg": ["default", "hover"],
    "color.text": ["default"],
    "spacing.padding": ["sm", "md", "lg"],
  },
  slot: ["root"],
  variant: { variant: ["primary", "secondary"], size: ["sm", "md", "lg"] },
}, {
  token: {
    "color.bg": {
      default: ["bg-blue-600"],
      hover: ["hover:bg-blue-700"],
    },
    "color.text": {
      default: ["text-white"],
    },
    "spacing.padding": {
      sm: ["px-2", "py-1"],
      md: ["px-4", "py-2"],
      lg: ["px-6", "py-3"],
    },
  },
  rules: ({ root, rule, what }) => [
    root({
      root: what.both(["inline-flex", "items-center", "rounded", "font-medium"], [
        "color.bg.default",
        "color.text.default",
        "spacing.padding.md",
      ]),
    }),
    rule({ variant: "primary" }, { 
      root: { token: ["color.bg.default", "color.bg.hover"] }
    }),
    rule({ variant: "secondary" }, { 
      root: { class: ["bg-gray-600", "hover:bg-gray-700"] }
    }),
    rule({ size: "sm" }, { root: { token: ["spacing.padding.sm"] } }),
    rule({ size: "lg" }, { root: { token: ["spacing.padding.lg"] } }),
  ],
  defaults: { variant: "primary", size: "md" },
});

// Extended button with inheritance
const IconButton = Button.extend({
  tokens: {
    "color.bg": ["default", "hover"], // Inherit and can override
    "spacing.size": ["sm", "md", "lg"], // New tokens
  },
  slot: ["icon"],
  variant: { size: ["sm", "md", "lg"] },
}, {
  token: {
    "spacing.size": {
      sm: ["w-8", "h-8"],
      md: ["w-10", "h-10"],
      lg: ["w-12", "h-12"],
    },
  },
  rules: ({ root, rule, what }) => [
    root({
      icon: what.css(["w-4", "h-4"]),
    }),
    rule({ size: "sm" }, { 
      root: { class: ["p-2"], token: ["spacing.size.sm"] }
    }),
    rule({ size: "md" }, { 
      root: { class: ["p-3"], token: ["spacing.size.md"] }
    }),
    rule({ size: "lg" }, { 
      root: { class: ["p-4"], token: ["spacing.size.lg"] }
    }),
  ],
  defaults: { size: "md" },
});
```

> **Note**: `@use-pico/cls` is more verbose but provides:
> - **Type-safe design tokens** with inheritance
> - **Compile-time validation** of all token references
> - **Multi-slot support** in the same component
> - **Framework-agnostic** approach

#### Theme System

**vanilla-extract:**
```ts
// tokens.css.ts
import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    primary: "#3b82f6",
    secondary: "#6b7280",
    background: "#ffffff",
    text: "#1f2937",
  },
  space: {
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
  },
});

// button.css.ts
import { styleVariants } from "@vanilla-extract/recipes";
import { vars } from "./tokens.css";

export const button = styleVariants({
  primary: {
    backgroundColor: vars.color.primary,
    color: "white",
    padding: `${vars.space.md} ${vars.space.lg}`,
  },
  secondary: {
    backgroundColor: vars.color.secondary,
    color: "white",
    padding: `${vars.space.md} ${vars.space.lg}`,
  },
});
```

**@use-pico/cls:**
```ts
import { cls } from "@use-pico/cls";

const Theme = cls({
  tokens: {
    "color.primary": ["default"],
    "color.secondary": ["default"],
    "color.background": ["default"],
    "color.text": ["default"],
    "spacing.padding": ["sm", "md", "lg"],
  },
  slot: ["root"],
  variant: {},
}, {
  token: {
    "color.primary": { default: ["#3b82f6"] },
    "color.secondary": { default: ["#6b7280"] },
    "color.background": { default: ["#ffffff"] },
    "color.text": { default: ["#1f2937"] },
    "spacing.padding": {
      sm: ["0.5rem"],
      md: ["1rem"],
      lg: ["1.5rem"],
    },
  },
  rules: ({ root, what }) => [root({ root: what.css(["base-styles"]) })],
  defaults: {},
});

const Button = Theme.extend({
  slot: ["root"],
  variant: { variant: ["primary", "secondary"] },
}, {
  rules: ({ root, rule, what }) => [
    root({
      root: what.both(["inline-flex", "items-center", "rounded"], ["spacing.padding.md"]),
    }),
    rule({ variant: "primary" }, { 
      root: what.both(["text-white"], ["color.primary"]),
    }),
    rule({ variant: "secondary" }, { 
      root: what.both(["text-white"], ["color.secondary"]),
    }),
  ],
  defaults: { variant: "primary" },
});
```

> **Note**: vanilla-extract is more concise but `@use-pico/cls` provides:
> - **Runtime flexibility** (can change themes dynamically)
> - **Type-safe token inheritance**
> - **Framework-agnostic** approach
> - **Component-level token overrides**

#### Summary

| Aspect | Competitors | @use-pico/cls |
|--------|-------------|---------------|
| **Simple Components** | ✅ Concise | ⚠️ More verbose but type-safe |
| **Multi-slot** | ✅ Good | ✅ Excellent with inheritance |
| **Design Tokens** | ❌ Limited/None | ✅ First-class with validation |
| **Inheritance** | ⚠️ Basic/None | ✅ Sophisticated with type safety |
| **Type Safety** | ✅ Basic | ✅ Advanced compile-time validation |
| **Runtime Flexibility** | ⚠️ Limited | ✅ Full override capabilities |
| **Learning Curve** | ✅ Easy | ⚠️ Steeper but more powerful |

**The trade-off is clear**: `@use-pico/cls` prioritizes **type safety**, **design system consistency**, and **scalability** over **conciseness**. For simple projects, competitors might be easier. For complex design systems and production applications, `@use-pico/cls` provides the tools you need to build maintainable, type-safe styling systems.

## A Personal Note

### A Brief History

It started with experience using **class-variants utilities**. They worked, but I kept hitting **limits in real projects**.

#### class-variance-authority (CVA)

- I used CVA and it worked, but I found **limitations in my projects** as things grew.
- It nudged me toward wanting **first-class tokens**, **stronger typing**, and **multi-level inheritance**.

#### tailwind-variants (TVA)

- I found TVA and **liked it**; it worked nicely in practice.
- But I ran into **internal problems and inconsistencies** (values used as "string" vs "arrays"), which were **hard to track** at scale.
- Alongside other limits, the **last nail in the coffin** was the lack of **design token** support.

> **Credit where it’s due**: tailwind-variants (TVA) did a lot of things **very well** and heavily inspired this library. Its ergonomics and slot model influenced early versions of `@use-pico/cls`. This project builds on that inspiration while focusing on **design tokens** and **heavy type safety** as first-class features.

So I built the first version of **“cls”**. At the beginning it was conceptually close to _tva_, but with one big change: a **solid, fully typed inheritance model**. That’s where the _**type‑safety first**_ mantra came from.

Next came the tough part: **design tokens**. I tried CSS variables, but the tokens lived in CSS while classes lived in JS/TS. That **disconnect** made it hard to see who used what, and maintaining tokens across CSS and components felt **brittle**.

The breakthrough was to make **tokens first‑class citizens** in the system:

- Define a core `cls` that declares your tokens (whether they’re **Tailwind utilities** or **custom CSS variables**)
- Reference tokens **directly** from rules and slots
- Keep **everything in one place** with **full types**, so as soon as you define a token, it’s **available (and validated) everywhere** across inheritance

> In human words: **I wanted to see tokens where I use them** — not in a CSS file far away.

### Project maturity

This project went through **a lot of cycles**. I shipped early iterations into **real production apps**, fixed rough edges that only show up at scale, and folded in **feature requests** from teams that lived with it day to day. That’s how tokens became first‑class, how **override semantics** were nailed down, how **multi‑level inheritance** stayed type‑safe, and why `create(user, internal)` exists.

Today the **core feels stable**. I still add **small conveniences** now and then, but I’m careful not to break what already works in production. The test suite mirrors the cases we actually hit: **base vs variant rules, tokens, overrides (both levels), ordering guarantees, multi‑level inheritance, lazy slots**. If you run into a real‑world edge case, please open an issue — that’s how this library got to where it is.

This library went through **multiple iterations**. The earliest version was hand‑written by me; later iterations **refined the API** and **internals**. The final version you’re reading now was a **collaboration**: I designed the concepts and type system, and used AI to help with **heavy lifting** and **implementation polish**. Think of it as **human‑led design** with **AI‑assisted execution**.

### Transparency

I’m sharing this story to be transparent: the **ideas, constraints, and overall design** are mine; **AI helped** me accelerate and explore the implementation space. The end result is a tool I’m proud of—**practical, strongly typed, and built for real‑world design systems**.

If you find rough edges, **ping me** — I’d love to make it better with you.

## FAQ

- **Does this replace Tailwind?** No — it **hugs Tailwind**.
- **Can I use it without Tailwind?** Yes — tokens can use **any class names**.
- **SSR?** Works — **no CSS-in-JS runtime**.

## Known (React) limitations

- **Dynamic token keys aren’t type‑validated**; keep your theme keys aligned with each component’s **contract**. For strict typing, pass tokens **directly to `create({ token })`** instead of relying on untyped context merges. See [Type-safety note (context)](#type-safety-note-context).

## Contributing

Found a bug? **Open an issue.** Have an idea? **Start a discussion.** Good vibes required. ✨

## License

MIT © use-pico

---

> **🤖 AI Collaboration Note**: This comprehensive README was crafted with the help of AI assistance, demonstrating how AI can enhance developer documentation and user experience. As the developer behind this library, I'm proud of both the technical implementation and this collaborative documentation effort - it showcases the power of human-AI collaboration in creating better developer tools and clearer documentation. No shame, just progress! 🚀
