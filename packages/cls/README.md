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
  }
});

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
```

### Slots

Slots are named parts of your component that can receive independent styling:

```ts
slot: ["root", "icon", "label", "badge"]
```

Each slot becomes a function that returns CSS classes, computed lazily when accessed.

#### Example Usage

```ts
const Card = cls({
  slot: ["root", "header", "content", "footer"]
}, {
  rules: ({ root }) => [
    root({
      root: { class: ["border", "rounded-lg", "shadow-sm"] },
      header: { class: ["p-4", "border-b", "font-semibold"] },
      content: { class: ["p-4", "text-sm"] },
      footer: { class: ["p-4", "border-t", "bg-gray-50"] }
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
  rules: ({ root, rule }) => [
    root({
      root: { class: ["inline-flex", "items-center", "rounded"] }
    }),
    // Size variants
    rule({ size: "sm" }, { root: { class: ["px-2", "py-1", "text-sm"] } }),
    rule({ size: "md" }, { root: { class: ["px-4", "py-2", "text-base"] } }),
    rule({ size: "lg" }, { root: { class: ["px-6", "py-3", "text-lg"] } }),
    // Color variants
    rule({ variant: "primary" }, { root: { class: ["bg-blue-500", "text-white"] } }),
    rule({ variant: "secondary" }, { root: { class: ["bg-gray-500", "text-white"] } }),
    rule({ variant: "danger" }, { root: { class: ["bg-red-500", "text-white"] } }),
    // State variants
    rule({ disabled: true }, { root: { class: ["opacity-50", "cursor-not-allowed"] } }),
    rule({ loading: true }, { root: { class: ["cursor-wait"] } })
  ],
  defaults: { size: "md", variant: "primary", disabled: false, loading: false }
});

// Usage with different variants
const primaryButton = Button.create({ variant: { variant: "primary", size: "lg" } });
const disabledButton = Button.create({ variant: { disabled: true } });
const loadingButton = Button.create({ variant: { loading: true } });
```

### Rules

Rules define conditional styling based on variant combinations:

#### Root Rule

The `root` rule is the default that every component should have (not necessary for pure token definitions). It defines the base styling that always applies:

```ts
root({
  root: { class: ["base-styles"], token: ["color.bg.default"] },
  label: { class: ["font-medium"], token: ["color.text.default"] }
})
```

#### Variant Rules

The `rule` function creates conditional styling based on variant combinations:

```ts
rule(
  { size: "lg", variant: "primary" },
  { root: { class: ["text-lg"], token: ["color.bg.primary"] } }
)
```

**Complete Example:**
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

#### cls(contract, definition)

The main function for creating a style module. This is where you define your component's styling contract and provide the concrete styling values. Use this for most components that need tokens, slots, and variants.

#### extend(contract, definition)

Creates a new style module that inherits from an existing one. This is the foundation of the inheritance system - you can add new tokens, slots, and variants while maintaining full type safety through the inheritance chain.

#### create(userConfig?, internalConfig?)

Generates the actual CSS classes for your component. This is called at render time and returns slot functions that compute classes lazily. The user config takes precedence over internal config, allowing for flexible customization.

> **Two-Parameter Design**: The intention is to have a component that receives `userConfig` from its props while providing its own variants in `internalConfig`. For example, a button component might receive a `disabled` prop (not a variant) and send it to the `variant` field in its `internalConfig`, while user-land config (e.g., `variant: "primary"`) is supplied through `userConfig`.

#### merge(user, internal)

A utility function that encapsulates the merge semantics used internally by `create()`. Useful when you need to combine user-provided styling with component-controlled styling in a predictable way.

> **Convenience Function**: This is primarily a convenience function to prevent object destructuring when you need to merge two configs and pass them to a component's `cls` prop. For example, you might want to provide custom user-land config that overrides one coming from the `cls` prop itself. It's a type-safe way to merge configs without manual object spreading.

### Inheritance System 🧬

The inheritance system is where @use-pico/cls truly shines! While some other libraries support inheritance, @use-pico/cls combines it with design token support and heavy type checking, allowing you to build entire design system hierarchies with full type safety and predictable behavior.

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

> **Type System Enforcement**: The type system will force you to declare all tokens defined in the contract - even (and only) the ones you extend from the parent. This ensures design system consistency and prevents missing token definitions.

#### Variant Inheritance 🧠

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

#### Forced Default Declaration 📋

One of @use-pico/cls's key design decisions is that **all variants must have defaults declared, even when inherited from parent**. This might seem redundant at first, but it's a deliberate choice for clarity and maintainability.

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

#### Type Safety Through Inheritance 🔒

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

### Create-time Overrides 🎛️

The `create()` method gives you incredible flexibility to customize styling at runtime. You can override variants, append to slots, hard override slots, and even override tokens - all with predictable precedence rules!

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

#### Precedence Rules 📋

The override system follows a clear, predictable order:

1. **Base/default rules** (from contract definition)
2. **Variant matched rules** (in definition order)
3. **Slot appends** (from `slot` config)
4. **Hard overrides** (from `override` config)

```ts
const classes = Button.create({
  variant: { size: "lg" },                    // 1. Apply variant rules
  slot: { root: { class: ["ring-1"] } },      // 2. Append to slot
  override: { root: { class: ["block"] } },   // 3. Hard override (wins!)
  token: { "primary.bg": { default: ["bg-red"] } } // 4. Override tokens
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

This override system makes @use-pico/cls incredibly flexible - you can customize any aspect of your components at runtime while maintaining the design system's structure and type safety! 🎨

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
