# CLS - Type-Safe Styling System

> **Type-safe, composable styling system** for React, Vue, Svelte, and vanilla JS

[![npm version](https://badge.fury.io/js/@use-pico%2Fcls.svg)](https://badge.fury.io/js/@use-pico%2Fcls)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Quick Start <a id="quick-start"></a>

```typescript
import { cls } from '@use-pico/cls';

const Button = cls(
  {
    tokens: ["color.bg.primary", "color.text.primary"],
    slot: ["root"],
    variant: { size: ["sm", "md", "lg"] }
  },
  ({ what, def }) => ({
    token: def.token({
      "color.bg.primary": what.css(["bg-blue-600"]),
      "color.text.primary": what.css(["text-white"])
    }),
    rules: [
      def.root({ root: what.token(["color.bg.primary", "color.text.primary"]) }),
      def.rule(what.variant({ size: "lg" }), { root: what.css(["px-6", "py-3"]) })
    ]
  })
);

// Usage
const classes = Button.create(({ what }) => ({
  variant: what.variant({ size: "lg" })
}));
console.log(classes.root()); // "bg-blue-600 text-white px-6 py-3"
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
const Card = cls(
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
    ]
  })
);
```

### With React
```tsx
import { cls } from '@use-pico/cls';
import { useCls } from '@use-pico/cls/react';

const MyComponent = ({ theme = "light" }) => {
  const classes = useCls(Card, ({ what }) => ({
    variant: what.variant({ theme })
  }));

  return (
    <div className={classes.root()}>
      <h2 className={classes.title()}>Card Title</h2>
      <div className={classes.content()}>Card content here</div>
    </div>
  );
};
```

## 🎯 Key Features <a id="key-features"></a>

### Type-Safe Variants
```typescript
// TypeScript ensures only valid variants are used
const classes = Button.create(({ what }) => ({
  variant: what.variant({ 
    size: "lg",        // ✅ Valid
    // size: "xl"      // ❌ TypeScript error
  })
}));
```

### Token Inheritance
```typescript
const PrimaryButton = Button.extend(
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
const classes = Button.create(({ what }) => ({
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
- [Best Practices](#15-best-practices) - How to build great design systems
- [Performance Guide](#12-performance-features) - Optimization strategies

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
const Button = cls(
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

#### Type-Safe Variant Usage

The `what.variant()` helper is **crucial for type safety** - it ensures you only use valid variant combinations:

```typescript
// ✅ Type-safe variant usage
const classes = Button.create(({ what }) => ({
  variant: what.variant({ 
    size: "lg",        // ✅ Valid: "lg" is in ["sm", "md", "lg"]
    variant: "primary" // ✅ Valid: "primary" is in ["default", "primary"]
  })
}));

// ❌ TypeScript will catch invalid variants
const classes = Button.create(({ what }) => ({
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
const Button = cls(
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
    ]
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
const Button = cls(
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
const buttonClasses = Button.create(({ what }) => ({
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
    ]
  })
);

// Usage - token resolution happens automatically
const instance = ButtonWithTokens.create();
console.log(instance.root()); // "px-4 py-2 rounded font-medium text-white"

const primaryInstance = ButtonWithTokens.create(({ what }) => ({
  variant: what.variant({ variant: "primary" })
}));
console.log(primaryInstance.root()); // "px-4 py-2 rounded font-medium text-white bg-blue-600"
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

**Precedence Rules:**
1. User config takes precedence over internal config
2. Override config takes precedence over slot config
3. Later rules take precedence over earlier rules
4. Local slot overrides take precedence over global overrides

> **For detailed usage examples, see [Section 9: Create Method Usage](#9-create-method-usage)**

**Example:**
```typescript
// Basic usage with variants
const classes = Button.create(({ what }) => ({
  variant: what.variant({ variant: "primary", size: "lg" })
}));

// Using what.variant() for type-safe variant values
const classes = Button.create(({ what }) => ({
  variant: what.variant({ variant: "primary", size: "lg" })
}));

// With slot overrides using what utility
const classes = Button.create(({ what }) => ({
  variant: what.variant({ variant: "primary" }),
  slot: {
    icon: what.css(["mr-2", "animate-spin"]),
    label: what.token(["color.text.hover"])
  }
}));

// With token overrides
const classes = Button.create(({ what }) => ({
  token: {
    "color.text.primary": what.css(["text-blue-600"])
  }
}));

// With hard overrides
const classes = Button.create(({ what }) => ({
  override: {
    root: what.css(["bg-red-500", "text-white"])
  }
}));

// Combined user and internal configs
const classes = Button.create(
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

### 6.2 `extend(childContract, childDefinitionFn)` <a id="62-extend-method"></a>

Creates new CLS instances with additional functionality, inheriting from a parent.

**Parameters:**
- `childContract`: Extended contract with new tokens, slots, or variants
- `childDefinitionFn`: Callback function that receives the `what` utility and returns the child definition

**Example:**
```typescript
const PrimaryButton = Button.extend(
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

Provides type-safe assignment of compatible CLS instances.

**Parameters:**
- `sub`: A CLS instance that must be derived from the current instance

**Returns:** The current CLS instance for chaining

**Example:**
```typescript
const ButtonGroup = Button.use(PrimaryButton);
// ButtonGroup now has access to PrimaryButton's extended functionality
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

**Note**: The actual implementation uses a flat array of token names rather than a nested object structure. This simplifies the type system and makes token inheritance more straightforward.

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
console.log(instance.root()); // "px-4 py-2 rounded font-medium text-white"

const primaryInstance = ButtonWithTokenChains.create(({ what }) => ({
  variant: what.variant({ variant: "primary" })
}));
console.log(primaryInstance.root()); // "px-4 py-2 rounded font-medium text-white bg-blue-600"
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
const classes = Button.create(({ what }) => ({
  variant: what.variant({ variant: "primary", size: "lg" })
}));

// With slot overrides
const classes = Button.create(({ what }) => ({
  variant: what.variant({ variant: "primary" }),
  slot: {
    root: what.css(["mr-2", "animate-spin"]),
    label: what.token(["color.text.hover"])
  }
}));

// Using what.variant() for type-safe variant values
const classes = Button.create(({ what }) => ({
  variant: what.variant({ variant: "primary", size: "lg" })
}));

// With token overrides
const classes = Button.create(({ what }) => ({
  token: {
    "color.text.primary": what.css(["text-blue-600"])
  }
}));

// With hard overrides
const classes = Button.create(({ what }) => ({
  override: {
    root: what.css(["bg-red-500", "text-white"])
  }
}));
```

**Combined User and Internal Configs:**
```typescript
const classes = Button.create(
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
const rootClasses = classes.root();
const labelClasses = classes.label();

// With per-call overrides
const rootClasses = classes.root(({ what }) => ({
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
const ExtendedButton = BaseButton.extend(childContract, childDefinitionFn);
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
const PrimaryButton = BaseButton.extend(
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

// Result: PrimaryButton uses "bg-blue-600", not "bg-gray-100"
const instance = PrimaryButton.create();
console.log(instance.root()); // "bg-blue-600"
```

**Type System Enforcement:**
```typescript
// ❌ This would cause a TypeScript error
const PrimaryButton = BaseButton.extend(
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
- **Slot Function Caching**: Slot functions are cached after first creation
- **Result Caching**: Slot function results are cached based on configuration hash
- **Rule Caching**: Rules are processed once per contract
- **Proxy Optimization**: Uses Proxy for lazy slot function creation

### 12.2 Memory Management <a id="122-memory-management"></a>
- **Lazy Evaluation**: Slot functions are only created when accessed via Proxy
- **Shared References**: Contracts and definitions are shared across instances
- **Minimal Closures**: Avoid unnecessary closure creation
- **Efficient Merging**: Use efficient object merging strategies
- **Result Caching**: Cache slot function results to avoid recomputation

### 12.3 Runtime Optimization <a id="123-runtime-optimization"></a>
- **Early Exit**: Stop rule evaluation when no more matches are possible
- **Efficient Matching**: Use direct property access for variant matching
- **Class Deduplication**: Use tailwind-merge for optimal class output
- **Minimal Allocations**: Reuse objects where possible
- **Configuration Hashing**: Use JSON.stringify for cache keys (with fallback for non-serializable configs)

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

**[↑ Back to Top](#table-of-contents)**
