# @use-pico/cls

# TODO - Add note this is css class-based styling solution which requires existing css classes, not pure Css-in-Js
# TODO - Add top-level not this lib works great with TailwindCSS, but it's not directly bound to it
# TODO - Add section telling the motivation of this package - using design tokens and have strict typechecking
# TODO - Add comparison between similar solutions, e.g. cva or tva

✨ Design-token powered, type-safe class builder for modern UI. Ship consistent styles without the boilerplate.

🚀 What you’ll love

- 🧱 Contracts, not configs: describe tokens, slots, and variants once — get full IntelliSense everywhere.
- ⚡️ Lazy by default: slots are computed on-demand via Proxy; no wasted work.
- 🎛️ Rules that read like UI: map variant combos → classes/tokens, with predictable override semantics.
- 🧩 Extend anything: inherit tokens/slots/variants across components and keep types intact.
- 🌀 Tailwind-native: merged with tailwind-merge (last-wins, duplicates deduped).
Perfect for design systems, component libraries, and apps that want predictable styling without sacrificing DX.

## Install

```bash
npm i @use-pico/cls
# or
pnpm add @use-pico/cls
# or
bun add @use-pico/cls
```

## TL;DR

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
    rule: [
      {
        match: { variant: "primary" },
        slot: {
          root: { token: ["primary.bg.default"], class: ["inline-flex", "items-center"] },
          label: { token: ["primary.text.default"], class: ["font-medium"] },
        },
      },
      { match: { size: "sm" }, slot: { root: { class: ["px-2", "py-1"] } } },
      { match: { size: "md" }, slot: { root: { class: ["px-4", "py-2"] } } },
    ],
    defaults: { size: "md", variant: "primary" },
  },
);

const cls1 = Button.create({});
// cls1.root  => "inline-flex items-center bg-blue-600 px-4 py-2"
// cls1.label => "font-medium text-white"

const cls2 = Button.create({ variant: { size: "sm" } });
// cls2.root  => "inline-flex items-center bg-blue-600 px-2 py-1"

const cls3 = Button.create({ token: { "primary.bg": { default: ["bg-red-600"] } } });
// cls3.root  => "inline-flex items-center bg-red-600 px-4 py-2"
```

## How it works (in plain English)

- Define a contract with three things: tokens (your design primitives), slots (parts of your component), and variants (state/options like size or theme).
- Provide a definition: map tokens to classes and write rules that say “when variant X is Y, add these styles to slot Z”.
- Call `create()` at render time; access only the slots you need (`classes.root`, `classes.icon`). Class strings are computed lazily.
- You can override tokens and slots per-instance, or hard-replace a slot via `override`.

## API (what you’ll actually use)

- `cls(contract, definition)` → create a style module.
- `extend(contract, definition)` → inherit and add/override (types flow through).
- `create(userConfig?, internalConfig?)` → get lazily-resolved classes for each slot.
  - Order matters: user config has precedence over internal config per field (`variant`, `slot`, `override`, `token`)
  - Internally uses `merge(user, internal)` with user-wins semantics
- `component(props)` → shortcut for simple components with static slots only.
- `variant(props)` → shortcut for static slots + variants with full rule matching.
- `token(props)` → shortcut for token-only definitions (no slots/variants).
- `merge(internal, user)` → merge two create-configs (user wins), reusable in apps
- `classes(value)` → tiny helper to declare `class` arrays succinctly in rules
- `match(...)` → typed rule builder with 2-arg (base) and 3-arg (conditional) overloads

### Cls instance helpers

In addition to the top-level helpers, every `Cls` instance exposes instance-scoped helpers that build on top of its current contract via `extend()`:

- `Base.component(props)` → add static slots to the existing contract (inherits tokens/rules/defaults)
- `Base.variant(props)` → add static slots + variants with full rule matching (inherits tokens/rules/defaults)

Why it’s useful

- **Inheritance-aware**: New layers keep using tokens and base rules from the instance you call them on
- **Low ceremony**: Same props as top-level helpers, but no need to restate tokens or wire `extend()` manually

Example

```ts
const Base = cls(
  { tokens: { "theme.text": ["default"] }, slot: ["root"], variant: {} },
  {
    token: { "theme.text": { default: ["text-blue-600"] } },
    rule: [{ slot: { root: { class: ["base-root"], token: ["theme.text.default"] } } }],
    defaults: {},
  },
);

