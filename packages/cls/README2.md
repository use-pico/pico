# `@use-pico/cls`

## Introduction ✨ <a id="introduction"></a>

`@use-pico/cls` is a class-first styling system built for modern design systems and production apps. It works with existing CSS utilities (like Tailwind), _not_ CSS-in-JS. Its core ideas are: **design tokens** as first‑class citizens, **multi-slot** components, **explicit variants** with strong TypeScript guarantees, and a powerful **multi-level inheritance** model for scalable systems. ✨

- 🧱 **Contracts, not configs**: declare **tokens · slots · variants** once → get full IntelliSense everywhere
- 🎯 **Design tokens** as first-class citizens with **inheritance** and validation
- 🎛️ **Rules that read like UI**: map variant combos → slot styles with predictable overrides
- 🧩 **Extend anything**: multi‑level inheritance across tokens/slots/variants with types intact
- 🧠 **Type-safety first**: compile‑time checks across contracts, rules, and overrides
- ⚡️ **Lazy by default**: slots are computed on demand via Proxy; no wasted work
- 🚀 **Cached slots**: per-slot memoization; repeated `slot()` calls with identical inputs are near‑zero cost
- 🎨 **Runtime flexibility**: override variants/slots/tokens at `create()` time
- 🌀 **Tailwind‑native**: powered by `tailwind-merge` for sane, deduped class strings
- 📦 **Built for production**: framework‑agnostic, tiny runtime, excellent React integration
- 🧭 **Where this fits**: honest comparison with CVA, TV, Stitches, and vanilla-extract

> **Who is this for**: teams building design systems, component libraries, and apps that want predictable styling with a friendly, type-safe developer experience. 🎯

> **Note**: `cls` is not `CSS‑in‑JS`; it returns class strings and works with your existing CSS (e.g., Tailwind). No runtime style injection. 🚫

## Table of Contents <a id="table-of-contents"></a>

