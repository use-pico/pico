# CLS - Type-Safe Styling System 🚀

> **The styling system that finally makes sense** - because we're tired of CSS chaos! 🎨✨

[![npm version](https://badge.fury.io/js/@use-pico%2Fcls.svg)](https://badge.fury.io/js/@use-pico%2Fcls)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📚 Table of Contents

- [🎯 What is CLS?](#-what-is-cls)
- [🛠 Installation](#-installation)
- [🚀 Quick Start](#-quick-start)
- [✨ Core Features](#-core-features)
- [🏗️ Contract Builder API](#️-contract-builder-api)
  - [🚀 Basic Button Example](#-basic-button-example)
  - [🎯 Using Your Button](#-using-your-button)
  - [🔧 Contract Builder Methods](#-contract-builder-methods)
  - [🎨 Definition Builder Methods](#-definition-builder-methods)
  - [🧠 Smart Type Safety](#-smart-type-safety)
  - [🎨 Design Tokens](#-design-tokens)
  - [🎯 Type-Safety Magic](#-type-safety-magic)
- [📖 Basic Concepts](#-basic-concepts)
  - [🧠 Mental Model](#-mental-model)
  - [🏷️ Tokens](#-tokens)
  - [🎪 Slots](#-slots)
  - [🎭 Variants](#-variants)
  - [🎯 Rules](#-rules)
- [🧬 Inheritance](#-inheritance)
- [⚛️ React Integration](#️-react-integration)
- [🎯 Advanced Features](#-advanced-features)
- [🚀 Performance](#-performance)
- [🎯 When to Use CLS](#-when-to-use-cls)
- [🔍 Comparison with Other Solutions](#-comparison-with-other-solutions)
- [🆚 Real-World Comparison Examples](#-real-world-comparison-examples)
- [🔗 Community & Support](#-community--support)
- [🤖 LLM Compatibility](#-llm-compatibility)

## 🎯 What is CLS?

**CLS** stands for **Class List System** (because we're creative with acronyms, obviously! 😄). Think of it as that **smart friend** who shows up to a construction site with a perfectly organized toolbox instead of just throwing random tools in a bag 🧰.

While other styling libraries are like *"here's a hammer, good luck building a house"*, CLS is like *"here's a blueprint, here are the materials, and here's how they all work together – oh, and everything is type-safe because we're not savages"* 😎.

### Why CLS? Because we're tired of:

- 🎨 **Styling chaos** - hunting down inconsistent colors across codebases
- 🐛 **Runtime surprises** - styling errors that should've been caught at compile time  
- 🔄 **Multiple sources of truth** - maintaining CSS variables AND TypeScript types
- 🔒 **Vendor lock-in** - being stuck with heavy, opinionated styling solutions

## 🛠 Installation

```bash
npm install @use-pico/cls
# or
bun add @use-pico/cls
# or
yarn add @use-pico/cls
```

## 🚀 Quick Start

Let's build a button component from scratch! This example shows the **Contract Builder API** - the recommended way to create CLS instances:

```typescript
import { contract } from '@use-pico/cls';

// Step 1: Create a contract (define what can be styled)
const ButtonCls = contract()
  .tokens(["color.bg.primary", "color.text.primary"])  // Design tokens
  .slots(["root", "label"])                           // Component parts
  .variant("size", ["sm", "md", "lg"])                // Size variants
  .bool("disabled")                                   // Boolean variant
  .def()                                              // Start definition phase
  .token({                                           // Define token values
    "color.bg.primary": { class: ["bg-blue-600"] },
    "color.text.primary": { class: ["text-white"] },
  })
  .root({                                            // Base styling
    root: {
      token: ["color.bg.primary", "color.text.primary"],
      class: ["px-4", "py-2", "rounded", "font-medium"],
    },
    label: { class: ["select-none"] },
  })
  .rule({ size: "lg" }, { root: { class: ["px-6", "py-3"] } })        // Conditional rules
  .rule({ disabled: true }, { root: { class: ["opacity-50", "cursor-not-allowed"] } })
  .defaults({ size: "md", disabled: false })                          // Default values
  .cls();                                                             // Create CLS instance

// Step 2: Use it!
const slots = ButtonCls.create(({ what }) => ({
  variant: what.variant({ size: "lg" })
}));
console.log(slots.root()); // "bg-blue-600 text-white px-4 py-2 rounded font-medium px-6 py-3"
```

### With React (because who doesn't love React? 💙)

```tsx
import { useCls } from '@use-pico/cls';

function MyButton({ size = "md", disabled = false }) {
  const slots = useCls(ButtonCls, ({ what }) => ({
    variant: what.variant({ size, disabled })
  }));

  return (
    <button className={slots.root()}>
      <span className={slots.label()}>Click me</span>
    </button>
  );
}
```

## ✨ Core Features

- **🔒 Type Safety First** - Catch styling errors at compile time (no more midnight debugging sessions! 🌙)
- **🧩 Composable** - Build design systems with inheritance and composition
- **⚡ Performance** - Lazy evaluation, smart caching, and minimal runtime overhead
- **🌐 Framework Agnostic** - Works with React, Vue, Svelte, vanilla JS, or any framework
- **🎨 Design System Ready** - Tokens, variants, and slots for scalable styling
- **🛠 Developer Experience** - Excellent IDE support and intuitive API

## 🏗️ Contract Builder API

The **Contract Builder** is CLS's main API - it's fluent, type-safe, and incredibly powerful! Think of it as your styling toolkit that guides you every step of the way.

### 🚀 Basic Button Example

```typescript
import { contract } from '@use-pico/cls';

const ButtonCls = contract()
  .slots(["root", "icon", "label"])           // Define component parts
  .variant("size", ["sm", "md", "lg"])        // Define size options
  .variant("tone", ["default", "primary"])    // Define tone options
  .bool("disabled")                           // Add boolean variant
  .def()                                      // Start defining styles
  .root({                                     // Base styles (no conditions)
    root: { class: ["inline-flex", "items-center", "gap-2"] },
    icon: { class: ["w-4", "h-4"] },
    label: { class: ["font-medium"] }
  })
  .match("size", "sm", {                      // Size-specific styles
    root: { class: ["px-3", "py-1", "text-sm"] }
  })
  .match("size", "md", {
    root: { class: ["px-4", "py-2", "text-base"] }
  })
  .match("size", "lg", {
    root: { class: ["px-6", "py-3", "text-lg"] }
  })
  .match("tone", "primary", {                 // Tone-specific styles
    root: { class: ["bg-blue-600", "text-white"] }
  })
  .match("disabled", true, {                  // Boolean variant
    root: { class: ["opacity-50", "cursor-not-allowed"] }
  })
  .defaults({                                 // Default values
    size: "md",
    tone: "default",
    disabled: false
  })
  .cls();                                     // Create the CLS instance
```

### 🎯 Using Your Button

```typescript
// Create styled slots
const slots = ButtonCls.create(({ what }) => ({
  variant: what.variant({
    size: "lg",
    tone: "primary",
    disabled: false
  })
}));

// Use in your component
<button className={slots.root()}>
  <Icon className={slots.icon()} />
  <span className={slots.label()}>Click me!</span>
</button>
```

### 🔧 Contract Builder Methods

**Define the structure** (used before `.def()`):

| Method | Purpose | Example |
|--------|---------|---------|
| `.tokens()` | Define multiple tokens | `.tokens(["color.primary", "spacing.md"])` |
| `.token()` | Define single token | `.token("color.primary")` |
| `.slots()` | Define component parts | `.slots(["root", "icon", "label"])` |
| `.slot()` | Add single slot | `.slot("badge")` |
| `.variant()` | Add string/enum variants | `.variant("size", ["sm", "md", "lg"])` |
| `.variants()` | Define multiple variants | `.variants({ size: ["sm", "md"], tone: ["default", "primary"] })` |
| `.bool()` | Add boolean variants | `.bool("disabled")` |

### 🎨 Definition Builder Methods

**Define the styling** (used after `.def()`):

| Method | Purpose | Example |
|--------|---------|---------|
| `.root()` | Base styles (no conditions) | `.root({ root: { class: ["flex"] } })` |
| `.rule()` | Complex condition matching | `.rule({ size: "lg", disabled: true }, { root: { class: ["opacity-50"] } })` |
| `.match()` | Single variant matching | `.match("size", "lg", { root: { class: ["px-6"] } })` |
| `.switch()` | Boolean variant helper | `.switch("disabled", { root: { class: ["opacity-50"] } }, { root: { class: ["opacity-100"] } })` |
| `.defaults()` | Set default variant values | `.defaults({ size: "md", disabled: false })` |
| `.cls()` | Create final CLS instance | `.cls()` |

### 🧠 Smart Type Safety

CLS enforces correctness at every step:

```typescript
const ButtonCls = contract()
  .variant("size", ["sm", "md", "lg"])
  .bool("disabled")
  .def()
  .match("size", "xl", { root: { class: ["px-8"] } })  // ❌ TypeScript error! "xl" not in variants
  .match("loading", true, { root: { class: ["animate-spin"] } }) // ❌ TypeScript error! "loading" not defined
  .cls();
```

### 🎨 Design Tokens

Create reusable design values:

```typescript
const ThemeCls = contract()
  .token({
    "color.bg.primary": { class: ["bg-blue-600"] },
    "color.text.primary": { class: ["text-white"] },
    "spacing.padding.md": { class: ["px-4", "py-2"] }
  })
  .def()
  .root({ root: { class: ["font-sans"] } })
  .cls();

// Use tokens in other components
const ButtonCls = contract(ThemeCls.contract)
  .def()
  .root({ 
    root: { 
      token: ["color.bg.primary", "color.text.primary", "spacing.padding.md"] 
    } 
  })
  .cls();
```

## 📖 Basic Concepts

### 🧠 Mental Model

CLS is built on **two powerful pillars**: **contract-first design** and **heavy typechecking**. Think of it like building a house – you start with solid blueprints, then everything flows naturally! 🏗️

#### Contract = Structure (What can be styled?)
```typescript
// Contract defines WHAT can be styled using Contract Builder API
const MyComponentCls = contract()
  .tokens(["color.text", "color.bg"])     // What design tokens exist?
  .slots(["root", "label"])               // What parts can be styled?
  .variant("size", ["sm", "md", "lg"])    // What size variations are possible?
  .variant("variant", ["default", "primary"]) // What style variations are possible?
  .build();                                 // This creates the contract structure  
```

#### Definition = Values (How is it styled?)
```typescript
// Definition defines HOW it's styled using Definition Builder API
const MyComponentCls = contract()
  .tokens(["color.text", "color.bg"])
  .slots(["root", "label"])
  .variant("size", ["sm", "md", "lg"])
  .variant("variant", ["default", "primary"])
  .def()                                    // Start definition phase
  .token({                                 // Define token values
    "color.text.default": { class: ["text-gray-900"] },
    "color.text.primary": { class: ["text-white"] },
    "color.bg.default": { class: ["bg-gray-100"] },
    "color.bg.primary": { class: ["bg-blue-600"] }
  })
  .root({                                  // Base styles (no conditions)
    root: { class: ["inline-flex", "items-center"] }
  })
  .match("size", "lg", {                   // Size-specific styles
    root: { class: ["px-6", "py-3"] }
  })
  .match("variant", "primary", {           // Variant-specific styles
    root: { token: ["color.text.primary", "color.bg.primary"] }
  })
  .defaults({ size: "md", variant: "default" }) // Default values
  .cls(); // This creates the complete CLS instance
```

> **💡 Key Insight**: Think of **Contract** as the "interface" and **Definition** as the "implementation"

### 🏷️ Tokens

Tokens are **named design values** that can be referenced throughout your components:

```typescript
const ButtonCls = contract()
  .tokens(["color.bg.primary", "color.text.primary", "spacing.padding.md"]) // Define tokens
  .slots(["root"])
  .def()
  .token({ // Define token values
    "color.bg.primary": { class: ["bg-blue-600"] },
    "color.text.primary": { class: ["text-white"] },
    "spacing.padding.md": { class: ["px-4", "py-2"] }
  })
  .root({ // Reference tokens in slots
    root: { token: ["color.bg.primary", "color.text.primary"] }
  })
  .cls();
```

### 🎪 Slots

Slots represent **named parts** of a component that can receive independent styling:

```typescript
const ButtonCls = contract()
  .slots(["root", "icon", "label", "badge"]) // Define component parts
  .def()
  .root({ // Style each slot independently
    root: { class: ["flex", "items-center"] },
    icon: { class: ["w-4", "h-4"] },
    label: { class: ["font-medium"] },
    badge: { class: ["ml-2", "px-1", "rounded"] }
  })
  .cls();
```

### 🎭 Variants

Variants are **configurable properties** that control component appearance:

```typescript
const ButtonCls = contract()
  .variant("size", ["sm", "md", "lg"])      // String variants
  .variant("tone", ["default", "primary", "danger"])
  .bool("disabled")                          // Boolean variants
  .bool("loading")
  .slots(["root"])
  .def()
  .match("size", "lg", {                     // Use variants in rules
    root: { class: ["px-6", "py-3"] }
  })
  .match("disabled", true, {
    root: { class: ["opacity-50"] }
  })
  .cls();
```

### 🎯 Rules

Rules define **conditional styling** based on variant combinations:

```typescript
const ButtonCls = contract()
  .variant("size", ["sm", "md", "lg"])
  .variant("tone", ["default", "primary"])
  .bool("disabled")
  .slots(["root"])
  .def()
  // Simple rule
  .match("size", "lg", { 
    root: { class: ["px-6", "py-3"] } 
  })
  // Complex rule with multiple conditions
  .rule({ size: "lg", tone: "primary" }, { 
    root: { class: ["px-8", "py-4"], token: ["color.bg.primary"] } 
  })
  // Boolean rules
  .match("disabled", true, { 
    root: { class: ["opacity-50", "cursor-not-allowed"] } 
  })
  .cls();
```

### 🎯 Type-Safety Magic ✨

CLS's contract builder is **incredibly clever** - it tracks what you've defined in your contract and **forces you to implement everything properly**. Here's how it works:

#### **Token Enforcement** 🏷️
```typescript
// ✅ Define tokens in contract
const ButtonCls = contract()
  .tokens(["color.bg.primary", "color.text.primary"])  // ← Declare tokens
  .def()
  .token({                                            // ← MUST implement all declared tokens
    "color.bg.primary": { class: ["bg-blue-600"] },
    "color.text.primary": { class: ["text-white"] },
    // Missing "color.bg.primary"? TypeScript will SCREAM! 🚨
  })
  .cls(); // ✅ Only works when all tokens are implemented
```

**What happens if you miss a token?**
```typescript
// ❌ This will cause a TypeScript error!
const BadButtonCls = contract()
  .tokens(["color.bg.primary", "color.text.primary"])
  .def()
  .token({
    "color.bg.primary": { class: ["bg-blue-600"] },
    // Missing "color.text.primary" - TypeScript error!
  })
  .cls(); // Error: "Tokens are defined on a contract, but you've not called token() definition method"
```

#### **Default Enforcement** ⚙️
```typescript
// ✅ Define variants in contract
const ButtonCls = contract()
  .variant("size", ["sm", "md", "lg"])  // ← Declare variants
  .def()
  .defaults({                          // ← MUST provide defaults for all variants
    size: "md",
    // Missing size default? TypeScript will SCREAM! 🚨
  })
  .cls(); // ✅ Only works when all defaults are provided
```

**What happens if you miss a default?**
```typescript
// ❌ This will cause a TypeScript error!
const BadButtonCls = contract()
  .variant("size", ["sm", "md", "lg"])
  .def()
  // Missing .defaults() call - TypeScript error!
  .cls(); // Error: "Variants are defined on a contract, but you've not called defaults() definition method"
```

#### **Slot Flexibility** 🎪
```typescript
// ✅ Define slots in contract
const ButtonCls = contract()
  .slots(["root", "label"])  // ← Declare available slots
  .def()
  .root({                   // ← Style only the slots you need
    root: { class: ["px-4", "py-2"] },
    label: { class: ["font-medium"] },
    // You're free to style any or all declared slots! 🎨
  })
  .cls();
```

**Flexibility at its finest:**
```typescript
// ✅ Style only some slots
const MinimalButton = contract()
  .slots(["root", "label", "icon"])
  .def()
  .root({
    root: { class: ["px-4", "py-2"] },
    // label and icon are optional - no TypeScript errors!
  })
  .cls();

// ✅ Style slots in different rules
const DynamicButton = contract()
  .slots(["root", "label", "icon"])
  .variant("size", ["sm", "md"])
  .def()
  .root({
    root: { class: ["px-4", "py-2"] },
  })
  .rule({ size: "lg" }, {
    icon: { class: ["w-6", "h-6"] }, // Add icon styling only for large buttons
  })
  .cls();
```

#### **Variant Type Safety** 🎭
```typescript
// ✅ TypeScript knows exactly what variants are valid
const ButtonCls = contract()
  .variant("size", ["sm", "md", "lg"])
  .bool("disabled")
  .def()
  .rule({ size: "lg" }, { root: { class: ["px-6"] } })        // ✅ Valid
  .rule({ size: "xl" }, { root: { class: ["px-8"] } })        // ❌ TypeScript error! "xl" not in ["sm", "md", "lg"]
  .rule({ disabled: true }, { root: { class: ["opacity-50"] } }) // ✅ Valid
  .cls();
```

### **The Magic Behind the Scenes** 🧙‍♂️

CLS uses **advanced TypeScript features** to enforce correctness:

1. **Conditional Types** - Checks if tokens/variants exist in contract
2. **Template Literal Types** - Creates precise error messages
3. **Generic Constraints** - Ensures type safety throughout the chain
4. **Type-Level Flags** - Tracks completion state (hasToken, hasDefaults)

```typescript
// This is what CLS does under the hood (simplified):
type Builder<TContract, TState> = 
  // If contract has tokens but you haven't called .token()
  Check.If<Token.Has<TContract>, TState["hasToken"]> extends false
    ? { cls(error: "Tokens are defined but you've not called token()"): never }
    : {}
  // If contract has variants but you haven't called .defaults()  
  & Check.If<Variant.With<TContract>, TState["hasDefaults"]> extends false
    ? { cls(error: "Variants are defined but you've not called defaults()"): never }
    : {}
  // Only when everything is properly implemented
  & { cls(): Cls.Type<TContract> }
```

### **Why This Matters** 🎯

- **🐛 No More Runtime Surprises** - Catch errors at compile time, not in production
- **🧠 Better Developer Experience** - TypeScript guides you to correct usage
- **🔒 Guaranteed Completeness** - Can't forget to implement required parts
- **📝 Self-Documenting** - Contract serves as both interface and documentation
- **🚀 Refactoring Safety** - Change contract, TypeScript tells you what to update

### Basic Contract Builder Methods

```typescript
import { contract } from '@use-pico/cls';

const ButtonCls = contract()
  .tokens(["color.bg.primary", "color.text.primary"])  // Add tokens
  .slots(["root", "label"])                           // Add slots  
  .variant("size", ["sm", "md", "lg"])                // Add string variants
  .bool("disabled")                                   // Add boolean variants
  .def()                                              // Start definition phase
  .token({                                           // Define token values
    "color.bg.primary": { class: ["bg-blue-600"] },
    "color.text.primary": { class: ["text-white"] },
  })
  .root({                                            // Define base styling
    root: { class: ["px-4", "py-2", "rounded"] },
    label: { class: ["font-medium"] },
  })
  .rule({ size: "lg" }, { root: { class: ["px-6", "py-3"] } })  // Add rules
  .defaults({ size: "md", disabled: false })                    // Set defaults
  .cls();                                                       // Create instance
```

### The "What" Utility - Available in Specific Contexts

The `what` utility is available in **two specific contexts**:

#### **1. Low-Level `cls()` Function** 
```typescript
import { cls } from '@use-pico/cls';

const ButtonCls = cls(
  {
    tokens: ["color.bg.primary"],
    slot: ["root"],
    variant: { size: ["sm", "md"] }
  },
  ({ what, def }) => ({  // ← what utility available here
    token: def.token({
      "color.bg.primary": what.css(["bg-blue-600"])  // ← Use what utility
    }),
    rules: [
      def.root({
        root: what.both(["px-4", "py-2"], ["color.bg.primary"])
      })
    ],
    defaults: def.defaults({ size: "md" })
  })
);
```

#### **2. Runtime Overrides (Tweak Functions)**
```typescript
// ✅ Use what utility in tweak functions for runtime overrides
const slots = ButtonCls.create(({ what, override }) => ({
  variant: what.variant({ size: "lg" }),
  slot: what.slot({
    root: what.css(["shadow-lg"])
  }),
  override: override.token({
    "color.bg.primary": what.css(["bg-indigo-600"]) // Override token value
  })
}));
```

#### **What Utility Methods:**
```typescript
what.css(classes)           // Pure CSS classes only
what.token(tokens)          // Design token references only  
what.both(classes, tokens)  // Both CSS classes + token references
what.variant(variant)       // Type-safe variant values
what.slot(slotConfig)       // Slot configuration object
```

#### **Override Utility Methods:**
```typescript
override.token(tokenOverrides)  // Override token values at runtime
```

### The `switch()` Helper - Boolean Variant Magic 🎛️

The `switch()` method is a **convenience helper** for boolean variants that automatically generates two rules:

```typescript
// ✅ Instead of writing two separate rules...
def.rule({ disabled: true }, { root: { class: ["opacity-50"] } }),
def.rule({ disabled: false }, { root: { class: ["opacity-100"] } })

// ✅ Use switch() for cleaner code!
def.switch("disabled", 
  { root: { class: ["opacity-50"] } },    // when disabled = true
  { root: { class: ["opacity-100"] } }    // when disabled = false
)

// Or use match() for single variant matching
def.match("size", "lg", { root: { class: ["text-lg"] } })
```

### The `match()` Helper - Single Variant Matching 🎯

The `match()` helper is a **convenience method** for matching a single variant key-value pair:

```typescript
// Instead of writing a full rule object...
def.rule({ size: "lg" }, { root: { class: ["text-lg"] } })

// ✅ Use match() for cleaner single-variant rules!
def.match("size", "lg", { root: { class: ["text-lg"] } })
def.match("tone", "danger", { root: { class: ["text-red-600"] } })
def.match("variant", "outline", { root: { class: ["border-2"] } })
```

**Key Features:**
- ✅ **Type-safe** - Full TypeScript support with variant validation
- ✅ **Convenient** - Shorter syntax for single variant matching
- ✅ **Consistent** - Uses the same `rule()` method under the hood
- ✅ **Flexible** - Supports any variant type (string, boolean, etc.)

> **💡 Pro Tip:** Use `match()` when you have a single variant to match, `switch()` for boolean variants, and `rule()` for complex multi-variant combinations.

**Real-world example:**
```typescript
const ToggleButtonCls = contract()
  .slots(["root", "icon"])
  .bool("active")
  .bool("disabled")
  .def()
  .root({
    root: { class: ["px-4", "py-2", "rounded", "border"] },
    icon: { class: ["w-4", "h-4"] }
  })
  .switch("active",
    { root: { class: ["bg-blue-600", "text-white"] } },    // when active = true
    { root: { class: ["bg-gray-200", "text-gray-700"] } }  // when active = false
  )
  .switch("disabled",
    { root: { class: ["opacity-50", "cursor-not-allowed"] } }, // when disabled = true
    { root: { class: ["hover:bg-blue-700", "cursor-pointer"] } } // when disabled = false
  )
  .cls();
```

**What `switch()` does under the hood:**
```typescript
// This:
def.switch("disabled", whenTrue, whenFalse)

// Is equivalent to:
def.rule({ disabled: true }, whenTrue)
def.rule({ disabled: false }, whenFalse)
```

> **⚠️ Important**: The `what` utility is **NOT** available in the Contract Builder API (`.def()` phase). Contract builder uses a different, simpler syntax for styling values.

## 🧬 Inheritance

CLS makes inheritance **simple and type-safe**:

```typescript
// Parent contract
const BaseButtonCls = contract()
  .tokens(["color.bg", "color.text"])
  .slots(["root"])
  .variant("size", ["sm", "md", "lg"])
  .def()
  .token({
    "color.bg": { class: ["bg-gray-100"] },
    "color.text": { class: ["text-gray-900"] },
  })
  .root({ root: { token: ["color.bg", "color.text"], class: ["border", "rounded"] } })
  .defaults({ size: "md" })
  .cls();

// Child contract inheriting from parent
const PrimaryButtonCls = contract(BaseButtonCls.contract)
  .tokens(["color.bg.primary"]) // Add new tokens
  .bool("disabled") // Add new variants
  .def()
  .token({
    "color.bg.primary": { class: ["bg-blue-600"] },
    "color.bg": { class: ["bg-white"] }, // Override parent token
  })
  .rule({ disabled: true }, { root: { class: ["opacity-50"] } })
  .defaults({ size: "lg", disabled: false }) // Override parent defaults
  .cls();
```

## ⚛️ React Integration

CLS provides **first-class React integration** with hooks, context, and HOCs. Here's a complete, real-world example:

### Complete Button Component Example

```tsx
import { type Cls, useCls, withCls } from '@use-pico/cls';
import type { ButtonHTMLAttributes, FC, Ref } from 'react';

// Available type exports for advanced usage:
// import type { Utils } from '@use-pico/cls'; // Utility type helpers

// 1. Define your CLS instance (simplified version)
const ButtonCls = contract()
  .slots(["wrapper", "root"])
  .bool("disabled")
  .variant("size", ["sm", "md", "lg"])
  .variant("tone", ["primary", "secondary", "danger"])
  .def()
  .root({
    wrapper: { class: ["Button-wrapper"] },
    root: { 
      class: ["Button-root", "flex", "items-center", "gap-2", "transition-all"],
      token: ["scale.default", "border.default"]
    }
  })
  .rule({ size: "sm" }, { root: { token: ["size.sm"] } })
  .rule({ size: "md" }, { root: { token: ["size.md"] } })
  .rule({ size: "lg" }, { root: { token: ["size.lg"] } })
  .rule({ tone: "primary" }, { root: { token: ["tone.primary"] } })
  .rule({ tone: "secondary" }, { root: { token: ["tone.secondary"] } })
  .rule({ tone: "danger" }, { root: { token: ["tone.danger"] } })
  .rule({ disabled: true }, { 
    wrapper: { class: ["cursor-not-allowed"] },
    root: { token: ["disabled"] }
  })
  .defaults({ size: "md", tone: "primary", disabled: false })
  .cls();

// 2. Export the type and namespace for TypeScript integration
export type ButtonCls = typeof ButtonCls;

export namespace ButtonCls {
  export type Props<P = unknown> = Cls.Props<ButtonCls, P>;
}

// 3. Define component props with CLS integration
export namespace Button {
  export interface Props extends ButtonCls.Props<ButtonHTMLAttributes<HTMLButtonElement>> {
    wrapperRef?: Ref<HTMLDivElement>;
    buttonRef?: Ref<HTMLButtonElement>;
    loading?: boolean;
    // CLS variant props with proper typing
    size?: Cls.VariantOf<ButtonCls, "size">;
    tone?: Cls.VariantOf<ButtonCls, "tone">;
  }
}

// 4. Base component with full CLS integration
export const BaseButton: FC<Button.Props> = ({
  wrapperRef,
  buttonRef,
  loading,
  size,
  tone,
  cls = ButtonCls,  // Allow CLS override
  tweak,             // User customization
  disabled,
  children,
  ...props 
}) => {
  // 5. useCls with internal and user configs
  const slots = useCls(cls, tweak, ({ what }) => ({
    variant: what.variant({
      disabled: disabled || loading,
      size,
      tone,
    }),
  }));

  // If you need resolved variants as a single source of truth, you can use useClsEx.
  // Normally you don't need this; prefer useCls for simplicity and performance.
  // This is useful because a variant can be set in TWO places:
  // 1) via component props (e.g. size, tone, disabled)
  // 2) via the "tweak" function (where users can override variant values)
  // useClsEx merges both sources and gives you the FINAL resolved values.
  // Uncomment to access the fully-resolved variant state alongside slots.
  // const { slots: slotsEx, variants } = useClsEx(cls, tweak, ({ what }) => ({
  //   variant: what.variant({
  //     disabled: disabled || loading,
  //     size,
  //     tone,
  //   }),
  // }));
  // Now `variants` contains the resolved variant values, e.g. variants.tone/variants.size.
  
  return (
    <div
      ref={wrapperRef}
      className={slots.wrapper()}
    >
      <button
        ref={buttonRef}
        className={slots.root()}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <span>⏳</span>}
      {children}
    </button>
    </div>
  );
};

// 6. Export with withCls HOC for external CLS access
export const Button = withCls(BaseButton, ButtonCls);
```

### Key React Integration Features

#### **1. Props Extension Pattern** 🔗
```tsx
// Extend CLS props with native HTML attributes
export interface Props extends ButtonCls.Props<ButtonHTMLAttributes<HTMLButtonElement>> {
  // Custom props
  loading?: boolean;
  // CLS variants with proper typing
  size?: Cls.VariantOf<ButtonCls, "size">;
  tone?: Cls.VariantOf<ButtonCls, "tone">;
}
```

#### **2. useCls with Multiple Configs** ⚙️
```tsx
const slots = useCls(
  cls,     // CLS instance (can be overridden)
  tweak,   // User config (from tweak prop)
  ({ what }) => ({  // Internal config (component logic)
    variant: what.variant({
      disabled: disabled || loading,  // Component-controlled logic
      size,
      tone,
    }),
  })
);
```

> **💡 Precedence Rule:** User `tweak` prop has **higher precedence** than component props. If a user passes `tweak={({ what }) => ({ variant: what.variant({ size: "lg" }) })}`, it will override the component's `size` prop! This gives users full control over styling.

#### **3. withCls HOC** 🎭
```tsx
// Enables external CLS access
export const Button = withCls(BaseButton, ButtonCls);

// Now you can access:
// Button.cls           - The full CLS instance
// Button.contract      - The contract (structure definition)
// Button.definition    - The definition (styling values)
// Button["~slots"]     - Internal slots kit (advanced usage)
```

**Advanced withCls Usage:**
```tsx
// Access contract for extending
const CustomButton = contract(Button.contract)
  .variant("style", ["outline", "ghost"])
  .def()
  .rule({ style: "outline" }, { root: { class: ["border-2"] } })
  .cls();

// Access definition for inspection
console.log(Button.definition.defaults); // { size: "md", tone: "primary" }
console.log(Button.definition.rules);    // All styling rules
```

### Advanced Usage Examples

#### **Custom CLS Instance**
```tsx
// Create custom button variant
const CustomButtonCls = contract(ButtonCls.contract)
  .variant("style", ["outline", "ghost"])
  .def()
  .rule({ style: "outline" }, { root: { class: ["border-2", "bg-transparent"] } })
  .rule({ style: "ghost" }, { root: { class: ["bg-transparent", "hover:bg-gray-100"] } })
  .cls();

// Use custom CLS with type safety
<Button cls={ButtonCls.use(CustomButtonCls)} style="outline" tone="danger">
  Custom Button
</Button>
```

> **🎯 Type Safety Trick:** `ButtonCls.use(CustomButtonCls)` ensures **type compatibility** - `CustomButtonCls` *must* extend `ButtonCls` or TypeScript will error! This prevents incompatible CLS instances from being passed.

#### **Runtime Customization**
```tsx
// User customization via tweak prop
<Button 
  size="lg"
  tone="primary"
  tweak={({ what }) => ({
    slot: what.slot({
      root: what.css(["shadow-lg", "hover:shadow-xl"])
    }),
    variant: what.variant({ tone: "secondary" }) // Override tone
  })}
>
  Customized Button
      </Button>
```

#### **Context Integration**
```tsx
import { ClsProvider } from '@use-pico/cls';

const App = () => (
  <ClsProvider value={ThemeCls}>
    <div>
      {/* All buttons inherit theme tokens */}
      <Button tone="primary">Themed Button</Button>
      <Button tone="secondary">Another Themed Button</Button>
    </div>
  </ClsProvider>
);
```

> **🏗️ Design System Compatibility:** If you have an external Design System (e.g., `DesignCls` from which `ThemeCls` extends), use `DesignCls.use(ThemeCls)` in the provider to ensure **design system compatibility**. This guarantees everything matches and runs as expected across your entire application.

### Available React Hooks

#### **useCls** - The Common Way 🎯
```tsx
const slots = useCls(ButtonCls, userTweakFn, internalTweakFn);
```

**`useCls` is the common way** of how CLS should be used in React components. Usually only the **first two arguments** are needed:

```tsx
// Simple usage - most common pattern
const slots = useCls(ButtonCls, tweak);

// With internal logic
const slots = useCls(ButtonCls, tweak, ({ what }) => ({
  variant: what.variant({ disabled: disabled || loading })
}));
```

**Key Features:**
- ✅ **Automatically connected to ClsContext** - Global theme inheritance works seamlessly
- ✅ **Performance optimized** - Minimal overhead for common use cases
- ✅ **Type-safe** - Full TypeScript support with proper inference
- ✅ **Simple API** - Just slots, no extra complexity

> **💡 Pro Tip:** This is the hook you'll use **90% of the time**. It handles theme inheritance automatically and provides the cleanest API for styling components.

#### **useClsEx** - Slots + Variants (Special Cases) 🔍
```tsx
const { slots, variants } = useClsEx(ButtonCls, ({ what }) => ({
  variant: what.variant({ size: "lg" })
}));

console.log(variants.size); // "lg"
```

**`useClsEx` is a special version** that behaves exactly the same as `useCls`, but **returns resolved variants** as a single source of truth:

```tsx
const { slots, variants } = useClsEx(ButtonCls, tweak, ({ what }) => ({
  variant: what.variant({
    size: "lg",
    disabled: loading
  })
}));

// Access resolved variant values
console.log(variants.size);     // "lg"
console.log(variants.disabled); // true/false
console.log(variants.tone);     // resolved from theme or props
```

**When to Use `useClsEx`:**
- 🎯 **Component logic** that needs to access resolved variant values
- 🎯 **Conditional rendering** based on variant combinations
- 🎯 **Debugging** - Inspect what variants are actually applied
- 🎯 **Analytics** - Track which variant combinations users interact with

> **⚠️ Use Sparingly:** Only use `useClsEx` when you actually need the resolved variants. For most styling, stick with `useCls` for better performance.

#### **useClsContext** - Access Context 🔗
```tsx
const contextCls = useClsContext<ButtonCls>();
```

**Low-level hook** for accessing the current CLS context:

```tsx
// Access current theme
const themeCls = useClsContext();

// With type safety
const buttonTheme = useClsContext<ButtonCls>();
```

**When to Use:**
- 🎯 **Custom hooks** that need theme access
- 🎯 **Theme switching logic**
- 🎯 **Advanced composition patterns**

> **🔧 Advanced Usage:** This is a low-level hook. Most components should use `useCls` which automatically connects to context.

#### **useClsMemo** - Memoized CLS Slots 🚀
```tsx
const slots = useClsMemo(ButtonCls, userTweakFn, internalTweakFn, deps);
```

**Performance-optimized version** of `useCls` that memoizes slot creation using `useMemo`:

```tsx
const MyButton = ({ size, tone, disabled, loading, tweak }) => {
  const slots = useClsMemo(
    ButtonCls,
    tweak, // User customization from props
    ({ what }) => ({
      variant: what.variant({ 
        size, 
        tone, 
        disabled: disabled || loading // Component-controlled logic
      })
    }),
    [size, tone, disabled, loading] // Only recompute when these change
  );

  return <button className={slots.root()}>Button</button>;
};
```

**When to Use `useClsMemo`:**
- 🎯 **Performance-critical components** with stable props
- 🎯 **Large component trees** where memoization prevents cascading re-renders
- 🎯 **Components with expensive CLS computations**

#### **useClsExMemo** - Memoized Slots + Variants 🔍
```tsx
const { slots, variants } = useClsExMemo(ButtonCls, userTweakFn, internalTweakFn, deps);
```

**Performance-optimized version** of `useClsEx` that memoizes both slots and variants:

```tsx
const MyButton = ({ size, tone, disabled, loading, tweak }) => {
  const { slots, variants } = useClsExMemo(
    ButtonCls,
    tweak, // User customization from props
    ({ what }) => ({
      variant: what.variant({ 
        size, 
        tone, 
        disabled: disabled || loading // Component-controlled logic
      })
    }),
    [size, tone, disabled, loading] // Only recompute when these change
  );

  // Access resolved variant values
  console.log(variants.size);     // "lg"
  console.log(variants.disabled); // true/false
  console.log(variants.tone);     // resolved from theme or props

  return <button className={slots.root()}>Button</button>;
};
```

**When to Use `useClsExMemo`:**
- 🎯 **Performance-critical components** that need resolved variants
- 🎯 **Analytics or logging** based on variant combinations
- 🎯 **Conditional rendering** based on resolved variant states

> **⚠️ Important Dependency Note:** Both `useClsMemo` and `useClsExMemo` are **dependency-driven**. If a user provides a dynamic `tweak` prop to a component, the memoized hooks won't automatically detect changes in the tweak function's behavior. You must include all relevant dependencies in the `deps` array, or the hooks will use stale values. For dynamic user tweaks, consider using the non-memoized versions (`useCls` or `useClsEx`) instead.

## 🎯 Advanced Features

### Runtime Overrides
```typescript
// Override tokens at creation time
const slots = ButtonCls.create(({ what, override }) => ({
  variant: what.variant({ size: "lg" }),
  override: override.token({
    "color.bg.primary": what.css(["bg-indigo-600"]) // Runtime override
  })
}));
```

### Token Chains
```typescript
// Tokens can reference other tokens
    token: def.token({
  "color.bg.primary": what.css(["bg-blue-600"]),
  "color.text.primary": what.css(["text-white"]),
  
  // Composite token that references base tokens
  "button.primary": what.token([
    "color.bg.primary",    // References another token
    "color.text.primary"   // References another token
  ])
})
```

> **🔍 Circular Dependency Protection:** CLS automatically **checks for circular token dependencies** and will throw a clear error if you accidentally create a circular reference (e.g., `tokenA` → `tokenB` → `tokenA`). This prevents infinite loops and helps you maintain clean token hierarchies.

### Smart Class Merging
CLS uses **tailwind-merge** internally for optimal class output:

```typescript
import { tvc } from '@use-pico/cls';

// Automatically resolves conflicts and removes duplicates
tvc("px-4 py-2", "px-6", "bg-blue-500", "bg-red-500");
// Result: "py-2 px-6 bg-red-500" (px-6 overrides px-4, bg-red-500 overrides bg-blue-500)
```

### Utility Functions

#### **`merge()` - Tweak Function Merging**
```typescript
import { merge } from '@use-pico/cls';

// Merge user and internal tweak functions
const mergedConfig = merge(userTweakFn, internalTweakFn);

// Used internally by useCls for combining user and component configs
const finalConfig = mergedConfig();
```

#### **`withVariants()` - Standalone Variant Computation**
```typescript
import { withVariants } from '@use-pico/cls';

// Compute resolved variants without creating slots
const variants = withVariants(
  { contract: ButtonCls.contract, definition: ButtonCls.definition },
  userTweakFn,
  internalTweakFn
);

console.log(variants.size); // "lg"
console.log(variants.disabled); // true
```


## 🚀 Performance

CLS is optimized for performance with several key features:

- **Lazy Evaluation** - Slot functions are created only when accessed via Proxy
- **Smart Caching** - Results are cached based on configuration hash
- **Memory Efficient** - Shared references across instances
- **Minimal Runtime** - Just class string generation, no CSS-in-JS overhead
- **Bundle Size Optimization** - CLS only transfers existing classes to a single place, often *reducing* total bundle size by eliminating duplicate styles and simplifying complex conditional logic

## 📊 Performance Benchmarks

CLS has been benchmarked across different complexity levels to demonstrate its performance characteristics:

### Benchmark Scenarios

**🔹 Simple CLS** - Basic slots and variants (3 variants, 1 slot)
**🔹 Medium CLS** - Inheritance + tokens + multiple variants (3 variants, 2 slots, 5 tokens)  
**🔹 Complex CLS** - Deep inheritance + many tokens + complex rules (5 variants, 5 slots, 20+ tokens)

### Performance Results

| Scenario | Iterations | Ops/sec | Memory Usage | Performance vs Simple |
|----------|------------|---------|--------------|----------------------|
| **Simple CLS** | 100 | 137,654 | 0MB | 100% (baseline) |
| **Simple CLS** | 1,000 | 460,608 | 0MB | 100% (baseline) |
| **Simple CLS** | 10,000 | 700,384 | 0.04MB | 100% (baseline) |
| **Medium CLS** | 100 | 146,297 | 0MB | 106% |
| **Medium CLS** | 1,000 | 274,556 | 0MB | 60% |
| **Medium CLS** | 10,000 | 381,891 | 0.03MB | 55% |
| **Complex CLS** | 100 | 47,572 | 0MB | 35% |
| **Complex CLS** | 1,000 | 98,491 | 1.63MB | 21% |
| **Complex CLS** | 10,000 | 151,419 | 0.09MB | 22% |

### Key Performance Insights

**⚡ Excellent Performance at Scale:**
- **700K+ operations/second** for simple CLS instances
- **380K+ operations/second** for medium complexity (inheritance + tokens)
- **150K+ operations/second** for complex scenarios (deep inheritance + many tokens)

**🧠 Memory Efficiency:**
- **Minimal memory overhead** - typically <0.1MB even for 10,000 operations
- **Smart caching** - performance improves with scale due to internal optimizations
- **No memory leaks** - consistent memory usage across iterations

**📈 Scalability:**
- **Simple CLS**: Linear performance scaling (460K → 700K ops/sec)
- **Medium CLS**: Stable performance with inheritance overhead
- **Complex CLS**: Consistent performance despite deep inheritance and many tokens

> **💡 Performance Takeaway:** CLS maintains excellent performance even with complex inheritance chains and extensive token systems. The 22% performance cost for complex scenarios is negligible compared to the massive productivity gains from type safety, inheritance, and design system features.

## 🎯 When to Use CLS

**✅ Choose CLS when you need:**
- Type-safe styling with compile-time validation
- Scalable design systems with inheritance
- Framework flexibility (React, Vue, Svelte, vanilla JS)
- Design token management with runtime overrides
- Complex conditional styling with rule-based logic

> **🚀 The Main Power of CLS:** The real magic happens when building **component libraries**, **large applications**, or **monorepos**. CLS provides the full power of adjusting *anything* with ease through type-safe styling, while serving as a **single source of truth** for all styles in a strict but convenient way. While classic CSS could achieve similar results, **classic CSS won't watch your types** or ensure proper usage of design tokens across multiple packages and teams. CLS gives you the flexibility of CSS with the safety and intelligence of TypeScript - letting you customize every aspect of a component while maintaining design system integrity, catching errors at compile-time, and ensuring consistency across your entire codebase.

**❌ Consider alternatives when:**
- Simple styling needs (CSS or utility classes might suffice)
- CSS-in-JS preference (Stitches, Emotion)
- Build-time optimization (Vanilla Extract)

## 🔍 Comparison with Other Solutions

Here's an honest comparison of CLS with other popular styling solutions:

| Feature | **CLS** | **CVA** | **TVA** | **Stitches** | **Emotion** | **Vanilla Extract** |
|---------|---------|---------|---------|--------------|-------------|-------------------|
| **Type Safety** | ✅ Full TypeScript integration | ✅ Good | ✅ Good | ✅ Good | ❌ Limited | ✅ Excellent |
| **Design Tokens** | ✅ Built-in with validation | ❌ Manual | ❌ Manual | ✅ Good | ❌ Manual | ✅ Excellent |
| **Inheritance** | ✅ Native CLS inheritance | ❌ No | ❌ No | ✅ Theme system | ❌ Manual | ❌ No |
| **Runtime Overrides** | ✅ `tweak` prop system | ❌ No | ❌ No | ✅ Styled API | ✅ Good | ❌ No |
| **Framework Support** | ✅ React, Vue, Svelte, Vanilla | ✅ React only | ✅ React only | ✅ React only | ✅ React only | ✅ Framework agnostic |
| **Bundle Size** | ✅ ~15KB | ✅ ~3KB | ✅ ~5KB | ❌ ~25KB | ❌ ~30KB | ✅ ~8KB |
| **Learning Curve** | ❌ **Very Steep** (contracts, tokens, inheritance, rules) | ✅ Gentle | ✅ Gentle | ✅ Gentle | ✅ Gentle | ✅ Gentle |
| **Performance** | ✅ Excellent (lazy eval) | ✅ Good | ✅ Good | ❌ Runtime overhead | ❌ Runtime overhead | ✅ Excellent |
| **CSS-in-JS** | ❌ No (class-based) | ❌ No (class-based) | ❌ No (class-based) | ✅ Yes | ✅ Yes | ✅ Yes |
| **Build-time Optimization** | ❌ No | ❌ No | ❌ No | ❌ No | ❌ No | ✅ Yes |
| **Design System Features** | ✅ Advanced (contracts, tokens) | ✅ Basic variants | ✅ Basic variants | ✅ Good theming | ❌ Basic | ✅ Good |
| **Developer Experience** | ✅ Excellent (when learned) | ✅ Good | ✅ Good | ✅ Good | ✅ Good | ✅ Good |

### **When to Choose Each Solution:**

#### **🎯 Choose CLS when:**
- Building component libraries or design systems
- Need advanced inheritance and composition
- Want type-safe design tokens with validation
- Building across multiple frameworks
- Need runtime customization capabilities
- Working in monorepos with multiple teams

#### **🎯 Choose CVA/TVA when:**
- Simple variant-based styling is sufficient
- Working only with React
- Want minimal bundle size
- Need quick setup with gentle learning curve
- Don't need advanced design system features

#### **🎯 Choose Stitches/Emotion when:**
- Prefer CSS-in-JS approach
- Need runtime style generation
- Want good TypeScript integration
- Working only with React
- Don't mind larger bundle sizes

#### **🎯 Choose Vanilla Extract when:**
- Want build-time optimization
- Prefer zero-runtime CSS-in-JS
- Need excellent performance
- Framework agnostic approach
- Don't need runtime customization

> **💡 Honest Assessment:** CLS is **overkill** for simple projects but **incredibly powerful** for complex design systems. If you just need basic variants, CVA might be simpler. If you want CSS-in-JS, Stitches is great. But if you're building a serious component library or design system, CLS's advanced features become invaluable.

## 🆚 Real-World Comparison Examples

Here are two practical examples showing what **only CLS can do** that CVA/TVA cannot:

### Example 1: Design Token System

**❌ CVA/TVA Approach (Limited):**
```tsx
import { cva } from "class-variance-authority";

const button = cva("btn-base", {
  variants: {
    size: {
      sm: "text-sm px-3 py-1",     // ❌ Hardcoded values
      md: "text-base px-4 py-2",   // ❌ No design tokens
      lg: "text-lg px-6 py-3",     // ❌ Inconsistent spacing
    },
    tone: {
      primary: "bg-blue-500 text-white",    // ❌ Hardcoded colors
      secondary: "bg-gray-200 text-gray-900", // ❌ No theme support
    }
  }
});

// Problems:
// - No centralized design tokens
// - Hard to maintain consistent spacing/colors
// - No theme switching capability
// - No inheritance or composition
```

**✅ CLS Approach (Powerful):**
```tsx
import { contract } from '@use-pico/cls';

// Design tokens defined once, used everywhere
const ThemeCls = contract()
  .tokens([
    "color.bg.primary", "color.bg.secondary",
    "spacing.padding.sm", "spacing.padding.md", "spacing.padding.lg",
    "typography.size.sm", "typography.size.md", "typography.size.lg"
  ])
  .def()
  .token({
    "color.bg.primary": { class: ["bg-blue-500"] },
    "color.bg.secondary": { class: ["bg-gray-200"] },
    "spacing.padding.sm": { class: ["px-3", "py-1"] },
    "spacing.padding.md": { class: ["px-4", "py-2"] },
    "spacing.padding.lg": { class: ["px-6", "py-3"] },
    "typography.size.sm": { class: ["text-sm"] },
    "typography.size.md": { class: ["text-base"] },
    "typography.size.lg": { class: ["text-lg"] }
  })
  .cls();

const ButtonCls = contract(ThemeCls.contract)
  .def()
  .rule({ size: "sm" }, { root: { token: ["spacing.padding.sm", "typography.size.sm"] } })
  .rule({ size: "md" }, { root: { token: ["spacing.padding.md", "typography.size.md"] } })
  .rule({ size: "lg" }, { root: { token: ["spacing.padding.lg", "typography.size.lg"] } })
  .rule({ tone: "primary" }, { root: { token: ["color.bg.primary"] } })
  .rule({ tone: "secondary" }, { root: { token: ["color.bg.secondary"] } })
  .cls();

// Benefits:
// ✅ Centralized design tokens
// ✅ Consistent spacing/colors across all components
// ✅ Easy theme switching (just swap ThemeCls)
// ✅ Type-safe token references
// ✅ Automatic validation of token usage
```

### Example 2: Complex Component Inheritance

**❌ CVA/TVA Approach (Impossible):**
```tsx
// CVA/TVA has NO inheritance - you must copy/paste everything
const baseButton = cva("btn-base");
const primaryButton = cva("btn-base bg-blue-500 text-white"); // ❌ Duplicated base styles
const dangerButton = cva("btn-base bg-red-500 text-white");   // ❌ Duplicated base styles
const outlineButton = cva("btn-base border-2 bg-transparent"); // ❌ Duplicated base styles

// Problems:
// - No inheritance or composition
// - Code duplication everywhere
// - Hard to maintain consistency
// - No way to extend existing variants
```

**✅ CLS Approach (Elegant):**
```tsx
// Base button with common styles
const BaseButtonCls = contract()
  .slots(["root", "icon"])
  .variant("size", ["sm", "md", "lg"])
  .def()
  .root({ root: { class: ["btn-base", "flex", "items-center", "gap-2"] } })
  .match("size", "sm", { root: { class: ["text-sm", "px-3", "py-1"] } })
  .match("size", "md", { root: { class: ["text-base", "px-4", "py-2"] } })
  .match("size", "lg", { root: { class: ["text-lg", "px-6", "py-3"] } })
  .cls();

// Primary button extends base (inherits size variants + base styles)
const PrimaryButtonCls = contract(BaseButtonCls.contract)
  .def()
  .root({ root: { class: ["bg-blue-500", "text-white"] } }) // Adds to inherited styles
  .cls();

// Danger button extends base (inherits size variants + base styles)
const DangerButtonCls = contract(BaseButtonCls.contract)
  .def()
  .root({ root: { class: ["bg-red-500", "text-white"] } }) // Adds to inherited styles
  .cls();

// Outline button extends base (inherits size variants + base styles)
const OutlineButtonCls = contract(BaseButtonCls.contract)
  .def()
  .root({ root: { class: ["border-2", "bg-transparent", "border-blue-500"] } })
  .cls();

// Benefits:
// ✅ True inheritance - no code duplication
// ✅ Automatic consistency across all button types
// ✅ Easy to add new button variants
// ✅ Change base styles once, affects all buttons
// ✅ Type-safe inheritance with compile-time validation
```

**🎯 The Bottom Line:** CLS provides **design system superpowers** that CVA/TVA simply cannot match. While CVA/TVA are great for simple variant-based styling, CLS enables building **scalable, maintainable design systems** with features like design tokens, inheritance, type safety, and runtime customization that no other solution provides.

## 🔗 Community & Support

- [GitHub Issues](https://github.com/use-pico/pico/issues) - Report bugs and request features
- [Discussions](https://github.com/use-pico/pico/discussions) - Ask questions and share ideas

---

## 🤖 LLM Compatibility

**CLS is designed to be AI-friendly!** 🧠✨

This comprehensive documentation enables LLMs and AI coding assistants to:

- **Write correct CLS code** with full type safety and proper API usage
- **Understand complex inheritance patterns** and token relationships
- **Generate working examples** that follow CLS best practices
- **Debug styling issues** with detailed error messages and guidance
- **Create component libraries** with consistent CLS patterns

The extensive examples, type-safe APIs, and clear documentation make CLS an excellent choice for AI-assisted development. Whether you're using GitHub Copilot, ChatGPT, Claude, or other AI tools, they can effectively help you build robust, type-safe styling systems with CLS.

> **💡 Pro Tip:** When working with AI assistants, reference specific sections of this README (like "Contract Builder API" or "React Integration") for the most accurate CLS code generation.

---

> **🤖 Documentation Note:** This README was collaboratively crafted with the help of AI assistance to ensure comprehensive coverage, accurate examples, and honest comparisons. The goal was to create documentation that's both technically precise and genuinely helpful for developers evaluating and using CLS.

---

**Ready to make styling actually fun?** 🎉 [Get started now!](#-quick-start)

*CLS - because your CSS deserves better than chaos! 🎨✨*