// Add static slots on top of Base
const WithSlots = Base.component({
  slots: ["label"] as const,
  slot: { label: { class: ["font-bold"] } },
});

// Add variants and rules on top of Base
const WithVariant = Base.variant({
  slots: ["label"] as const,
  variants: { active: ["bool"] } as const,
  rule: [
    { slot: { label: { class: ["base-label"] } } },
    { match: { active: true }, slot: { label: { class: ["is-active"] } } },
  ],
  defaults: { active: false },
});

// Both still include Base’s tokens/rules
WithSlots.create().root;   // => "base-root text-blue-600"
WithVariant.create().root; // => "base-root text-blue-600"
```

Create config options:
- `variant`: override defaults for this instance.
- `slot`: append classes/tokens to slots.
- `override`: hard-replace a slot’s output.
- `token`: replace token values for this instance only.

Ordering rules (predictable by design):
- Inside a slot step, `class` first → then `token`.
- Across steps: base rules → matched rules → `slot` appends → `override` replaces.

## Inheritance

```ts
const Base = cls(
  { tokens: { "t.text": ["default"], "t.bg": ["default"] }, slot: ["root", "label"], variant: {} },
  { token: { "t.text": { default: ["text-blue-600"] }, "t.bg": { default: ["bg-blue-600"] } }, rule: [ { slot: { root: { token: ["t.bg.default"] }, label: { token: ["t.text.default"] } } } ], defaults: {} },
);

const Extended = Base.extend(
  {
    tokens: {
      // override parent group by re-declaring it here
      "t.text": ["default"],
      // add a new group
      "accent.ring": ["focus"],
    },
    slot: ["icon"],
    variant: { size: ["sm", "md"] },
  },
  {
    token: { "t.text": { default: ["text-red-600"] }, "accent.ring": { focus: ["ring-2 ring-blue-600"] } },
    rule: [
      { slot: { icon: { token: ["accent.ring.focus"] } } },
      { match: { size: "sm" }, slot: { root: { class: ["px-2", "py-1"] } } },
      { match: { size: "md" }, slot: { root: { class: ["px-4", "py-2"] } } },
    ],
    defaults: { size: "md" },
  },
);

const s = Extended.create({});
// s.root  => "bg-blue-600 px-4 py-2"
// s.label => "text-red-600"
// s.icon  => "ring-2 ring-blue-600"
```

## Create-time Overrides

```ts
const s1 = Extended.create({ slot: { root: { class: ["px-2"], token: ["t.bg.default"] } } });
// root => "bg-blue-600 px-2 bg-blue-600" (deduped by tvc => "px-2 bg-blue-600" or last-wins where applicable)

const s2 = Extended.create({ override: { root: { class: ["block"], token: ["t.bg.default"] } } });
// root => "block bg-blue-600"

const s3 = Extended.create({ token: { "t.text": { default: ["text-green-600"] } } });
// label => "text-green-600"
```

## Deterministic Order

Within one slot step: `class` then `token`. Across steps:
1) Base/default rules (top-down)
2) Variant matched rules (in their order)
3) create().slot appends
4) create().override replaces

All merged and deduped using `tvc` (tailwind-merge).

### component() — simple, static-slot components

When your component only needs static classes per slot (no tokens, no variants), use `component()`.

- Keeps the output and ergonomics of `cls`, but without token/variant ceremony
- Type-safe slots with full IntelliSense
- Still lazy: classes are resolved per-access via Proxy

Signature

```ts
import type { SlotContract } from "@use-pico/cls";

type ComponentProps<TSlots extends SlotContract> = {
  slots: TSlots;                                    // contract: list your slots
  slot: {
    // definition: one rule, mapping slot → classes
    [K in TSlots[number]]?: { class: string | string[] };
  };
};