- [1. Foundations](#1-foundations)
  - [1.1 What is CLS?](#11-what-is-cls)
  - [1.2 Mental Model](#12-mental-model)
  - [1.3 Installation](#13-installation)
  - [1.4 Quick Start](#14-quick-start)
- [2. Design Philosophy](#2-design-philosophy)
  - [2.1 Callbacks Everywhere](#21-callbacks-everywhere)
  - [2.2 Why Contracts First](#22-why-contracts-first)
  - [2.3 Token-Centric Design](#23-token-centric-design)
  - [2.4 Rule-Based System](#24-rule-based-system)
  - [2.5 Required Defaults](#25-required-defaults)
  - [2.6 Type Safety as Foundation](#26-type-safety-as-foundation)
  - [2.7 Performance by Design](#27-performance-by-design)
  - [2.8 Simplicity Beneath Complexity](#28-simplicity-beneath-complexity)
  - [2.9 CSS Connection](#29-css-connection)
- [3. Core API](#3-core-api)
  - [3.1 `cls()` Function](#31-cls-function)
  - [3.2 `extend()` Method](#32-extend-method)
  - [3.3 `create()` Method](#33-create-method)
  - [3.4 `use()` Method](#34-use-method)
  - [3.5 `merge()` Utility](#35-merge-utility)
  - [3.6 `tvc()` Helper](#36-tvc-helper)
  - [3.7 What Utility](#37-what-utility)
  - [3.8 Definition Helpers](#38-definition-helpers)
  - [3.9 Override Helpers](#39-override-helpers)
- [4. Rules System](#4-rules-system)
  - [4.1 Root Rules](#41-root-rules)
  - [4.2 Conditional Rules](#42-conditional-rules)
  - [4.3 Rule Precedence](#43-rule-precedence)
  - [4.4 Appends vs Overrides](#44-appends-vs-overrides)
  - [4.5 Rule Matching](#45-rule-matching)
  - [4.6 Complex Match Conditions](#46-complex-match-conditions)
- [5. Tokens](#5-tokens)
  - [5.1 Contract Declaration](#51-contract-declaration)
  - [5.2 Token Definitions](#52-token-definitions)
  - [5.3 Runtime Overrides](#53-runtime-overrides)
  - [5.4 Inheritance Semantics](#54-inheritance-semantics)
  - [5.5 Token Conflicts & Resolution](#55-token-conflicts--resolution)
- [6. Variants & Defaults](#6-variants--defaults)
  - [6.1 String Variants](#61-string-variants)
  - [6.2 Boolean Variants](#62-boolean-variants)
  - [6.3 Forced Defaults](#63-forced-defaults)
  - [6.4 Default Values](#64-default-values)
  - [6.5 Variant Combinations](#65-variant-combinations)
- [7. Slots](#7-slots)
  - [7.1 Slot Definition](#71-slot-definition)
  - [7.2 Lazy Evaluation](#72-lazy-evaluation)
  - [7.3 Inheritance Accumulation](#73-inheritance-accumulation)
  - [7.4 Slot Overrides](#74-slot-overrides)
  - [7.5 Multi-slot Components](#75-multi-slot-components)
- [8. Inheritance](#8-inheritance)
  - [8.1 Overview](#81-overview)
  - [8.2 Authoritative Rules](#82-authoritative-rules)
  - [8.3 Behavior Examples](#83-behavior-examples)
  - [8.4 Multi-level Inheritance](#84-multi-level-inheritance)
  - [8.5 Contract Inheritance](#85-contract-inheritance)
  - [8.6 Token Inheritance](#86-token-inheritance)
  - [8.7 Variant Inheritance](#87-variant-inheritance)
- [9. React Integration](#9-react-integration)
  - [9.1 useCls Hook](#91-usecls-hook)
  - [9.2 withCls HOC](#92-withcls-hoc)
  - [9.3 Context Integration](#93-context-integration)
  - [9.4 Component Patterns](#94-component-patterns)
  - [9.5 ClsProvider & useClsContext](#95-clsprovider--useclscontext)
- [10. Theming & Token Overloading](#10-theming--token-overloading)
  - [10.1 One-time Replace](#101-one-time-replace)
  - [10.2 External Themes](#102-external-themes)
  - [10.3 Partial Themes](#103-partial-themes)
  - [10.4 Dynamic Switching](#104-dynamic-switching)
  - [10.5 Merge Precedence](#105-merge-precedence)
  - [10.6 Theme Inheritance](#106-theme-inheritance)
- [11. Recipes & Patterns](#11-recipes--patterns)
  - [11.1 Simple Static Components](#111-simple-static-components)
  - [11.2 Variant-only Components](#112-variant-only-components)
  - [11.3 Token System Components](#113-token-system-components)
  - [11.4 Inheritance Components](#114-inheritance-components)
  - [11.5 Theme System Components](#115-theme-system-components)
  - [11.6 Runtime Customization](#116-runtime-customization)
  - [11.7 Complex Components](#117-complex-components)
  - [11.8 Edge Cases & Empty Contracts](#118-edge-cases--empty-contracts)
- [12. Advanced Features](#12-advanced-features)
  - [12.1 Performance & Caching](#121-performance--caching)
  - [12.2 Large Component Trees](#122-large-component-trees)
  - [12.3 Dynamic Variants](#123-dynamic-variants)
  - [12.4 Real-world Scenarios](#124-real-world-scenarios)
  - [12.5 Type System Deep Dive](#125-type-system-deep-dive)
- [13. Comparison](#13-comparison)
  - [13.1 Feature Table](#131-feature-table)
  - [13.2 Code Comparisons](#132-code-comparisons)
  - [13.3 Migration Paths](#133-migration-paths)
  - [13.4 vs CVA (Class Variance Authority)](#134-vs-cva-class-variance-authority)
  - [13.5 vs TV (Tailwind Variants)](#135-vs-tv-tailwind-variants)
  - [13.6 vs Stitches](#136-vs-stitches)
  - [13.7 vs Vanilla Extract](#137-vs-vanilla-extract)
- [14. FAQ & Known Limitations](#14-faq--known-limitations)
  - [14.1 Frequently Asked Questions](#141-frequently-asked-questions)
  - [14.2 Known Limitations](#142-known-limitations)
  - [14.3 Troubleshooting](#143-troubleshooting)
  - [14.4 Common Pitfalls](#144-common-pitfalls)
- [15. AI Compatibility & Documentation](#15-ai-compatibility--documentation)
  - [15.1 AI-First Design Philosophy](#151-ai-first-design-philosophy)
  - [15.2 Documentation Strategy](#152-documentation-strategy)
  - [15.3 Context-Aware Usage](#153-context-aware-usage)
  - [15.4 AI Assistant Integration](#154-ai-assistant-integration)
- [Appendix A: Glossary](#appendix-a-glossary)
- [Appendix B: Migration Playbook](#appendix-b-migration-playbook)
  - [B.1 From CVA to CLS](#b1-from-cva-to-cls)
  - [B.2 From TV to CLS](#b2-from-tv-to-cls)
  - [B.3 From Stitches to CLS](#b3-from-stitches-to-cls)
  - [B.4 From Vanilla Extract to CLS](#b4-from-vanilla-extract-to-cls)

---

## 1. Foundations <a id="1-foundations"></a>

**[← Previous: Table of Contents](#table-of-contents)** | **[→ Next Chapter: Core API](#2-core-api)**

### 1.1 What is CLS? <a id="11-what-is-cls"></a>

So, what exactly is this **CLS** thing? 🤔

**CLS** stands for **Class List System** (because we're creative with acronyms, obviously ✨). But don't let the fancy name fool you – it's basically your friendly neighborhood styling system that decided to be different from all the other kids on the block! 🚀

Think of CLS as that **smart friend** who shows up to a construction site with a perfectly organized toolbox instead of just throwing random tools in a bag 🧰. While other styling libraries are like *"here's a hammer, good luck building a house"*, CLS is like *"here's a blueprint, here are the materials, and here's how they all work together – oh, and everything is type-safe because we're not savages"* 😄.

**What makes CLS special?** 🎯 Well, it's **not** CSS-in-JS (we're not monsters 👹), it's **not** just another utility-first approach (*been there, done that*), and it's definitely **not** one of those *"write CSS in JavaScript strings"* situations (*shudder* 😱). Instead, CLS is a **class-first styling system** that works with your existing CSS utilities like **Tailwind**, but gives you **superpowers** you didn't know you needed! 💪

Imagine you're building a button component. With traditional approaches, you might end up with something like:
```typescript
// The old way (don't do this at home, kids 👶)
const buttonClasses = [
  'px-4', 'py-2', 'rounded', 'bg-blue-500', 'text-white',
  // ... 20 more classes that you hope work together 🤞
].join(' ');
```

But with CLS, you get something **magical** ✨:
```typescript
// The CLS way (where magic happens 🪄)
const Button = cls(contract, definition);
const classes = Button.create(({ what }) => ({
  variant: what.variant({ size: "lg", variant: "primary" })
}));
```

**The best part?** 🎉 You get full **IntelliSense**, **type safety**, and the ability to extend and compose components like you're playing with **LEGO bricks** – but for grown-ups who write code for a living! 🧱

CLS is like having a **design system** that actually *listens* to you, *understands* your needs, and doesn't make you want to pull your hair out when you need to make a simple change 😤. It's the styling system you've been **dreaming of**, even if you didn't know it existed! 💭

So buckle up, because we're about to dive into a world where styling components is actually **fun**, **predictable**, and – dare we say it – **enjoyable**! 🎊

### 1.2 Mental Model <a id="12-mental-model"></a>

Alright, let's talk about the **mental model** behind CLS! 🧠✨

The CLS mental model is built on two powerful pillars: **heavy typechecking** and **contract-first design**. Think of it like building a house – you start with a solid foundation and detailed blueprints, then everything else just flows naturally from there! 🏗️

### **Contract-First: Define Once, Use Everywhere** 📋

In CLS, you start by defining **what's available** down the stream. You decide what tokens, slots, and variants your component will have, and how they all fit together. Once that's done, you can use these building blocks everywhere without wondering what's available! 🎯

```typescript
// Define your contract first (the "menu")
const Button = cls({
  tokens: {
    "color.bg": ["default", "primary", "danger"],
    "color.text": ["default", "primary", "danger"]
  },
  slot: ["root", "label", "icon"],
  variant: {
    size: ["sm", "md", "lg"],
    variant: ["default", "primary", "danger"]
  }
}, definition);
```

**The magic?** Once you define this contract, TypeScript becomes your best friend and knows exactly what's available everywhere! 🎯

### **Heavy Typechecking: Your Safety Net** 🛡️

CLS doesn't just do type checking – it does **heavy typechecking**. We're talking about the kind of type safety that catches mistakes before you even run your code. It's like having a very picky code reviewer who never sleeps and catches every single error! 😴➡️👁️

**Invalid variants?** TypeScript will scream at you! 🚨 **Wrong token names?** Nope, not happening! ❌ **Missing slots?** Forget about it! 🚫 **Type mismatches?** Caught at compile time! 🎯

### **The "Feel It" Philosophy** 🌟

Here's the beautiful part: once you understand the contract-first approach and embrace the type safety, the rest just **feels natural** from the code and design. It's like learning to ride a bike – at first, you're focused on balance and pedaling, but soon you're just cruising and enjoying the ride! 🚴‍♂️

**You'll find yourself thinking:** *"I need a button variant? Let me check the contract!"* 📖 *"What tokens are available? TypeScript will tell me!"* 💡 *"How do I extend this? The extend method knows what to do!"* 🔧

### **Why This Mental Model Works** 🎯

**Predictability**: Everything is defined upfront, so there are no surprises. **Discoverability**: TypeScript IntelliSense shows you exactly what's available. **Consistency**: The same patterns work everywhere in your codebase. **Confidence**: You know your styling will work because the types say so.

It's like having a **GPS for your styling** – you always know where you are, where you can go, and how to get there! 🗺️

So remember: **define your contracts first, let TypeScript be your guide, and trust that the rest will feel natural as you code!** The mental model is simple, but the possibilities are endless! 🚀✨

### 1.3 Installation <a id="13-installation"></a>

> **You're in? Let's install the package, a lot of magic awaits!** ✨🚀

Alright, let's get this party started! 🎉 Installing CLS is as simple as it gets – no complicated setup, no mysterious configuration files, just pure magic waiting to happen! 

### **Quick Install** ⚡

```bash
# Using npm (the classic way)
npm install @use-pico/cls

# Using yarn (the hipster way)
yarn add @use-pico/cls

# Using pnpm (the efficient way)
pnpm add @use-pico/cls

# Using bun (the lightning-fast way)
bun add @use-pico/cls
```

### **What You Get** 🎁

After installation, you'll have access to:
- **`cls`** - The main function that creates your styling instances (this is where the magic happens! ✨)
- **`Component`** - TypeScript types for building type-safe components
- **`merge`** - Utility for combining styling configurations
- **`tvc`** - Tailwind class merging helper
- **React integration** - `useCls`, `withCls`, and more for seamless React development

Ready to see it in action? Jump to [Quick Start](#14-quick-start) to see your first `cls()` call! 🚀

### **TypeScript Ready** 🎯

CLS is built with TypeScript from the ground up, so you get:
- **Full type safety** out of the box
- **IntelliSense** that actually knows what you're doing
- **Compile-time error checking** that saves you from runtime headaches

### **Framework Agnostic** 🌍

While CLS has excellent React integration, it works with:
- **React** (with hooks and HOCs)
- **Vue** (vanilla usage)
- **Svelte** (vanilla usage)
- **Vanilla JavaScript** (because why not?)

### **Ready to Rock** 🎸

That's it! No additional setup, no configuration files to create, no mysterious environment variables to set. Just install the package and start building amazing, type-safe components! 

The magic begins as soon as you write your first `cls()` call! ✨

### 1.4 Quick Start <a id="14-quick-start"></a>

Ready to see CLS in action? Let's start with something simple and build up from there! 🚀

### **Your First Component** ✨

Here's a minimal button component to get you started:

```typescript
import { cls } from '@use-pico/cls';

// Define your button
const Button = cls({
  slot: ['root'],
  variant: {
    size: ['sm', 'md', 'lg'],
    variant: ['default', 'primary']
  }
}, ({ what, def }) => ({
  rules: [
    def.root({
      root: what.css(['px-4', 'py-2', 'rounded', 'font-medium'])
    }),
    def.rule(
      what.variant({ size: 'lg' }),
      { root: what.css(['px-6', 'py-3', 'text-lg']) }
    ),
    def.rule(
      what.variant({ variant: 'primary' }),
      { root: what.css(['bg-blue-500', 'text-white']) }
    )
  ],
  defaults: {
    size: 'md',
    variant: 'default'
  }
}));

// Use it!
const classes = Button.create();
console.log(classes.root()); // "px-4 py-2 rounded font-medium"
```

### **What Just Happened?** 🤔

1. **We defined a contract** - slots and variants
2. **We wrote some rules** - basic styles + size/color variations  
3. **We got a working component** - with type safety and IntelliSense!

### **Next Steps** 🎯

This is just the beginning! In the following chapters, you'll learn about:
- **[Tokens](#5-tokens)** for design system values
- **[Inheritance](#8-inheritance)** for extending components
- **[React Integration](#9-react-integration)** for seamless component development
- **[Advanced Features](#12-advanced-features)** for complex use cases

The beauty of CLS is that you can start simple and gradually unlock more powerful features as you need them. No overwhelming complexity upfront – just clean, predictable styling that grows with your needs! ✨

Ready to dive deeper? Let's explore the [Core API](#3-core-api) and see what else CLS can do! 🚀

---

## 2. Design Philosophy <a id="2-design-philosophy"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Foundations](#1-foundations)** | **[→ Next Chapter: Core API](#3-core-api)**

### 2.1 Callbacks Everywhere <a id="21-callbacks-everywhere"></a>

Ever wondered why CLS uses callbacks everywhere? 🤔 Well, it's not because we're trying to make your life complicated – quite the opposite! We're giving you **type-safe tools** that actually know what you're doing! 🎯

### **The Problem with Plain Objects** ❌

Imagine you're writing a component definition. With plain objects, you'd have something like this:

```typescript
// The old way (don't do this!)
const definition = {
  rules: [
    {
      match: { size: 'lg' },  // TypeScript has no idea what this should be
      slot: { root: 'some-classes' }  // What classes? What slots?
    }
  ]
};
```

**What happens?** TypeScript shrugs its shoulders and says "sure, whatever" because it doesn't know what your contract looks like. You could write `{ size: 'xl' }` even though your contract only allows `['sm', 'md', 'lg']`! 😱

### **The CLS Way: Callbacks with Context** ✨

CLS gives you callbacks that receive **type-safe tools** based on your actual contract:

```typescript
const Button = cls(contract, ({ what, def, override }) => {
  // TypeScript knows EXACTLY what you can do here!
  return {
    rules: [
      def.rule(
        what.variant({ size: 'lg' }),  // ✅ Only valid variants allowed
        { root: what.css(['px-6', 'py-3']) }  // ✅ Type-safe slot configuration
      )
    ]
  };
});
```

### **Why This Matters** 🎯

**1. IntelliSense that Actually Works** 💡
- TypeScript knows what variants you can use
- It suggests valid slot names
- It catches typos before you run your code

**2. Compile-Time Safety** 🛡️
- Invalid variants? Error at compile time!
- Wrong slot names? Error at compile time!
- Type mismatches? Error at compile time!

**3. Refactoring Confidence** 🔄
- Change a variant name? TypeScript will find all usages
- Rename a slot? Everything updates automatically
- Modify your contract? All errors show up immediately

### **The Magic of Context** 🌟

When you use a callback, CLS provides you with tools that are **perfectly typed** for your specific contract:

- **`what`** - Knows your tokens, variants, and slots
- **`def`** - Understands your contract structure
- **`override`** - Provides type-safe override patterns

It's like having a **personal assistant** who knows your project inside and out and never lets you make mistakes! 🧠✨

### **Real-World Example** 🚀

```typescript
// Your contract defines what's possible
const contract = {
  variant: { size: ['sm', 'md', 'lg'] }
};

// Your callback gets tools that respect those constraints
cls(contract, ({ what, def }) => {
  return {
    rules: [
      def.rule(
        what.variant({ size: 'lg' }),  // ✅ Valid
        { root: what.css(['px-6']) }
      ),
      def.rule(
        what.variant({ size: 'xl' }),  // ❌ TypeScript error! 'xl' not in contract
        { root: what.css(['px-8']) }
      )
    ]
  };
});
```

**The result?** You get **compile-time safety** without sacrificing **runtime flexibility**. It's the best of both worlds! 🎉

So remember: **callbacks aren't there to make things complicated – they're there to make things bulletproof!** 💪✨

### 2.2 Why Contracts First <a id="22-why-contracts-first"></a>

Why do we put contracts first in CLS? 🤔 Because we believe in **planning before building** – just like you wouldn't start constructing a skyscraper without blueprints! 🏗️

#### **The Traditional Approach: Chaos First** 😵‍💫

Most styling libraries let you jump straight into writing styles:

```typescript
// The "figure it out as you go" approach
const buttonStyles = {
  base: 'px-4 py-2 rounded',
  variants: {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-200 text-gray-800'
  }
};

// Later... "Wait, what variants did I define again?"
// "What if I want to add a new size variant?"
// "How do I make sure all my buttons are consistent?"
```

**What happens?** You end up with a **messy pile of styles** that grows organically, like a garden that's never been planned. Some components have 3 variants, others have 7, and nobody knows what the "right" way to style something is! 🌱➡️🌿➡️🌳➡️🌴➡️🌵➡️🌾➡️🌿➡️🌱

#### **The CLS Way: Structure First** ✨

In CLS, you start by defining **exactly what's possible**:

```typescript
// Define your contract FIRST
const Button = cls({
  tokens: {
    "color.bg": ["default", "primary", "danger"],
    "color.text": ["default", "primary", "danger"]
  },
  slot: ["root", "label", "icon"],
  variant: {
    size: ["sm", "md", "lg"],
    variant: ["default", "primary", "danger"]
  }
}, definition);
```

**Now you know:**
- ✅ **Exactly** what variants exist
- ✅ **Exactly** what slots are available  
- ✅ **Exactly** what tokens you can use
- ✅ **Exactly** how everything fits together

#### **Why This Approach Rocks** 🚀

**1. Consistency by Design** 🎯
- Every button follows the same pattern
- No more "creative" variants that break the system
- Your design system actually makes sense!

**2. Discoverability** 🔍
- New team members can see what's available at a glance
- No more guessing what variants exist
- The contract is your documentation

**3. Extensibility** 🔧
- Want to add a new variant? Update the contract first
- All existing code will know about it immediately
- TypeScript will guide you through the changes

**4. Refactoring Safety** 🛡️
- Change a variant name? TypeScript finds all usages
- Remove a token? All errors show up at once
- Your refactoring is bulletproof!

#### **The Contract as Your North Star** ⭐

Think of your contract as the **constitution** of your design system:

- **It defines the rules** everyone must follow
- **It prevents chaos** from creeping in
- **It makes decisions for you** when you're not sure what to do
- **It grows with your needs** in a controlled, predictable way

#### **Real-World Benefits** 🌍

**Before CLS (chaos):**
```typescript
// Every developer does their own thing
const Button1 = { variants: ['primary', 'secondary'] };
const Button2 = { variants: ['default', 'primary', 'success'] };
const Button3 = { variants: ['primary', 'secondary', 'tertiary', 'quaternary'] };
// ... 15 more inconsistent button definitions
```

**With CLS (order):**
```typescript
// One contract, consistent everywhere
const Button = cls(contract, definition);
const PrimaryButton = Button.extend(extendedContract, extendedDefinition);
const DangerButton = Button.extend(dangerContract, dangerDefinition);
// All follow the same pattern, all are type-safe!
```

#### **The Bottom Line** 💡

**Contracts first** means:
- **Less thinking** about "how should I style this?"
- **More thinking** about "what should be possible?"
- **Better design systems** that actually work
- **Happier developers** who know what they're doing

It's like having a **GPS for your styling** – you always know where you are, where you can go, and how to get there! 🗺️

So remember: **define your contracts first, and everything else becomes a breeze!** ✨🚀

### 2.3 Token-Centric Design <a id="23-token-centric-design"></a>

Welcome to the **token revolution**! 🎉 In CLS, tokens aren't just an afterthought – they're the **beating heart** of your design system! 💓

#### **What Are Tokens, Anyway?** 🤔

Think of tokens as **named design values** that represent the building blocks of your visual language. Instead of writing `bg-blue-500` everywhere, you create a token called `"color.bg.primary"` that means "the primary background color." It's like having a **design vocabulary** that everyone on your team understands! 📚

```typescript
// Instead of this scattered approach:
const button1 = "bg-blue-500 text-white";
const button2 = "bg-blue-500 text-white";  // Duplicated!
const button3 = "bg-blue-500 text-white";  // Duplicated again!

// You create tokens:
const tokens = {
  "color.bg.primary": ["bg-blue-500"],
  "color.text.primary": ["text-white"]
};

// And use them everywhere:
const button1 = "color.bg.primary color.text.primary";
const button2 = "color.bg.primary color.text.primary";  // Same token!
const button3 = "color.bg.primary color.text.primary";  // Same token!
```

#### **Why Tokens Are Game-Changing** 🚀

**1. Single Source of Truth** 🎯
- Change `bg-blue-500` to `bg-indigo-600` in one place
- Every component using that token updates automatically
- No more hunting through your codebase for color references!

**2. Design System Consistency** 🎨
- Your brand colors are defined once, used everywhere
- Spacing, typography, and other values are standardized
- Your app actually looks like it was designed by one person!

**3. Semantic Meaning** 🧠
- `"color.bg.primary"` is more meaningful than `"bg-blue-500"`
- `"spacing.padding.md"` tells you exactly what it is
- Your code becomes self-documenting!

#### **The CLS Token Magic** ✨

In CLS, tokens are **first-class citizens** with superpowers:

```typescript
const Button = cls({
  tokens: {
    "color.bg": ["default", "primary", "danger"],
    "color.text": ["default", "primary", "danger"],
    "spacing.padding": ["sm", "md", "lg"],
    "border.radius": ["none", "sm", "md", "lg"]
  }
}, ({ what, def }) => ({
  rules: [
    def.root({
      root: what.token([
        "color.bg.default",    // Uses the token!
        "color.text.default",  // Uses the token!
        "spacing.padding.md"   // Uses the token!
      ])
    }),
    def.rule(
      what.variant({ variant: "primary" }),
      {
        root: what.token([
          "color.bg.primary",  // Switches to primary tokens!
          "color.text.primary"
        ])
      }
    )
  ]
}));
```

#### **Token Inheritance: The Gift That Keeps on Giving** 🎁

Tokens in CLS can **inherit and extend** from parent components:

```typescript
// Base button with basic tokens
const BaseButton = cls({
  tokens: {
    "color.bg": ["default", "primary"],
    "color.text": ["default", "primary"]
  }
}, definition);

// Extended button with more tokens
const ExtendedButton = BaseButton.extend({
  tokens: {
    "color.bg": ["default", "primary", "success", "warning"],  // Adds new variants!
    "color.text": ["default", "primary", "success", "warning"],
    "animation.duration": ["fast", "normal", "slow"]           // Adds new token groups!
  }
}, extendedDefinition);
```

**What happens?** The extended button gets **all** the base tokens plus the new ones, and TypeScript knows about everything! 🎯

#### **Real-World Token Examples** 🌍

**Color System:**
```typescript
"color.bg": {
  default: ["bg-gray-100"],
  primary: ["bg-blue-500"],
  success: ["bg-green-500"],
  warning: ["bg-yellow-500"],
  danger: ["bg-red-500"]
}
```

**Spacing System:**
```typescript
"spacing.padding": {
  sm: ["px-2", "py-1"],
  md: ["px-4", "py-2"],
  lg: ["px-6", "py-3"],
  xl: ["px-8", "py-4"]
}
```

**Typography System:**
```typescript
"typography.size": {
  sm: ["text-sm"],
  md: ["text-base"],
  lg: ["text-lg"],
  xl: ["text-xl"]
}
```

#### **The Bottom Line** 💡

**Token-centric design** means:
- **Your design values are organized** and easy to find
- **Changes happen in one place** and update everywhere
- **Your code is semantic** and self-documenting
- **Your design system is consistent** and maintainable

It's like having a **design dictionary** that everyone on your team can reference, update, and extend! 📖✨

So remember: **tokens aren't just values – they're your design system's vocabulary!** 🎨🚀

### 2.4 Rule-Based System <a id="24-rule-based-system"></a>

### 2.5 Required Defaults <a id="25-required-defaults"></a>

### 2.6 Type Safety as Foundation <a id="26-type-safety-as-foundation"></a>

### 2.7 Performance by Design <a id="27-performance-by-design"></a>

### 2.8 Simplicity Beneath Complexity <a id="28-simplicity-beneath-complexity"></a>

### 2.9 CSS Connection <a id="29-css-connection"></a>

---

## 3. Core API <a id="3-core-api"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Design Philosophy](#2-design-philosophy)** | **[→ Next Chapter: Rules System](#4-rules-system)**

### 3.1 cls() Function <a id="31-cls-function"></a>

### 3.2 extend() Method <a id="32-extend-method"></a>

### 3.3 create() Method <a id="33-create-method"></a>

### 3.4 use() Method <a id="34-use-method"></a>

### 3.5 merge() Utility <a id="35-merge-utility"></a>

### 3.6 tvc() Helper <a id="36-tvc-helper"></a>

---

### 3.7 What Utility <a id="37-what-utility"></a>

#### 3.7.1 what.css() <a id="371-whatcss"></a>

#### 3.7.2 what.token() <a id="372-whattoken"></a>

#### 3.7.3 what.both() <a id="373-whatboth"></a>

#### 3.7.4 what.variant() <a id="374-whatvariant"></a>

---

### 3.8 Definition Helpers <a id="38-definition-helpers"></a>

#### 3.8.1 def.root() <a id="381-defroot"></a>

#### 3.8.2 def.rule() <a id="382-defrule"></a>

#### 3.8.3 def.token() <a id="383-deftoken"></a>

#### 3.8.4 def.defaults() <a id="384-defdefaults"></a>

---

### 3.9 Override Helpers <a id="39-override-helpers"></a>

#### 3.9.1 override.root() <a id="391-overrideroot"></a>

#### 3.9.2 override.rule() <a id="392-overrulerule"></a>

#### 3.9.3 override.token() <a id="393-overridetoken"></a>

---

## 4. Rules System <a id="4-rules-system"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Core API](#3-core-api)** | **[→ Next Chapter: Tokens](#5-tokens)**

### 4.1 Root Rules <a id="41-root-rules"></a>

### 4.2 Conditional Rules <a id="42-conditional-rules"></a>

### 4.3 Rule Precedence <a id="43-rule-precedence"></a>

### 4.4 Appends vs Overrides <a id="44-appends-vs-overrides"></a>

### 4.5 Rule Matching <a id="45-rule-matching"></a>

### 4.6 Complex Match Conditions <a id="46-complex-match-conditions"></a>

---

## 4. Tokens <a id="4-tokens"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Rules System](#4-rules-system)** | **[→ Next Chapter: Variants & Defaults](#5-variants--defaults)**

### 4.1 Contract Declaration <a id="41-contract-declaration"></a>

### 4.2 Token Definitions <a id="42-token-definitions"></a>

### 4.3 Runtime Overrides <a id="43-runtime-overrides"></a>

### 4.4 Inheritance Semantics <a id="44-inheritance-semantics"></a>

### 4.5 Token Conflicts & Resolution <a id="45-token-conflicts--resolution"></a>

---

## 5. Variants & Defaults <a id="5-variants--defaults"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Tokens](#4-tokens)** | **[→ Next Chapter: Slots](#6-slots)**

### 5.1 String Variants <a id="51-string-variants"></a>

### 5.2 Boolean Variants <a id="52-boolean-variants"></a>

### 5.3 Forced Defaults <a id="53-forced-defaults"></a>

### 5.4 Default Values <a id="54-default-values"></a>

### 5.5 Variant Combinations <a id="55-variant-combinations"></a>

---

## 6. Slots <a id="6-slots"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Variants & Defaults](#5-variants--defaults)** | **[→ Next Chapter: Inheritance](#7-inheritance)**

### 6.1 Slot Definition <a id="61-slot-definition"></a>

### 6.2 Lazy Evaluation <a id="62-lazy-evaluation"></a>

### 6.3 Inheritance Accumulation <a id="63-inheritance-accumulation"></a>

### 6.4 Slot Overrides <a id="64-slot-overrides"></a>

### 6.5 Multi-slot Components <a id="65-multi-slot-components"></a>

---

## 7. Inheritance <a id="7-inheritance"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Slots](#6-slots)** | **[→ Next Chapter: React Integration](#8-react-integration)**

### 7.1 Overview <a id="71-overview"></a>

### 7.2 Authoritative Rules <a id="72-authoritative-rules"></a>

### 7.3 Behavior Examples <a id="73-behavior-examples"></a>

### 7.4 Multi-level Inheritance <a id="74-multi-level-inheritance"></a>

### 7.5 Contract Inheritance <a id="75-contract-inheritance"></a>

### 7.6 Token Inheritance <a id="76-token-inheritance"></a>

### 7.7 Variant Inheritance <a id="77-variant-inheritance"></a>

---

## 8. React Integration <a id="8-react-integration"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Inheritance](#7-inheritance)** | **[→ Next Chapter: Theming & Token Overloading](#9-theming--token-overloading)**

### 8.1 useCls Hook <a id="81-usecls-hook"></a>

### 8.2 withCls HOC <a id="82-withcls-hoc"></a>

### 8.3 Context Integration <a id="83-context-integration"></a>

### 8.4 Component Patterns <a id="84-component-patterns"></a>

### 8.5 ClsProvider & useClsContext <a id="85-clsprovider--useclscontext"></a>

---

## 9. Theming & Token Overloading <a id="9-theming--token-overloading"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: React Integration](#8-react-integration)** | **[→ Next Chapter: Recipes & Patterns](#10-recipes--patterns)**

### 9.1 One-time Replace <a id="91-one-time-replace"></a>

### 9.2 External Themes <a id="92-external-themes"></a>

### 9.3 Partial Themes <a id="93-partial-themes"></a>

### 9.4 Dynamic Switching <a id="94-dynamic-switching"></a>

### 9.5 Merge Precedence <a id="95-merge-precedence"></a>

### 9.6 Theme Inheritance <a id="96-theme-inheritance"></a>

---

## 10. Recipes & Patterns <a id="10-recipes--patterns"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Theming & Token Overloading](#9-theming--token-overloading)** | **[→ Next Chapter: Advanced Features](#11-advanced-features)**

### 10.1 Simple Static Components <a id="101-simple-static-components"></a>

### 10.2 Variant-only Components <a id="102-variant-only-components"></a>

### 10.3 Token System Components <a id="103-token-system-components"></a>

### 10.4 Inheritance Components <a id="104-inheritance-components"></a>

### 10.5 Theme System Components <a id="105-theme-system-components"></a>

### 10.6 Runtime Customization <a id="106-runtime-customization"></a>

### 10.7 Complex Components <a id="107-complex-components"></a>

### 10.8 Edge Cases & Empty Contracts <a id="108-edge-cases--empty-contracts"></a>

---

## 11. Advanced Features <a id="11-advanced-features"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Recipes & Patterns](#10-recipes--patterns)** | **[→ Next Chapter: Comparison](#12-comparison)**

### 11.1 Performance & Caching <a id="111-performance--caching"></a>

### 11.2 Large Component Trees <a id="112-large-component-trees"></a>

### 11.3 Dynamic Variants <a id="113-dynamic-variants"></a>

### 11.4 Real-world Scenarios <a id="114-real-world-scenarios"></a>

### 11.5 Type System Deep Dive <a id="115-type-system-deep-dive"></a>

---

## 12. Comparison <a id="12-comparison"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Advanced Features](#11-advanced-features)** | **[→ Next Chapter: FAQ & Known Limitations](#13-faq--known-limitations)**

### 12.1 Feature Table <a id="121-feature-table"></a>

### 12.2 Code Comparisons <a id="122-code-comparisons"></a>

### 12.3 Migration Paths <a id="123-migration-paths"></a>

### 12.4 vs CVA (Class Variance Authority) <a id="124-vs-cva-class-variance-authority"></a>

### 12.5 vs TV (Tailwind Variants) <a id="125-vs-tv-tailwind-variants"></a>

### 12.6 vs Stitches <a id="126-vs-stitches"></a>

### 12.7 vs Vanilla Extract <a id="127-vs-vanilla-extract"></a>

---

## 12. FAQ & Known Limitations <a id="12-faq--known-limitations"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Comparison](#11-comparison)** | **[→ Next Chapter: Contributing](#13-contributing)**

### 12.1 Frequently Asked Questions <a id="121-frequently-asked-questions"></a>

### 12.2 Known Limitations <a id="122-known-limitations"></a>

### 12.3 Troubleshooting <a id="123-troubleshooting"></a>

### 12.4 Common Pitfalls <a id="124-common-pitfalls"></a>

---

## 14. AI Compatibility & Documentation <a id="14-ai-compatibility--documentation"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: FAQ & Known Limitations](#13-faq--known-limitations)**

### 14.1 AI-First Design Philosophy <a id="141-ai-first-design-philosophy"></a>

### 14.2 Documentation Strategy <a id="142-documentation-strategy"></a>

### 14.3 Context-Aware Usage <a id="143-context-aware-usage"></a>

### 14.4 AI Assistant Integration <a id="144-ai-assistant-integration"></a>

---

## Appendix A: Glossary <a id="appendix-a-glossary"></a>

**[↑ Back to Top](#table-of-contents)**

---

## Appendix B: Migration Playbook <a id="appendix-b-migration-playbook"></a>

**[↑ Back to Top](#table-of-contents)**

### B.1 From CVA to CLS <a id="b1-from-cva-to-cls"></a>

### B.2 From TV to CLS <a id="b2-from-tv-to-cls"></a>

### B.3 From Stitches to CLS <a id="b3-from-stitches-to-cls"></a>

---

**[↑ Back to Top](#table-of-contents)**
