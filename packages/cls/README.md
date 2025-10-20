# CLS - Type-Safe Styling System 🚀

> **The styling system that finally makes sense** - because we're tired of CSS chaos! 🎨✨

[![npm version](https://badge.fury.io/js/@use-pico%2Fcls.svg)](https://badge.fury.io/js/@use-pico%2Fcls)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📚 Table of Contents

- [🎯 What is CLS?](#-what-is-cls)
- [🛠 Installation](#-installation)
- [🚀 Quick Start](#-quick-start)
- [✨ Core Features](#-core-features)
- [🏆 Quality & Reliability](#-quality--reliability)
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

// Step 2: Use it! (variadic tweak parameters, undefined values cleaned up)
const slots = ButtonCls.create({
  variant: { size: "lg" }
});
console.log(slots.root()); // "bg-blue-600 text-white px-4 py-2 rounded font-medium px-6 py-3"

// Individual slots also support tweaks!
const customSlots = ButtonCls.create();
console.log(customSlots.root({ variant: { size: "sm" } })); // "bg-blue-600 text-white px-3 py-1 text-sm"
```

### With React (because who doesn't love React? 💙)

```tsx
import { useCls } from '@use-pico/cls';

function MyButton({ size = "md", disabled = false, tweak }) {
  const { slots, variant } = useCls(ButtonCls, 
    { variant: { size, disabled } },  // Component props (lower precedence)
    tweak                             // User tweak (highest precedence)
  );

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
- **🎯 Granular Control** - Individual slots support tweaks for fine-grained customization
- **🛠 Developer Experience** - Excellent IDE support and intuitive API
- **🛡️ Battle-Tested** - Over 300 comprehensive tests ensuring rock-solid behavior and preventing regressions

## 🏆 Quality & Reliability

CLS isn't just another styling library - it's a **heavily polished, battle-tested solution** that's ready for production use.

### ✨ Heavily Polished & Production-Ready

CLS has been refined through *countless iterations* to achieve **maximum convenience** and developer experience. Every piece has been *carefully crafted* and polished to perfection. While the project powers several **larger applications**, its primary development is driven by *side projects* – ensuring the library maintains the **highest quality standards*.

**Production-ready stability** is guaranteed with **zero breaking changes** going forward. When we added the powerful Contract Builder API, it was built *on top of* the main `cls()` function without affecting the overall API - ensuring existing code continues to work perfectly while new features enhance the experience. **Your investment in CLS is safe** - we're committed to maintaining backward compatibility and stable APIs.

### 🧪 Extensively Tested

CLS is *thoroughly tested* with comprehensive test suites covering all features, edge cases, and integration scenarios. The test coverage deeply encompasses all **three main APIs** of CLS: the **Contract Builder API** (fluent contract and definition building), the **low-level `cls()` function** (direct contract and definition usage), and the **React integration** (hooks, context, and component patterns). **Every bug that has been found gets a new test** to ensure it never happens again - creating a robust safety net that grows stronger with each discovery. This rigorous testing approach means you can trust CLS to work reliably in production environments.

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
// Create styled slots and variants (variadic tweak parameters)
const { slots, variant } = ButtonCls.create({
  variant: {
    size: "lg",
    tone: "primary",
    disabled: false
  }
});

// Use in your component
<button className={slots.root()}>
  <Icon className={slots.icon()} />
  <span className={slots.label()}>Click me!</span>
</button>

// Access resolved variants for component logic
console.log(variant.size);     // "lg"
console.log(variant.tone);     // "primary"
console.log(variant.disabled); // false
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
| `.tokens.rule()` | Token conditional rules | `.tokens.rule({ tone: "primary" }, { "color.bg": { class: ["bg-blue-600"] } })` |
| `.tokens.match()` | Single variant token matching | `.tokens.match("tone", "primary", { "color.bg": { class: ["bg-blue-600"] } })` |
| `.tokens.switch()` | Boolean variant token helper | `.tokens.switch("disabled", { "color.bg": { class: ["bg-gray-300"] } }, { "color.bg": { class: ["bg-blue-600"] } })` |
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

### 🎯 Token Rules

Tokens support **conditional rules** just like slots! Use `.tokens.rule()` to apply different token values based on variants:

```typescript
const ButtonCls = contract()
  .tokens(["color.bg", "color.text"])
  .slots(["root"])
  .variant("tone", ["default", "primary", "danger"])
  .bool("disabled")
  .def()
  .token({ // Base token values
    "color.bg": { class: ["bg-gray-100"] },
    "color.text": { class: ["text-gray-900"] }
  })
  .tokens.rule({ tone: "primary" }, { // Primary tone tokens
    "color.bg": { class: ["bg-blue-600"] },
    "color.text": { class: ["text-white"] }
  })
  .tokens.rule({ tone: "danger" }, { // Danger tone tokens
    "color.bg": { class: ["bg-red-600"] },
    "color.text": { class: ["text-white"] }
  })
  .tokens.rule({ disabled: true }, { // Disabled state tokens
    "color.bg": { class: ["bg-gray-300"] },
    "color.text": { class: ["text-gray-500"] }
  })
  .root({
    root: { token: ["color.bg", "color.text"] }
  })
  .cls();
```

**🎨 Token Rule Helpers:**

```typescript
// Match specific variant combinations
.tokens.match("tone", "primary", {
  "color.bg": { class: ["bg-blue-600"] }
})

// Boolean variant switch (generates two rules)
.tokens.switch("disabled", 
  { "color.bg": { class: ["bg-gray-300"] } }, // when disabled: true
  { "color.bg": { class: ["bg-blue-600"] } }   // when disabled: false
)

// Override previous token rules
.tokens.rule({ tone: "primary" }, {
  "color.bg": { class: ["bg-purple-600"] }
}, true) // override: true
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

### Low-Level API - Advanced Usage

> **⚠️ Advanced Usage Warning:** The low-level `cls()` function is available but **quite complicated** and should generally be avoided in favor of the Contract Builder API. It's included here for completeness, but most developers should stick with the `contract()` approach.

#### **1. Low-Level `cls()` Function** 
```typescript
import { cls } from '@use-pico/cls';

// Call cls() with everything embedded for maximum type safety
const ButtonCls = cls(
  // Contract (structure) - embedded inline
  {
    tokens: ["color.bg.primary"],
    slot: ["root"],
    variant: { size: ["sm", "md"] }
  },
  // Definition (styling) - embedded inline
  {
    token: {
      "color.bg.primary": { class: ["bg-blue-600"] }
    },
    rules: [
      {
        match: {}, // No conditions (root rule)
        slot: {
          root: { 
            class: ["px-4", "py-2"], 
            token: ["color.bg.primary"] 
          }
        }
      }
    ],
    defaults: { size: "md" }
  }
);
```

#### **2. Runtime Overrides (Single Tweak)**
```typescript
// ✅ Runtime overrides using single tweak object (undefined values are cleaned up)
const { slots, variant } = ButtonCls.create({
  variant: { size: "lg" },
  slot: {
    root: { class: ["shadow-lg"] }
  },
  token: {
    "color.bg.primary": { class: ["bg-indigo-600"] } // Override token value
  }
});
```


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
import { type Cls, useCls } from '@use-pico/cls';
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

// 4. Button component with full CLS integration
export const Button: FC<Button.Props> = ({
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
  const { slots, variant } = useCls(cls, 
    {       // Internal config (lower precedence)
      variant: {
        disabled: disabled || loading,
        size,
        tone,
      },
    },
    tweak   // User tweak (highest precedence)
  );

  // `variant` contains the resolved variant values from both component props and user tweaks
  // This gives you access to the final resolved state for component logic if needed
  // console.log(variant.size);     // "lg" (from props or tweak override)
  // console.log(variant.disabled); // true/false (component logic or tweak override)
  // console.log(variant.tone);     // "primary" (from props or tweak override)
  
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

#### **2. Nested Array Support in Tweak Prop** 🎯
The `tweak` prop in `Cls.Props` supports **nested arrays** for complex tweak combinations:

```tsx
// Single tweak object
tweak?: { variant: { size: "lg" }, slot: { root: { class: ["custom"] } } }

// Array of tweaks (last takes precedence)
tweak?: [
  { variant: { size: "sm" } },
  { slot: { root: { class: ["override"] } } }
]

// Nested arrays with undefined values (automatically filtered)
tweak?: [
  { variant: { size: "md" } },
  [
    undefined,
    { slot: { root: { class: ["nested"] } } },
    undefined
  ],
  { variant: { tone: "primary" } }
]

// Deep nesting (up to 10 levels supported)
tweak?: [
  { variant: { size: "lg" } },
  [
    [
      { slot: { root: { class: ["deep-nested"] } } }
    ]
  ]
]
```

**Key Features:**
- **🔄 Automatic Flattening**: Nested arrays are automatically flattened up to 10 levels deep
- **🧹 Undefined Filtering**: `undefined` values are automatically removed
- **📈 Precedence Order**: Later tweaks override earlier ones (left to right)
- **🎯 Type Safety**: Full TypeScript support for all nested structures

**Practical Example - Complex Tweak Composition:**
```tsx
const MyButton = ({ size, tone, disabled, loading, userTweak }) => {
  const { slots, variant } = useCls(ButtonCls, {
    // Complex nested tweak structure
    tweak: [
      // Base component logic
      { variant: { size, tone, disabled: disabled || loading } },
      
      // Conditional styling based on state
      loading ? { slot: { root: { class: ["loading"] } } } : undefined,
      
      // Nested array for complex overrides
      [
        { slot: { root: { class: ["base-override"] } } },
        disabled ? { slot: { root: { class: ["disabled-override"] } } } : undefined,
      ],
      
      // User customization (highest precedence)
      userTweak
    ]
  });

  return <button className={slots.root()}>Button</button>;
};
```

#### **3. useCls with Multiple Tweaks** ⚙️
```tsx
const { slots, variant } = useCls(
  cls,     // CLS instance (can be overridden)
  {        // Internal config (component logic) - LOWEST PRECEDENCE
    variant: {
      disabled: disabled || loading,  // Component-controlled logic
    },
  },
  {        // Props config (from component props) - MEDIUM PRECEDENCE
    variant: { size, tone }
  },
  tweak    // User config (from tweak prop) - HIGHEST PRECEDENCE
);
```

> **💡 Precedence Rule:** Tweaks are processed in order, with **last tweak taking precedence** over earlier ones. All tweaks are cleaned up (undefined values removed), so you can safely pass partial objects without affecting the final result.


### Advanced Usage Examples

#### **Tweak Precedence Pattern** 🎯
```tsx
// Complete example showing tweak precedence: user > props > component
interface ButtonProps {
  size?: Cls.VariantOf<ButtonCls, "size">;
  tone?: Cls.VariantOf<ButtonCls, "tone">;
  disabled?: boolean;
  loading?: boolean;
  tweak?: Cls.Props<ButtonCls>["tweak"]; // User customization
}

const Button: FC<ButtonProps> = ({ 
  size, 
  tone, 
  disabled, 
  loading, 
  tweak, // User tweak - HIGHEST PRECEDENCE
  children 
}) => {
  const { slots, variant } = useCls(ButtonCls, 
    {                         // 1. Component logic (lowest precedence)
      variant: {
        disabled: disabled || loading
      }
    },
    {                         // 2. Props from component (medium precedence)
      variant: { size, tone }
    },
    tweak                     // 3. User tweak (highest precedence)
  );

  return (
    <button className={slots.root()}>
      {variant.loading ? "Loading..." : children}
    </button>
  );
};

// Usage examples:
<Button 
  size="md" 
  tone="primary" 
  tweak={{ variant: { size: "lg" } }} // User overrides size to "lg"
>
  Button Text
</Button>

// Result: size="lg" (user tweak wins), tone="primary" (from props)
```

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
  tweak={{
    slot: what.slot({
      root: { class: ["shadow-lg", "hover:shadow-xl"] }
    }),
    variant: { tone: "secondary" } // Override tone
  })}
>
  Customized Button
</Button>
```

#### **Tweak Utility for Advanced Merging**
```tsx

// Manual tweak merging for advanced scenarios
const MyButton = ({ userTweak, size, tone, disabled }) => {
  const finalTweak = ButtonCls.tweak(
    { variant: { disabled } },    // Component logic (lowest precedence)
    { variant: { size, tone } },  // Props (medium precedence)
    userTweak                     // User customization (highest precedence)
  );

  const { slots, variant } = ButtonCls.create(finalTweak);
  
  return <button className={slots.root()}>Button</button>;
};

// Alternative: Direct usage (simplest)
const SimpleButton = ({ userTweak }) => {
  const { slots, variant } = ButtonCls.create(userTweak);
  
  return <button className={slots.root()}>Button</button>;
};
```

#### **Context Integration**
```tsx
import { TokenContext, VariantProvider } from '@use-pico/cls';

const App = () => (
  <TokenContext value={ThemeCls}>
    <div>
      {/* All buttons inherit theme tokens */}
      <Button tone="primary">Themed Button</Button>
      <Button tone="secondary">Another Themed Button</Button>
      
      {/* Scope variant overrides to a subtree with automatic type inference */}
      <VariantProvider cls={ButtonCls} variant={{ size: "lg" }}>
        <div>
          {/* All buttons in this subtree will be large */}
          <Button tone="primary">Large Themed Button</Button>
          <Button tone="secondary">Another Large Themed Button</Button>

          {/* Nested VariantProvider with inheritance - merges parent variants */}
          <VariantProvider cls={ButtonCls} variant={{ tone: "danger" }} inherit>
            <div>
              {/* These buttons will be large AND danger (inherited size + new tone) */}
              <Button>Large Danger Button</Button>
              <Button>Another Large Danger Button</Button>
            </div>
          </VariantProvider>
        </div>
      </VariantProvider>
    </div>
  </TokenContext>
);
```

> **🏗️ Design System Compatibility:** If you have an external Design System (e.g., `DesignCls` from which `ThemeCls` extends), use `DesignCls.use(ThemeCls)` in the provider to ensure **design system compatibility**. This guarantees everything matches and runs as expected across your entire application.

### Available React Hooks

#### **useCls** - The Main Hook 🎯
```tsx
const { slots, variant } = useCls(ButtonCls, ...tweaks);
```

**`useCls` is the main hook** for CLS in React components. It returns both **slots** and **variants** for maximum flexibility:

```tsx
// Simple usage - single tweak (automatically subscribes to TokenContext and VariantContext)
const { slots, variant } = useCls(ButtonCls, tweak);

// Multiple tweaks with precedence (last takes precedence)
const { slots, variant } = useCls(ButtonCls, 
  internalTweak,  // Lowest precedence
  propsTweak,     // Medium precedence
  userTweak       // Highest precedence
);

// Use slots for styling
<button className={slots.root()}>Button</button>

// Individual slots also support tweaks!
<button className={slots.root(
  { variant: { size: "lg" } },  // Override size for this specific slot
  { slot: { root: { class: ["shadow-lg"] } } }  // Add custom classes
)}>Button</button>

// Use variants for component logic
console.log(variant.size);     // "lg"
console.log(variant.disabled); // true/false
console.log(variant.tone);     // resolved from theme or props
```

**Key Features:**
- ✅ **Automatically connected to TokenContext** - Global theme inheritance works seamlessly
- ✅ **Automatically connected to VariantContext** - Scoped variant overrides work automatically
- ✅ **Performance optimized** - Minimal overhead for common use cases
- ✅ **Type-safe** - Full TypeScript support with proper inference
- ✅ **Complete API** - Both slots and variants in one hook
- ✅ **Single source of truth** - Access resolved variant values when needed

**When to Use Variants:**
- 🎯 **Component logic** that needs to access resolved variant values
- 🎯 **Conditional rendering** based on variant combinations
- 🎯 **Debugging** - Inspect what variants are actually applied
- 🎯 **Analytics** - Track which variant combinations users interact with

> **💡 Pro Tip:** This is the hook you'll use **100% of the time**. It provides everything you need - slots for styling and variants for component logic - all in one convenient, type-safe package!

#### **useTokenContext** - Access Token Context 🔗
```tsx
const context = useTokenContext<ButtonCls>();
```

**Low-level hook** for accessing the current CLS context:

```tsx
// Access current theme
const themeCls = useTokenContext();

// With type safety
const buttonTheme = useTokenContext<ButtonCls>();
```

**When to Use:**
- 🎯 **Custom hooks** that need theme access
- 🎯 **Theme switching logic**
- 🎯 **Advanced composition patterns**

> **🔧 Advanced Usage:** This is a low-level hook. Most components should use `useCls` which automatically connects to context.

#### **useVariantContext** - Access Variant Context 🎛️
```tsx
const variantContext = useVariantContext();
```

**Hook** for accessing the current VariantContext values:

```tsx
// Access current variant context
const variants = useVariantContext();
```

**When to Use:**
- 🎯 **Custom hooks** that need variant access
- 🎯 **Conditional logic** based on variant values
- 🎯 **Advanced composition patterns**

> **🔧 Advanced Usage:** This is a low-level hook. Most components should use `useCls` which automatically integrates with VariantContext.

#### **VariantProvider** - Scoped Variant Context 🎛️

**React component** for providing type-safe variant overrides to a subtree:

```tsx
<VariantProvider cls={ButtonCls} variant={{ size: "lg" }} inherit>
  <YourComponents />
</VariantProvider>
```

**Props:**
- **`cls`** - CLS instance (used for type inference)
- **`variant`** - Variant object with overrides (not whole tweak)
- **`inherit`** - Whether to merge with parent VariantContext (default: `false`)

**Inheritance Behavior:**
- **`inherit={false}`** (default) - Replaces parent variants completely
- **`inherit={true}`** - Merges with parent variants, lower VariantProvider takes precedence

```tsx
// Parent provides size: "lg"
<VariantProvider cls={ButtonCls} variant={{ size: "lg" }}>
  
  {/* Child replaces parent completely */}
  <VariantProvider cls={ButtonCls} variant={{ tone: "danger" }}>
    {/* Result: { tone: "danger" } - size is lost */}
  </VariantProvider>
  
  {/* Child inherits and merges with parent */}
  <VariantProvider cls={ButtonCls} variant={{ tone: "danger" }} inherit>
    {/* Result: { size: "lg", tone: "danger" } - both preserved */}
  </VariantProvider>
  
  {/* Reset all variants from parent - provide empty variants and disable inheritance */}
  <VariantProvider cls={ButtonCls} variant={{}}>
    {/* Result: {} - no variants from parent or child */}
  </VariantProvider>
</VariantProvider>
```

**When to Use:**
- 🎯 **Scoped variant overrides** for specific UI sections
- 🎯 **Nested theming** with inheritance
- 🎯 **Conditional styling** based on variant context
- 🎯 **Resetting variants** - Use `variant={{}}` to clear all parent variants

**Common Patterns:**
```tsx
// Override specific variants
<VariantProvider cls={ButtonCls} variant={{ size: "lg" }}>
  <Button>Large Button</Button>
</VariantProvider>

// Inherit and extend parent variants
<VariantProvider cls={ButtonCls} variant={{ tone: "danger" }} inherit>
  <Button>Danger Button with inherited size</Button>
</VariantProvider>

// Reset all variants (clear parent context)
<VariantProvider cls={ButtonCls} variant={{}}>
  <Button>Button with default variants only</Button>
</VariantProvider>
```

#### **wrap** - Type-Safe VariantProvider Factory 🏭

**Utility function** for creating type-safe `VariantProvider` components:

```tsx
import { wrap } from '@use-pico/cls';

// Create a type-safe VariantProvider factory for a specific CLS
const ButtonWrapper = wrap(ButtonCls);

// Use it without needing to pass cls prop
<ButtonWrapper.VariantProvider variant={{ size: "lg" }}>
  <YourComponents />
</ButtonWrapper.VariantProvider>
```

**Benefits:**
- 🎯 **Type safety** - VariantProvider is pre-configured with the correct CLS type
- 🎯 **Cleaner syntax** - No need to pass `cls` prop every time
- 🎯 **Reusable** - Create once, use everywhere with the same CLS

**When to Use:**
- 🎯 **Component libraries** - Pre-configure VariantProviders for your components
- 🎯 **Design systems** - Create typed providers for consistent usage
- 🎯 **Large applications** - Reduce boilerplate when using the same CLS repeatedly

#### **useClsMemo** - Memoized CLS Hook 🚀
```tsx
const { slots, variant } = useClsMemo(ButtonCls, tweaks, deps);
```

**Performance-optimized version** of `useCls` that memoizes both slots and variants using `useMemo`:

```tsx
// Simple usage - single tweak with memoization
const { slots, variant } = useClsMemo(ButtonCls, tweak, [tweak]);

// Array of tweaks with memoization
const MyButton = ({ size, tone, disabled, loading, tweak }) => {
  const { slots, variant } = useClsMemo(
    ButtonCls,
    [        // Array of tweaks (last takes precedence)
      {        // Component logic - LOWEST PRECEDENCE
        variant: { 
          disabled: disabled || loading // Component-controlled logic
        }
      },
      {        // Props from component - MEDIUM PRECEDENCE
        variant: { size, tone }
      },
      tweak   // User customization from props - HIGHEST PRECEDENCE
    ],
    [size, tone, disabled, loading, tweak] // Only recompute when these change
  );

  // Use slots for styling
  // Use variants for component logic
  console.log(variant.size);     // "lg"
  console.log(variant.disabled); // true/false
  console.log(variant.tone);     // resolved from theme or props

  return <button className={slots.root()}>Button</button>;
};
```

**When to Use `useClsMemo`:**
- 🎯 **Performance-critical components** with stable props
- 🎯 **Large component trees** where memoization prevents cascading re-renders
- 🎯 **Components with expensive CLS computations**
- 🎯 **Analytics or logging** based on variant combinations
- 🎯 **Conditional rendering** based on resolved variant states

> **⚠️ Important Dependency Note:** `useClsMemo` is **dependency-driven**. If a user provides a dynamic `tweak` prop to a component, the memoized hook won't automatically detect changes in the tweak function's behavior. You must include all relevant dependencies in the `deps` array, or the hook will use stale values. For dynamic user tweaks, consider using the non-memoized version (`useCls`) instead.

**Practical Example - Performance Optimization:**
```tsx
// Performance-critical button with memoization
const OptimizedButton = ({ size, tone, disabled, loading, tweak }) => {
  const { slots, variant } = useClsMemo(
    ButtonCls,
    [
      {       // Internal config (lower precedence)
        variant: { 
          size, 
          tone,
          disabled: disabled || loading 
        }
      },
      tweak  // User tweak (highest precedence)
    ],
    [size, tone, disabled, loading, tweak] // All dependencies included
  );
  
  return (
    <button className={slots.root()}>
      {variant.loading ? "Loading..." : "Click me"}
    </button>
  );
};
```

## 🎯 Advanced Features

### Runtime Overrides
```typescript
// Override tokens at creation time (variadic tweak parameters)
const { slots, variant } = ButtonCls.create({
  variant: { size: "lg" },
  token: {
    // Runtime override of token values
    "color.bg.primary": { class: ["bg-indigo-600"] }
  }
});

// Multiple tweaks with precedence
const { slots, variant } = ButtonCls.create(
  internalTweak,  // Lowest precedence
  propsTweak,     // Medium precedence
  userTweak       // Highest precedence
);
```

### Individual Slot Tweaks
```typescript
// Individual slots support variadic tweaks too!
const { slots, variant } = ButtonCls.create();

// Basic slot usage
<button className={slots.root()}>Button</button>

// Slot with variant override
<button className={slots.root({ variant: { size: "lg" } })}>Large Button</button>

// Slot with multiple tweaks
<button className={slots.root(
  { variant: { size: "lg" } },           // Override size
  { slot: { root: { class: ["shadow-lg"] } } }  // Add custom classes
)}>Custom Button</button>

// Slot with token override
<button className={slots.root({
  token: { "color.bg.primary": { class: ["bg-purple-600"] } }
})}>Purple Button</button>
```

### Override and Clear Flags
```typescript
// Use the override flag to explicitly override previous tweaks
const { slots, variant } = ButtonCls.create(
  { variant: { size: "md" } },           // This will be overridden
  { 
    override: true,                      // Override flag
    variant: { size: "lg" }              // This will override the previous size
  }
);

// Use the clear flag to completely reset and start fresh
const { slots, variant } = ButtonCls.create(
  { variant: { size: "md" } },           // This will be completely ignored
  { slot: { root: { class: ["px-4"] } } }, // This will be completely ignored
  { 
    clear: true,                         // Clear flag - kills all previous tweaks
    variant: { size: "lg" }              // Only this will be applied
  }
);

// Override flag works with slots too
<button className={slots.root(
  { slot: { root: { class: ["px-4"] } } },  // This will be overridden
  { 
    override: true,                         // Override flag
    slot: { root: { class: ["px-8"] } }     // This will override the previous padding
  }
)}>Button</button>

// Clear flag works with slots too
<button className={slots.root(
  { slot: { root: { class: ["px-4"] } } },  // This will be completely ignored
  { slot: { root: { class: ["py-2"] } } },  // This will be completely ignored
  { 
    clear: true,                            // Clear flag - kills all previous tweaks
    slot: { root: { class: ["px-8", "py-4"] } } // Only this will be applied
  }
)}>Button</button>
```

> **🔍 Flag Behavior:**
> - **`override: true`** - Overrides only the specific fields set in that tweak, while preserving other fields from previous tweaks
> - **`clear: true`** - Completely resets and starts fresh, ignoring ALL previous tweaks and only applying the current one

### What-Level Override Flag 🎯

CLS supports **What-level override flags** for fine-grained control over individual styling values. This gives you the power to specify exactly which What values should override accumulated classes instead of just appending to them.

```typescript
// What-level override replaces accumulated classes
const { slots, variant } = ButtonCls.create();

// Normal behavior - appends to accumulated classes
<button className={slots.root({
  slot: {
    root: {
      class: ["append-class"],
      override: false, // or omit - this appends to previous classes
    },
  },
})}>Button</button>
// Result: "base-classes append-class"

// What-level override - replaces accumulated classes
<button className={slots.root({
  slot: {
    root: {
      class: ["override-class"],
      override: true, // This replaces all accumulated classes
    },
  },
})}>Button</button>
// Result: "override-class" (previous classes are replaced)
```

**🎨 What-Level Override in Action:**

```typescript
const ButtonCls = contract()
  .slots(["root"])
  .def()
  .root({ 
    root: { 
      class: ["base", "px-4", "py-2"] 
    } 
  })
  .rule({ size: "lg" }, { 
    root: { 
      class: ["px-6", "py-3"] 
    } 
  })
  .cls();

const { slots } = ButtonCls.create({ variant: { size: "lg" } });

// Normal append behavior
slots.root({
  slot: {
    root: {
      class: ["shadow-lg"],
      override: false, // Appends to existing classes
    },
  },
});
// Result: "base px-4 py-2 px-6 py-3 shadow-lg"

// What-level override behavior
slots.root({
  slot: {
    root: {
      class: ["custom-button"],
      override: true, // Replaces all accumulated classes
    },
  },
});
// Result: "custom-button" (all previous classes replaced)
```

**🔧 Advanced What-Level Override Patterns:**

```typescript
// What-level override with tokens
const { slots } = ButtonCls.create();

slots.root({
  slot: {
    root: {
      token: ["color.bg.primary"], // Token reference
      class: ["custom-class"],
      override: true, // Replaces accumulated classes
    },
  },
});
// Result: "bg-blue-600 custom-class" (token resolved + custom class, previous classes replaced)

// What-level override precedence: user wins over config
const { slots } = ButtonCls.create(undefined, {
  slot: {
    root: {
      class: ["config-override"],
      override: true, // Config-level override
    },
  },
});

slots.root({
  slot: {
    root: {
      class: ["user-override"],
      override: true, // User-level override wins
    },
  },
});
// Result: "user-override" (user What-level override wins over config)
```

**🎯 When to Use What-Level Override:**

- **🎨 Fine-grained control** - Override specific styling values without affecting the entire tweak
- **🔄 Conditional replacement** - Replace accumulated classes based on specific conditions
- **🎪 Slot-specific overrides** - Different override behavior per slot
- **🧩 Component composition** - Override inherited styles in child components
- **🎭 Theme switching** - Replace theme classes with custom overrides

> **💡 Pro Tip:** What-level overrides work at the individual What value level, giving you surgical precision over which styling values replace accumulated classes versus which ones append. This is perfect for scenarios where you need to override specific inherited styles while preserving others!

### Token Chains
```typescript
// Tokens can reference other tokens
token: def.token({
  "color.bg.primary": { class: ["bg-blue-600"] },
  "color.text.primary": { class: ["text-white"] },
  
  // Composite token that references base tokens
  "button.primary": { token: [
    "color.bg.primary",    // References another token
    "color.text.primary"   // References another token
  ] }
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

#### **`cls.tweak()` - Tweak Merging**
```typescript
// Tweak merging is now integrated into cls instances
const { slots, variant } = ButtonCls.create();

// Use cls.tweak() for manual tweak merging
const finalTweak = ButtonCls.tweak(
  internalTweak,  // Lowest precedence
  propsTweak,     // Medium precedence
  userTweak       // Highest precedence
);

// Use the merged tweak with cls.create()
const { slots: customSlots, variant: customVariant } = ButtonCls.create(finalTweak);
```

#### **Direct Variadic Usage (Recommended)**
```typescript
// Prefer direct variadic usage - no need for manual merging
const { slots, variant } = ButtonCls.create(
  internalTweak,  // Lowest precedence
  propsTweak,     // Medium precedence
  userTweak       // Highest precedence
);

// Individual slots also support variadic tweaks
<button className={slots.root(
  { variant: { size: "lg" } },
  { slot: { root: { class: ["shadow-lg"] } } }
)}>Button</button>
```

> **💡 Key Point:** Tweak merging is **integrated** into `cls.create()`, individual slots, and `cls.tweak()`. Tweaks are processed from lowest to highest precedence (last parameter wins), with `override` flag for explicit overriding and `clear` flag for complete reset!

## 🛠️ Utility Constants

### OVERRIDE Constant

CLS exports an `OVERRIDE` constant for explicit override flags:

```typescript
import { OVERRIDE } from '@use-pico/cls';

// Use OVERRIDE constant for explicit override flags
.tokens.rule({ tone: "primary" }, {
  "color.bg": { class: ["bg-purple-600"] }
}, OVERRIDE) // More explicit than true

.rule({ size: "lg" }, {
  root: { class: ["px-8"] }
}, OVERRIDE) // Clear intent for override behavior
```

> **💡 Pro Tip:** Use `OVERRIDE` instead of `true` for better code readability and explicit intent when you want to override previous rules!

## 🚀 Performance

CLS is optimized for performance with several key features:

- **Lazy Evaluation** - Slot functions are created only when accessed via Proxy
- **Smart Caching** - Results are cached based on configuration hash
- **Memory Efficient** - Shared references across instances
- **Minimal Runtime** - Just class string generation, no CSS-in-JS overhead
- **Bundle Size Optimization** - CLS only transfers existing classes to a single place, often *reducing* total bundle size by eliminating duplicate styles and simplifying complex conditional logic
- **Actual Bundle Size** - ~6.7KB gzipped (41KB raw) + tailwind-merge as external dependency

## 📊 Performance Benchmarks

CLS has been benchmarked across different complexity levels to demonstrate its performance characteristics:

### Benchmark Scenarios

**🔹 Simple CLS** - Basic slots only (1 slot)
**🔹 Intermediate CLS** - Slots + variants (3 variants, 2 slots)
**🔹 Advanced CLS** - Slots + variants + tokens (3 variants, 3 slots, 10 tokens)
**🔹 Extreme CLS** - Previous + 2 levels of inheritance (4 variants, 3 slots, 6 tokens, deep inheritance)

### Performance Results

| Scenario | Iterations | Ops/sec | Memory Usage | Performance vs Simple |
|----------|------------|---------|--------------|----------------------|
| **Simple CLS** | 100 | 229,863 | 0MB | 100% (baseline) |
| **Simple CLS** | 1,000 | 438,893 | 0MB | 100% (baseline) |
| **Simple CLS** | 100,000 | 800,168 | 1MB | 100% (baseline) |
| **Intermediate CLS** | 100 | 100,599 | 0MB | 44% |
| **Intermediate CLS** | 1,000 | 258,040 | 0MB | 59% |
| **Intermediate CLS** | 100,000 | 329,144 | 0MB | 41% |
| **Advanced CLS** | 100 | 116,155 | 0MB | 51% |
| **Advanced CLS** | 1,000 | 122,749 | 0MB | 28% |
| **Advanced CLS** | 100,000 | 154,318 | 1MB | 19% |
| **Extreme CLS** | 100 | 105,508 | 0MB | 46% |
| **Extreme CLS** | 1,000 | 106,058 | 0MB | 24% |
| **Extreme CLS** | 100,000 | 107,797 | 0MB | 13% |

### Key Performance Insights

**⚡ Excellent Performance at Scale:**
- **800K+ operations/second** for simple CLS instances
- **329K+ operations/second** for intermediate complexity (slots + variants)
- **154K+ operations/second** for advanced scenarios (slots + variants + tokens)
- **108K+ operations/second** for extreme scenarios (deep inheritance + complex rules)

**🧠 Memory Efficiency:**
- **Minimal memory overhead** - 0-1MB memory usage even for 100,000 operations
- **Smart caching** - performance improves with scale due to internal optimizations
- **No memory leaks** - consistent memory usage across iterations

**📈 Scalability:**
- **Simple CLS**: Excellent scaling (230K → 800K ops/sec)
- **Intermediate CLS**: Good scaling with variants (101K → 329K ops/sec)
- **Advanced CLS**: Consistent performance with tokens (116K → 154K ops/sec)
- **Extreme CLS**: Stable performance despite deep inheritance (106K → 108K ops/sec)

> **💡 Performance Takeaway:** CLS maintains excellent performance even with complex inheritance chains and extensive token systems. The performance cost for complex scenarios is negligible compared to the massive productivity gains from type safety, inheritance, and design system features.

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
| **Bundle Size** | ✅ ~6.7KB (gzipped) + tailwind-merge | ✅ ~3KB | ✅ ~5KB | ❌ ~25KB | ❌ ~30KB | ✅ ~8KB |
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