declare function component<const TSlots extends SlotContract>(
  props: ComponentProps<TSlots>,
): /* returns a regular Cls with empty tokens/variants */ any;
```

Usage

```ts
import { component } from "@use-pico/cls";

export const PreviewCls = component({
  slots: ["base", "container", "title", "links", "actions", "extra"],
  slot: {
    base: {
      class: [
        "pico--preview",
        "flex",
        "flex-col",
        "gap-2",
        "bg-(--color-bg)",
        "p-2",
        "rounded-md",
        "border",
        "border-(--color-border)",
      ],
    },
    container: { class: ["flex", "flex-row", "items-center", "justify-between", "gap-1"] },
    title: { class: ["flex", "flex-row", "items-center", "gap-4"] },
    links: { class: ["flex", "flex-row", "items-center", "gap-4", "justify-end"] },
    actions: { class: ["flex", "flex-row", "items-center", "gap-4"] },
    extra: { class: ["flex", "flex-row", "gap-4", "justify-end"] },
  },
});

const s = PreviewCls.create();
// s.base, s.container, s.title, s.links, s.actions, s.extra
```

What it does (under the hood)

- Builds a minimal `cls` with `{ tokens: {}, variant: {}, slot: props.slots }`
- Adds a single base `rule` with your `props.slot` mapping
- You still get the standard `create()` features:
  - `slot` appends and `override` replacements at call-site
  - No tokens or variants are available (by design)

When to use

- Static, presentational wrappers (cards, toolbars, layout blocks)
- Utility containers and simple labels/rows

When to prefer cls

- You need variants (size, state, theme) or design tokens
- You need multiple conditional rules or overrides

### variant() — static slots with variants and full rule matching

When your component needs variants and rule matching (including `match` and `override`) but you don’t need tokens, use `variant()`.

- Keeps the output and ergonomics of `cls`
- Type-safe slots and variants with full IntelliSense
- You provide the full `rule` array (including the base slot rule)

Signature

```ts
import type { SlotContract, VariantContract } from "@use-pico/cls";

type VariantProps<TSlots extends SlotContract, TVariants extends VariantContract> = {
  slots: TSlots;                                         // slot contract
  variants: TVariants;                                   // variant contract ("bool" → boolean)
  rule: Array<{
    override?: boolean;
    match?: Partial<{ [K in keyof TVariants]: TVariants[K][number] extends "bool" ? boolean : TVariants[K][number] }>;
    slot: { [K in TSlots[number]]?: { class?: string | string[] } };
  }>;
  defaults: { [K in keyof TVariants]: TVariants[K][number] extends "bool" ? boolean : TVariants[K][number] };
};

declare function variant<const TSlots extends SlotContract, const TVariants extends VariantContract>(
  props: VariantProps<TSlots, TVariants>,
): any; // returns a Cls with empty tokens
```

Usage

```ts
import { variant } from "@use-pico/cls";

export const Alert = variant({
  slots: ["base", "title", "message"] as const,
  variants: { variant: ["info", "success"], clickable: ["bool"] } as const,
  rule: [
    {
      // base rule
      slot: {
        base: { class: ["p-2", "rounded"] },
        title: { class: ["font-semibold"] },
        message: { class: ["opacity-85"] },
      },
    },
    {
      match: { variant: "success", clickable: true },
      slot: { base: { class: ["hover:bg-green-50"] } },
    },
  ],
  defaults: { variant: "info", clickable: false },
});
```

### classes() — class mapping helper

Use `classes()` to declare slot classes more ergonomically. It’s a thin helper that wraps a string or string[] into the correct shape for `rule.slot[...]` or create-time overrides.

Signature

```ts
import type { ClassName } from "@use-pico/cls";

declare function classes(value: ClassName): { class: ClassName };
```

Usage

```ts
import { component, classes } from "@use-pico/cls";

export const ToolbarCls = component({
  slots: ["base", "left", "right"] as const,
  slot: {
    base: classes(["flex", "items-center", "justify-between", "gap-2"]),
    left: classes(["flex", "items-center", "gap-1"]),
    right: classes(["flex", "items-center", "gap-1"]),
  },
});

