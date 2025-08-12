# Chapter 3: Core API

Welcome to the **Core API** chapter! This is where the rubber meets the road - you'll learn all the essential functions, methods, and utilities that make CLS work! 🚀

## Table of Contents
- [3.1 `cls()` Function](./3.1-cls-function.md)
- [3.2 `extend()` Method](./3.2-extend-method.md)
- [3.3 `contract()` Helper](./3.3-contract-helper.md)
- [3.4 `use()` Method](./3.4-use-method.md)
- [3.5 `merge()` Utility](./3.5-merge-utility.md)
- [3.6 `tvc()` Helper](./3.6-tvc-helper.md)
- [3.7 What Utility](./3.7-what-utility.md)
- [3.8 Definition Helpers](./3.8-definition-helpers.md)
- [3.9 Override Helpers](./3.9-override-helpers.md)
- [3.10 Override System Deep Dive](./3.10-override-system-deep-dive.md)

## What You'll Learn 🎯

In this chapter, you'll master the **fundamental building blocks** of CLS:

- **`cls()` Function**: The main function for creating styling modules
- **`extend()` Method**: How to build inheritance chains and extend existing modules
- **`contract()` Helper**: Type-safe contract definitions for perfect TypeScript support
- **`use()` Method**: Composition mechanism for combining independent modules
- **`merge()` Utility**: Manual composition tool for advanced use cases
- **`tvc()` Helper**: Smart class string merging with conflict resolution
- **What Utility**: Type-safe styling helpers (`what.css()`, `what.token()`, `what.variant()`, `what.both()`)
- **Definition Helpers**: Building blocks for creating definitions (`def.token()`, `def.rule()`, `def.root()`, `def.defaults()`)
- **Override Helpers**: Tools for explicit style overrides (`override.token()`, `override.rule()`, `override.root()`)
- **Override System Deep Dive**: Advanced override patterns and techniques

## The Core API Philosophy 🧠

CLS's Core API is designed around **three core principles**:

### 1. **Type Safety First** 🔒
Every function, method, and utility provides **full TypeScript support** with automatic type inference. You get compile-time validation, IntelliSense, and refactoring safety.

### 2. **Composable by Design** 🧩
The API is built for **composition and inheritance** - you can combine simple modules into complex systems, extend existing modules, and create reusable building blocks.

### 3. **Developer Experience Optimized** ⚡
Every API is designed for **intuitive usage** with clear naming, consistent patterns, and helpful error messages. You'll feel productive from day one!

## How This Chapter is Organized 📚

### Foundation (3.1-3.3)
Start with the **core building blocks**:
- **3.1 `cls()` Function**: Your primary tool for creating modules
- **3.2 `extend()` Method**: Build inheritance chains
- **3.3 `contract()` Helper**: Type-safe contract definitions

### Composition (3.4-3.6)
Learn how to **combine modules**:
- **3.4 `use()` Method**: Automatic composition
- **3.5 `merge()` Utility**: Manual composition with control
- **3.6 `tvc()` Helper**: Smart class string merging

### Styling Tools (3.7-3.10)
Master the **styling utilities**:
- **3.7 What Utility**: Type-safe styling helpers
- **3.8 Definition Helpers**: Building definitions
- **3.9 Override Helpers**: Explicit overrides
- **3.10 Override System Deep Dive**: Advanced patterns

## Quick Start Example 🚀

Here's a taste of what you'll learn:

```typescript
import { cls, contract } from "@use-pico/cls";

// Define a contract (type-safe)
const ButtonContract = contract({
  tokens: {
    "color.bg": ["default", "primary", "danger"],
    "color.text": ["default", "primary", "danger"]
  },
  slot: ["root", "label"],
  variant: {
    size: ["sm", "md", "lg"],
    tone: ["default", "primary", "danger"]
  }
});

// Create a CLS instance
const ButtonCls = cls(ButtonContract, ({ what, def }) => ({
  token: def.token({
    "color.bg": {
      default: ["bg-gray-100"],
      primary: ["bg-blue-600"],
      danger: ["bg-red-500"]
    }
  }),
  rules: [
    def.root({
      root: what.both(
        ["inline-flex", "items-center", "rounded"],
        ["color.bg.default", "color.text.default"]
      ),
      label: what.css(["font-medium"])
    }),
    def.rule(
      what.variant({ tone: "primary" }),
      { root: what.token(["color.bg.primary", "color.text.primary"]) }
    )
  ],
  defaults: def.defaults({
    size: "md",
    tone: "default"
  })
}));

// Use it!
const classes = ButtonCls.create(({ what }) => ({
  variant: what.variant({ tone: "primary", size: "lg" })
}));
```

## The Learning Path 🛤️

### Beginner Path
If you're new to CLS, follow this order:
1. **3.1 `cls()` Function** - Start here! Learn the main function
2. **3.7 What Utility** - Master the styling helpers
3. **3.8 Definition Helpers** - Learn to build definitions
4. **3.2 `extend()` Method** - Understand inheritance
5. **3.3 `contract()` Helper** - Type-safe contracts

### Intermediate Path
Once you're comfortable with the basics:
1. **3.4 `use()` Method** - Learn composition
2. **3.5 `merge()` Utility** - Advanced composition
3. **3.6 `tvc()` Helper** - Smart class merging
4. **3.9 Override Helpers** - Explicit overrides

### Advanced Path
For power users:
1. **3.10 Override System Deep Dive** - Master advanced patterns
2. Combine all techniques for complex systems

## What Makes This API Special? 🌟

### 1. **Everything is Type Safe**
```typescript
// TypeScript knows exactly what's available
def.rule(
  what.variant({ 
    size: "lg",     // ✅ TypeScript validates this
    tone: "primary" // ✅ TypeScript validates this
  }),
  { 
    root: what.token([
      "color.bg.primary" // ✅ TypeScript knows this token exists
    ])
  }
)
```

### 2. **Composable Architecture**
```typescript
// Build complex systems from simple parts
const ThemeCls = cls(themeContract, themeDefinition);
const InteractiveCls = cls(interactiveContract, interactiveDefinition);
const ButtonCls = ThemeCls.extend(buttonContract, buttonDefinition);
const FinalButtonCls = ButtonCls.use(InteractiveCls);
```

### 3. **Developer Experience**
```typescript
// Clear, intuitive API
const classes = ButtonCls.create(({ what }) => ({
  variant: what.variant({ tone: "primary" })
}));

// Smart error messages
// Error: "Token 'color.bg.invalid' not found in contract"
```

## Ready to Dive In? 🏊‍♂️

You're about to learn the **most powerful styling API** you've ever used! Each chapter builds on the previous one, so take your time and experiment with the examples.

**Start with [3.1 `cls()` Function](./3.1-cls-function.md)** - it's the foundation of everything else! 🎉

---

**Previous:** [Chapter 2: Design Philosophy](../02-design-philosophy/README.md) | **Next:** [Chapter 4: React Integration](../04-react-integration/README.md)
