# CLS - Type-Safe Styling System

> **Type-safe, composable styling system** for React, Vue, Svelte, and vanilla JS

[![npm version](https://badge.fury.io/js/@use-pico%2Fcls.svg)](https://badge.fury.io/js/@use-pico%2Fcls)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Quick Start <a id="quick-start"></a>

```typescript
import { cls } from '@use-pico/cls';

const ButtonCls = cls(
  /**
   * Contract definition - defines structure (tokens, slots, variants)
   */
  {
    tokens: ["color.bg.primary", "color.text.primary"],
    slot: ["root"],
    variant: { size: ["sm", "md", "lg"] }
  },
  ({ what, def }) => ({
    /**
     * Token definitions - enforced by the contract above
     * Both missing and excessive tokens are type-checked
     */
    token: def.token({
      "color.bg.primary": what.css(["bg-blue-600"]),
      "color.text.primary": what.css(["text-white"])
    }),
    /**
     * Rules - conditional styling based on variants
     * May be empty, but usually contains at least "root" rule and variant rules
     */
    rules: [
      def.root({ root: what.token(["color.bg.primary", "color.text.primary"]) }),
      def.rule(what.variant({ size: "lg" }), { root: what.css(["px-6", "py-3"]) })
    ],
    /**
     * Defaults - required for all variants to ensure predictable behavior
     * Enforced even when there are no variants to ensure default values of a component
     * (e.g. even when inherited, children must provide new defaults)
     * 
     * Use "def.defaults" instead of "{}" as it provides type-safe way to check
     * if all defaults are provided in case new variant is created; this will create
     * nice error instead of strange method return type issues
     */
    defaults: def.defaults({
      size: "md"
    })
  })
);

// Usage
const slots = ButtonCls.create(({ what }) => ({
  variant: what.variant({ size: "lg" })
}));
console.log(slots.root()); // "bg-blue-600 text-white px-6 py-3"

// With React
import { useCls } from '@use-pico/cls/react';

function MyButton({ size = "md" }) {
  const slots = useCls(ButtonCls, ({ what }) => ({
    variant: what.variant({ size })
  }));
  
  return <button className={slots.root()}>Click me</button>;
}
```

## ✨ Why CLS? <a id="why-cls"></a>

- **🔒 Type Safety** - Catch styling errors at compile time with full TypeScript support
- **🧩 Composable** - Build design systems with inheritance and composition
- **⚡ Performance** - Lazy evaluation, smart caching, and minimal runtime overhead
- **🌐 Framework Agnostic** - Works with React, Vue, Svelte, vanilla JS, or any framework
- **🎨 Design System Ready** - Tokens, variants, and slots for scalable styling
- **🛠 Developer Experience** - Excellent IDE support and intuitive API

## 🛠 Installation <a id="installation"></a>

```bash
npm install @use-pico/cls
# or
bun add @use-pico/cls
# or
yarn add @use-pico/cls
```

## 📖 Basic Usage <a id="basic-usage"></a>

### Simple Component
```typescript
const CardCls = cls(
  {
    tokens: ["color.bg", "color.text"],
    slot: ["root", "title", "content"],
    variant: { theme: ["light", "dark"] }
  },
  ({ what, def }) => ({
    token: def.token({
      "color.bg": { light: what.css(["bg-white"]), dark: what.css(["bg-gray-800"]) },
      "color.text": { light: what.css(["text-gray-900"]), dark: what.css(["text-white"]) }
    }),
    rules: [
      def.root({
        root: what.both(["rounded-lg", "shadow-md"], ["color.bg.light"]),
        title: what.css(["text-xl", "font-bold"]),
        content: what.css(["p-4"])
      }),
      def.rule(
        what.variant({ theme: "dark" }),
        { root: what.token(["color.bg.dark", "color.text.dark"]) }
      )
    ],
    defaults: def.defaults({
      theme: "light"
    })
  })
);
```

### With React
```tsx
import { cls } from '@use-pico/cls';
import { useCls } from '@use-pico/cls/react';

const MyComponent = ({ theme = "light" }) => {
  const slots = useCls(CardCls, ({ what }) => ({
    variant: what.variant({ theme })
  }));

  return (
    <div className={slots.root()}>
      <h2 className={slots.title()}>Card Title</h2>
      <div className={slots.content()}>Card content here</div>
    </div>
  );
};
```

> **💡 Pro Tip**: This is just the beginning! Check out the [React Integration](#16-react-integration) section for advanced patterns, context providers, HOCs, and more comprehensive examples.

## 🎯 Key Features <a id="key-features"></a>

### Type-Safe Variants
```typescript
// TypeScript ensures only valid variants are used
const slots = ButtonCls.create(({ what }) => ({
  variant: what.variant({ 
    size: "lg",        // ✅ Valid
    // size: "xl"      // ❌ TypeScript error
  })
}));
```

### Token Inheritance
```typescript
const PrimaryButtonCls = ButtonCls.extend(
  {
    tokens: ["color.bg.primary"],
    slot: ["root"],
    variant: {}
  },
  ({ what, def }) => ({
    token: def.token({
      "color.bg.primary": what.css(["bg-blue-600"]) // Overrides parent
    })
  })
);
```

### Runtime Overrides
```typescript
const slots = ButtonCls.create(({ what }) => ({
  variant: what.variant({ size: "lg" }),
  token: {
    "color.bg.primary": what.css(["bg-indigo-600"]) // Runtime override
  }
}));
```

## 🔗 Community & Support <a id="community--support"></a>

- [GitHub Issues](https://github.com/use-pico/pico/issues) - Report bugs and request features
- [Discussions](https://github.com/use-pico/pico/discussions) - Ask questions and share ideas

## 📚 Documentation <a id="documentation"></a>

This document serves as both the **main README** and **comprehensive technical guide**. Keep reading for:

- [Core Concepts](#2-core-concepts) - Understanding the mental model
- [API Reference](#4-main-api) - Complete API documentation  
- [Advanced Features](#5-key-concepts) - Tokens, slots, variants, and rules
- [React Integration](#16-react-integration) - **Complete React guide** with hooks, HOCs, and context
- [Best Practices](#15-best-practices) - How to build great design systems
- [Performance Guide](#12-performance-features) - Optimization strategies

> **🚀 React Developers**: Check out the [detailed React documentation](./docs/04-react-integration/README.md) for comprehensive examples, patterns, and best practices!

---

# CLS Library Design

> **Note**: This document serves as a single source of truth for this library.

## Overview

CLS (Class List System) is a **type-safe, composable styling system** that provides a structured approach to managing CSS classes, design tokens, and component variants. It's framework-agnostic and can be used with React, Vue, Svelte, vanilla JavaScript, or any other framework. It combines the flexibility of utility-first CSS with the maintainability of design systems.

## Table of Contents <a id="table-of-contents"></a>

- [🚀 Quick Start](#quick-start)
- [✨ Why CLS?](#why-cls)
- [🛠 Installation](#installation)
- [📖 Basic Usage](#basic-usage)
- [🎯 Key Features](#key-features)
- [🔗 Community & Support](#community--support)
- [📚 Documentation](#documentation)

**Technical Documentation:**
- [1. Core Principles](#1-core-principles)
  - [1.1 Type Safety First](#11-type-safety-first)
  - [1.2 Inheritance as Foundation](#12-inheritance-as-foundation)
  - [1.3 Declarative Configuration](#13-declarative-configuration)
  - [1.4 Performance Optimized](#14-performance-optimized)
- [2. Core Concepts](#2-core-concepts)
  - [2.1 Contract](#21-contract)
  - [2.2 Definition](#22-definition)
  - [2.3 CLS Instance](#23-cls-instance)
  - [2.4 Contract vs Definition: The Mental Model](#24-contract-vs-definition)
- [3. Architecture](#3-architecture)
  - [3.1 Core Components](#31-core-components)
  - [3.2 Data Flow](#32-data-flow)
- [4. Main API](#4-main-api)
- [5. Key Concepts](#5-key-concepts)
  - [5.1 What Utility](#51-what-utility)
  - [5.2 Definition Callback](#52-definition-callback)
  - [5.3 Tokens](#53-tokens)
  - [5.4 Slots](#54-slots)
  - [5.5 Variants](#55-variants)
  - [5.6 Rules](#56-rules)
- [6. CLS Instance Methods](#6-cls-instance-methods)
  - [6.1 Create Method](#61-create-method)
  - [6.1.1 Slot Configuration Merging](#611-slot-configuration-merging)
  - [6.2 Extend Method](#62-extend-method)
  - [6.3 Use Method](#63-use-method)
- [7. Contract Structure](#7-contract-structure)
  - [7.1 Token Contract](#71-token-contract)
  - [7.2 Slot Contract](#72-slot-contract)
  - [7.3 Variant Contract](#73-variant-contract)
- [8. Definition Structure](#8-definition-structure)
  - [8.1 Token Definition](#81-token-definition)
  - [8.2 Rules](#82-rules)
  - [8.3 Defaults](#83-defaults)
- [9. Create Method Usage](#9-create-method-usage)
- [10. Styling Resolution](#10-styling-resolution)
  - [10.1 Resolution Order](#101-resolution-order)
  - [10.2 Token Resolution Process](#102-token-resolution-process)
  - [10.3 Rule Evaluation Process](#103-rule-evaluation-process)
- [11. Inheritance System](#11-inheritance-system)
  - [11.1 Contract Inheritance](#111-contract-inheritance)
  - [11.2 Token Inheritance](#112-token-inheritance)
  - [11.3 Variant Inheritance](#113-variant-inheritance)
- [12. Performance Features](#12-performance-features)
  - [12.1 Caching Strategy](#121-caching-strategy)
  - [12.2 Memory Management](#122-memory-management)
  - [12.3 Runtime Optimization](#123-runtime-optimization)
- [13. Type System](#13-type-system)
  - [13.1 Generic Constraints](#131-generic-constraints)
  - [13.2 Type Inference](#132-type-inference)
  - [13.3 Type Safety Features](#133-type-safety-features)
- [14. Integration Patterns](#14-integration-patterns)
  - [14.1 Framework Integration](#141-framework-integration)
  - [14.2 Design System Integration](#142-design-system-integration)
  - [14.3 Build System Integration](#143-build-system-integration)
- [15. Best Practices](#15-best-practices)
  - [15.1 Contract Design](#151-contract-design)
  - [15.2 Definition Design](#152-definition-design)
  - [15.3 Component Design](#153-component-design)
  - [15.4 Performance Optimization](#154-performance-optimization)
- [16. React Integration](#16-react-integration)
  - [16.1 useCls Hook](#161-usecls-hook)
  - [16.1.1 useClsEx Hook](#1611-useclsex-hook)
- [16.2 Component Patterns](#162-component-patterns)
- [16.2.1 The `cls` Prop and Slot Merging](#1621-the-cls-prop-and-slot-merging)
- [16.3 withCls HOC](#163-withcls-hoc)
  - [16.4 Context Integration](#164-context-integration)
  - [16.5 Provider Architecture](#165-provider-architecture)
  - [16.6 React Type System](#166-react-type-system)
  - [16.7 Advanced Patterns](#167-advanced-patterns)


## 1. Core Principles <a id="1-core-principles"></a>

**[← Previous: Table of Contents](#table-of-contents)** | **[→ Next Chapter: Core Concepts](#2-core-concepts)**

### 1.1 Type Safety First <a id="11-type-safety-first"></a>
- All styling configurations are fully type-checked at compile time
- Contract definitions ensure consistency across the design system
- Inheritance chains maintain type safety through the entire hierarchy

### 1.2 Inheritance as Foundation <a id="12-inheritance-as-foundation"></a>
- Components can be extended and composed rather than rewritten
- Design tokens can be inherited and overridden at any level
- Slots provide granular control over component parts

### 1.3 Declarative Configuration <a id="13-declarative-configuration"></a>
- Styling rules are defined declaratively through contracts and definitions
- Variant combinations are resolved automatically
- Token resolution happens at runtime based on current state

### 1.4 Performance Optimized <a id="14-performance-optimized"></a>
- Lazy evaluation of slot functions via Proxy
- Caching of resolved configurations
- Minimal runtime overhead with maximum flexibility

---

## 2. Core Concepts <a id="2-core-concepts"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Core Principles](#1-core-principles)** | **[→ Next Chapter: Architecture](#3-architecture)**

### 2.1 Contract <a id="21-contract"></a>
A contract defines the **structure** of a component's styling system:
- **Tokens**: Named design values organized by groups and variants
- **Slots**: Named parts of a component that can receive styles  
- **Variants**: Configurable properties that affect component appearance
- **Inheritance**: Optional parent contract for extending functionality

### 2.2 Definition <a id="22-definition"></a>
A definition provides **concrete styling values** for a contract:
- **Token Definitions**: CSS classes or token references for each token variant
- **Rules**: Conditional styling based on variant combinations
- **Defaults**: Default values for variants

### 2.3 CLS Instance <a id="23-cls-instance"></a>
The main interface that combines contract and definition:
- **`create()`**: Generates styled instances with optional overrides
- **`extend()`**: Creates new instances with additional functionality
- **`use()`**: Type-safe assignment of compatible instances

### 2.4 Contract vs Definition: The Mental Model <a id="24-contract-vs-definition"></a>

> **💡 Key Insight**: Think of **Contract** as the "interface" and **Definition** as the "implementation"

**Contract = Structure (What can be styled?)**
```typescript
// Contract defines WHAT can be styled
{
  tokens: ["color.text", "color.bg"],     // What design tokens exist?
  slot: ["root", "label"],                // What parts can be styled?
  variant: {                              // What variations are possible?
    size: ["sm", "md", "lg"],
    variant: ["default", "primary"]
  }
}
```

**Definition = Values (How is it styled?)**
```typescript
// Definition defines HOW it's styled
{
  token: {
    "color.text.default": what.css(["text-gray-900"]),
    "color.text.primary": what.css(["text-white"]),
    "color.bg.default": what.css(["bg-gray-100"]),
    "color.bg.primary": what.css(["bg-blue-600"])
  },
  rules: [
    // How do variants affect styling?
    def.root({
      root: what.both(["inline-flex", "items-center"], ["color.text.default", "color.bg.default"])
    }),
    def.rule(
      what.variant({ size: "lg" }),
      { root: what.css(["px-6", "py-3"]) }
    ),
    def.rule(
      what.variant({ variant: "primary" }),
      { root: what.token(["color.text.primary", "color.bg.primary"]) }
    )
  ],
  defaults: { size: "md", variant: "default" }
}
```

**The Relationship:**
- **Contract** is like a TypeScript interface - it defines the shape
- **Definition** is like the implementation - it provides the actual values
- **CLS Instance** combines both to create a working styling system
- **Inheritance** allows contracts to extend other contracts, and definitions to override inherited values

**Why This Separation Matters:**
- **Reusability**: Same contract can have multiple definitions (themes, variants)
- **Type Safety**: Contract ensures all required styling points are defined
- **Composability**: Contracts can be extended, definitions can be overridden
- **Clarity**: Clear separation between structure and styling values
- **Inheritance**: Contract declarations enforce type safety - you must implement declared tokens

---

## 3. Architecture <a id="3-architecture"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Core Concepts](#2-core-concepts)** | **[→ Next Chapter: Main API](#4-main-api)**

### 3.1 Core Components <a id="31-core-components"></a>

The CLS system consists of three main components that work together:

- **Contract**: Defines the structure (tokens, slots, variants) - see [Section 2.1-2.3](#2-core-concepts)
- **Definition**: Provides concrete styling values - see [Section 2.1-2.3](#2-core-concepts)  
- **CLS Instance**: Main interface with `create()`, `extend()`, `use()` methods - see [Section 6](#6-cls-instance-methods)

### 3.2 Data Flow <a id="32-data-flow"></a>

1. **Contract Definition**: Define the structure (tokens, slots, variants)
2. **Definition Creation**: Provide concrete styling values
3. **CLS Instance**: Combine contract and definition
4. **Instance Creation**: Generate styled components with overrides
5. **Slot Resolution**: Apply rules and resolve tokens to CSS classes

---

## 4. Main API <a id="4-main-api"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Architecture](#3-architecture)** | **[→ Next Chapter: Key Concepts](#5-key-concepts)**

### `cls(contract, definitionFn)`

Creates a cls instance for component styling with tokens, slots, and variants.

**Parameters:**
- `contract`: Defines the structure (tokens, slots, and variants)
- `definitionFn`: A callback function that receives `{ what, override, def }` and returns the definition

**Returns:** A cls instance with `create()`, `extend()`, `use()`, and contract properties

**Example:**
```typescript
// Basic button with variants
const ButtonCls = cls(
  {
    tokens: ["color.text.default", "color.text.primary", "color.bg.default", "color.bg.primary"],
    slot: ["root", "label"],
    variant: {
      size: ["sm", "md", "lg"],
      variant: ["default", "primary"]
    }
  },
  ({ what, override, def }) => ({
    token: def.token({
      "color.text.default": what.css(["text-gray-900"]),
      "color.text.primary": what.css(["text-white"]),
      "color.bg.default": what.css(["bg-gray-100"]),
      "color.bg.primary": what.css(["bg-blue-600"])
    }),
    rules: [
      def.root({
        root: what.both(["inline-flex", "items-center"], ["color.text.default", "color.bg.default"]),
        label: what.css(["font-medium"])
      }),
      def.rule(
        what.variant({ size: "lg" }),
        {
          root: what.css(["px-6", "py-3"])
        }
      ),
      def.rule(
        what.variant({ variant: "primary" }),
        {
          root: what.token(["color.text.primary", "color.bg.primary"])
        }
      )
    ],
    defaults: def.defaults({
      size: "md",
      variant: "default"
    })
  })
);
```

### `tvc(...classes)`

A utility function for optimal class string merging and deduplication. This is a re-export of [tailwind-merge](https://github.com/dcastil/tailwind-merge) that intelligently merges Tailwind CSS classes, removing conflicts and duplicates.

**Parameters:**
- `...classes`: CSS class strings to merge

**Returns:** A single optimized class string

**Example:**
```typescript
import { tvc } from '@use-pico/cls';

// Automatically resolves conflicts and removes duplicates
tvc("px-4 py-2", "px-6", "bg-blue-500", "bg-red-500");
// Result: "py-2 px-6 bg-red-500" (px-6 overrides px-4, bg-red-500 overrides bg-blue-500)

// Handles complex Tailwind classes
tvc("text-sm font-medium", "text-lg font-bold", "text-gray-900");
// Result: "text-lg font-bold text-gray-900"
```

**Key Features:**
- **Conflict Resolution**: Automatically resolves conflicting Tailwind classes (e.g., `px-4` vs `px-6`)
- **Duplicate Removal**: Removes duplicate classes efficiently
- **Tailwind-Aware**: Understands Tailwind's class hierarchy and specificity
- **Performance Optimized**: Fast class merging with minimal overhead

> **💡 Pro Tip**: CLS uses `tvc()` internally for all class merging, so you get optimal class output automatically. You can also use it directly in your components for manual class merging.

---

## 5. Key Concepts <a id="5-key-concepts"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Main API](#4-main-api)** | **[→ Next Chapter: CLS Instance Methods](#6-cls-instance-methods)**

### 5.1 What Utility <a id="51-what-utility"></a>

The `what` utility is your **styling toolkit** - it provides type-safe helpers for creating styling configurations. Think of it as a set of specialized functions that ensure your styling is both correct and type-safe.

> **🎯 Mental Model**: `what` = "What styling do I want to apply?"

#### Core Helper Functions

**📝 Styling Helpers**
```typescript
what.css(classes)           // Pure CSS classes only
what.token(tokens)          // Design token references only  
what.both(classes, tokens)  // Both CSS classes + token references
```

**🔧 Configuration Helpers**
```typescript
what.variant(variant)       // Type-safe variant values
what.slot(slot)             // Slot-specific configurations
```

#### Styling Helper Examples

**CSS-Only Styling**
```typescript
// ✅ Good: Pure CSS classes
root: what.css(["inline-flex", "items-center", "rounded-md"])

// ❌ Avoid: Raw strings (no type safety)
root: "inline-flex items-center rounded-md"
```

**Token-Only Styling**
```typescript
// ✅ Good: Design token references
root: what.token(["color.text.primary", "color.bg.primary"])

// ❌ Avoid: Hardcoded values
root: "text-white bg-blue-600"
```

**Mixed Styling (Most Common)**
```typescript
// ✅ Good: Both CSS classes and tokens
root: what.both(
  ["rounded-md", "shadow-lg"],           // Layout/behavior classes
  ["color.text.primary", "color.bg.primary"]  // Design tokens
)
```

> **💡 Important**: In `what.both()`, **tokens are processed first, then classes**. This means classes will override tokens, giving you precise control over styling precedence. For example, if a token provides `"px-4"` and a class provides `"pl-8"`, the `"pl-8"` class will win.

#### Type-Safe Variant Usage

The `what.variant()` helper is **crucial for type safety** - it ensures you only use valid variant combinations:

```typescript
// ✅ Type-safe variant usage
const slots = ButtonCls.create(({ what }) => ({
  variant: what.variant({ 
    size: "lg",        // ✅ Valid: "lg" is in ["sm", "md", "lg"]
    variant: "primary" // ✅ Valid: "primary" is in ["default", "primary"]
  })
}));

// ❌ TypeScript will catch invalid variants
const slots = ButtonCls.create(({ what }) => ({
  variant: what.variant({ 
    size: "xl",        // ❌ Error: "xl" is not in ["sm", "md", "lg"]
    variant: "invalid" // ❌ Error: "invalid" is not in ["default", "primary"]
  })
}));
```

#### When to Use Each Helper

> **💡 Decision Tree**:
> - **Pure CSS classes** → `what.css()`
> - **Design tokens only** → `what.token()`
> - **Mixed styling** → `what.both()`
> - **Variant values** → `what.variant()`

**Real-World Example:**
```typescript
const ButtonCls = cls(
  {
    tokens: ["color.text.primary", "color.bg.primary", "spacing.padding.md"],
    slot: ["root", "icon", "label"],
    variant: {
      size: ["sm", "md", "lg"],
      variant: ["default", "primary"]
    }
  },
  ({ what, def }) => ({
    token: def.token({
      "color.text.primary": what.css(["text-white"]),
      "color.bg.primary": what.css(["bg-blue-600"]),
      "spacing.padding.md": what.css(["px-4", "py-2"])
    }),
    rules: [
      def.root({
        // Mixed styling: layout + design tokens
        root: what.both(
          ["inline-flex", "items-center", "rounded-md"], // Layout
          ["color.text.primary", "color.bg.primary"]     // Design
        ),
        // Pure CSS for utility classes
        icon: what.css(["mr-2", "w-4", "h-4"]),
        // Pure tokens for consistent styling
        label: what.token(["color.text.primary"])
      }),
      def.rule(
        what.variant({ size: "lg" }), // Type-safe variant
        {
          root: what.css(["px-6", "py-3"]) // Pure CSS for size-specific styling
        }
      )
    ],
    defaults: def.defaults({
      size: "md",
      variant: "default"
    })
  })
);
```

### 5.2 Definition Callback <a id="52-definition-callback"></a>

The definition function receives a `WhatUtil` object with three main interfaces that serve different purposes:

```typescript
({ what, override, def }) => ({ ... })
```

> **🎯 Mental Model**: 
> - `what` = "What styling do I want?"
> - `def` = "Define the default behavior"
> - `override` = "Override and replace previous styles"

#### The Three Interfaces Explained

**`what` - Your Styling Toolkit**
- **Purpose**: Create type-safe styling configurations
- **When to use**: Always use for styling values
- **Examples**: `what.css()`, `what.token()`, `what.both()`, `what.variant()`

**`def` - Define Default Behavior**
- **Purpose**: Create definitions that **append** to or **extend** existing styles
- **Behavior**: Accumulative - adds to previous styles
- **When to use**: For base styles, extensions, and additive styling

**`override` - Override and Replace**
- **Purpose**: Create definitions that **replace** previous styles completely
- **Behavior**: Destructive - clears previous styles and applies only new ones
- **When to use**: When you want clean slate styling

#### Def vs Override: The Key Difference

> **💡 Think of it like CSS specificity**:
> - `def` = "Add these styles" (like normal CSS rules)
> - `override` = "Replace all previous styles" (like `!important`)

**Def Helpers (Accumulative)**
```typescript
// ✅ Adds to existing styles
def.root({
  root: what.css(["px-4", "py-2"]) // Adds padding to existing styles
})

def.rule(
  what.variant({ size: "lg" }),
  {
    root: what.css(["px-6", "py-3"]) // Adds larger padding when size="lg"
  }
)
```

**Override Helpers (Replacement)**
```typescript
// ✅ Replaces all previous styles
override.root({
  root: what.css(["px-4", "py-2"]) // ONLY these styles, nothing else
})

override.rule(
  what.variant({ size: "lg" }),
  {
    root: what.css(["px-6", "py-3"]) // ONLY these styles when size="lg"
  }
)
```

#### Helper Function Reference

**`def` - Definition Helpers (Accumulative)**
```typescript
def.root(slotConfig, override = false)           // Default slot configuration
def.rule(match, slotConfig, override = false)    // Conditional rule
def.token(tokenDefinition)                       // Token definitions
def.defaults(defaultValues)                      // Default variant values
```

**`override` - Override Helpers (Replacement)**
```typescript
override.root(slotConfig, override = true)       // Default slot with override=true
override.rule(match, slotConfig, override = true) // Conditional rule with override=true
override.token(partialTokens)                    // Partial token overrides
```

**`what` - Styling Helpers**
```typescript
what.css(classes)           // CSS classes only
what.token(tokens)          // Token references only
what.both(classes, tokens)  // Both classes and tokens
what.variant(variant)       // Type-safe variant values
what.slot(slot)             // Slot configurations
```

#### Complete Example: Def vs Override in Action

```typescript
const ButtonCls = cls(
  {
    tokens: ["color.text", "color.bg"],
    slot: ["root", "label"],
    variant: {
      size: ["sm", "md", "lg"],
      variant: ["default", "primary"]
    }
  },
  ({ what, override, def }) => ({
    token: def.token({
      "color.text": {
        default: ["text-gray-900"],
        primary: ["text-white"]
      },
      "color.bg": {
        default: ["bg-gray-100"],
        primary: ["bg-blue-600"]
      }
    }),
    rules: [
      // Base styles (accumulative)
      def.root({
        root: what.both(["inline-flex", "items-center"], ["color.text.default", "color.bg.default"]),
        label: what.css(["font-medium"])
      }),
      
      // Size variants (accumulative - adds to base)
      def.rule(
        what.variant({ size: "lg" }),
        {
          root: what.css(["px-6", "py-3"]) // Adds larger padding
        }
      ),
      
      // Primary variant (override - replaces base colors)
      override.rule(
        what.variant({ variant: "primary" }),
        {
          root: what.token(["color.text.primary", "color.bg.primary"]) // Replaces colors completely
        }
      )
    ],
    defaults: def.defaults({
      size: "md",
      variant: "default"
    })
  })
);
```

**Result Behavior:**
- **Default button**: `"inline-flex items-center text-gray-900 bg-gray-100 font-medium"`
- **Large button**: `"inline-flex items-center text-gray-900 bg-gray-100 font-medium px-6 py-3"` (adds padding)
- **Primary button**: `"inline-flex items-center text-white bg-blue-600 font-medium"` (replaces colors)
- **Large primary button**: `"inline-flex items-center text-white bg-blue-600 font-medium px-6 py-3"` (replaces colors, adds padding)

### 5.3 Tokens <a id="53-tokens"></a>

Tokens are the **foundation of your design system** - they represent reusable design values that can be referenced throughout your components.

> **🎯 Mental Model**: Tokens = "Named design values that can be reused and inherited"

#### Token Structure

```typescript
// Token naming: group.variant
// In contract: flat array of token names
tokens: [
  "color.text.default", "color.text.primary", "color.text.secondary",
  "color.bg.default", "color.bg.primary", "color.bg.secondary",
  "spacing.padding.sm", "spacing.padding.md", "spacing.padding.lg"
]

// In definition: each token gets a What<T> object
token: {
  "color.text.default": what.css(["text-gray-900"]),
  "color.text.primary": what.css(["text-white"]),
  "color.text.secondary": what.css(["text-gray-700"]),
  "color.bg.default": what.css(["bg-gray-100"]),
  "color.bg.primary": what.css(["bg-blue-600"]),
  "color.bg.secondary": what.css(["bg-gray-200"])
}
```

#### How Tokens Work

**🔍 Token Resolution Process**
1. **Lookup**: Find token in current contract or inheritance chain
2. **Selection**: Choose appropriate variant based on current state
3. **Extraction**: Get CSS classes from token definition
4. **Combination**: Merge multiple tokens if needed
5. **Override**: Apply any runtime overrides

**⚡ Key Features**
- **Recursive Resolution**: Tokens can reference other tokens
- **Circular Detection**: Automatic prevention of infinite loops
- **Inheritance**: Tokens follow contract hierarchy
- **Runtime Overrides**: Values can be changed at creation time

#### Token Inheritance Behavior

> **💡 Important**: Token inheritance is **always replacement-based**, not accumulation-based

**How Token Inheritance Actually Works**
```typescript
// Parent contract
{
  tokens: ["color.bg.default"],
  token: {
    "color.bg.default": what.css(["bg-gray-100"])
  }
}

// Child contract
{
  tokens: ["color.bg.default"], // Same token declared
  token: {
    "color.bg.default": what.css(["bg-blue-100"]) // REPLACES parent definition
  }
}

// Result: Child definition wins, parent is discarded
// Final token value: "bg-blue-100"
```

**Key Points:**
- **Token definitions are merged by direct assignment** - child values replace parent values
- **Type system enforces implementation** - when you declare a token in a child contract, you must provide its definition
- **Contract declarations affect type safety** - they ensure all required tokens are implemented
- **Inheritance order matters** - later definitions override earlier ones

> **⚠️ Important Distinction**: Token inheritance is **different** from variant and default inheritance:
> - **Tokens**: Direct replacement (child replaces parent) + Type enforcement
> - **Variants**: Union merging (child combines with parent)
> - **Defaults**: Object merging (child overrides parent)

#### Token Override Examples

**Runtime Token Overrides**
```typescript
// Override specific tokens at creation time
const buttonClasses = ButtonCls.create(({ what }) => ({
  token: {
    "color.text.primary": what.css(["text-blue-600"]) // Override only primary text
    // Other tokens remain unchanged
  }
}));
```

**Component-Level Overrides**
```typescript
const MyComponent = ({ cls }: Component<typeof Button>) => {
  return (
    <button className={cls(({ what }) => ({
      token: {
        "color.bg.primary": what.css(["bg-indigo-600"]) // Override primary background
      }
    }))}>
      Click me
    </button>
  );
};
```

#### Advanced: Token Chain Resolution

> **🚀 Power Feature**: Tokens can reference other tokens, creating dependency chains

**Simple Token Chain**
```typescript
// Base tokens
"color.bg.primary": what.css(["bg-blue-600"]),
"color.text.primary": what.css(["text-white"]),

// Composite token that references base tokens
"button.primary": what.token([
  "color.bg.primary",    // References another token
  "color.text.primary"   // References another token
])
```

**Multi-Level Token Chain**
```typescript
// Level 1: Base spacing
"spacing.sm": what.css(["px-2", "py-1"]),
"spacing.md": what.css(["px-4", "py-2"]),

// Level 2: Padding tokens that reference spacing
"padding.small": what.token(["spacing.sm"]),
"padding.medium": what.token(["spacing.md"]),

// Level 3: Button tokens that reference padding
"button.small": what.both(
  ["rounded", "font-medium"], // CSS classes
  ["padding.small"]           // References padding.small → spacing.sm
)
```

**Circular Dependency Protection**
```typescript
// ❌ This would cause an error
{
  "token.a": what.token(["token.b"]),
  "token.b": what.token(["token.c"]), 
  "token.c": what.token(["token.a"]) // Circular reference!
}
// Error: Circular dependency detected in token references
```

#### Complete Example: Button with Token Chains

```typescript
const ButtonWithTokens = cls(
  {
    tokens: [
      "color.bg.primary", "color.text.primary",
      "button.base", "button.primary"
    ],
    slot: ["root"],
    variant: {
      variant: ["default", "primary"]
    }
  },
  ({ what, def }) => ({
    token: def.token({
      // Base design tokens
      "color.bg.primary": what.css(["bg-blue-600"]),
      "color.text.primary": what.css(["text-white"]),
      
      // Composite button tokens
      "button.base": what.both(
        ["px-4", "py-2", "rounded", "font-medium"], // Layout
        ["color.text.primary"]                      // Design
      ),
      
      "button.primary": what.token([
        "button.base",        // References base button
        "color.bg.primary"    // References primary background
      ])
    }),
    rules: [
      def.root({
        root: what.token(["button.base"])
      }),
      def.rule(
        what.variant({ variant: "primary" }),
        {
          root: what.token(["button.primary"])
        }
      )
    ],
    defaults: def.defaults({
      variant: "default"
    })
  })
);

// Usage - token resolution happens automatically
const instance = ButtonWithTokens.create();
console.log(instance.root()); // "text-white px-4 py-2 rounded font-medium"

const primaryInstance = ButtonWithTokens.create(({ what }) => ({
  variant: what.variant({ variant: "primary" })
}));
console.log(primaryInstance.root()); // "text-white px-4 py-2 rounded font-medium bg-blue-600"
```

### 5.4 Slots <a id="54-slots"></a>

Slots represent named parts of a component that can receive independent styling:

```typescript
// Component slots
["root", "icon", "label", "badge"]
```

**Slot Behavior:**
- Each slot is a function that returns CSS classes
- Slots can receive variant overrides
- Slots can be overridden at creation time
- Slots support both class and token assignments

### 5.5 Variants <a id="55-variants"></a>

Variants are configurable properties that control component appearance:

```typescript
// Variant definitions
{
  size: ["sm", "md", "lg"],
  variant: ["primary", "secondary"],
  disabled: ["bool"] // Special "bool" type becomes boolean
}
```

**Variant Types:**
- **String Variants**: Discrete values (size, variant, etc.)
- **Boolean Variants**: True/false states (disabled, loading, etc.)
- **Default Values**: Predefined fallbacks for each variant

### 5.6 Rules <a id="56-rules"></a>

Rules define **conditional styling** based on variant combinations. They're the heart of dynamic styling in CLS.

> **🎯 Mental Model**: Rules = "Apply these styles when these conditions are met"

#### Rule Structure

```typescript
// Basic rule structure
{
  match: what.variant({ size: "lg", variant: "primary" }), // When to apply
  slot: {
    root: what.css(["text-lg"]),                    // What to apply
    label: what.token(["color.bg.primary"])
  },
  override: false // Optional: how to apply (append vs replace)
}
```

#### Rule Matching Behavior

**🔍 How Rules Work**
1. **Condition Testing**: Check if current variants match the rule
2. **Slot Application**: Apply styling to matching slots
3. **Order Processing**: Rules are evaluated in definition order
4. **Override Handling**: Clear previous styles if override is true

**⚡ Key Features**
- **Multiple Rules**: Multiple rules can apply to the same variant combination
- **Order Matters**: Later rules take precedence over earlier ones
- **Boolean Variants**: True/false values are matched against boolean variants
- **Partial Matching**: Rules can match on subset of variants

#### Override vs Append Behavior

> **💡 Critical Distinction**: Rules can either add to or replace previous styles

**Append Mode (Default)**
```typescript
// ✅ Adds to existing styles
def.rule(
  what.variant({ size: "lg" }),
  {
    root: what.css(["px-6", "py-3"]) // Adds padding to existing styles
  }
)
// Result: Previous styles + new padding
```

**Override Mode (Destructive)**
```typescript
// ✅ Replaces all previous styles
override.rule(
  what.variant({ size: "lg" }),
  {
    root: what.css(["px-6", "py-3"]) // ONLY these styles, nothing else
  }
)
// Result: Only the new padding, previous styles discarded
```

#### Real-World Rule Examples

**Size-Based Styling**
```typescript
// Different padding for different sizes
def.rule(what.variant({ size: "sm" }), {
  root: what.css(["px-2", "py-1"])
}),
def.rule(what.variant({ size: "md" }), {
  root: what.css(["px-4", "py-2"])
}),
def.rule(what.variant({ size: "lg" }), {
  root: what.css(["px-6", "py-3"])
})
```

**Variant-Based Styling**
```typescript
// Different colors for different variants
def.rule(what.variant({ variant: "primary" }), {
  root: what.token(["color.bg.primary", "color.text.primary"])
}),
def.rule(what.variant({ variant: "secondary" }), {
  root: what.token(["color.bg.secondary", "color.text.secondary"])
})
```

**Complex Conditional Styling**
```typescript
// Multiple conditions combined
def.rule(what.variant({ size: "lg", variant: "primary" }), {
  root: what.both(
    ["px-8", "py-4", "text-lg"],           // Size-specific layout
    ["color.bg.primary", "color.text.primary"] // Variant-specific colors
  )
})
```

**Boolean Variant Styling**
```typescript
// Boolean variants for state-based styling
def.rule(what.variant({ disabled: true }), {
  root: what.css(["opacity-50", "cursor-not-allowed"]),
  label: what.css(["line-through"])
})
```

---

## 6. CLS Instance Methods <a id="6-cls-instance-methods"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Key Concepts](#5-key-concepts)** | **[→ Next Chapter: Contract Structure](#7-contract-structure)**

### 6.1 `create(userConfigFn?, internalConfigFn?)` <a id="61-create-method"></a>

Generates styled instances with optional overrides. Both parameters are **callback functions** that receive the `what` utility.

**Parameters:**
- `userConfigFn`: Callback function that receives [`{ what }`](#51-what-utility) and returns user configuration
- `internalConfigFn`: Callback function that receives [`{ what }`](#51-what-utility) and returns internal configuration

**Configuration Options:**
- **`variant`**: Override variant values
- **`slot`**: Override slot styling (append mode)
- **`override`**: Hard override slot styling (replace mode)
- **`token`**: Override token definitions

> **Note:** The [`what`](#51-what-utility) utility should be used for `slot`, `override`, and `variant` options as it provides proper type-checks and ensures type safety. The `what.variant()` helper is particularly useful for ensuring variant values are correctly typed.

**Slot Configuration Behavior:**
- **`slot` configurations append** classes and tokens to existing slot styling
- **`override` configurations replace** all previous slot styling completely
- **Multiple slot sources combine** by appending their classes/tokens (user config + internal config + component rules)
- **Slot merging preserves order**: Component rules → Internal slot config → User slot config

**Precedence Rules:**
1. User config takes precedence over internal config
2. Override config takes precedence over slot config
3. Later rules take precedence over earlier rules
4. Local slot overrides take precedence over global overrides

> **For detailed usage examples, see [Section 9: Create Method Usage](#9-create-method-usage)**

**Example:**
```typescript
// Basic usage with variants
const slots = ButtonCls.create(({ what }) => ({
  variant: what.variant({ variant: "primary", size: "lg" })
}));

// Using what.variant() for type-safe variant values
const slots = ButtonCls.create(({ what }) => ({
  variant: what.variant({ variant: "primary", size: "lg" })
}));

// With slot overrides using what utility
const slots = ButtonCls.create(({ what }) => ({
  variant: what.variant({ variant: "primary" }),
  slot: {
    icon: what.css(["mr-2", "animate-spin"]),
    label: what.token(["color.text.hover"])
  }
}));

// With token overrides
const slots = ButtonCls.create(({ what }) => ({
  token: {
    "color.text.primary": what.css(["text-blue-600"])
  }
}));

// With hard overrides
const slots = ButtonCls.create(({ what }) => ({
  override: {
    root: what.css(["bg-red-500", "text-white"])
  }
}));

// Combined user and internal configs
const slots = ButtonCls.create(
  ({ what }) => ({
    variant: what.variant({ variant: "primary" })
  }),
  ({ what }) => ({
    slot: {
      root: what.css(["shadow-lg"])
    }
  })
);
```

### 6.1.1 Slot Configuration Merging <a id="611-slot-configuration-merging"></a>

Understanding how slot configurations are merged is crucial for building composable components. CLS uses an **append-based merging strategy** for slot configurations.

#### How Slot Merging Works

**🔍 Merging Strategy:**
1. **Component Rules**: Base styling from component definition
2. **Internal Config**: Component-controlled slot overrides (append)
3. **User Config**: User-provided slot overrides (append)
4. **Override Config**: Hard overrides that replace everything (replace)

**⚡ Key Behavior:**
- **`slot` configurations append** classes and tokens to existing styling
- **`override` configurations replace** all previous styling completely
- **Multiple sources combine** by appending their classes/tokens in order
- **Class arrays are merged** using efficient concatenation

#### Real-World Example: Icon Component

```typescript
// Icon component definition
const IconCls = cls(
  {
    tokens: ["color.text.default"],
    slot: ["root"],
    variant: { size: ["sm", "md", "lg"] }
  },
  ({ what, def }) => ({
    token: def.token({
      "color.text.default": what.css(["text-gray-600"])
    }),
    rules: [
      def.root({
        root: what.both(["icon-base"], ["color.text.default"]) // Base styling
      }),
      def.rule(
        what.variant({ size: "lg" }),
        { root: what.css(["w-6", "h-6"]) } // Size-specific styling
      )
    ],
    defaults: def.defaults({
      size: "md"
    })
  })
);

// Icon component with internal and user configs
function Icon({ icon, cls, ...props }) {
  const slots = useCls(
    IconCls,
    cls, // User config function
    isString(icon) ? ({ what }) => ({
      slot: what.slot({
        root: what.css([icon]) // Internal config: append icon class
      })
    }) : undefined
  );

  return <div className={slots.root()} {...props} />;
}

// Usage with user config
<Icon 
  icon="icon-[mdi-light--home]"
  tweak={({ what }) => ({
    slot: what.slot({
      root: what.css(["animate-pulse"]) // User config: append animation
    })
  })}
/>

// Result: "icon-base text-gray-600 icon-[mdi-light--home] animate-pulse"
// Order: Component rules → Internal config → User config
```

#### Slot vs Override: The Difference

**Slot Configuration (Append Mode):**
```typescript
// ✅ Adds to existing styles
const slots = ButtonCls.create(({ what }) => ({
  slot: {
    root: what.css(["mr-2", "animate-spin"]) // Appends to existing root styles
  }
}));
// Result: Previous styles + new styles
```

**Override Configuration (Replace Mode):**
```typescript
// ✅ Replaces all previous styles
const slots = ButtonCls.create(({ what }) => ({
  override: {
    root: what.css(["bg-red-500", "text-white"]) // Replaces all root styles
  }
}));
// Result: Only the new styles, previous styles discarded
```

#### React Integration: useCls Merging

The `useCls` hook combines multiple configuration sources:

```typescript
// useCls(tva, userConfigFn, internalConfigFn)
const slots = useCls(
  ButtonCls,           // cls
  ({ what }) => ({     // User config (cls prop)
    slot: what.slot({
      root: what.css(["user-class"])
    })
  }),
  ({ what }) => ({     // Internal config (component logic)
    slot: what.slot({
      root: what.css(["internal-class"])
    })
  })
);

// Result: Component rules + internal-class + user-class
```

### 6.2 `extend(childContract, childDefinitionFn)` <a id="62-extend-method"></a>

Creates new cls instances with additional functionality, inheriting from a parent.

**Parameters:**
- `childContract`: Extended contract with new tokens, slots, or variants
- `childDefinitionFn`: Callback function that receives the `what` utility and returns the child definition

**Example:**
```typescript
const PrimaryButtonCls = ButtonCls.extend(
  {
    tokens: ["color.text.default", "color.text.primary", "color.text.secondary", "color.bg.default", "color.bg.primary", "color.bg.secondary"],
    slot: ["root", "label", "icon"],
    variant: {
      size: ["sm", "md", "lg", "xl"],
      variant: ["default", "primary", "secondary"],
      loading: ["bool"]
    }
  },
  ({ what, def }) => ({
    token: def.token({
      "color.text.default": what.css(["text-gray-900"]),
      "color.text.primary": what.css(["text-white"]),
      "color.text.secondary": what.css(["text-gray-700"]),
      "color.bg.default": what.css(["bg-gray-100"]),
      "color.bg.primary": what.css(["bg-blue-600"]),
      "color.bg.secondary": what.css(["bg-gray-200"])
    }),
    rules: [
      def.root({
        root: what.both(["inline-flex", "items-center", "rounded-md"], ["color.text.default", "color.bg.default"]),
        label: what.css(["font-medium"]),
        icon: what.css(["mr-2"])
      }),
      def.rule(
        what.variant({ size: "xl" }),
        {
          root: what.css(["px-8", "py-4", "text-lg"])
        }
      ),
      def.rule(
        what.variant({ loading: true }),
        {
          root: what.css(["opacity-75", "cursor-not-allowed"]),
          icon: what.css(["animate-spin"])
        }
      )
    ],
    defaults: def.defaults({
      size: "md",
      variant: "primary",
      loading: false
    })
  })
);
```

### 6.3 `use(sub)` <a id="63-use-method"></a>

Provides type-safe assignment of compatible cls instances.

**Parameters:**
- `sub`: A cls instance that must be derived from the current instance

**Returns:** The current cls instance for chaining

**Example:**
```typescript
const ButtonGroupCls = ButtonCls.use(PrimaryButtonCls);
// ButtonGroupCls now has access to PrimaryButtonCls's extended functionality
```

---

## 7. Contract Structure <a id="7-contract-structure"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: CLS Instance Methods](#6-cls-instance-methods)** | **[→ Next Chapter: Definition Structure](#8-definition-structure)**

### 7.1 Token Contract <a id="71-token-contract"></a>
```typescript
type TokenContract = readonly string[];

// Example - flat array of token names
[
  "color.text.default", "color.text.primary", "color.text.secondary",
  "color.bg.default", "color.bg.primary", "color.bg.secondary",
  "spacing.padding.sm", "spacing.padding.md", "spacing.padding.lg"
]
```

**Note**: CLS uses **only flat arrays** for token contracts, not nested object structures. This design choice simplifies the type system, makes token inheritance more straightforward, and provides better performance. Each token name is a string that can be referenced in definitions using dot notation (e.g., `"color.text.primary"`).

### 7.2 Slot Contract <a id="72-slot-contract"></a>
```typescript
type SlotContract = readonly string[];

// Example
["root", "icon", "label", "badge"]
```

### 7.3 Variant Contract <a id="73-variant-contract"></a>
```typescript
type VariantContract = Record<string, readonly string[]>;

// Example
{
  size: ["sm", "md", "lg"],
  variant: ["primary", "secondary"],
  disabled: ["bool"] // Special "bool" type becomes boolean
}
```

---

## 8. Definition Structure <a id="8-definition-structure"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Contract Structure](#7-contract-structure)** | **[→ Next Chapter: Create Method Usage](#9-create-method-usage)**

### 8.1 Token Definition <a id="81-token-definition"></a>

Token definitions use `What<T>` objects that can contain CSS classes, token references, or both:

```typescript
type TokenDefinitionRequired<TContract> = {
  [K in TContract["tokens"][number]]: What<TContract>;
};

// Example - Token definitions use What<T> objects
{
  "color.text.default": what.css(["text-gray-900"]),
  "color.text.primary": what.css(["text-white"]),
  "color.text.secondary": what.css(["text-gray-700"]),
  "color.bg.default": what.css(["bg-gray-100"]),
  "color.bg.primary": what.css(["bg-blue-600"]),
  "color.bg.secondary": what.css(["bg-gray-200"])
}
```

#### Token Chain Resolution Examples

> **🚀 Advanced Feature**: Tokens can reference other tokens, creating powerful dependency chains

**Simple Token References**
```typescript
// Base color tokens
"color.bg.primary": what.css(["bg-blue-600"]),
"color.text.primary": what.css(["text-white"]),

// Button token that references color tokens
"button.primary": what.token([
  "color.bg.primary",    // References another token
  "color.text.primary"   // References another token
])
```

**Multi-Level Token Chains**
```typescript
// Level 1: Base spacing tokens
"spacing.xs": what.css(["px-1", "py-0.5"]),
"spacing.sm": what.css(["px-2", "py-1"]),
"spacing.md": what.css(["px-4", "py-2"]),
"spacing.lg": what.css(["px-6", "py-3"]),

// Level 2: Padding tokens that reference spacing
"padding.small": what.token(["spacing.sm"]),
"padding.medium": what.token(["spacing.md"]),
"padding.large": what.token(["spacing.lg"]),

// Level 3: Button tokens that reference padding
"button.small": what.both(
  ["rounded", "font-medium"], // CSS classes
  ["padding.small"]           // References padding.small → spacing.sm
),
"button.medium": what.both(
  ["rounded", "font-medium"], // CSS classes
  ["padding.medium"]          // References padding.medium → spacing.md
),
"button.large": what.both(
  ["rounded", "font-medium"], // CSS classes
  ["padding.large"]           // References padding.large → spacing.lg
)
```

#### Circular Dependency Protection

> **🛡️ Safety Feature**: The system automatically detects and prevents circular dependencies

```typescript
// ❌ This would cause a circular dependency error
{
  "token.a": what.token(["token.b"]),
  "token.b": what.token(["token.c"]),
  "token.c": what.token(["token.a"]) // Circular reference!
}
// Error: Circular dependency detected in token references: token.a -> token.b -> token.c -> token.a
```

#### Complete Component Example

```typescript
const ButtonWithTokenChains = cls(
  {
    tokens: [
      "color.bg.primary", "color.bg.secondary",
      "color.text.primary", "color.text.secondary",
      "button.base", "button.primary", "button.secondary"
    ],
    slot: ["root"],
    variant: {
      variant: ["default", "primary", "secondary"]
    }
  },
  ({ what, def }) => ({
    token: def.token({
      // Base color tokens
      "color.bg.primary": what.css(["bg-blue-600"]),
      "color.bg.secondary": what.css(["bg-gray-600"]),
      "color.text.primary": what.css(["text-white"]),
      "color.text.secondary": what.css(["text-gray-200"]),
      
      // Base button token that references color tokens
      "button.base": what.both(
        ["px-4", "py-2", "rounded", "font-medium"], // Layout classes
        ["color.text.primary"]                      // Design token
      ),
      
      // Primary button that references base button and primary colors
      "button.primary": what.token([
        "button.base",        // References base button
        "color.bg.primary"    // References primary background
      ]),
      
      // Secondary button that references base button and secondary colors
      "button.secondary": what.token([
        "button.base",           // References base button
        "color.bg.secondary",    // References secondary background
        "color.text.secondary"   // References secondary text
      ])
    }),
    rules: [
      def.root({
        root: what.token(["button.base"])
      }),
      def.rule(
        what.variant({ variant: "primary" }),
        {
          root: what.token(["button.primary"])
        }
      ),
      def.rule(
        what.variant({ variant: "secondary" }),
        {
          root: what.token(["button.secondary"])
        }
      )
    ],
    defaults: def.defaults({
      variant: "default"
    })
  })
);

// Usage - token chain resolution happens automatically
const instance = ButtonWithTokenChains.create();
console.log(instance.root()); // "text-white px-4 py-2 rounded font-medium"

const primaryInstance = ButtonWithTokenChains.create(({ what }) => ({
  variant: what.variant({ variant: "primary" })
}));
console.log(primaryInstance.root()); // "text-white px-4 py-2 rounded font-medium bg-blue-600"
```

### 8.2 Rules <a id="82-rules"></a>
```typescript
type RuleDefinition<TContract> = {
  match?: Partial<VariantValueMapping<TContract>>;
  slot: SlotMapping<TContract>;
  override?: boolean;
};

// Example
{
  match: what.variant({ size: "lg", variant: "primary" }),
  slot: {
    root: what.css(["px-6", "py-3"])
  },
  override: false // Optional: clears previous styles
}
```

### 8.3 Defaults <a id="83-defaults"></a>
```typescript
type DefaultDefinition<TContract> = VariantValueMapping<TContract>;

// Example
{
  size: "md",
  variant: "default",
  disabled: false
}
```

---

## 9. Create Method Usage <a id="9-create-method-usage"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Definition Structure](#8-definition-structure)** | **[→ Next Chapter: Styling Resolution](#10-styling-resolution)**

> **Note:** This section provides detailed usage examples for the `create()` method. For method signature and parameters, see [Section 6.1](#61-create-method).

**Basic Usage:**
```typescript
// With variants only
const slots = ButtonCls.create(({ what }) => ({
  variant: what.variant({ variant: "primary", size: "lg" })
}));

// With slot overrides
const slots = ButtonCls.create(({ what }) => ({
  variant: what.variant({ variant: "primary" }),
  slot: {
    root: what.css(["mr-2", "animate-spin"]),
    label: what.token(["color.text.hover"])
  }
}));

// Using what.variant() for type-safe variant values
const slots = ButtonCls.create(({ what }) => ({
  variant: what.variant({ variant: "primary", size: "lg" })
}));

// With token overrides
const slots = ButtonCls.create(({ what }) => ({
  token: {
    "color.text.primary": what.css(["text-blue-600"])
  }
}));

// With hard overrides
const slots = ButtonCls.create(({ what }) => ({
  override: {
    root: what.css(["bg-red-500", "text-white"])
  }
}));
```

**Combined User and Internal Configs:**
```typescript
const slots = ButtonCls.create(
  ({ what }) => ({
    variant: what.variant({ variant: "primary" })
  }),
  ({ what }) => ({
    slot: {
      root: what.css(["shadow-lg"])
    }
  })
);
```

**Slot Function Usage:**
```typescript
// Access slot functions
const rootSlots = slots.root();
const labelSlots = slots.label();

// With per-call overrides
const rootSlots = slots.root(({ what }) => ({
  variant: what.variant({ size: "lg" }),
  slot: {
    root: what.css(["custom-class"])
  }
}));
```

---

## 10. Styling Resolution <a id="10-styling-resolution"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Create Method Usage](#9-create-method-usage)** | **[→ Next Chapter: Inheritance System](#11-inheritance-system)**

### 10.1 Resolution Order <a id="101-resolution-order"></a>

1. **Default Values**: Apply contract defaults
2. **Internal Config**: Apply component-controlled overrides
3. **User Config**: Apply user-provided overrides
4. **Rule Evaluation**: Apply matching rules in definition order
5. **Global Slot Overrides**: Apply slot-specific overrides from create config
6. **Global Override Config**: Apply hard overrides from create config
7. **Local Slot Overrides**: Apply slot-specific overrides from slot function calls
8. **Local Override Config**: Apply hard overrides from slot function calls
9. **Token Resolution**: Resolve tokens to CSS classes
10. **Class Merging**: Merge all classes using tailwind-merge

### 10.2 Token Resolution Process <a id="102-token-resolution-process"></a>

1. **Token Lookup**: Find token in current contract or inheritance chain
2. **Variant Selection**: Select appropriate variant based on current state
3. **Class Extraction**: Extract CSS classes from token definition
4. **Multiple Tokens**: Combine classes from multiple tokens
5. **Override Application**: Apply any token overrides from create config

> **💡 Important**: When using `what.both()`, **tokens are resolved first, then classes are applied**. This means classes will override tokens, giving you precise control over styling precedence. For example, if a token provides `"px-4"` and a class provides `"pl-8"`, the `"pl-8"` class will win.

### 10.3 Rule Evaluation Process <a id="103-rule-evaluation-process"></a>

1. **Match Testing**: Test rule conditions against current variants
2. **Slot Mapping**: Apply rule styling to matching slots
3. **Override Handling**: Clear previous styles if override is true
4. **Class Application**: Apply classes and tokens to slots
5. **Order Preservation**: Maintain rule definition order

---

## 11. Inheritance System <a id="11-inheritance-system"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Styling Resolution](#10-styling-resolution)** | **[→ Next Chapter: Performance Features](#12-performance-features)**

### 11.1 Contract Inheritance <a id="111-contract-inheritance"></a>

Contracts can inherit from parent contracts, creating a hierarchy:

```typescript
// Base contract
const BaseButton = cls(baseContract, baseDefinitionFn);

// Extended contract
const ExtendedButton = BaseButtonCls.extend(childContract, childDefinitionFn);
```

**Inheritance Behavior:**
- Child contracts inherit all tokens, slots, and variants from parents
- Child contracts can add new tokens, slots, and variants
- Child contracts can override inherited tokens
- Inheritance chain is walked bottom-up for resolution

**Implementation Details:**
- Inheritance is implemented using internal `~use` and `~definition` properties
- The inheritance chain is built by walking up the `~use` chain and collecting all layers
- **Token inheritance uses direct assignment** - child definitions replace parent definitions
- **Variant inheritance merges arrays** using union operations
- **Defaults are merged** with child values overriding parent values

### 11.2 Token Inheritance <a id="112-token-inheritance"></a>

Token inheritance follows a **simple replacement model**:

1. **Direct Assignment**: Child token definitions replace parent definitions for the same token key
2. **No Accumulation**: There's no concept of "appending" or "merging" token values
3. **Order Matters**: Later definitions in the inheritance chain override earlier ones
4. **Contract vs Definition**: Contract declarations don't affect inheritance - only definitions matter

**Example:**
```typescript
// Base component
const BaseButton = cls(
  {
    tokens: ["color.bg.default"],
    slot: ["root"],
    variant: {}
  },
  ({ what, def }) => ({
    token: def.token({
      "color.bg.default": what.css(["bg-gray-100"])
    }),
    rules: [def.root({ root: what.token(["color.bg.default"]) })],
    defaults: {}
  })
);

// Extended component
const PrimaryButtonCls = BaseButtonCls.extend(
  {
    tokens: ["color.bg.default"], // Same token declared - TypeScript enforces implementation
    slot: ["root"],
    variant: {}
  },
  ({ what, def }) => ({
    token: def.token({
      "color.bg.default": what.css(["bg-blue-600"]) // MUST provide this - TypeScript enforces it
    }),
    rules: [def.root({ root: what.token(["color.bg.default"]) })],
    defaults: {}
  })
);

// Result: PrimaryButtonCls uses "bg-blue-600", not "bg-gray-100"
const instance = PrimaryButtonCls.create();
console.log(instance.root()); // "bg-blue-600"
```

**Type System Enforcement:**
```typescript
// ❌ This would cause a TypeScript error
const PrimaryButtonCls = BaseButtonCls.extend(
  {
    tokens: ["color.bg.default"], // Declared but not implemented
    slot: ["root"],
    variant: {}
  },
  ({ what, def }) => ({
    token: def.token({
      // Missing "color.bg.default" definition - TypeScript error!
    }),
    rules: [def.root({ root: what.token(["color.bg.default"]) })],
    defaults: {}
  })
);
```

### 11.3 Variant Inheritance <a id="113-variant-inheritance"></a>

Variants are merged across the inheritance chain:

1. **Union Merging**: Child variants are combined with parent variants
2. **Type Preservation**: Variant types (string/boolean) are preserved
3. **Default Inheritance**: Child defaults can override parent defaults

---

## 12. Performance Features <a id="12-performance-features"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Inheritance System](#11-inheritance-system)** | **[→ Next Chapter: Type System](#13-type-system)**

### 12.1 Caching Strategy <a id="121-caching-strategy"></a>
- **Slot Function Caching**: Slot functions are cached after first creation to avoid recreation on each access
- **Result Caching**: Slot function results are cached based on configuration hash using `JSON.stringify()` for serialization
- **Rule Caching**: Rules are processed once per contract and reused across all instances
- **Proxy Optimization**: Uses Proxy for lazy slot function creation - functions are only created when accessed
- **Configuration Hashing**: Cache keys are generated from configuration objects, with fallback to `"__non_serializable__"` for complex objects
- **Memory Efficiency**: Cached results are stored in a `Map` for optimal lookup performance

### 12.2 Memory Management <a id="122-memory-management"></a>
- **Lazy Evaluation**: Slot functions are only created when accessed via Proxy
- **Shared References**: Contracts and definitions are shared across instances
- **Minimal Closures**: Avoid unnecessary closure creation
- **Efficient Merging**: Use efficient object merging strategies
- **Result Caching**: Cache slot function results to avoid recomputation

### 12.3 Runtime Optimization <a id="123-runtime-optimization"></a>
- **Early Exit**: Stop rule evaluation when no more matches are possible
- **Efficient Matching**: Use direct property access for variant matching
- **Class Deduplication**: Use [tailwind-merge](https://github.com/dcastil/tailwind-merge) for optimal class output via `tvc()` utility
- **Minimal Allocations**: Reuse objects where possible
- **Configuration Hashing**: Use JSON.stringify for cache keys (with fallback for non-serializable configs)
- **Proxy-based Lazy Loading**: Slot functions are created only when accessed, reducing initial overhead

---

## 13. Type System <a id="13-type-system"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Performance Features](#12-performance-features)** | **[→ Next Chapter: Integration Patterns](#14-integration-patterns)**

### 13.1 Generic Constraints <a id="131-generic-constraints"></a>

The type system ensures compile-time safety through contract constraints, definition validation, inheritance chain verification, and variant type inference.

### 13.2 Type Inference <a id="132-type-inference"></a>
Most types are automatically inferred from contract structure, with string variants mapped to literal types, "bool" variants to boolean types, and token keys inferred from contract tokens.

### 13.3 Type Safety Features <a id="133-type-safety-features"></a>
Provides exhaustive checking for variants, token validation, slot validation, and inheritance chain type safety.

---

## 14. Integration Patterns <a id="14-integration-patterns"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Type System](#13-type-system)** | **[→ Next Chapter: Best Practices](#15-best-practices)**

### 14.1 Framework Integration <a id="141-framework-integration"></a>

CLS integrates seamlessly with any framework through component props, slot functions, full TypeScript support, minimal re-render impact, and framework-agnostic design.

### 14.2 Design System Integration <a id="142-design-system-integration"></a>

CLS supports design system patterns through centralized tokens, consistent variants, hierarchical inheritance, and reusable component patterns.

### 14.3 Build System Integration <a id="143-build-system-integration"></a>

CLS works with modern build systems through tree shaking, type checking, bundle optimization, and excellent IDE support.

---

## 15. Best Practices <a id="15-best-practices"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Integration Patterns](#14-integration-patterns)**

### 15.1 Contract Design <a id="151-contract-design"></a>

Use clear naming, logical grouping, consistent structure, and minimal coupling for focused, cohesive contracts.

### 15.2 Definition Design <a id="152-definition-design"></a>

Use semantic tokens, consistent rules, sensible defaults, and plan override strategies.

### 15.3 Component Design <a id="153-component-design"></a>

Use appropriate slot granularity, simple variants, token reuse, and careful inheritance planning.

### 15.4 Performance Optimization <a id="154-performance-optimization"></a>

Leverage caching, use lazy evaluation, monitor bundle size, and profile runtime performance.

---

## 16. React Integration <a id="16-react-integration"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Best Practices](#15-best-practices)**

> **🎉 React developers rejoice!** CLS provides first-class React integration with hooks, HOCs, and context providers that make type-safe styling a breeze.

### Available React Types

```tsx
import { 
  useCls,           // Main React hook for CLS integration
  useClsEx,         // Combined hook for slots and variants
  useClsContext,    // Access CLS context
  ClsProvider,      // Provide CLS context
  withCls           // HOC to attach CLS to components
} from '@use-pico/cls';
```

### 16.1 useCls Hook <a id="161-usecls-hook"></a>

The `useCls` hook is the **foundation of React integration** - it bridges cls instances with React components:

```tsx
import { cls } from '@use-pico/cls';
import { useCls } from '@use-pico/cls/react';

const ButtonCls = cls(
  {
    tokens: ["color.bg.primary", "color.text.primary"],
    slot: ["root", "label", "icon"],
    variant: { 
      size: ["sm", "md", "lg"],
      tone: ["primary", "secondary", "danger"]
    }
  },
  ({ what, def }) => ({
    token: def.token({
      "color.bg.primary": what.css(["bg-blue-600"]),
      "color.text.primary": what.css(["text-white"])
    }),
    rules: [
      def.root({
        root: what.both(["px-4", "py-2", "rounded", "font-medium"], ["color.bg.primary", "color.text.primary"]),
        label: what.css(["font-medium"]),
        icon: what.css(["mr-2", "w-4", "h-4"])
      }),
      def.rule(
        what.variant({ size: "lg" }),
        { root: what.css(["px-6", "py-3"]) }
      )
    ]
  })
);

function Button({ children, size = "md", tone = "primary" }) {
  const slots = useCls(ButtonCls, ({ what }) => ({
    variant: what.variant({ size, tone })
  }));

  return (
    <button className={slots.root()}>
      <span className={slots.icon()}>🚀</span>
      <span className={slots.label()}>{children}</span>
    </button>
  );
}
```

**Key Benefits:**
- **🎯 Type Safety**: Full TypeScript support with IntelliSense
- **🔄 Dynamic Styling**: Runtime variant changes with type checking
- **⚡ Performance**: Optimized for React's rendering cycle
- **🧩 Composition**: Easy component composition and extension
- **🌳 Auto Context**: Automatically connects to CLS context providers

**useCls Hook Signature:**
```tsx
useCls(
  cls,                  // CLS instance to use
  userTweakFn?,         // User configuration (tweak prop)
  internalTweakFn?      // Internal configuration (component logic)
)
```

**Common Usage Patterns:**
```tsx
// Basic usage with user config only
const slots = useCls(ButtonCls, ({ what }) => ({
  variant: what.variant({ size: "lg" })
}));

// With tweak prop and internal config
const slots = useCls(ButtonCls, tweak, ({ what }) => ({
  variant: what.variant({ disabled: props.disabled })
}));

// With internal config only
const slots = useCls(ButtonCls, undefined, ({ what }) => ({
  slot: what.slot({ root: what.css(["internal-class"]) })
}));
```

### 16.1.1 useClsEx Hook <a id="1611-useclsex-hook"></a>

The `useClsEx` hook is a **convenient combination** of `useCls` and `withVariants` - it provides both slots and computed variants in a single hook call. This is perfect for components that need access to both styling functions and variant information.

> **🎯 Mental Model**: `useClsEx` = "Give me both the styling functions AND the computed variant values"

#### Basic Usage

```tsx
import { useClsEx } from '@use-pico/cls/react';

function Button({ size = "md", variant = "primary" }) {
  const { slots, variants } = useClsEx(ButtonCls, ({ what }) => ({
    variant: what.variant({ size, variant })
  }));

  // Access computed variants
  console.log('Current variants:', variants); // { size: "md", variant: "primary" }
  
  // Use slots for styling
  return (
    <button className={slots.root()}>
      Button with {variants.size} size and {variants.variant} variant
    </button>
  );
}
```

#### When to Use useClsEx

**✅ Perfect for:**
- Components that need both styling and variant information
- **Wrapper components that extract variants and pass them downstream** (see example below)
- Dynamic UI that responds to variant changes
- Components that render variant-dependent content
- Debugging and development tools

**❌ Consider useCls instead when:**
- You only need styling (slots)
- You don't need access to computed variant values
- Performance is critical (useCls is slightly more optimized)

#### Advanced Usage: Wrapper Components with Downstream Variants

**🚀 Key Use Case**: When a wrapper component extracts variants using `VariantOf` and needs to pass computed variants to its children.

```tsx
import type { VariantOf } from '@use-pico/cls';

// Wrapper component that takes a variant and passes it to children
interface StatusProps {
  tone?: VariantOf<StatusCls, "tone">; // Extract tone variant type
  children: React.ReactNode;
}

function Status({ tone = "inherit", children }: StatusProps) {
  // useClsEx provides both styling AND computed variants
  const { slots, variants } = useClsEx(StatusCls, ({ what }) => ({
    variant: what.variant({ tone })
  }));

  return (
    <div className={slots.root()}>
      {/* Pass computed tone variant to child components */}
      <Icon 
        icon="info" 
        tone={variants.tone} // ✅ Computed variant value
        tweak={({ what }) => ({
          slot: what.slot({
            root: what.css(["opacity-50"])
          })
        })}
      />
      
      <Typo tone={variants.tone}> {/* ✅ Same computed variant */}
        {children}
      </Typo>
    </div>
  );
}

// Usage - tone flows through the component hierarchy
<Status tone="success">
  Operation completed successfully!
</Status>
```

**Why useClsEx is Perfect Here:**
- **Single Source of Truth**: `variants.tone` contains the computed variant value
- **Type Safety**: `VariantOf<StatusCls, "tone">` ensures prop types match contract
- **Downstream Propagation**: Children receive the exact same variant value
- **Consistency**: All child components use identical variant computation

> **💡 Real-World Example**: This pattern is used in consuming packages like `@use-pico/client` - see the `Status` component that takes a `tone` variant and passes it to child `Icon` and `Typo` components, ensuring consistent styling throughout the component hierarchy.

#### Comparison: useCls vs useClsEx

| Feature | useCls | useClsEx |
|---------|--------|----------|
| **Returns** | `slots` only | `{ slots, variants }` |
| **Performance** | Optimized | Slightly more overhead |
| **Use Case** | Styling only | Styling + variant info |
| **API** | `const slots = useCls(...)` | `const { slots, variants } = useClsEx(...)` |

**Choose useClsEx when you need:**
- Access to computed variant values
- Both styling functions and variant information
- Debugging variant computation
- Dynamic content based on variants

**Choose useCls when you need:**
- Only styling functions
- Maximum performance
- Simple component styling

> **💡 Next**: Learn about [Component Patterns](#162-component-patterns) for building reusable, composable React components with CLS.

### 16.2 Component Patterns <a id="162-component-patterns"></a>

Build reusable, composable React components with CLS. The `tweak` prop provides a type-safe way to use the CLS package directly in components:

```tsx
import type { Cls } from '@use-pico/cls';

interface ButtonProps extends Cls.Props<typeof ButtonCls, React.ButtonHTMLAttributes<HTMLButtonElement>> {
  children: React.ReactNode;
}

function Button({ 
  children,
  cls = ButtonCls,
  tweak,
  ...props 
}: ButtonProps) {
  // useCls combines three configuration sources:
  // 1. Component rules (from ButtonCls definition)
  // 2. User config (tweak prop function) - appends to component rules
  // 3. Internal config (component logic) - appends to user config
  const slots = useCls(cls, tweak, ({ what }) => ({
    variant: what.variant({
      // Control variant by native prop
      disabled: props.disabled,
    })
  }));
  
  return (
    <button className={slots.root()} {...props}>
      {children}
    </button>
  );
}

// useCls with cls and tweak provides:
// - Type-safe access to CLS slots
// - Automatic context inheritance  
// - Runtime configuration overrides via tweak prop function
// - Proper React integration and performance
// - **Slot merging**: User config appends to component rules, internal config appends to user config

// The tweak prop is a function that provides user configuration overrides
// Users pass: tweak={({ what }) => ({ variant: { tone: "primary" } })}
```

### 16.2.1 The `tweak` Prop and Slot Merging <a id="1621-the-tweak-prop-and-slot-merging"></a>

The `tweak` prop is a **powerful feature** that enables user customization while preserving component integrity. It works through **slot merging** - user configurations append to component rules rather than replacing them.

#### How the `tweak` Prop Works

**🔍 Configuration Flow:**
1. **Component Rules**: Base styling from CLS definition
2. **User Config** (`tweak` prop): User-provided overrides (append mode)
3. **Internal Config**: Component logic overrides (append mode)
4. **Result**: All configurations combined in order

**⚡ Key Benefits:**
- **Preserves Component Integrity**: Base styling is never lost
- **Enables Customization**: Users can add their own styles
- **Type Safety**: Full TypeScript support for all configurations
- **Predictable Behavior**: Append-based merging is intuitive

#### Real-World Example: Customizable Button

```tsx
// Button component with tweak prop support
function Button({ children, tweak, ...props }) {
  const slots = useCls(ButtonCls, tweak, ({ what }) => ({
    variant: what.variant({
      disabled: props.disabled,
    })
  }));

  return (
    <button className={slots.root()} {...props}>
      {children}
    </button>
  );
}

// Usage examples showing slot merging:

// 1. Basic usage (no tweak prop)
<Button>Click me</Button>
// Result: "bg-blue-600 text-white px-4 py-2 rounded font-medium"

// 2. With tweak prop for variant override
<Button tweak={({ what }) => ({ 
  variant: what.variant({ tone: "secondary" }) 
})}>
  Click me
</Button>
// Result: "bg-gray-600 text-white px-4 py-2 rounded font-medium"

// 3. With tweak prop for slot override (append mode)
<Button tweak={({ what }) => ({ 
  slot: what.slot({
    root: what.css(["shadow-lg", "hover:shadow-xl"])
  })
})}>
  Click me
</Button>
// Result: "bg-blue-600 text-white px-4 py-2 rounded font-medium shadow-lg hover:shadow-xl"

// 4. With tweak prop for override (replace mode)
<Button tweak={({ what }) => ({ 
  override: what.override({
    root: what.css(["bg-red-500", "text-white", "border-2"])
  })
})}>
  Click me
</Button>
// Result: "bg-red-500 text-white border-2" (replaces all previous styles)
```

#### Prop Separation Pattern: Base vs User Components

A common pattern is to separate props between a base component (internal) and a user-facing component. This allows you to control which props are available to users while keeping internal logic separate.

**Example: MenuLink Component**
```tsx
// Base component - internal props only
interface BaseMenuLinkProps extends Cls.Props<typeof MenuLinkCls, AnchorHTMLAttributes<HTMLAnchorElement>> {
  icon?: string | ReactNode;
  inner?: boolean;
  vertical?: boolean;
  // Note: 'match' prop is NOT here - it's only for the user component
}

const BaseMenuLink = forwardRef<HTMLAnchorElement, BaseMenuLinkProps>(
  ({ icon, inner, vertical, cls = MenuLinkCls, tweak, children, ...props }, ref) => {
    const slots = useCls(cls, tweak, ({ what }) => ({
      variant: what.variant({ inner, vertical })
    }));

    return (
      <a {...props} className={slots.base()} ref={ref}>
        {isString(icon) ? <Icon icon={icon} /> : icon}
        {children}
      </a>
    );
  }
);

// User-facing component - includes routing-specific props
export const MenuLink: LinkComponent<typeof BaseMenuLink> = (props) => {
  // Users can pass 'match' prop here, but BaseMenuLink doesn't see it
  return <CreateMenuLink preload="intent" {...props} />;
};
```

**Benefits of Prop Separation:**
- **🔒 Type Safety**: TypeScript prevents using internal props in user components
- **🧹 Clean API**: Users only see the props they should use
- **🔧 Internal Control**: Base component handles styling, user component handles routing
- **📦 Better Encapsulation**: Internal logic is isolated from public API

#### Slot vs Override in React Components

**Slot Configuration (Recommended):**
```tsx
// ✅ Appends to existing styles - preserves component integrity
<Button tweak={({ what }) => ({ 
  slot: what.slot({
    root: what.css(["custom-shadow", "hover:scale-105"])
  })
})}>
  Enhanced Button
</Button>
// Result: Component styles + custom styles
```

**Override Configuration (Use Sparingly):**
```tsx
// ⚠️ Replaces all styles - use only when you need complete control
<Button tweak={({ what }) => ({ 
  override: what.override({
    root: what.css(["completely-custom-styling"])
  })
})}>
  Custom Button
</Button>
// Result: Only custom styles, component styles lost
```

#### Advanced: Combining Multiple Configurations

```tsx
// Complex component with internal and user configs
function Icon({ icon, cls, ...props }) {
  const slots = useCls(
    IconCls,
    cls, // User config (cls prop)
    isString(icon) ? ({ what }) => ({
      slot: what.slot({
        root: what.css([icon]) // Internal config (icon class)
      })
    }) : undefined
  );

  return <div className={slots.root()} {...props} />;
}

// Usage with multiple configuration layers:
<Icon 
  icon="icon-[mdi-light--home]"
  tweak={({ what }) => ({
    slot: what.slot({
      root: what.css(["animate-pulse", "text-blue-500"])
    })
  })}
/>
// Result: "icon-base text-gray-600 icon-[mdi-light--home] animate-pulse text-blue-500"
// Order: Component rules → Internal config → User config
```

### 16.3 withCls HOC <a id="163-withcls-hoc"></a>

Bind cls instances directly to your components so you can access `Component.cls` externally without exporting both the component and cls instance separately:

```tsx
import { withCls } from '@use-pico/cls/react';

// This should be defined in Button.tsx, not in consuming components
const Button = withCls(ButtonComponent, ButtonCls);

// Now you can access: Button.cls externally
// No need to export both Button and ButtonCls separately!

function App() {
  // Use useCls for proper React integration and context inheritance
  const customClasses = useCls(Button.cls, undefined, ({ what }) => ({
    variant: what.variant({ size: "lg", tone: "secondary" })
  }));

  return (
    <div>
      <Button size="lg" tone="primary">
        Click me!
      </Button>
      {/* Use useCls for proper React integration */}
      <div className={customClasses.root()}>
        Custom styling
      </div>
    </div>
  );
}

// Export only Button - Button.cls gives access to cls instance
export { Button };
// No need to export ButtonCls separately!

// Key benefit: Single export with typed access to cls instance
// Other components can use useCls(Button.cls, ...) for proper React integration

// File structure:
// Button.tsx: Define ButtonComponent, ButtonCls, and export Button (with withCls)
// App.tsx: Import Button and use useCls(Button.cls, ...) for custom styling
```

### 16.4 Context Integration <a id="164-context-integration"></a>

Seamless theme inheritance through React Context. The `ClsProvider` accepts a single cls instance that provides tokens and styling to child components:

```tsx
import { ClsProvider } from '@use-pico/cls/react';

const ThemeProvider = ({ children }) => (
  <ClsProvider value={ThemeCls}>
    {children}
  </ClsProvider>
);

function ThemedButton() {
  // The tweak prop automatically provides the full configuration with context inheritance
  return <Button tweak={({ what }) => ({ variant: what.variant({ tone: "primary" }) })}>Themed Button</Button>;
}

// The tweak prop automatically handles context inheritance and provides
// the full configuration function with access to what utility

// The tweak prop is a function that provides user configuration overrides
// Users pass: tweak={({ what }) => ({ variant: { tone: "primary" } })}
```

### 16.5 Provider Architecture <a id="165-provider-architecture"></a>

Set up global styling contexts with `ClsProvider`:

```tsx
const App = () => (
  <ClsProvider value={ThemeCls}>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  </ClsProvider>
);
```

### 16.6 React Type System <a id="166-react-type-system"></a>

CLS provides several TypeScript helper types specifically designed for React integration. These types ensure type safety and provide excellent IntelliSense support.

#### Component Props Type

The `Cls.Props<TCls, P>` type provides a standard interface for React component props with CLS integration:

```tsx
import type { Cls } from '@use-pico/cls';

interface ButtonProps extends Cls.Props<typeof ButtonCls, React.ButtonHTMLAttributes<HTMLButtonElement>> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
}

function Button({ 
  children,
  cls = ButtonCls,  // cls (optional)
  tweak,            // Configuration function (optional)
  ...props 
}: ButtonProps) {
  const slots = useCls(cls, tweak, ({ what }) => ({
    variant: what.variant({ 
      size: props.size,
      variant: props.variant 
    })
  }));
  
  return (
    <button className={slots.root()} {...props}>
      {children}
    </button>
  );
}
```

**Key Features:**
- **`cls?: TCls`**: Optional cls for styling
- **`tweak?: Tweak.Fn<TCls>`**: Optional configuration function
- **`& Omit<P, "cls" | "tweak">`**: Preserves all other props from base type `P`

#### ComponentSlots Type

The `Cls.SlotsOf<TCls>` type extracts slot functions from a cls instance for use in component props:

```tsx
import type { Cls } from '@use-pico/cls';

interface IconProps {
  icon: string;
  slots?: Cls.SlotsOf<typeof IconCls>;
}

function Icon({ icon, slots = IconCls.create() }: IconProps) {
  return <div className={slots.root()}>{icon}</div>;
}

// Usage with custom configuration
function CustomIcon({ icon }: { icon: string }) {
  const slots = IconCls.create(({ what }) => ({
    variant: what.variant({ size: "lg" })
  }));
  
  return <Icon icon={icon} slots={slots} />;
}
```

**Key Features:**
- **Type-safe slot access**: Each slot function is properly typed
- **Configuration support**: Slots can accept configuration functions
- **Flexible usage**: Can be passed as props or used directly

#### VariantOf Type

The `Cls.VariantOf<TCls, TVariant>` type extracts the value type for a specific variant:

```tsx
import type { Cls } from '@use-pico/cls';

// Given ButtonCls with variants: { size: ["sm", "md", "lg"], disabled: ["bool"] }
type ButtonSize = Cls.VariantOf<typeof ButtonCls, "size">;     // "sm" | "md" | "lg"
type ButtonDisabled = Cls.VariantOf<typeof ButtonCls, "disabled">; // boolean

interface ButtonProps {
  size?: Cls.VariantOf<typeof ButtonCls, "size">;
  disabled?: Cls.VariantOf<typeof ButtonCls, "disabled">;
  children: React.ReactNode;
}

function Button({ size = "md", disabled = false, children }: ButtonProps) {
  const slots = useCls(ButtonCls, ({ what }) => ({
    variant: what.variant({ size, disabled })
  }));
  
  return (
    <button className={slots.root()} disabled={disabled}>
      {children}
    </button>
  );
}
```

**Key Features:**
- **Automatic type inference**: Extracts correct types from CLS contract
- **Boolean variant support**: "bool" variants become `boolean` type
- **String variant support**: Other variants become union of string literals
- **Type safety**: Ensures only valid variant values are used

#### VariantsOf Type

The `Cls.VariantsOf<TCls>` type extracts **all available variants** from a cls instance into a type-safe object structure:

```tsx
import type { Cls } from '@use-pico/cls';

// Given ButtonCls with variants: { size: ["sm", "md", "lg"], disabled: ["bool"] }
type ButtonVariants = Cls.VariantsOf<typeof ButtonCls>;
// Result: {
//   size?: "sm" | "md" | "lg";
//   disabled?: boolean;
// }

// Use for component props that accept all variants
interface ButtonProps {
  variants?: Cls.VariantsOf<typeof ButtonCls>;
  children: React.ReactNode;
}

// Use for default variant objects
const defaultVariants: Cls.VariantsOf<typeof ButtonCls> = {
  size: "md",
  disabled: false
};

// Use for type-safe variant configurations
function createButtonConfig(variants: Cls.VariantsOf<typeof ButtonCls>) {
  return ButtonCls.create(({ what }) => ({
    variant: what.variant(variants)
  }));
}

// Usage
const config = createButtonConfig({ size: "lg", disabled: true });
```

**Key Features:**
- **Complete variant extraction**: Gets all variants from a cls instance
- **Partial object type**: All variant properties are optional for flexibility
- **Type safety**: Ensures only valid variant combinations are used
- **IDE autocompletion**: Provides full IntelliSense for all available variants
- **Default object creation**: Perfect for creating default variant configurations

**Common Use Cases:**
- **Component props**: Accept all variants as a single object
- **Default configurations**: Create type-safe default variant objects
- **Configuration functions**: Build functions that accept complete variant sets
- **Documentation**: Generate type-safe documentation of available variants

#### Complete Example: Type-Safe Component

```tsx
import type { Cls } from '@use-pico/cls';

// Define CLS with variants
const CardCls = cls(
  {
    tokens: ["color.bg", "color.text"],
    slot: ["root", "title", "content"],
    variant: {
      theme: ["light", "dark"],
      size: ["sm", "md", "lg"],
      elevated: ["bool"]
    }
  },
  ({ what, def }) => ({
    token: def.token({
      "color.bg": what.css(["bg-white"]),
      "color.text": what.css(["text-gray-900"])
    }),
    rules: [
      def.root({
        root: what.both(["rounded-lg", "shadow-md"], ["color.bg", "color.text"]),
        title: what.css(["text-xl", "font-bold"]),
        content: what.css(["p-4"])
      })
    ]
  })
);

// Type-safe component props
interface CardProps extends Cls.Props<typeof CardCls, React.HTMLAttributes<HTMLDivElement>> {
  children: React.ReactNode;
  theme?: Cls.VariantOf<typeof CardCls, "theme">;
  size?: Cls.VariantOf<typeof CardCls, "size">;
  elevated?: Cls.VariantOf<typeof CardCls, "elevated">;
}

function Card({ 
  children,
  theme = "light",
  size = "md", 
  elevated = false,
  cls = CardCls,
  tweak,
  ...props 
}: CardProps) {
  const slots = useCls(cls, tweak, ({ what }) => ({
    variant: what.variant({ theme, size, elevated })
  }));
  
  return (
    <div className={slots.root()} {...props}>
      <h2 className={slots.title()}>Card Title</h2>
      <div className={slots.content()}>{children}</div>
    </div>
  );
}

// Usage - full type safety
<Card theme="dark" size="lg" elevated={true}>
  Card content
</Card>
```

### 16.7 Advanced Patterns <a id="167-advanced-patterns"></a>

> ⚠️ **Proceed with caution!** These patterns are possible but considered _special cases_ or even anti-patterns. Use them sparingly and only when absolutely necessary! 🚨

**Dynamic Token Overrides:**
```tsx
function DynamicButton({ theme, ...props }) {
  return (
    <Button 
      tweak={({ what, override }) => ({ 
        token: override.token({ "color.bg.primary": what.css([`bg-${theme}-600`]) })
      })} 
      {...props} 
    />
  );
}
```

**Conditional Styling:**
```tsx
function ConditionalButton({ isActive, ...props }) {
  return (
    <Button 
      tweak={({ what }) => ({ 
        variant: what.variant({ tone: isActive ? "primary" : "secondary" })
      })} 
      {...props} 
    />
  );
}
```

**Component Composition:**
```tsx
const ButtonGroup = ({ children, variant = "horizontal" }) => {
  // ✅ Use useCls for proper React integration
  const slots = useCls(ButtonGroupCls, undefined, ({ what }) => ({
    variant: what.variant({ variant })
  }));
  
  return (
    <div className={slots.root()}>
      {React.Children.map(children, (child, index) => (
        <div key={index} className={slots.item()}>
          {child}
        </div>
      ))}
    </div>
  );
};
```

---

**[↑ Back to Top](#table-of-contents)** | **[→ Next Chapter: Detailed React Documentation](./docs/04-react-integration/README.md)**