// Works the same inside variant rules
import { variant } from "@use-pico/cls";
export const Alert = variant({
  slots: ["base"] as const,
  variants: { clickable: ["bool"] } as const,
  rule: [
    { slot: { base: classes(["p-2", "rounded"]) } },
    { match: { clickable: true }, slot: { base: classes(["hover:bg-slate-50"]) } },
  ],
  defaults: { clickable: false },
});

// And in create-time overrides
Alert.create({ slot: { base: classes(["ring-1", "ring-blue-300"]) } });
```

### match() — typed rule builder

`match()` is a tiny helper to build a single rule step with full types against your contract. It has two overloads:

- Base rule (always applies): `match(slot, override?)`
- Conditional rule (applies when predicate matches): `match(match, slot, override?)`

Signature

```ts
import type { Contract, RuleDefinition, SlotMapping } from "@use-pico/cls";

declare function match<TContract extends Contract<any, any, any>>(
  slot: SlotMapping<TContract>,
  override?: boolean,
): RuleDefinition<TContract>;

declare function match<TContract extends Contract<any, any, any>>(
  match: RuleDefinition<TContract>["match"],
  slot: SlotMapping<TContract>,
  override?: boolean,
): RuleDefinition<TContract>;
```

Usage

```ts
import { variant, classes, match } from "@use-pico/cls";

export const IssuesCls = variant({
  slots: ["item"] as const,
  variants: { type: ["info", "warning", "error"] } as const,
  rule: [
    match({ item: classes(["p-4", "text-md"]) }),
    match({ type: "info" }, { item: classes(["bg-blue-100", "border-blue-400", "text-blue-700"]) }),
    match({ type: "warning" }, { item: classes(["bg-amber-100", "border-amber-400", "text-amber-700"]) }),
    match({ type: "error" }, { item: classes(["bg-red-100", "border-red-400", "text-red-700"]) }),
  ],
  defaults: { type: "info" },
});
```

What it does (under the hood)

- Builds a minimal `cls` with `{ tokens: {}, slot: props.slots, variant: props.variants }`
- Uses your provided `rule` list verbatim
- You still get the standard `create()` features:
  - `variant`, `slot`, `override`, `token` (token makes sense only if present in ancestors after extend())

## Why @use-pico/cls?

### merge() — config merge helper

Why it exists

- **Consistency**: We use the same merge semantics inside `cls.create` (user config wins over internal config per field).
- **Convenience**: Components often need to combine user-provided `cls` with their own internal state; `merge()` encapsulates the precedence rules.
- **Type-safety**: Fully generic over your `TContract`, preserving strong types for `variant`, `slot`, `override`, and `token`.

Signature

```ts
import { merge } from "@use-pico/cls";

declare function merge<const TContract>(
  user?: Partial<CreateConfig<TContract>>,
  internal?: Partial<CreateConfig<TContract>>,
): Partial<CreateConfig<TContract>>;
```

Behavior

- Shallow-merge each field (`variant`, `slot`, `override`, `token`).
- The second argument is optional; the first one has precedence on conflicts.
- Matches the `(user, internal)` mental model used in components.

Real usage (component-side)

```tsx
import { merge } from "@use-pico/cls";

function MenuLink(props) {
  const isActive = /* compute from router */ false;
  const cls = props.cls; // user-provided partial CreateConfig

  return (
    <Link
      // combine user customizations with component state (active)
      cls={merge(cls, {
        variant: {
          active: isActive,
        },
      })}
      {...props}
    />
  );
}
```

You can also pre-compute a merged config for reuse across multiple `create()` calls:

```ts
const merged = merge(userCfg, { slot: { base: { class: ["relative"] } } });
const s1 = SomeCls.create(merged);
const s2 = AnotherCls.create(merged);
```

### token() — token-only shortcut

When you only need to declare design tokens (e.g., for later reuse/extension) and do not need slots or variants, use `token()`.

Signature

```ts
type TokenProps<TTokens extends Record<string, readonly string[]>> = {
  tokens: TTokens;                                        // token groups → variants
  token: {                                                // concrete token definitions
    [K in keyof TTokens]: {
      [V in TTokens[K][number]]: string | string[];
    };
  };
};

