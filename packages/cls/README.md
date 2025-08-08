# @use-pico/cls

> **Stable API**: The core API of this library is stable and production-ready. Future updates may only add convenience helpers around the existing API.

> **Learning Curve**: This library is designed for **real-world usage** solving **real-world problems** in **larger applications**. While it could serve simple todo apps, it's intended for **complex design systems**, **component libraries**, and **production applications** where **type safety** and **maintainability** matter. The learning curve comes with the territory, but **comprehensive documentation** and familiar concepts from competitors like class-variance-authority and tailwind-variants make it approachable. Once you get it, you'll love the **power** and **type safety** it provides.

✨ **Design-token powered, type-safe class builder for modern UI.** Ship consistent styles without the boilerplate.

🚀 **What you'll love**

- 🧱 **Contracts, not configs**: Describe tokens, slots, and variants once — get full IntelliSense everywhere
- ⚡️ **Lazy by default**: Slots are computed on-demand via Proxy; no wasted work
- 🎛️ **Rules that read like UI**: Map variant combos → classes/tokens, with predictable override semantics
- 🧩 **Extend anything**: Inherit tokens/slots/variants across components and keep types intact
- 🌀 **Tailwind-native**: Merged with tailwind-merge (last-wins, duplicates deduped)
- 🧠 **Heavy type checking**: Compile-time validation ensures design system consistency
- 🚀 **Framework agnostic**: Works with any framework, with excellent React integration
- 🎯 **Design token system**: First-class support for design tokens with inheritance and validation
- 🔄 **Multi-level inheritance**: Extend components while maintaining full type safety
- 💪 **Production ready**: Built for complex design systems and large-scale applications
- 🎨 **Runtime flexibility**: Override any aspect of styling at runtime with full type safety
- 📦 **Lightweight**: ~3KB gzipped with minimal runtime dependencies

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
    slot: ["root"],
    variant: { size: ["sm", "md"] },
  },
  {
    rules: ({ root, rule }) => [
      root({
        root: { class: ["inline-flex", "items-center", "rounded"] },
      }),
      rule({ size: "sm" }, { root: { class: ["px-2", "py-1"] } }),
      rule({ size: "md" }, { root: { class: ["px-4", "py-2"] } }),
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

> **System Design Philosophy**: This system is a **complex set of tools serving its purpose**. Every piece and decision made in its creation is based on **real-world usage patterns** and helps to create a **high-quality class-in-JS system** that scales with your needs. Once you understand how to use the **individual pieces**, it becomes like a **piece of cake to use** - the **type system will guide you** every step of the way.

> **Why Empty Fields?**: You'll notice that many examples include empty objects like `tokens: {}`, `variant: {}`, `token: {}`, and `defaults: {}`. This is **intentional** - the **type system requires all fields to be present** for consistency and type safety. While it might seem verbose, this design choice **prevents complex conditional type logic** that would make the TypeScript types much more complex and harder to understand. The trade-off is **a few extra keystrokes for significantly better type inference and developer experience**.

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

> **Inheritance Note**: While inheritance may look overcomplicated at first, it serves a crucial purpose in this system's design. The examples below will show you how to harness its power effectively in your favor - it's designed to solve real-world design system challenges, not just add complexity.

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

## Token Overloading & Theming 🎨

One of the most powerful features of @use-pico/cls is the ability to overload tokens at runtime with full type safety. This enables dynamic theming and one-time token replacements.

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
  rules: ({ root, rule }) => [
    root({
      root: { 
        class: ["inline-flex", "items-center", "rounded"],
        token: ["color.bg.default", "color.text.default"]
      }
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
} as const;

// Apply theme to any component
const buttonClasses = Button.create({
  token: DarkTheme
});

const cardClasses = Card.create({
  token: DarkTheme
});
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
  tva = TransferCls, // tva: tailwind-variants-style naming (historical), here it means the styling instance
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

## When to Use What and How 🎯

This section shows you practical scenarios and how to approach them with @use-pico/cls. Each example is complete and ready to use!

### Simple Static Components

**When**: You need a basic component with static styling, no variants or tokens.

```ts
import { cls } from "@use-pico/cls";

const Card = cls({
  tokens: {}, // No design tokens needed for this simple component
  slot: ["root", "header", "content", "footer"] as const,
  variant: {}, // No variants needed - static styling only
}, {
  token: {}, // No token definitions since we have no tokens
  rules: ({ root }) => [
    root({
      root: { class: ["border", "rounded-lg", "shadow-sm", "bg-white"] },
      header: { class: ["p-4", "border-b", "font-semibold"] },
      content: { class: ["p-4", "text-sm"] },
      footer: { class: ["p-4", "border-t", "bg-gray-50"] },
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
  slot: ["root", "title", "message"] as const,
  variant: { 
    variant: ["info", "success", "warning", "error"] as const,
    size: ["sm", "md"] as const 
  },
}, {
  token: {}, // No token definitions since we have no tokens
  rules: ({ root, rule }) => [
    root({
      root: { class: ["rounded", "p-2"] }
    }),
    rule({ variant: "info" }, { root: { class: ["bg-blue-100", "border-blue-400", "text-blue-700"] } }),
    rule({ variant: "success" }, { root: { class: ["bg-green-100", "border-green-400", "text-green-700"] } }),
    rule({ variant: "warning" }, { root: { class: ["bg-yellow-100", "border-yellow-400", "text-yellow-700"] } }),
    rule({ variant: "error" }, { root: { class: ["bg-red-100", "border-red-400", "text-red-700"] } }),
    rule({ size: "sm" }, { root: { class: ["text-sm"] } }),
    rule({ size: "md" }, { root: { class: ["text-base"] } }),
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
  rules: ({ root, rule }) => [
    root({
      root: { 
        class: ["inline-flex", "items-center", "rounded"],
        token: ["color.bg.default", "spacing.padding.md"]
      },
      label: { 
        class: ["font-medium"],
        token: ["color.text.default"]
      },
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
  rules: ({ root, rule }) => [
    root({
      root: { 
        class: ["inline-flex", "items-center", "rounded"],
        token: ["color.bg.default", "spacing.padding.md"]
      },
      label: { 
        class: ["font-medium"],
        token: ["color.text.default"]
      },
    }),
    rule({ size: "sm" }, { root: { class: ["px-2", "py-1"] } }),
    rule({ size: "md" }, { root: { class: ["px-4", "py-2"] } }),
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
  rules: ({ root, rule }) => [
    root({
      icon: { class: ["w-4", "h-4", "mr-2"] }, // New slot styling
    }),
    rule({ size: "lg" }, { root: { class: ["px-6", "py-3"] } }), // New variant
    rule({ loading: true }, { 
      root: { class: ["opacity-75", "cursor-wait"] },
      icon: { class: ["animate-spin"] }
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
  rules: ({ root }) => [root({ root: { class: ["border", "rounded"] } })],
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
  rules: ({ root }) => [root({ root: { class: ["border", "rounded"] } })],
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
  rules: ({ root }) => [root({ root: { class: ["border", "rounded"] } })],
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
  rules: ({ root, rule }) => [
    root({
      root: { 
        class: ["inline-flex", "items-center", "rounded", "border-2", "focus:outline-none"],
        token: ["color.bg.default", "color.text.default", "color.border.default", "spacing.padding.md"]
      },
      icon: { class: ["w-4", "h-4", "mr-2"] },
      label: { class: ["font-medium"] },
      spinner: { class: ["w-4", "h-4", "mr-2", "animate-spin"] },
    }),
    // Size variants
    rule({ size: "sm" }, { root: { token: ["spacing.padding.sm"] } }),
    rule({ size: "lg" }, { root: { token: ["spacing.padding.lg"] } }),
    // Color variants
    rule({ variant: "secondary" }, { 
      root: { 
        token: ["color.bg.default", "color.text.default"],
        class: ["bg-gray-600", "text-white"]
      }
    }),
    rule({ variant: "danger" }, { 
      root: { 
        token: ["color.bg.default", "color.text.default"],
        class: ["bg-red-600", "text-white"]
      }
    }),
    // State variants
    rule({ disabled: true }, { 
      root: { 
        token: ["color.bg.disabled", "color.text.disabled"],
        class: ["cursor-not-allowed"]
      }
    }),
    rule({ loading: true }, { 
      root: { class: ["cursor-wait"] },
      icon: { class: ["hidden"] },
      spinner: { class: ["block"] },
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

> **Honest Comparison Disclaimer**: This comparison is written by the @use-pico/cls author and is inherently biased toward highlighting this library's strengths. While we strive for accuracy, **every tool has its trade-offs**. @use-pico/cls prioritizes **type safety and design system consistency** over **conciseness and simplicity**. For simple projects, competitors like class-variance-authority or tailwind-variants might be more appropriate. For complex design systems and production applications where type safety and maintainability are crucial, @use-pico/cls provides unique value. **Choose the tool that fits your specific needs and constraints**.

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
  slot: ["root"] as const,
  variant: { 
    variant: ["primary", "secondary"] as const,
    size: ["sm", "md", "lg"] as const 
  },
}, {
  token: {},
  rules: ({ root, rule }) => [
    root({
      root: { class: ["inline-flex", "items-center", "rounded", "font-medium"] }
    }),
    rule({ variant: "primary" }, { root: { class: ["bg-blue-600", "text-white", "hover:bg-blue-700"] } }),
    rule({ variant: "secondary" }, { root: { class: ["bg-gray-600", "text-white", "hover:bg-gray-700"] } }),
    rule({ size: "sm" }, { root: { class: ["px-2", "py-1", "text-sm"] } }),
    rule({ size: "md" }, { root: { class: ["px-4", "py-2", "text-base"] } }),
    rule({ size: "lg" }, { root: { class: ["px-6", "py-3", "text-lg"] } }),
  ],
  defaults: { variant: "primary", size: "md" },
});

// Usage
const classes = Button.create({ variant: { variant: "primary", size: "lg" } });
<button className={classes.root()}>Click me</button>
```

> **Note**: @use-pico/cls is more verbose here, but provides better type safety and extensibility.

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
```ts
import { cls } from "@use-pico/cls";

const Card = cls({
  tokens: {},
  slot: ["root", "header", "content", "footer"] as const,
  variant: {},
}, {
  token: {},
  rules: ({ root }) => [
    root({
      root: { class: ["border", "rounded-lg", "shadow-sm", "bg-white"] },
      header: { class: ["p-4", "border-b", "font-semibold"] },
      content: { class: ["p-4", "text-sm"] },
      footer: { class: ["p-4", "border-t", "bg-gray-50"] },
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

> **Note**: Very similar complexity, but @use-pico/cls provides better type safety and inheritance capabilities.

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
  rules: ({ root, rule }) => [
    root({
      root: { 
        class: ["inline-flex", "items-center", "rounded", "font-medium"],
        token: ["color.bg.default", "color.text.default", "spacing.padding.md"]
      },
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
  rules: ({ root, rule }) => [
    root({
      icon: { class: ["w-4", "h-4"] },
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

> **Note**: @use-pico/cls is more verbose but provides:
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
  rules: ({ root }) => [root({ root: { class: ["base-styles"] } })],
  defaults: {},
});

const Button = Theme.extend({
  slot: ["root"],
  variant: { variant: ["primary", "secondary"] },
}, {
  rules: ({ root, rule }) => [
    root({
      root: { 
        class: ["inline-flex", "items-center", "rounded"],
        token: ["spacing.padding.md"]
      },
    }),
    rule({ variant: "primary" }, { 
      root: { 
        class: ["text-white"],
        token: ["color.primary"]
      }
    }),
    rule({ variant: "secondary" }, { 
      root: { 
        class: ["text-white"],
        token: ["color.secondary"]
      }
    }),
  ],
  defaults: { variant: "primary" },
});
```

> **Note**: vanilla-extract is more concise but @use-pico/cls provides:
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

**The trade-off is clear**: @use-pico/cls prioritizes **type safety**, **design system consistency**, and **scalability** over **conciseness**. For simple projects, competitors might be easier. For complex design systems and production applications, @use-pico/cls provides the tools you need to build maintainable, type-safe styling systems.

## Advanced Features

### Boolean Variants

```ts
const Toggle = cls(
  { tokens: {}, slot: ["root"], variant: { disabled: ["bool"] } }, // No tokens, just variants
  {
    token: {}, // No token definitions needed
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
import { cls } from "@use-pico/cls";

export const Card = cls({
  tokens: {}, // Simple component - no design tokens needed
  slot: ["base", "header", "content"] as const,
  variant: {}, // No variants - static styling
}, {
  token: {}, // No token definitions
  rules: ({ root }) => [
    root({
      base: { class: ["border", "rounded", "p-4"] },
      header: { class: ["font-bold", "mb-2"] },
      content: { class: ["text-sm"] },
    }),
  ],
  defaults: {}, // No defaults needed
});
```

### Variant-only Components

```ts
import { cls } from "@use-pico/cls";

export const Alert = cls({
  tokens: {}, // Using direct classes instead of design tokens
  slot: ["base", "title", "message"] as const,
  variant: { variant: ["info", "success"], clickable: ["bool"] } as const,
}, {
  token: {}, // No token definitions needed
  rules: ({ root, rule }) => [
    root({
      base: { class: ["p-2", "rounded"] }
    }),
    rule({ variant: "success" }, { base: { class: ["bg-green-100"] } }),
  ],
  defaults: { variant: "info", clickable: false },
});
```

### Token-only Definitions

```ts
import { cls } from "@use-pico/cls";

export const ThemeTokens = cls({
  tokens: {
    "theme.bg": ["default", "hover"],
    "theme.text": ["default", "muted"],
  },
  slot: [],
  variant: {},
}, {
  token: {
    "theme.bg": { default: ["bg-blue-600"], hover: ["bg-blue-700"] },
    "theme.text": { default: ["text-white"], muted: ["text-slate-400"] },
  },
  rules: () => [],
  defaults: {},
});
```

## History – how this library came to be

It started with experience using **class-variants utilities**. They worked, but I kept hitting **limits in real projects**.

- First, I used **class-variance-authority**. Helpful, but I needed **more flexibility** as projects grew.
- Then I tried **tailwind-variants**. I liked it a lot, but I ran into **internal inconsistencies** (strings vs arrays) that were hard to track across a codebase. The bigger blocker was the **lack of first-class design token support**.

So I built the first version of **“cls”**. At the beginning it was conceptually close to _tva_, but with one big change: a **solid, fully typed inheritance model**. That’s where the _**type‑safety first**_ mantra came from.

Next came the tough part: **design tokens**. I tried CSS variables, but the tokens lived in CSS while classes lived in JS/TS. That **disconnect** made it hard to see who used what, and maintaining tokens across CSS and components felt **brittle**.

The breakthrough was to make **tokens first‑class citizens** in the system:

- Define a core `cls` that declares your tokens (whether they’re **Tailwind utilities** or **custom CSS variables**)
- Reference tokens **directly** from rules and slots
- Keep **everything in one place** with **full types**, so as soon as you define a token, it’s **available (and validated) everywhere** across inheritance

This library went through **multiple iterations**. The earliest version was hand‑written by me; later iterations **refined the API** and **internals**. The final version you’re reading now was a **collaboration**: I designed the concepts and type system, and used AI to help with **heavy lifting** and **implementation polish**. Think of it as **human‑led design** with **AI‑assisted execution**.

I’m sharing this story to be transparent: the **ideas, constraints, and overall design** are mine; **AI helped** me accelerate and explore the implementation space. The end result is a tool I’m proud of—**practical, strongly typed, and built for real‑world design systems**.

## License

MIT © use-pico

---

> **🤖 AI Collaboration Note**: This comprehensive README was crafted with the help of AI assistance, demonstrating how AI can enhance developer documentation and user experience. As the developer behind this library, I'm proud of both the technical implementation and this collaborative documentation effort - it showcases the power of human-AI collaboration in creating better developer tools and clearer documentation. No shame, just progress! 🚀