declare function token<const TTokens extends Record<string, readonly string[]>>(
  props: TokenProps<TTokens>,
): any; // returns a Cls with empty slots/variants
```

Usage

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

// Later you can extend() and add slots/variants
```

- 🧠 Type-first: contracts power autocomplete for tokens/variants/slots across inheritance.
- 🧭 Predictable: rule order and override semantics remove ambiguity.
- ⚡️ Fast: lazy slot computation avoids work you won’t use.
- 🧰 Flexible: mix classes and tokens, patch tokens per instance, or hard override a slot.

## Recipes

### Boolean variants

Declare `"bool"` as a variant value to get boolean in TS:

```ts
const Toggle = cls(
  { tokens: {}, slot: ["root"], variant: { disabled: ["bool"] } },
  {
    token: {},
    rule: [
      { match: { disabled: true }, slot: { root: { class: ["opacity-50", "cursor-not-allowed"] } } },
    ],
    defaults: { disabled: false },
  },
);
```

### Multi-slot components

Just list them in `slot` and reference in rules:

```ts
slot: ["root", "icon", "label", "description"]
```

### React usage

```tsx
function Button(props: { size?: "sm" | "md"; children: React.ReactNode }) {
  const c = ButtonCls.create({ variant: { size: props.size } });
  return (
    <button className={c.root}>
      <span className={c.label}>{props.children}</span>
    </button>
  );
}
```

### React component usage (example: `Transfer`)

This pattern shows how a component consumes a `Cls` instance via two dedicated props and strong typing from `XxxCls.Props`.

- **What it adds**: only two props are added to your component API by `XxxCls.Props`:
  - **tva**: override the styling instance (defaults to your exported `XxxCls`)
  - **cls**: user-land `CreateConfig` overrides (variant/slot/override/token)
- **What it does not do**: it does not pollute your domain props; everything else remains untouched.

Definition (`packages/client/src/transfer/TransferCls.ts`)

```ts
import { component, type Component } from "@use-pico/cls";

export const TransferCls = component({
  slots: ["base", "panel", "group", "header", "item"] as const,
  slot: {
    base: { class: ["grid", "grid-cols-2", "gap-2", "select-none"] },
    panel: { class: ["grow", "border", "rounded", "p-4"] },
    group: { class: ["transition-none"] },
    header: { class: ["font-bold"] },
    item: { class: ["flex", "items-center", "justify-between", "p-2", "rounded"] },
  },
});
export namespace TransferCls {
  export type Props<P = unknown> = Component<typeof TransferCls, P>;
}
```

Usage (`packages/client/src/transfer/Transfer.tsx`)

```tsx
import { TransferCls } from "./TransferCls";

export namespace Transfer {
  export interface Props<TItem> extends TransferCls.Props {
    groups: ReadonlyArray<{ id: string; group: React.ReactNode; items: readonly TItem[] }>;
    onChange?(ids: string[]): void;
  }
}

export const Transfer = <TItem,>({ tva = TransferCls, cls, groups, onChange }: Transfer.Props<TItem>) => {
  // Merge user overrides with any internal overrides (inside create)
  const classes = tva.create(cls);

  return (
    <div className={classes.base}>
      <div className={classes.panel}>
        {/* ... */}
      </div>
      <div className={classes.panel}>
        {/* ... */}
      </div>
    </div>
  );
};
```

- **How to customize in app code**:
  - Pass `cls` to tweak styles at call-site:
    ```tsx
    <Transfer
      cls={{ slot: { item: { class: ["ring-1", "ring-blue-300"] } } }}
      {...props}
    />
    ```
  - Swap the styling instance via `tva` (e.g., use an extended theme):
    ```tsx
    <Transfer tva={TransferCls.use(ThemedTransferCls)} {...props} />
    ```

## What’s covered in tests

We ship a comprehensive suite: base rules, variants, tokens, overrides (rule-level and create-time), inheritance (single and multi-level), and ordering guarantees — with lazy slot behavior.

## License

MIT © use-pico
