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

> **💡 Don't Be Intimidated!** This library may look quite complicated and overwhelming at first glance, but it's actually composed of **simple building blocks** that are easy to understand once you grasp them. Think of it like learning to cook – at first, a recipe with 20 ingredients seems impossible, but once you understand the basic techniques, it becomes **as easy as pie**! 🥧✨
> 
> **The secret?** Most of the "complexity" is just **TypeScript types** doing the heavy lifting. The actual runtime code is minimal and straightforward. So don't be afraid to dive in – the main burden is on the TS side, making your development experience smooth and error-free! 🚀

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
  defaults: def.defaults({
    size: 'md',
    variant: 'default'
  })
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

Welcome to the **rule-based wonderland**! 🎭 In CLS, rules are like **smart recipes** that know exactly when to apply and how to combine! 🧪✨

#### **What Are Rules, Anyway?** 🤔

Think of rules as **conditional styling instructions** that say *"when this happens, apply these styles"*. Rules know exactly when to apply and how to combine based on your variants! 🎯

```typescript
// Rules are like smart styling decisions
const Button = cls(contract, ({ what, def }) => ({
  rules: [
    // Base rule: always apply these styles
    def.root({
      root: what.css(['px-4', 'py-2', 'rounded', 'font-medium'])
    }),
    
    // Conditional rule: when size is large, make it bigger
    def.rule(
      what.variant({ size: 'lg' }),
      { root: what.css(['px-6', 'py-3', 'text-lg']) }
    ),
    
    // Another rule: when variant is primary, make it blue
    def.rule(
      what.variant({ variant: 'primary' }),
      { root: what.css(['bg-blue-500', 'text-white']) }
    )
  ]
}));
```

#### **Why Rules Are Revolutionary** 🚀

**1. Smart Matching** 🎯
- Rules know exactly when to apply based on your variants
- No more manual `if/else` logic in your styling
- CLS figures out the right combination automatically!

**2. Predictable Precedence** 📊
- Rules have a clear order of importance
- Later rules can override earlier ones
- You always know which styles will win!

**3. Composable Logic** 🧩
- Combine multiple conditions easily
- Mix and match variants without breaking things
- Build complex styling logic step by step!

#### **The Rule Magic** ✨

Rules in CLS work like **magic spells** that activate under specific conditions:

```typescript
// Multiple conditions? No problem!
def.rule(
  what.variant({ size: 'lg', variant: 'primary', disabled: true }),
  { 
    root: what.css(['opacity-50', 'cursor-not-allowed']),
    label: what.css(['text-gray-400'])
  }
);

// Complex logic? Bring it on!
def.rule(
  what.variant({ 
    size: 'lg', 
    variant: 'primary',
    // Only apply when NOT disabled
    disabled: false 
  }),
  { root: what.css(['hover:bg-blue-600', 'active:bg-blue-700']) }
);
```

#### **Rule Precedence: The Order Matters** 🎭

Think of rules like **building blocks** that stack on top of each other:

1. **Base rules** go first (the foundation)
2. **Variant rules** go next (adding more styles)
3. **Specific combinations** go last (adding even more styles)

```typescript
const Button = cls(contract, ({ what, def }) => ({
  rules: [
    // 1. Base styles (always applied)
    def.root({
      root: what.css(['px-4', 'py-2', 'rounded'])
    }),
    
    // 2. Size variants (append to base)
    def.rule(what.variant({ size: 'lg' }), {
      root: what.css(['px-6', 'py-3'])
    }),
    
    // 3. Color variants (append to size)
    def.rule(what.variant({ variant: 'primary' }), {
      root: what.css(['bg-blue-500', 'text-white'])
    }),
    
    // 4. Specific combinations (append to everything)
    def.rule(what.variant({ size: 'lg', variant: 'primary' }), {
      root: what.css(['shadow-lg', 'transform', 'hover:scale-105'])
    })
  ]
}));
```

#### **Appends vs Overrides: The Power Choice** ⚡

Rules can either **add to** existing styles or **replace them entirely**:

```typescript
// Append: add to existing styles
def.rule(
  what.variant({ size: 'lg' }),
  { root: what.css(['px-6', 'py-3']) }  // Adds to base styles
);

// Override: replace existing styles completely
def.rule(
  what.variant({ size: 'lg' }),
  { root: what.css(['px-6', 'py-3']) },
  { override: true }  // Replaces base styles completely
);

// Or use the explicit override helper
override.rule(
  what.variant({ size: 'lg' }),
  { root: what.css(['px-6', 'py-3']) }  // Same as above, but explicit
);
```

> **Important:** When you use `override: true`, it **drops everything** from the inheritance chain and starts fresh with just that rule's styles. It's like hitting a reset button and building from scratch! 🔄

#### **The Bottom Line** 💡

**Rule-based system** means:
- **Your styling logic is crystal clear** and easy to understand
- **Complex combinations just work** without manual intervention
- **Maintenance is a breeze** because everything follows the same pattern
- **Debugging is simple** because you can trace exactly which rule applied

It's like having a **styling wizard** who knows all the rules and applies them perfectly every time! 🧙‍♂️✨

So remember: **rules aren't just styling – they're your styling intelligence!** 🧠🎨

### 2.5 Required Defaults <a id="25-required-defaults"></a>

Ah, **defaults** – the unsung heroes of predictable styling! 🦸‍♂️ In CLS, defaults aren't just a nice-to-have feature – they're **required** for a very good reason! 🎯

#### **Why Defaults Are Mandatory** 🤔

Defaults are **mandatory** because they force you to **explicitly choose** what your components should look like by default. Without defaults, you'd get mysterious values that appear "from somewhere" – and that's exactly what CLS wants to prevent! 🚫

**The real reason defaults are forced?** To make you **consciously decide** what you want instead of relying on hidden, automatic behavior. CLS believes in **transparency over magic** – you should always know exactly what you're getting! ✨

```typescript
// Without defaults - chaos! 😱
const Button = cls(contract, ({ what, def }) => ({
  rules: [
    def.root({
      root: what.css(['px-4', 'py-2', 'rounded'])
    }),
    def.rule(what.variant({ size: 'lg' }), {
      root: what.css(['px-6', 'py-3'])
    })
  ]
  // No defaults! What happens when someone calls Button.create()?
  // Answer: TypeScript will scream at you! 🚨
}));

// With defaults - bliss! ✨
const Button = cls(contract, ({ what, def }) => ({
  rules: [
    def.root({
      root: what.css(['px-4', 'py-2', 'rounded'])
    }),
    def.rule(what.variant({ size: 'lg' }), {
      root: what.css(['px-6', 'py-3'])
    })
  ],
  defaults: def.defaults({
    size: 'md',      // ✅ Always has a size
    variant: 'default' // ✅ Always has a variant
  })
}));
```

#### **Defaults as Your Design System's Foundation** 🏗️

Defaults serve as the **baseline** that every component starts from:

```typescript
const Button = cls(contract, ({ what, def }) => ({
  rules: [
    // Base styles that always apply
    def.root({
      root: what.css(['px-4', 'py-2', 'rounded', 'font-medium'])
    }),
    
    // Variant-specific styles
    def.rule(what.variant({ variant: 'primary' }), {
      root: what.css(['bg-blue-500', 'text-white'])
    }),
    
    def.rule(what.variant({ variant: 'danger' }), {
      root: what.css(['bg-red-500', 'text-white'])
    })
  ],
  defaults: def.defaults({
    size: 'md',        // Medium is the standard
    variant: 'default', // Default variant for consistency
    disabled: false    // Usually not disabled
  })
}));

// Now every button has a predictable starting point!
const buttonClasses = Button.create(); // Uses all defaults
const primaryButton = Button.create({ variant: 'primary' }); // Overrides just variant
```

#### **The "No Surprises" Principle** 🎭

Defaults ensure that your components behave **exactly as expected** because you **explicitly defined** what those expectations are:

```typescript
// Without defaults - unpredictable behavior! 😵‍💫
const button1 = Button.create(); // What size? What variant? Who knows!
const button2 = Button.create(); // Same component, different result?

// With defaults - predictable every time! 🎯
const button1 = Button.create(); // Always md + default
const button2 = Button.create(); // Always md + default
const button3 = Button.create({ size: 'lg' }); // lg + default (overrides size only)
```

#### **Defaults and Inheritance: The Perfect Duo** 🎭

When you extend components, defaults **cascade down** like a beautiful waterfall:

```typescript
// Base button with sensible defaults
const BaseButton = cls(contract, ({ what, def }) => ({
  rules: [...],
  defaults: def.defaults({
    size: 'md',
    variant: 'default'
  })
}));

// Extended button inherits and extends defaults
const ExtendedButton = BaseButton.extend(extendedContract, ({ what, def }) => ({
  rules: [...],
  defaults: def.defaults({
    size: 'lg',        // Override: always large
    variant: 'primary', // Override: always primary
    disabled: false    // New default: not disabled
  })
}));

// ExtendedButton.create() now gives you lg + primary + not disabled
// The base defaults are completely overridden! 🎯
```

#### **Type Safety and Defaults: A Match Made in Heaven** 💕

Defaults work **perfectly** with TypeScript's type system:

```typescript
// TypeScript knows exactly what defaults you have
const Button = cls(contract, ({ what, def }) => ({
  rules: [...],
  defaults: def.defaults({
    size: 'md',
    variant: 'default'
  })
}));

// This is perfectly typed!
const button = Button.create({
  size: 'lg'  // ✅ Valid: overrides the 'md' default
  // variant: 'primary'  // ❌ Optional: will use 'default' default
});

// TypeScript knows that button.size is 'lg' and button.variant is 'default'
```

#### **The Bottom Line** 💡

**Required defaults** mean:
- **You explicitly choose** what your components should look like by default
- **No magical values** appear "from somewhere" – everything is transparent
- **Your design system has a solid foundation** that you consciously built
- **Inheritance works seamlessly** with cascading defaults you control
- **No more "where did this styling come from?"** mysteries

Defaults ensure your components always behave predictably because you defined exactly what should happen! 🎯

So remember: **defaults aren't optional – they're your styling insurance policy!** 📋🎯

### 2.6 Type Safety as Foundation <a id="26-type-safety-as-foundation"></a>

Type safety isn't just a feature in CLS – it's the **very foundation** everything is built upon! 🏗️✨ In CLS, TypeScript isn't an afterthought – it's the **core design principle** that makes everything else possible! 🎯

#### **Why Type Safety First?** 🤔

Most styling libraries add TypeScript support as an **optional extra**. CLS does the opposite – it's built **from the ground up** with type safety as the primary goal. This means you get **compile-time guarantees** that other libraries can only dream of! 💭

```typescript
// With CLS, TypeScript knows EXACTLY what you can do
const Button = cls({
  variant: {
    size: ['sm', 'md', 'lg'],
    variant: ['default', 'primary', 'danger']
  }
}, definition);

// This works perfectly ✅
const button = Button.create({ size: 'lg', variant: 'primary' });

// This gives you a compile-time error ❌
const button = Button.create({ size: 'xl', variant: 'super' }); // TypeScript screams!
```

#### **Compile-Time vs Runtime Safety** 🛡️

**Runtime safety** means you find bugs when you run your code. **Compile-time safety** means you find bugs before you even run anything! CLS gives you the latter:

```typescript
// Traditional approach - runtime errors 😱
const buttonVariants = {
  primary: 'bg-blue-500',
  secondary: 'bg-gray-500'
};

// This compiles but crashes at runtime!
buttonVariants.primarye; // Typo! Undefined at runtime

// CLS approach - compile-time errors 🎯
const Button = cls(contract, definition);
const classes = Button.create({ variant: 'primarye' }); // TypeScript error immediately!
```

#### **Type Inference That Actually Works** 🧠

CLS provides **intelligent type inference** that understands your entire styling system:

```typescript
const Button = cls({
  variant: {
    size: ['sm', 'md', 'lg'],
    variant: ['default', 'primary', 'danger']
  }
}, definition);

// TypeScript knows exactly what this returns
const buttonClasses = Button.create({ size: 'lg' });

// buttonClasses.size is typed as 'lg'
// buttonClasses.variant is typed as 'default' (from defaults)
// buttonClasses.root() returns a string
// buttonClasses.label() returns a string
```

#### **Exhaustive Checking** ✅

CLS ensures you **never miss a case** in your styling logic through intelligent type checking:

```typescript
const Button = cls({
  variant: {
    size: ['sm', 'md', 'lg'],
    variant: ['default', 'primary', 'danger']
  }
}, definition);

// TypeScript provides IntelliSense for all valid variants
const button = Button.create(({ what }) => {
  const size = what.variant({ size: 'lg' });        // ✅ IntelliSense shows: 'sm' | 'md' | 'lg'
  const variant = what.variant({ variant: 'primary' }); // ✅ IntelliSense shows: 'default' | 'primary' | 'danger'
  
  return { size, variant };
});

// If you try to use an invalid variant, TypeScript catches it immediately
const invalidButton = Button.create(({ what }) => {
  const size = what.variant({ size: 'xl' });        // ❌ TypeScript error: 'xl' not assignable
  const variant = what.variant({ variant: 'super' }); // ❌ TypeScript error: 'super' not assignable
  
  return { size, variant };
});

// Even in your own functions, TypeScript ensures you handle all cases
const getButtonColor = (variant: 'default' | 'primary' | 'danger') => {
  switch (variant) {
    case 'default': return 'gray';
    case 'primary': return 'blue';
    case 'danger': return 'red';
    // TypeScript error: Function lacks ending return statement
    // This ensures you handle all possible variants!
  }
};
```

#### **Type-Safe Extensions** 🔧

When you extend components, TypeScript ensures **compatibility** at every level:

```typescript
const BaseButton = cls(baseContract, baseDefinition);

// TypeScript ensures this extension is compatible
const ExtendedButton = BaseButton.extend({
  variant: {
    size: ['sm', 'md', 'lg', 'xl'], // Added 'xl'
    variant: ['default', 'primary', 'danger', 'success'] // Added 'success'
  }
}, extendedDefinition);

// TypeScript knows ExtendedButton has all the new variants
const button = ExtendedButton.create({ size: 'xl', variant: 'success' }); // ✅ Valid!
```

#### **The Bottom Line** 💡

**Type safety as foundation** means:
- **Bugs are caught at compile time** before they reach production
- **Your IDE provides intelligent suggestions** that actually make sense
- **Refactoring is safe** because TypeScript catches all the broken references
- **Your styling system is self-documenting** through types
- **Runtime errors become impossible** for type-related issues

It's like having a **very smart code reviewer** who never sleeps and catches every single mistake! 🧠✨

So remember: **in CLS, type safety isn't a feature – it's the foundation that makes everything else rock-solid!** 🚀🛡️

### 2.7 Performance by Design <a id="27-performance-by-design"></a>

Performance isn't something CLS achieves by accident – it's **built into the design** from day one! ⚡ In CLS, every feature is optimized for speed, memory efficiency, and runtime performance. No compromises! 🎯

#### **Lazy Evaluation: Only Compute What You Need** 🦥

CLS doesn't generate all possible style combinations upfront. Instead, it **computes styles on-demand** when you actually need them:

```typescript
const Button = cls(contract, definition);

// No styles are computed yet - just the component definition
const button = Button.create({ size: 'lg', variant: 'primary' });

// Styles are computed only when you call the methods
const rootClasses = button.root(); // Computed now!
const labelClasses = button.label(); // Computed now!
const iconClasses = button.icon(); // Computed now!

// If you never call iconClasses, that computation never happens!
```

#### **Smart Caching: Remember What You've Already Done** 🧠

Once CLS computes styles for a specific variant combination, it **remembers the result** within that instance:

```typescript
const Button = cls(contract, definition);

// Create one instance
const button = Button.create(({ what }) => ({
  variant: what.variant({ 
    size: 'lg', 
    variant: 'primary' 
  })
}));

// First call - computes and caches
const classes1 = button.root(); // Computes and caches

// Second call - uses cached result instantly!
const classes2 = button.root(); // Returns cached result instantly!

// Third call - still cached!
const classes3 = button.root(); // Returns cached result instantly!

// But each create() call creates a new instance with its own cache
const button2 = Button.create(({ what }) => ({
  variant: what.variant({ 
    size: 'lg', 
    variant: 'primary' 
  })
}));
const classes4 = button2.root(); // New computation, new cache entry
```

#### **Minimal Runtime Overhead** 🚀

The actual runtime code in CLS is **extremely lightweight**:

```typescript
// What happens when you call button.root()?
// 1. Check cache for existing result
// 2. If not cached, apply rules based on variants
// 3. Cache the result
// 4. Return the string

// That's it! No complex algorithms, no heavy computations
// Just simple rule matching and string concatenation
```

#### **TypeScript Does the Heavy Lifting** 💪

Most of the "complexity" in CLS is **compile-time TypeScript types**:

```typescript
// This looks complex...
const Button = cls({
  variant: {
    size: ['sm', 'md', 'lg'],
    variant: ['default', 'primary', 'danger']
  }
}, definition);

// But at runtime, it's just:
// - A simple object with variant values
// - A function that applies rules
// - Some basic string operations

// All the type checking, validation, and complex logic
// happens at compile time, not runtime!
```

#### **Memory Efficiency** 💾

CLS is designed to **minimize memory footprint**:

```typescript
// Each component instance is lightweight
const button = Button.create({ size: 'lg' });

// button object contains:
// - Variant values (just strings)
// - Reference to the component definition
// - Cached results (only what you've computed)

// No unnecessary objects, no deep cloning, no memory waste
```

#### **The Bottom Line** 💡

**Performance by design** means:
- **Styles are computed only when needed** (lazy evaluation)
- **Results are cached for instant reuse** (smart caching)
- **Runtime overhead is minimal** (lightweight operations)
- **TypeScript handles complexity** (compile-time optimization)
- **Memory usage is efficient** (no waste)

It's like having a **very fast, very smart styling system** that only does work when you actually need it! ⚡✨

So remember: **in CLS, performance isn't an afterthought – it's the foundation that makes everything feel instant!** 🚀💨

### 2.8 Simplicity Beneath Complexity <a id="28-simplicity-beneath-complexity"></a>

At first glance, CLS might look **incredibly complex** with all its types, contracts, and rules. But here's the beautiful secret: **the complexity is mostly an illusion!** 🎭✨

#### **What Looks Complex (But Isn't)** 🤔

When you see CLS code, you might think:

```typescript
// "This looks so complicated!" 😱
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
}, ({ what, def }) => ({
  rules: [
    def.root({
      root: what.token(["color.bg.default", "color.text.default"])
    }),
    def.rule(what.variant({ size: 'lg' }), {
      root: what.css(['px-6', 'py-3'])
    })
  ],
  defaults: def.defaults({
    size: 'md',
    variant: 'default'
  })
}));
```

**But what's actually happening?** You're just defining:
- What tokens exist
- What slots exist  
- What variants exist
- What styles to apply when

That's it! No magic, no hidden complexity! 🎯

#### **The Simple Building Blocks** 🧱

CLS is built from just **three simple concepts**:

**1. Contracts** - Define what's possible
```typescript
const contract = {
  variant: { size: ['sm', 'md', 'lg'] }
};
```

**2. Definitions** - Define what happens
```typescript
const definition = ({ what, def }) => ({
  rules: [
    def.root({ root: what.css(['px-4', 'py-2']) }),
    def.rule(what.variant({ size: 'lg' }), {
      root: what.css(['px-6', 'py-3'])
    })
  ],
  defaults: def.defaults({ size: 'md' })
});
```

**3. Instances** - Use what you defined
```typescript
const Button = cls(contract, definition);
const button = Button.create(({ what }) => ({
  variant: what.variant({ size: 'lg' })
}));
```

**That's literally it!** Everything else is just variations of these three concepts! 🎯

#### **TypeScript Does the Heavy Lifting** 💪

Most of the "complexity" you see is **TypeScript types working behind the scenes**:

```typescript
// This looks complex...
const Button = cls(contract, definition);

// But at runtime, it's just:
// - A function that takes variants
// - A function that returns CSS classes
// - Some basic string operations

// All the "complex" type checking happens at compile time!
// Your users never see the complexity – they just get the benefits! ✨
```

#### **The User Experience is Simple** 🎯

For developers using your components, CLS is **incredibly simple**:

```typescript
// They just do this:
const button = Button.create(({ what }) => ({
  variant: what.variant({ size: 'lg', variant: 'primary' })
}));

// And get this:
const classes = button.root(); // "px-6 py-3 bg-blue-500 text-white"
```

**No complex configuration, no mysterious behavior, no hidden gotchas!** 🚫

#### **Complexity vs Simplicity** ⚖️

**What looks complex:**
- Type definitions
- Contract structures
- Rule systems

**What actually is complex:**
- Nothing! It's all simple building blocks! 🧱

**What users see:**
- Simple API calls
- Predictable results
- Type safety everywhere

#### **The Bottom Line** 💡

**Simplicity beneath complexity** means:
- **The building blocks are simple** (contracts, definitions, instances)
- **TypeScript handles the complexity** (compile-time magic)
- **Users get a simple experience** (just call create and use)
- **Developers get powerful tools** (without the complexity)

It's like having a **very smart but simple interface** – all the complexity is hidden behind a clean, simple API! 🎯✨

So remember: **don't be intimidated by the types – the actual usage is as simple as it gets!** 🚀

### 2.9 CSS Connection <a id="29-css-connection"></a>

CLS is **not** CSS-in-JS, but it needs to connect to CSS somehow! 🎯 The question is: **how do you bridge the gap** between your CLS components and your actual CSS? There are two main approaches, each with their own trade-offs! ⚖️

#### **Approach 1: Direct Class Injection** 🎯

The **simplest approach** is to put your CSS classes directly into your CLS definitions:

```typescript
const Button = cls(contract, ({ what, def }) => ({
  rules: [
    def.root({
      root: what.css([
        'px-4', 'py-2', 'rounded', 'font-medium',
        'bg-gray-100', 'text-gray-800', 'border', 'border-gray-300'
      ])
    }),
    def.rule(what.variant({ variant: 'primary' }), {
      root: what.css(['bg-blue-500', 'text-white', 'border-blue-600'])
    })
  ],
  defaults: def.defaults({ variant: 'default' })
}));
```

**Pros:** ✅
- **Simple and direct** - no extra files to maintain
- **Immediate results** - classes work right away
- **No build step** - just write and use

**Cons:** ❌
- **Tight coupling** - CSS classes are hardcoded in your components
- **No CSS variables** - can't easily change colors/themes
- **Harder to maintain** - updating styles means changing component code

> **Key benefit:** This approach has a **huge win** when used with existing styling solutions like **TailwindCSS**, **UnoCSS**, or similar utility-first CSS frameworks! 🎯✨
> 
> Since you're already using these frameworks, you get:
> - **Instant access** to all their utility classes
> - **No additional setup** - just use what you already have
> - **Perfect integration** with your existing design system
> - **Zero learning curve** for your team
> - **Immediate productivity** boost

#### **Approach 2: CSS Variables Bridge** 🌉

The **more flexible approach** is to use CSS variables as a bridge between CLS and CSS:

```typescript
// In your CLS definition
const Button = cls(contract, ({ what, def }) => ({
  rules: [
    def.root({
      root: what.css([
        'px-4', 'py-2', 'rounded', 'font-medium',
        'bg-[--bg-color-default]', 'text-[--text-color-default]'
      ])
    }),
    def.rule(what.variant({ variant: 'primary' }), {
      root: what.css(['bg-[--bg-color-primary]', 'text-[--text-color-primary]'])
    })
  ],
  defaults: def.defaults({ variant: 'default' })
}));

// In your CSS file (just define the variables)
:root {
  --bg-color-default: #f3f4f6;
  --text-color-default: #1f2937;
  --bg-color-primary: #3b82f6;
  --text-color-primary: #ffffff;
}

// That's it! TailwindCSS handles the rest automatically
// No need for additional CSS rules - arbitrary values work out of the box!
```

**Pros:** ✅
- **Theme switching** - change variables to switch themes
- **Design system consistency** - variables defined in one place
- **Runtime flexibility** - can change values without rebuilding

**Cons:** ❌
- **Manual maintenance** - you must keep CLS and CSS in sync
- **More complex setup** - need to manage both files
- **Potential for mismatches** - CLS might reference non-existent variables

#### **The CLS Philosophy** 🎯

CLS doesn't **force** you to choose one approach over the other. Instead, it gives you the **flexibility** to decide based on your needs:

> **💡 CLS Pro Tip:** We recommend using the **first approach** with a single source of tokens (like `ThemeCls`), so it doesn't matter if you use direct classes like `bg-gray-100` – you still have **one place to change everything** when needed! 🎯✨

```typescript
// You can mix both approaches in the same component
const Button = cls(contract, ({ what, def }) => ({
  rules: [
    def.root({
      root: what.css([
        // Direct classes for layout (rarely change)
        'px-4', 'py-2', 'rounded', 'font-medium',
        
        // CSS variables for theming (change often)
        'bg-[--bg-color-default]', 'text-[--text-color-default]'
      ])
    })
  ]
}));
```

#### **When to Use Each Approach** 🤔

**Use Direct Classes When:**
- Building simple, single-theme applications
- You want the fastest possible setup
- Your design system is stable and won't change

**Use CSS Variables When:**
- Building multi-theme applications
- You need runtime theme switching
- Your design system evolves frequently
- You want to maintain design tokens in CSS

#### **The Bottom Line** 💡

**CSS Connection** means:
- **CLS handles the logic** (when to apply what styles)
- **CSS handles the presentation** (what the styles actually look like)
- **You choose the bridge** (direct classes or CSS variables)
- **Flexibility over dogma** (use what works for your project)

It's like having a **smart styling system** that works with your existing CSS infrastructure rather than replacing it! 🎯✨

So remember: **CLS doesn't replace CSS – it makes CSS smarter and more organized!** 🚀

---

## 3. Core API <a id="3-core-api"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Design Philosophy](#2-design-philosophy)** | **[→ Next Chapter: Rules System](#4-rules-system)**

### 3.1 `cls()` Function <a id="31-cls-function"></a>

The **`cls()` function** is the heart and soul of CLS – it's where the magic begins! ✨ This function takes your contract and definition, and transforms them into a **powerful, type-safe styling component** that you can use throughout your application! 🎯

#### **What Does `cls()` Do?** 🤔

Think of `cls()` as a **styling module factory** that:

1. **Takes your contract** - defines what's possible
2. **Takes your definition** - defines what happens
3. **Returns a CLS instance** - ready to create styled elements

```typescript
// The basic pattern
const MyModule = cls(contract, definition);

// Now you can use it!
const instance = MyModule.create(({ what }) => ({
  variant: what.variant({ size: 'lg', variant: 'primary' })
}));
```

#### **Contract: Define What's Possible** 📋

The first parameter is your **contract** - it defines the structure of your component:

```typescript
const buttonClsContract = {
  // What tokens are available
  tokens: {
    "color.bg": ["default", "primary", "danger"],
    "color.text": ["default", "primary", "danger"]
  },
  
  // What slots exist
  slot: ["root", "label", "icon"],
  
  // What variants are possible
  variant: {
    size: ["sm", "md", "lg"],
    variant: ["default", "primary", "danger"]
  }
};
```

**The contract is like a blueprint** that tells CLS exactly what your styling module can do! 🏗️

#### **Definition: Define What Happens** 🎭

The second parameter is your **definition** - it defines how your component behaves:

```typescript
const buttonClsDefinition = ({ what, def }) => ({
  // Rules that determine styling
  rules: [
    // Base styles
    def.root({
      root: what.css(['px-4', 'py-2', 'rounded', 'font-medium']),
      label: what.css(['text-sm', 'font-medium']),
      icon: what.css(['w-4', 'h-4'])
    }),
    
    // Variant-specific styles
    def.rule(what.variant({ size: 'lg' }), {
      root: what.css(['px-6', 'py-3', 'text-lg'])
    }),
    
    def.rule(what.variant({ variant: 'primary' }), {
      root: what.css(['bg-blue-500', 'text-white'])
    })
  ],
  
  // Default values
  defaults: def.defaults({
    size: 'md',
    variant: 'default'
  })
});
```

**The definition is like the implementation** that makes your styling blueprint come to life! 🚀

#### **Putting It All Together** ✨

When you call `cls()`, you get a **fully functional CLS instance**:

```typescript
const ButtonCls = cls(buttonClsContract, buttonClsDefinition);

// Now you can:
const button = ButtonCls.create(({ what }) => ({
  variant: what.variant({ size: 'lg', variant: 'primary' })
}));

// And use it:
const rootClasses = button.root();   // "px-6 py-3 text-lg bg-blue-500 text-white"
const labelClasses = button.label(); // "text-sm font-medium"
const iconClasses = button.icon();   // "w-4 h-4"
```

#### **Type Safety Everywhere** 🛡️

The `cls()` function provides **complete type safety**:

```typescript
const ButtonCls = cls(buttonClsContract, buttonClsDefinition);

// TypeScript knows exactly what's valid
const button = ButtonCls.create(({ what }) => ({
  size: what.variant({ size: 'lg' }),        // ✅ Valid
  variant: what.variant({ variant: 'primary' }), // ✅ Valid
  
  // TypeScript will catch these errors:
  // size: what.variant({ size: 'xl' }),     // ❌ 'xl' not in contract
  // variant: what.variant({ variant: 'super' }) // ❌ 'super' not in contract
}));
```

#### **The Bottom Line** 💡

**`cls()` function** means:
- **One function call** creates your entire styling module
- **Contract defines structure** - what's possible
- **Definition defines behavior** - what happens
- **Type safety guaranteed** - compile-time validation
- **Ready to use** - instant styling power

It's like having a **magic wand** that transforms your ideas into fully functional, type-safe styling modules! 🪄✨

So remember: **`cls()` is where your styling dreams become reality!** 🚀

### 3.2 `extend()` Method <a id="32-extend-method"></a>

The **`extend()` method** is where CLS really shines – it's your **inheritance superpower**! 🦸‍♂️✨ With `extend()`, you can take an existing CLS instance and create a new one that **inherits everything** while adding new capabilities! 🚀

#### **What Does `extend()` Do?** 🤔

Think of `extend()` as **evolution in action**:

1. **Takes your existing CLS instance** - the "parent"
2. **Takes a new contract** - defines what's new
3. **Takes a new definition** - defines new behavior
4. **Returns an enhanced CLS instance** - with all the old + new capabilities

```typescript
// Start with a base button
const BaseButtonCls = cls(baseContract, baseDefinition);

// Extend it to create something more powerful
const ExtendedButtonCls = BaseButtonCls.extend(extendedContract, extendedDefinition);

// Now you have both the old and new capabilities!
```

#### **Inheritance: The Gift That Keeps on Giving** 🎁

When you extend a CLS instance, you get **everything** from the parent:

```typescript
// Base button with basic capabilities
const BaseButtonCls = cls({
  variant: {
    size: ['sm', 'md', 'lg'],
    variant: ['default', 'primary']
  }
}, ({ what, def }) => ({
  rules: [
    def.root({
      root: what.css(['px-4', 'py-2', 'rounded', 'font-medium'])
    })
  ],
  defaults: def.defaults({
    size: 'md',
    variant: 'default'
  })
}));

// Extended button that adds new capabilities
const ExtendedButtonCls = BaseButtonCls.extend({
  variant: {
    size: ['xl'],                            // Only add 'xl' - others inherited automatically
    variant: ['success', 'danger'],          // Only add new variants - others inherited
    state: ['idle', 'loading', 'disabled']  // New variant group
  },
  token: {
    "color.bg": ["success", "danger"],      // New token variants
    "color.text": ["success", "danger"]     // New token variants
  }
}, ({ what, def }) => ({
  token: def.token({
    // TypeScript enforces token definitions!
    // When you define tokens in the contract above, you MUST define all their values here
    // Missing definitions = compile-time errors
    "color.bg": {
      success: ["bg-green-500"],
      danger: ["bg-red-500"]
    },
    "color.text": {
      success: ["text-green-700"],
      danger: ["text-red-700"]
    }
  }),
  rules: [
    // New rules for new variants - TypeScript will enforce these!
    def.rule(what.variant({ size: 'xl' }), {
      root: what.css(['px-8', 'py-4', 'text-xl'])
    }),
    
    def.rule(what.variant({ variant: 'success' }), {
      root: what.css(['bg-green-500', 'text-white'])
    }),
    
    def.rule(what.variant({ variant: 'danger' }), {
      root: what.css(['bg-red-500', 'text-white'])
    }),
    
    def.rule(what.variant({ state: 'loading' }), {
      root: what.css(['opacity-75', 'cursor-wait'])
    }),
    
    def.rule(what.variant({ state: 'disabled' }), {
      root: what.css(['opacity-50', 'cursor-not-allowed'])
    })
  ],
  defaults: def.defaults({
    size: 'md',
    variant: 'default',
    state: 'idle'
  })
}));
```

#### **What You Inherit** 📚

**Everything** from the parent flows down automatically:

- **All tokens** - plus any new ones you add
- **All slots** - plus any new ones you add  
- **All variants** - plus any new ones you add
- **All rules** - plus any new ones you add
- **All defaults** - which you can override

**Important:** You only need to define the **new variants** you want to add. The parent variants are inherited automatically!

**TypeScript Enforcement:** When you define **tokens** in your contract, TypeScript will **force you to define all their values** - otherwise you'll get compile-time errors! 🛡️

**Note:** Inheritance is **append-only** - you cannot remove parent variants, only add new ones! 🎯

```typescript
// ExtendedButtonCls now has:
// - Inherited variants: size: ['sm', 'md', 'lg'], variant: ['default', 'primary']
// - New variants: size: ['xl'], variant: ['success', 'danger'], state: ['idle', 'loading', 'disabled']
// - All original rules + new rules
// - All original defaults (can be overridden)
```

#### **Contract Inheritance: Append-Only** 🎯

The extended contract **inherits everything** from the parent and **adds new capabilities**:

```typescript
// ✅ Add new variants (inherits all parent variants)
const ExtendedButtonCls = BaseButtonCls.extend({
  variant: {
    size: ['xl'],                    // Add new size
    variant: ['success', 'danger'],  // Add new variants
    state: ['loading', 'disabled']   // Add new variant group
  }
}, extendedDefinition);

// Result: ExtendedButtonCls has ALL parent variants + new ones
// - size: ['sm', 'md', 'lg'] (inherited) + ['xl'] (new) = ['sm', 'md', 'lg', 'xl']
// - variant: ['default', 'primary'] (inherited) + ['success', 'danger'] (new) = ['default', 'primary', 'success', 'danger']
// - state: ['loading', 'disabled'] (new)
```

**The key point:** Inheritance is **append-only** - you get everything from the parent plus your additions! 🚀

#### **Real-World Example: Design System Evolution** 🌱

```typescript
// Start with a theme that contains tokens
const ThemeCls = cls({
  tokens: {
    "color.bg": ["default", "primary", "success", "danger", "warning"],
    "color.text": ["default", "primary", "success", "danger", "warning"],
    "spacing.padding": ["sm", "md", "lg", "xl"],
    "border.radius": ["none", "sm", "md", "lg", "full"]
  }
}, themeDefinition);

// Create a base button that extends the theme
const BaseButtonCls = ThemeCls.extend({
  slot: ["root", "label", "icon"],
  variant: {
    size: ["sm", "md", "lg"],
    variant: ["default", "primary", "success", "danger"]
  }
}, baseButtonDefinition);

// Create specialized button variants
const PrimaryButtonCls = BaseButtonCls.extend({
  variant: {
    variant: ["primary", "secondary", "tertiary"]
  }
}, primaryButtonDefinition);

const LargeButtonCls = BaseButtonCls.extend({
  variant: {
    size: ["xl", "2xl"]
  }
}, largeButtonDefinition);

// Now you have a complete design system with shared tokens!
```

#### **The Bottom Line** 💡

**`extend()` method** means:
- **Inheritance without limits** - build on what you already have
- **Design system evolution** - grow your components over time
- **Code reuse** - never rewrite what already works
- **Type safety** - TypeScript ensures compatibility
- **Flexibility** - add new capabilities without breaking existing ones

It's like having a **styling evolution machine** that lets your components grow and adapt over time! 🧬✨

So remember: **`extend()` is your ticket to building powerful, scalable design systems!** 🚀

### 3.3 `create()` Method <a id="33-create-method"></a>

The **`create()` method** is where the magic happens – it's your **styling instance factory**! ✨ With `create()`, you take your CLS instance and generate a **concrete, styled element** that you can use in your application! 🎯

#### **What Does `create()` Do?** 🤔

Think of `create()` as the **final step** in your styling journey:

1. **Takes your CLS instance** - the styling "template"
2. **Takes a configuration callback** - defines the specific variants
3. **Returns a styled instance** - ready to use with CSS classes

```typescript
// Your CLS instance (the template)
const ButtonCls = cls(contract, definition);

// Create a specific button (the instance)
const button = ButtonCls.create(({ what }) => ({
  variant: what.variant({ size: 'lg', variant: 'primary' })
}));

// Now you can use it!
const rootClasses = button.root(); // "px-6 py-3 text-lg bg-blue-500 text-white"
```

#### **The Configuration Callback** ⚙️

The `create()` method takes a callback that receives **type-safe tools**:

```typescript
ButtonCls.create(({ what, def, override }) => {
  // what - for creating variant configurations
  // def - for creating definition structures  
  // override - for creating override configurations
  
  return {
    variant: what.variant({ 
      size: 'lg',
      variant: 'primary',
      disabled: false
    })
  };
});
```

**The callback gives you access to the same tools** you use in definitions, but for runtime configuration! 🛠️

#### **Variant Configuration with what.variant()** 🎭

The main way to configure your instance is through `what.variant()`:

```typescript
const button = ButtonCls.create(({ what }) => ({
  variant: what.variant({ 
    size: 'lg',        // Large size
    variant: 'primary', // Primary variant
    disabled: false     // Not disabled
  })
}));

// You can also use variables for cleaner code
const button = ButtonCls.create(({ what }) => {
  const size = 'lg';
  const variant = 'primary';
  const disabled = false;
  
  return {
    variant: what.variant({ size, variant, disabled })
  };
});
```

#### **Type Safety in Action** 🛡️

TypeScript ensures you **only use valid variants**:

```typescript
const ButtonCls = cls({
  variant: {
    size: ['sm', 'md', 'lg'],
    variant: ['default', 'primary', 'danger']
  }
}, definition);

const button = ButtonCls.create(({ what }) => ({
  variant: what.variant({ 
    size: 'lg',        // ✅ Valid
    variant: 'primary', // ✅ Valid
    
    // TypeScript will catch these errors:
    // size: 'xl',           // ❌ 'xl' not in contract
    // variant: 'super',      // ❌ 'super' not in contract
    // unknown: 'value'       // ❌ 'unknown' not in contract
  })
}));
```

#### **Using Your Styled Instance** 🎨

Once created, your instance provides **methods for each slot**:

```typescript
const button = ButtonCls.create(({ what }) => ({
  variant: what.variant({ size: 'lg', variant: 'primary' })
}));

// Access styles for each slot
const rootClasses = button.root();   // "px-6 py-3 text-lg bg-blue-500 text-white"
const labelClasses = button.label(); // "text-sm font-medium"
const iconClasses = button.icon();   // "w-4 h-4"

// Use in your HTML/JSX
const html = `
  <button class="${rootClasses}">
    <span class="${labelClasses}">Click me</span>
    <svg class="${iconClasses}">...</svg>
  </button>
`;
```

#### **Caching and Performance** ⚡

Each `create()` call creates a **new instance with its own cache**:

```typescript
// First call - computes and caches
const button1 = ButtonCls.create(({ what }) => ({
  variant: what.variant({ size: 'lg', variant: 'primary' })
}));
const classes1 = button1.root(); // Computes and caches

// Second call - new instance, new cache
const button2 = ButtonCls.create(({ what }) => ({
  variant: what.variant({ size: 'lg', variant: 'primary' })
}));
const classes2 = button2.root(); // Computes and caches

// But multiple calls on the same instance use cache
const classes3 = button1.root(); // Uses cached result
const classes4 = button1.root(); // Uses cached result
```

#### **The Bottom Line** 💡

**`create()` method** means:
- **Runtime configuration** - define variants when you need them
- **Type-safe variants** - TypeScript ensures validity
- **Slot-based access** - get styles for each part of your component
- **Performance optimized** - caching for repeated access
- **Ready to use** - instant styling power

It's like having a **styling factory** that creates perfectly configured, type-safe styling instances on demand! 🏭✨

So remember: **`create()` transforms your CLS template into a working styling instance!** 🚀

### 3.4 `use()` Method <a id="34-use-method"></a>

The **`use()` method** is your **styling compatibility checker** – it's like having a **type-safe bridge** from specialized to general CLS instances! 🌉✨ With `use()`, you can assign a **more specific** CLS instance to a **more general** one, but only if they're **compatible** according to TypeScript's strict rules! 🎯

#### **What Does `use()` Do?** 🤔

Think of `use()` as a **type-safe assignment operator** that:

1. **Takes a more specific CLS instance** - the "specialized" component
2. **Checks compatibility** - ensures the specialized one can work with the general one
3. **Returns the same instance** - but now TypeScript allows the assignment

**Important:** `use()` is **purely a TypeScript type hack** - it doesn't change any runtime behavior! 🎭 It just convinces TypeScript that the assignment is safe.

```typescript
// You have two CLS instances
const ButtonCls = cls(buttonContract, buttonDefinition);           // General button
const SpecialButtonCls = cls(specialButtonContract, specialDefinition); // Specialized button

// You want to use SpecialButtonCls's styling in ButtonCls
const EnhancedButton = ButtonCls.use(SpecialButtonCls);

// Now EnhancedButton has ButtonCls's capabilities + SpecialButtonCls's enhancements!
```

#### **Type Safety in Action** 🛡️

The `use()` method is **incredibly strict** about compatibility:

```typescript
// ✅ Compatible: ButtonCls can use SpecialButtonCls
const ButtonCls = cls({
  variant: { size: ['sm', 'md', 'lg'] },
  slot: ['root']
}, definition);

const SpecialButtonCls = cls({
  variant: { size: ['sm', 'md', 'lg'] },  // Same variants
  slot: ['root', 'icon']                   // Superset of slots
}, definition);

// This works! SpecialButtonCls has everything ButtonCls has
const EnhancedButton = ButtonCls.use(SpecialButtonCls);

// ❌ Incompatible: Different variant values
const SmallButtonCls = cls({
  variant: { size: ['xs', 'sm'] },  // Different size values
  slot: ['root']
}, definition);

// This fails! TypeScript knows they're incompatible
const EnhancedButton = ButtonCls.use(SmallButtonCls); // Error!
```

#### **When to Use `use()`** 🎯

**Perfect for:**
- **Composing components** - combine styling from multiple sources
- **Theme switching** - apply different theme instances
- **Component libraries** - reuse styling across different components
- **Design system consistency** - ensure components share the same base styles

**Not for:**
- **Inheritance** - use `extend()` for that
- **Runtime changes** - use `create()` for that
- **Merging styles** - use `merge()` for that

#### **Real-World Example** 🌍

```typescript
// Base button with common styling
const ButtonCls = cls({
  variant: { size: ['sm', 'md', 'lg'] },
  slot: ['root']
}, ({ what, def }) => ({
  rules: [
    def.root({
      root: what.css(['px-4', 'py-2', 'rounded', 'font-medium'])
    })
  ],
  defaults: def.defaults({ size: 'md' })
}));

// Special button with enhanced capabilities
const SpecialButtonCls = cls({
  variant: { size: ['sm', 'md', 'lg'] },
  slot: ['root', 'icon']
}, ({ what, def }) => ({
  rules: [
    def.root({
      root: what.css(['inline-flex', 'items-center', 'gap-2']),
      icon: what.css(['w-4', 'h-4'])
    })
  ],
  defaults: def.defaults({ size: 'md' })
}));

// Use special button's styling in base button
const EnhancedButton = ButtonCls.use(SpecialButtonCls);

// Now EnhancedButton is just ButtonCls with TypeScript allowing the assignment
// - Runtime behavior: Exactly the same as ButtonCls
// - TypeScript behavior: Allows assignment because SpecialButtonCls is compatible
// - No actual styling changes or enhancements are applied
```

#### **Compatibility Rules** 📋

For `use()` to work, the **specialized CLS instance** must be **compatible** with the **general CLS instance**:

**✅ Compatible:**
- Same variant values (or superset)
- Same slot names (or superset)
- Same token structure (or superset)

**❌ Incompatible:**
- Different variant values
- Different slot names
- Different token structures
- Missing required capabilities

#### **It's Just a Type Hack!** 🎭

**Important clarification:** `use()` doesn't actually **do** anything at runtime:

```typescript
const ButtonCls = cls(contract, definition);
const SpecialButtonCls = cls(specialContract, specialDefinition);

// This is just a type assertion - no runtime changes!
const EnhancedButton = ButtonCls.use(SpecialButtonCls);

// At runtime, EnhancedButton is identical to ButtonCls
// The .use() call is purely for TypeScript's benefit
```

**What `use()` actually does:**
- ✅ **Compile time**: Convinces TypeScript the assignment is safe
- ✅ **Runtime**: Absolutely nothing - zero performance impact
- ✅ **Behavior**: The instance behaves exactly the same
- ✅ **Purpose**: Allows type-safe assignments in your code

#### **The Bottom Line** 💡

**`use()` method** means:
- **Type-safe assignment** - only compatible instances can be assigned
- **Zero runtime impact** - it's purely a TypeScript type hack
- **Design system compatibility** - ensure components can work together
- **No actual changes** - the instance behaves exactly the same

It's like having a **smart type assertion** that convinces TypeScript your assignment is safe, without changing anything at runtime! 🎯✨

So remember: **`use()` is your type-safe bridge between compatible CLS instances!** 🌉🚀

### 3.5 `merge()` Utility <a id="35-merge-utility"></a>

The **`merge()` utility** is your **user + internal configuration merger** – it's like having a **smart bridge** between user input and internal component state! 🌉✨ With `merge()`, you can combine user-provided styling configurations (like `cls` from props) with internal component logic (like disabled states) without any black magic! 🎯

#### **What Does `merge()` Do?** 🤔

Think of `merge()` as a **component state merger** that:

1. **Takes user input** - styling config from component props (like `cls`)
2. **Takes internal state** - component's internal styling logic (like `() => ({variant: { disabled: true }})`)
3. **Returns merged config** - user preferences + internal state, ready for `create()`

```typescript
import { merge } from '@use-pico/cls';

// Merge user preferences with internal state
// ! Note this is not necessary as `merge` is called inside .create(), this is example only
const mergedConfig = merge(
  ({ what }) => ({ variant: what.variant({ size: 'lg', variant: 'primary', disabled: false }) }), // User wants disabled: false
  ({ what }) => ({ variant: what.variant({ disabled: true }) })                                   // Internal sets disabled: true
);
// Result: { variant: { size: 'lg', variant: 'primary', disabled: false } } - user wins!

// Now use it with create()
const button = ButtonCls.create(mergedConfig);
```

#### **Perfect for Component Props + Internal State** 🎭

`merge()` shines when you need to **combine user input with internal component logic**:

```typescript
// User input from component props
// Component<typeof ButtonCls> provides:
// - cls?: (props: WhatUtil<ButtonContract>) => Partial<CreateConfig<ButtonContract>>
// - tva?: ButtonCls (the cls instance for styling)
interface ButtonProps extends Component<typeof ButtonCls> {
  disabled?: boolean;
  loading?: boolean;
}

// Component implementation
const Button = ({ cls, disabled, loading, ...props }: ButtonProps) => {
   // Create styled instance
  const button = ButtonCls.create(cls, ({ what }) => ({
    variant: what.variant({
      disabled: disabled || false,
      loading: loading || false
    })
  }));
  
  return <button className={button.root()} {...props} />;
};
```

#### **Smart Merging Behavior** 🧠

`merge()` follows **clear precedence rules** when combining configurations:

```typescript
// Merge: user wins over internal for conflicts
const merged = merge(
  ({ what }) => ({ variant: what.variant({ size: 'lg', variant: 'primary' }) }),
  ({ what }) => ({ variant: what.variant({ disabled: true }) })
);
// Result: { variant: { size: 'lg', variant: 'primary', disabled: true } }

// User preferences take precedence over internal state
const finalConfig = merge(
  ({ what }) => ({ variant: what.variant({ size: 'sm', disabled: false }) }), // User wants disabled: false
  ({ what }) => ({ variant: what.variant({ disabled: true }) })              // Internal sets disabled: true
);
// Result: { variant: { size: 'sm', disabled: false } } - user wins!
```

#### **Real-World Example** 🌍

```typescript
// Component that needs to merge user cls with internal state
const Button = ({ cls, disabled, loading, ...props }: ButtonProps) => {
  // Create styled instance - .create() handles merging internally!
  const button = ButtonCls.create(cls, ({ what }) => ({
    variant: what.variant({
      disabled: disabled || false,
      loading: loading || false
    })
  }));
  
  return <button className={button.root()} {...props} />;
};

// Usage - user can override internal state
<Button 
  cls={({ what }) => ({ variant: what.variant({ disabled: false })} // Override internal disabled state
  disabled={true} // Component prop
/>
```

#### **Type Safety Guaranteed** 🛡️

`merge()` maintains **full type safety** throughout the merging process:

```typescript
// TypeScript knows exactly what you're merging
const config1: CreateConfig<ButtonContract> = { variant: { size: 'lg' } };
const config2: CreateConfig<ButtonContract> = { variant: { variant: 'primary' } };

// Result is perfectly typed
const merged: CreateConfig<ButtonContract> = merge(config1, config2);

// TypeScript ensures this is valid
const button = ButtonCls.create(merged);
```

#### **When to Use `merge()`** 🎯

**Perfect for:**
- **Pre-processing configs** - when you need to merge configs before passing to `.create()`
- **Config composition** - building complex configs from multiple sources
- **Library development** - when you need fine control over config merging
- **Advanced use cases** - when `.create()`'s internal merging isn't sufficient

**Not for:**
- **Simple component usage** - use `.create(userConfig, internalConfig)` instead
- **Component inheritance** - use `extend()` for that
- **Instance composition** - use `use()` for that

#### **The Bottom Line** 💡

**`merge()` utility** means:
- **User + internal merging** - combine user `cls` with component state
- **Clear precedence** - user preferences win over internal logic
- **Type safety** - maintain full TypeScript support
- **No black magic** - predictable merging behavior

It's like having a **smart bridge** between user styling preferences and internal component logic, without any mysterious behavior! 🌉✨

So remember: **`merge()` bridges user styling preferences with internal component logic!** 🚀

### 3.6 `tvc()` Helper <a id="36-tvc-helper"></a>

The **`tvc()` helper** is a **simple re-export** of the `tailwind-merge` utility – it's your **Tailwind class deduplication tool**! 🎯✨

#### **What Does `tvc()` Do?** 🤔

`tvc()` stands for **"Tailwind Value Classes"** and it's just a convenient way to use `tailwind-merge`:

```typescript
import { tvc } from '@use-pico/cls';

// Merge Tailwind classes with smart deduplication
const classes = tvc(
  'px-4 py-2 rounded',           // Base classes
  'px-6',                        // Override padding
  'bg-blue-500 text-white'       // Add colors
);
// Result: "py-2 rounded px-6 bg-blue-500 text-white"
// Note: px-4 was overridden by px-6
```

#### **Perfect for Dynamic Classes** 🎭

Great when you need to **conditionally combine** Tailwind classes:

```typescript
const getButtonClasses = (size: 'sm' | 'md' | 'lg', variant: 'default' | 'primary') => {
  return tvc(
    'px-4 py-2 rounded font-medium', // Base styles
    size === 'lg' && 'px-6 py-3 text-lg', // Size variants
    size === 'sm' && 'px-2 py-1 text-sm',
    variant === 'primary' && 'bg-blue-500 text-white', // Color variants
    variant === 'default' && 'bg-gray-100 text-gray-800'
  );
};
```

#### **The Bottom Line** 💡

**`tvc()` helper** means:
- **Tailwind class merging** - smart deduplication and override handling
- **Simple re-export** - no additional logic, just convenience
- **Perfect integration** - works seamlessly with CLS and TailwindCSS
- **Zero learning curve** - if you know `tailwind-merge`, you know `tvc()`

It's like having a **smart class combiner** that handles Tailwind conflicts automatically! 🎯✨

So remember: **`tvc()` is just `tailwind-merge` with a shorter name!** 🚀

---

### 3.7 What Utility <a id="37-what-utility"></a>

The **`what` utility** is your **styling intent clarifier** – it gives meaningful names to styling operations and provides **type-safe tools** for creating definitions! 🎯✨

#### **What Does `what` Do?** 🤔

Think of `what` as a **semantic wrapper** that makes your styling code **self-documenting**:

```typescript
// Instead of this (unclear intent):
def.root({
  root: ['px-4', 'py-2', 'rounded'] // What is this? Just an array?
})

// Use this (clear intent):
def.root({
  root: what.css(['px-4', 'py-2', 'rounded']) // Ah, these are CSS classes!
})
```

**The main purpose:** When you read `what.css()`, `what.variant()`, etc., you immediately understand **what you're doing** - it's much more readable than plain objects! 🧠

#### **3.7.1 `what.css()` <a id="371-whatcss"></a>

**Purpose:** Create **CSS class-based styling** with clear intent:

```typescript
def.root({
  root: what.css(['px-4', 'py-2', 'rounded', 'font-medium']),
  label: what.css(['text-sm', 'font-medium']),
  icon: what.css(['w-4', 'h-4'])
});
```

**Why `what.css()` instead of plain arrays?**
- ✅ **Clear intent** - you're defining CSS classes
- ✅ **Type safety** - TypeScript knows these are CSS classes
- ✅ **Readability** - `what.css()` is self-documenting
- ✅ **Consistency** - all styling uses the same pattern

#### **3.7.2 `what.token()` <a id="372-whattoken"></a>

**Purpose:** Create **token-based styling** with clear intent:

```typescript
def.token({
  "color.bg": {
    default: what.token(['bg-gray-100']),
    primary: what.token(['bg-blue-500']),
    danger: what.token(['bg-red-500'])
  }
});
```

**Why `what.token()` instead of plain arrays?**
- ✅ **Clear intent** - you're defining design tokens
- ✅ **Type safety** - TypeScript knows these are token values
- ✅ **Semantic meaning** - tokens vs classes are clearly distinguished
- ✅ **Contract compliance** - ensures tokens match your contract

#### **3.7.3 `what.both()` <a id="373-whatboth"></a>

**Purpose:** Create **combined CSS + token styling** with clear intent:

```typescript
def.root({
  root: what.both(
    ['px-4', 'py-2', 'rounded'],           // CSS classes
    ['color.bg.default', 'color.text.default'] // Design tokens
  )
});
```

**Why `what.both()` instead of plain objects?**
- ✅ **Clear intent** - you're combining both CSS and tokens
- ✅ **Type safety** - TypeScript knows the structure
- ✅ **Explicit combination** - shows you're using both approaches
- ✅ **Flexibility** - mix CSS classes with design tokens

#### **3.7.4 `what.variant()` <a id="374-whatvariant"></a>

**Purpose:** Create **variant configurations** with clear intent:

```typescript
def.rule(what.variant({ size: 'lg' }), {
  root: what.css(['px-6', 'py-3', 'text-lg'])
});

def.rule(what.variant({ variant: 'primary' }), {
  root: what.css(['bg-blue-500', 'text-white'])
});
```

**Why `what.variant()` instead of plain objects?**
- ✅ **Clear intent** - you're defining variant conditions
- ✅ **Type safety** - TypeScript validates variant values
- ✅ **Contract compliance** - ensures variants exist in your contract
- ✅ **IntelliSense** - autocomplete for valid variant values

#### **The Bottom Line** 💡

**`what` utility** means:
- **Semantic clarity** - `what.css()` is clearer than plain arrays
- **Type safety** - full TypeScript support for all operations
- **Readability** - self-documenting code that's easy to understand
- **Consistency** - unified pattern for all styling operations

It's like having a **styling language** that makes your intent crystal clear! 🎯✨

So remember: **`what` gives meaning to your styling operations and makes code readable!** 🚀

---

### 3.8 Definition Helpers <a id="38-definition-helpers"></a>

The **Definition Helpers** are your **styling structure builders** – they provide type-safe, semantic ways to create the different parts of your CLS definitions! 🏗️✨

#### **What Do Definition Helpers Do?** 🤔

Think of definition helpers as **specialized constructors** that ensure your styling definitions are **properly structured** and **type-safe**:

```typescript
// Instead of plain objects (error-prone):
const definition = {
  rules: [
    { match: { size: 'lg' }, slot: { root: ['px-6', 'py-3'] } } // ❌ No type safety
  ]
};

// Use definition helpers (type-safe):
const definition = ({ what, def }) => ({
  rules: [
    def.rule(what.variant({ size: 'lg' }), { 
      root: what.css(['px-6', 'py-3']) 
    })
  ]
});
```

**The main purpose:** Definition helpers ensure your styling structures are **correctly formatted** and **fully typed**! 🛡️

#### 3.8.1 `def.root()` <a id="381-defroot"></a>

**Purpose:** Create **base styling** that's always applied to slots:

```typescript
def.root({
  root: what.css(['px-4', 'py-2', 'rounded', 'font-medium']),
  label: what.css(['text-sm', 'font-medium']),
  icon: what.css(['w-4', 'h-4'])
})
```

**Why `def.root()` instead of plain objects?**
- ✅ **Type safety** - ensures slots match your contract
- ✅ **Semantic meaning** - clearly indicates "base styles"
- ✅ **Contract compliance** - validates slot names
- ✅ **IntelliSense** - autocomplete for valid slots

#### 3.8.2 `def.rule()` <a id="382-defrule"></a>

**Purpose:** Create **conditional styling rules** based on variant combinations:

```typescript
def.rule(what.variant({ size: 'lg' }), {
  root: what.css(['px-6', 'py-3', 'text-lg'])
}),

def.rule(what.variant({ variant: 'primary' }), {
  root: what.css(['bg-blue-500', 'text-white'])
})
```

**Why `def.rule()` instead of plain objects?**
- ✅ **Type safety** - validates variant combinations
- ✅ **Semantic meaning** - clearly indicates "conditional rules"
- ✅ **Contract compliance** - ensures variants exist
- ✅ **IntelliSense** - autocomplete for valid variants

#### 3.8.3 `def.token()` <a id="383-deftoken"></a>

**Purpose:** Create **design token definitions** that map tokens to CSS classes:

```typescript
def.token({
  "color.bg": {
    default: what.token(['bg-gray-100']),
    primary: what.token(['bg-blue-500']),
    danger: what.token(['bg-red-500'])
  },
  "color.text": {
    default: what.token(['text-gray-800']),
    primary: what.token(['text-white']),
    danger: what.token(['text-white'])
  }
})
```

**Why `def.token()` instead of plain objects?**
- ✅ **Type safety** - ensures tokens match your contract
- ✅ **Semantic meaning** - clearly indicates "token definitions"
- ✅ **Contract compliance** - validates token structure
- ✅ **IntelliSense** - autocomplete for valid tokens

#### 3.8.4 `def.defaults()` <a id="384-defdefaults"></a>

**Purpose:** Create **default variant values** that are always applied:

```typescript
def.defaults({
  size: 'md',
  variant: 'default',
  disabled: false
})
```

**Why `def.defaults()` instead of plain objects?**
- ✅ **Type safety** - ensures defaults match your contract
- ✅ **Semantic meaning** - clearly indicates "default values"
- ✅ **Contract compliance** - validates variant names
- ✅ **IntelliSense** - autocomplete for valid variants

#### **The Bottom Line** 💡

**Definition Helpers** mean:
- **Type-safe construction** - no more plain object errors
- **Semantic clarity** - `def.root()` vs just `{ root: ... }`
- **Contract compliance** - automatic validation of your structures
- **Developer experience** - IntelliSense and compile-time safety

It's like having **smart constructors** that ensure your styling definitions are always correct! 🎯✨

So remember: **Definition helpers make your styling structures type-safe and semantic!** 🚀
---

### 3.9 Override Helpers <a id="39-override-helpers"></a>

The **Override Helpers** are your **"nuclear option" styling tools** – they provide the same functionality as definition helpers but with `override: true` by default! ☢️✨

#### **What Do Override Helpers Do?** 🤔

Think of override helpers as **definition helpers on steroids** – they're designed for scenarios where you need to **completely replace** existing styling rather than **append** to it:

```typescript
// Regular definition helper (appends):
def.rule(what.variant({ size: 'lg' }), {
  root: what.css(['px-6', 'py-3']) // Adds to existing styles
});

// Override helper (replaces):
override.rule(what.variant({ size: 'lg' }), {
  root: what.css(['px-6', 'py-3']) // Replaces ALL existing styles
});
```

**The main purpose:** Override helpers give you **explicit control** over when you want to **start fresh** instead of **building on top** of existing styles! 🎯

#### 3.9.1 `override.root()` <a id="391-overrideroot"></a>

**Purpose:** Create **base styling that completely replaces** existing root styles:

```typescript
override.root({
  root: what.css(['px-8', 'py-4', 'text-xl', 'font-bold']), // Replaces ALL root styles
  label: what.css(['text-lg', 'font-semibold']),              // Replaces ALL label styles
  icon: what.css(['w-6', 'h-6'])                              // Replaces ALL icon styles
})
```

**When to use `override.root()`:**
- ✅ **Complete style replacement** - you want a fresh start
- ✅ **Theme switching** - completely different visual appearance
- ✅ **Component variants** - entirely different styling approach
- ✅ **Debugging** - clear out inherited styles

#### 3.9.2 `override.rule()` <a id="392-overriderule"></a>

**Purpose:** Create **conditional rules that completely replace** existing styles:

```typescript
override.rule(what.variant({ size: 'xl' }), {
  root: what.css(['px-10', 'py-5', 'text-2xl']) // Replaces ALL existing root styles
}),

override.rule(what.variant({ variant: 'danger' }), {
  root: what.css(['bg-red-600', 'text-white', 'border-red-700']) // Fresh danger styling
})
```

**When to use `override.rule()`:**
- ✅ **Complete variant overrides** - entirely different styling for variants
- ✅ **State changes** - completely different appearance for states
- ✅ **Size variations** - entirely different layout for sizes
- ✅ **Theme overrides** - completely different visual theme

#### 3.9.3 `override.token()` <a id="393-overridetoken"></a>

**Purpose:** Create **token definitions that completely replace** existing tokens:

```typescript
override.token({
  "color.bg": {
    default: what.token(['bg-gray-900']), // Replaces ALL background tokens
    primary: what.token(['bg-blue-600']),
    danger: what.token(['bg-red-600'])
  }
})
```

**When to use `override.token()`:**
- ✅ **Complete token replacement** - entirely new color scheme
- ✅ **Theme switching** - completely different design tokens
- ✅ **Brand overrides** - entirely different brand colors
- ✅ **Dark mode** - completely inverted color palette

> **💡 Important Note:** `override.token()` is **not intended for definitions** - it's designed for runtime overrides in `.create()`, `cls` props, or `slot()` calls where you want to override tokens. In definitions, use regular `def.token()` instead!

#### **Override vs Append Behavior** ⚖️

**Regular helpers (append):**
```typescript
def.rule(what.variant({ size: 'lg' }), {
  root: what.css(['px-6', 'py-3']) // Adds to existing styles
});
// Result: existing styles + px-6 py-3
```

**Override helpers (replace):**
```typescript
override.rule(what.variant({ size: 'lg' }), {
  root: what.css(['px-6', 'py-3']) // Replaces ALL existing styles
});
// Result: ONLY px-6 py-3 (everything else is dropped)
```

#### **The Bottom Line** 💡

**Override Helpers** mean:
- **Explicit control** - `override.` clearly indicates replacement behavior
- **Fresh starts** - completely replace existing styling when needed
- **Same API** - familiar interface with different behavior
- **Clear intent** - immediately obvious you're overriding, not appending

It's like having **"reset buttons"** for your styling that let you start completely fresh! 🎯✨

So remember: **Override helpers give you explicit control over when to replace instead of append!** 🚀

---

## 4. Rules System <a id="4-rules-system"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Core API](#3-core-api)** | **[→ Next Chapter: Tokens](#5-tokens)**

The **Rules System** is the **heart of CLS styling logic** – it determines **when** and **how** styles are applied based on variant combinations! 🎯✨

#### **What Are Rules?** 🤔

Think of rules as **conditional styling instructions** that say:

> *"When these variants are active, apply these styles to these slots"*

```typescript
// Rule: "When size is 'lg', make the root element larger"
def.rule(what.variant({ size: 'lg' }), {
  root: what.css(['px-6', 'py-3', 'text-lg'])
}),

// Rule: "When variant is 'primary', make it blue"
def.rule(what.variant({ variant: 'primary' }), {
  root: what.css(['bg-blue-500', 'text-white'])
})
```

**Rules are the decision-makers** that transform your variant combinations into actual styling! 🧠

### 4.1 Root Rules <a id="41-root-rules"></a>

**Root Rules** are your **foundation styles** – they're **always applied** regardless of variants! 🏗️✨

#### **What Are Root Rules?** 🤔

Think of root rules as the **base layer** of your styling that **never changes**:

```typescript
def.root({
  root: what.css(['px-4', 'py-2', 'rounded', 'font-medium']), // Always applied
  label: what.css(['text-sm', 'font-medium']),                   // Always applied
  icon: what.css(['w-4', 'h-4'])                                // Always applied
})
```

**Root rules are your styling constants** – they provide the **foundation** that all variants build upon! 🎯

#### **When to Use Root Rules** 🎭

**Perfect for:**
- **Base styling** - padding, margins, borders, typography
- **Layout properties** - positioning, sizing, flexbox
- **Common styles** - colors, shadows, transitions that don't change
- **Slot definitions** - establishing the basic structure

**Not for:**
- **Variant-specific styles** - use conditional rules instead
- **Dynamic content** - use runtime overrides instead
- **Theme variations** - use token overrides instead

#### **Root Rules in Action** 🌟

```typescript
const ButtonCls = cls(contract, ({ what, def }) => ({
  rules: [
    // Root rules - always applied
    def.root({
      root: what.css([
        'inline-flex', 'items-center', 'gap-2',  // Layout
        'px-4', 'py-2', 'rounded', 'font-medium', // Base styling
        'transition-colors', 'duration-200'        // Interactions
      ]),
      label: what.css(['text-sm', 'font-medium']),
      icon: what.css(['w-4', 'h-4'])
    }),
    
    // Conditional rules - applied based on variants
    def.rule(what.variant({ size: 'lg' }), {
      root: what.css(['px-6', 'py-3', 'text-lg'])
    })
  ]
}));
```

#### **The Bottom Line** 💡

**Root Rules** mean:
- **Foundation styles** - the base layer that never changes
- **Always applied** - regardless of variant combinations
- **Performance optimized** - no conditional logic needed
- **Clear structure** - establishes the basic component appearance

It's like having a **solid foundation** that all your styling variations build upon! 🎯✨

So remember: **Root rules are your styling constants - they're always there!** 🚀

### 4.2 Conditional Rules <a id="42-conditional-rules"></a>

**Conditional Rules** are your **variant-driven styling** – they apply styles **only when specific conditions are met**! 🎭✨

#### **What Are Conditional Rules?** 🤔

Think of conditional rules as **smart styling decisions** that say:

> *"If this variant is active, then apply these styles"*

```typescript
// Rule: "If size is 'lg', then make it larger"
def.rule(what.variant({ size: 'lg' }), {
  root: what.css(['px-6', 'py-3', 'text-lg'])
}),

// Rule: "If variant is 'primary', then make it blue"
def.rule(what.variant({ variant: 'primary' }), {
  root: what.css(['bg-blue-500', 'text-white'])
})
```

**Conditional rules are your styling logic** – they make your components **adapt and respond** to different states! 🧠

#### **Single Variant Rules** 🎯

**Simple conditions** based on one variant:

```typescript
// Size-based rules
def.rule(what.variant({ size: 'sm' }), {
  root: what.css(['px-2', 'py-1', 'text-sm'])
}),

def.rule(what.variant({ size: 'md' }), {
  root: what.css(['px-4', 'py-2', 'text-base'])
}),

def.rule(what.variant({ size: 'lg' }), {
  root: what.css(['px-6', 'py-3', 'text-lg'])
})
```

#### **Multiple Variant Rules** 🔀

**Complex conditions** based on multiple variants:

```typescript
// Combined variant rules
def.rule(what.variant({ size: 'lg', variant: 'primary' }), {
  root: what.css(['px-6', 'py-3', 'text-lg', 'bg-blue-500', 'text-white'])
}),

def.rule(what.variant({ size: 'lg', variant: 'danger' }), {
  root: what.css(['px-6', 'py-3', 'text-lg', 'bg-red-500', 'text-white'])
})
```

#### **Boolean Variant Rules** ✅❌

**State-based rules** for boolean variants:

```typescript
// State-based rules
def.rule(what.variant({ disabled: true }), {
  root: what.css(['opacity-50', 'cursor-not-allowed', 'pointer-events-none'])
}),

def.rule(what.variant({ loading: true }), {
  root: what.css(['opacity-75', 'cursor-wait'])
})
```

#### **When to Use Conditional Rules** 🎭

**Perfect for:**
- **Variant-specific styling** - different appearances for different states
- **Size variations** - responsive sizing based on props
- **Color themes** - different color schemes for variants
- **Interactive states** - hover, focus, active, disabled
- **Layout changes** - different layouts for different variants

**Not for:**
- **Base styling** - use root rules instead
- **Always-applied styles** - use root rules instead
- **Runtime overrides** - use `.create()` overrides instead

#### **Conditional Rules in Action** 🌟

```typescript
const ButtonCls = cls(contract, ({ what, def }) => ({
  rules: [
    // Root rules - always applied
    def.root({
      root: what.css(['px-4', 'py-2', 'rounded', 'font-medium', 'transition-colors'])
    }),
    
    // Size-based conditional rules
    def.rule(what.variant({ size: 'sm' }), {
      root: what.css(['px-2', 'py-1', 'text-sm'])
    }),
    
    def.rule(what.variant({ size: 'lg' }), {
      root: what.css(['px-6', 'py-3', 'text-lg'])
    }),
    
    // Variant-based conditional rules
    def.rule(what.variant({ variant: 'primary' }), {
      root: what.css(['bg-blue-500', 'text-white', 'hover:bg-blue-600'])
    }),
    
    def.rule(what.variant({ variant: 'danger' }), {
      root: what.css(['bg-red-500', 'text-white', 'hover:bg-red-600'])
    }),
    
    // State-based conditional rules
    def.rule(what.variant({ disabled: true }), {
      root: what.css(['opacity-50', 'cursor-not-allowed'])
    })
  ]
}));
```

#### **The Bottom Line** 💡

**Conditional Rules** mean:
- **Smart styling** - styles that adapt to variant combinations
- **Flexible components** - one component, many appearances
- **Logical structure** - clear conditions for when styles apply
- **Performance optimized** - only compute styles when needed

It's like having **smart styling that knows when to show up** based on your component's state! 🎯✨

So remember: **Conditional rules make your components adapt and respond to different states!** 🚀

### 4.3 Rule Precedence <a id="43-rule-precedence"></a>

**Rule Precedence** is your **styling priority system** – it determines **which rules win** when multiple conditions are met! 🏆✨

#### **What Is Rule Precedence?** 🤔

Think of rule precedence as **styling accumulation order** that says:

> *"All matching rules apply their styles in the order they're defined"*

```typescript
// Rule 1: Size styling
def.rule(what.variant({ size: 'lg' }), {
  root: what.css(['px-6', 'py-3', 'text-lg'])
}),

// Rule 2: Variant styling  
def.rule(what.variant({ variant: 'primary' }), {
  root: what.css(['bg-blue-500', 'text-white'])
}),

// Rule 3: Combined styling
def.rule(what.variant({ size: 'lg', variant: 'primary' }), {
  root: what.css(['shadow-lg', 'transform', 'hover:scale-105'])
})
```

**Rule precedence ensures all matching rules apply** in the order they're defined! 🎯

#### **The Precedence Hierarchy** 📊

**Rules are evaluated in order, with all matching rules applying:**

```typescript
const ButtonCls = cls(contract, ({ what, def }) => ({
  rules: [
    // 1. Root rules (always applied first)
    def.root({
      root: what.css(['px-4', 'py-2', 'rounded', 'font-medium'])
    }),
    
    // 2. Single variant rules (applied when variants match)
    def.rule(what.variant({ size: 'lg' }), {
      root: what.css(['px-6', 'py-3', 'text-lg']) // Adds size styling
    }),
    
    def.rule(what.variant({ variant: 'primary' }), {
      root: what.css(['bg-blue-500', 'text-white']) // Adds color styling
    }),
    
    // 3. Combined variant rules (applied when all variants match)
    def.rule(what.variant({ size: 'lg', variant: 'primary' }), {
      root: what.css(['shadow-lg', 'transform']) // Adds special effects
    })
  ]
}));
```

#### **Precedence in Action** 🎭

**What happens when you create a large primary button?**

```typescript
const button = ButtonCls.create(({ what }) => ({
  variant: what.variant({ size: 'lg', variant: 'primary' })
}));

// Result: ALL rules apply in order of precedence!
const classes = button.root();
// "px-6 py-3 text-lg bg-blue-500 text-white shadow-lg transform"
// 
// Breakdown:
// - Root: px-4 py-2 rounded font-medium (base)
// - Size lg: px-6 py-3 text-lg (overrides px-4, py-2)
// - Variant primary: bg-blue-500 text-white (adds colors)
// - Combined: shadow-lg transform (adds effects)
```

#### **Why Precedence Matters** 🎯

**Predictable behavior:**
- ✅ **All matching rules apply** - no styles are lost
- ✅ **Order matters** - you control the accumulation order
- ✅ **Clear accumulation** - styles build up in definition order
- ✅ **No conflicts** - all matching rules contribute their styles

**Without precedence, you'd have:**
- ❌ **Random styling** - unpredictable accumulation order
- ❌ **Lost styles** - rules might not apply in the right sequence
- ❌ **No control** - can't determine the styling sequence

#### **Advanced Precedence Patterns** 🔀

**Using precedence for complex styling logic:**

```typescript
const CardCls = cls(contract, ({ what, def }) => ({
  rules: [
    // Base card styling
    def.root({
      root: what.css(['p-4', 'rounded-lg', 'bg-white', 'shadow-sm'])
    }),
    
    // Size variations
    def.rule(what.variant({ size: 'sm' }), {
      root: what.css(['p-2', 'text-sm'])
    }),
    
    def.rule(what.variant({ size: 'lg' }), {
      root: what.css(['p-6', 'text-lg'])
    }),
    
    // Theme variations
    def.rule(what.variant({ theme: 'dark' }), {
      root: what.css(['bg-gray-800', 'text-white'])
    }),
    
    // Combined size + theme (highest priority)
    def.rule(what.variant({ size: 'lg', theme: 'dark' }), {
      root: what.css(['border-l-4', 'border-blue-500']) // Special accent
    })
  ]
}));
```

#### **The Bottom Line** 💡

**Rule Precedence** means:
- **Predictable accumulation** - all matching rules apply in order
- **All styles apply** - no conflicts or lost styles
- **Order control** - you determine the accumulation sequence
- **Complex logic** - build sophisticated styling systems

It's like having a **smart styling system** that knows exactly which rules to apply and in what order! 🎯✨

So remember: **Rule precedence ensures predictable styling when multiple conditions are met!** 🚀

### 4.4 Appends vs Overrides <a id="44-appends-vs-overrides"></a>

#### **The Two Styling Modes** 🎭

CLS gives you **two ways** to handle styling conflicts:

1. **Append Mode** (default) - *"Add these styles to what's already there"*
2. **Override Mode** - *"Replace everything and start fresh"*

Think of it like **writing vs. rewriting** - you can either add to the story or start a new chapter! 📚

#### **Append Mode: The Default Behavior** ➕

**Append mode** means rules **add their styles** to the existing styling chain:

```typescript
const ButtonCls = cls(contract, ({ what, def }) => ({
  rules: [
    // Base styles
    def.root({
      root: what.css(['px-4', 'py-2', 'rounded', 'font-medium'])
    }),
    
    // Size variant - ADDS to base styles
    def.rule(what.variant({ size: 'lg' }), {
      root: what.css(['px-6', 'py-3', 'text-lg'])
    }),
    
    // Color variant - ADDS to base + size styles
    def.rule(what.variant({ variant: 'primary' }), {
      root: what.css(['bg-blue-500', 'text-white'])
    })
  ]
}));

// Result: px-4 py-2 rounded font-medium px-6 py-3 text-lg bg-blue-500 text-white
// All styles accumulate! 🎯
```

**What happens:**
- ✅ **Base styles** - always applied
- ✅ **Size styles** - added to base
- ✅ **Color styles** - added to base + size
- ✅ **No conflicts** - everything accumulates

#### **Override Mode: The Nuclear Option** 💥

**Override mode** means rules **replace everything** and start fresh:

```typescript
const ButtonCls = cls(contract, ({ what, def, override }) => ({
  rules: [
    // Base styles
    def.root({
      root: what.css(['px-4', 'py-2', 'rounded', 'font-medium'])
    }),
    
    // Size variant - ADDS to base styles
    def.rule(what.variant({ size: 'lg' }), {
      root: what.css(['px-6', 'py-3', 'text-lg'])
    }),
    
    // Special state - OVERRIDES everything!
    override.rule(what.variant({ state: 'loading' }), {
      root: what.css(['opacity-50', 'cursor-wait', 'pointer-events-none'])
    })
  ]
}));

// When state: 'loading' is active:
// Result: opacity-50 cursor-wait pointer-events-none
// Base and size styles are DROPPED! 💥
```

**What happens with override:**
- ❌ **Base styles** - dropped completely
- ❌ **Size styles** - dropped completely  
- ✅ **Override styles** - only these apply
- 💥 **Fresh start** - inheritance chain is ignored

#### **When to Use Each Mode** 🤔

**Use Append Mode (default) when:**
- ✅ **Building up styles** - adding variants to base
- ✅ **Inheritance matters** - you want parent styles
- ✅ **Progressive enhancement** - styles accumulate
- ✅ **Most cases** - this is what you usually want

**Use Override Mode when:**
- 🔥 **Complete reset** - you want a fresh start
- 🔥 **Special states** - loading, disabled, error states
- 🔥 **Radical changes** - completely different appearance
- 🔥 **Breaking inheritance** - you know what you're doing

#### **The Override Helpers** 🛠️

CLS provides **convenient helpers** for override mode:

```typescript
import { override } from '@use-pico/cls';

// These are equivalent:
override.rule(what.variant({ state: 'loading' }), { ... })
def.rule(what.variant({ state: 'loading' }), { override: true, ... })

// Override helpers set override: true by default
override.root({ ... })        // override: true
override.rule(condition, { ... })  // override: true  
override.token({ ... })       // override: true
```

#### **Real-World Example** 🌍

```typescript
const CardCls = cls(contract, ({ what, def, override }) => ({
  rules: [
    // Base card styling
    def.root({
      root: what.css(['bg-white', 'rounded-lg', 'shadow-md', 'p-6'])
    }),
    
    // Size variants - ADD to base
    def.rule(what.variant({ size: 'sm' }), {
      root: what.css(['p-4'])
    }),
    
    def.rule(what.variant({ size: 'lg' }), {
      root: what.css(['p-8'])
    }),
    
    // Loading state - OVERRIDES everything
    override.rule(what.variant({ loading: true }), {
      root: what.css(['bg-gray-100', 'animate-pulse', 'cursor-wait'])
    }),
    
    // Error state - OVERRIDES everything  
    override.rule(what.variant({ error: true }), {
      root: what.css(['bg-red-50', 'border-red-200', 'text-red-800'])
    })
  ]
}));
```

**Result:**
- **Normal card**: `bg-white rounded-lg shadow-md p-6` (base)
- **Small card**: `bg-white rounded-lg shadow-md p-6 p-4` (base + size)
- **Large card**: `bg-white rounded-lg shadow-md p-6 p-8` (base + size)
- **Loading card**: `bg-gray-100 animate-pulse cursor-wait` (override only)
- **Error card**: `bg-red-50 border-red-200 text-red-800` (override only)

#### **Bottom Line** 🎯

**Appends vs Overrides** gives you **complete control** over styling behavior:

- **Append** = *"Add to what's there"* (default, most common)
- **Override** = *"Replace everything"* (special cases, powerful)

**Choose wisely:**
- 🚀 **Start with append** - it's safer and more predictable
- 💥 **Use override sparingly** - when you need a complete reset
- 🎭 **Mix both modes** - build sophisticated styling systems

> **Remember:** Override mode is **powerful but dangerous** - it breaks the inheritance chain completely! Use it when you **really mean it**! ⚡

### 4.5 Rule Matching <a id="45-rule-matching"></a>

[↑ Back to Top] | [← Previous Chapter: Appends vs Overrides](#44-appends-vs-overrides) | [→ Next Chapter: Complex Match Conditions](#46-complex-match-conditions)

---

#### **How Rules Find Their Match** 🎯

Rule matching is like **playing detective** - CLS examines your variants and finds all the rules that "fit the case"! 🔍

**The matching process:**
1. **Check variants** - what's currently active?
2. **Find rules** - which rules match these variants?
3. **Apply styles** - all matching rules contribute their styles
4. **Respect order** - styles accumulate in definition order

#### **Single Variant Matching** 🎯

**Single variant rules** match when **one specific variant** is active:

```typescript
const ButtonCls = cls(contract, ({ what, def }) => ({
  rules: [
    // Base styles
    def.root({
      root: what.css(['px-4', 'py-2', 'rounded'])
    }),
    
    // Single variant rules
    def.rule(what.variant({ size: 'sm' }), {
      root: what.css(['px-2', 'py-1', 'text-sm'])
    }),
    
    def.rule(what.variant({ size: 'lg' }), {
      root: what.css(['px-6', 'py-3', 'text-lg'])
    }),
    
    def.rule(what.variant({ variant: 'primary' }), {
      root: what.css(['bg-blue-500', 'text-white'])
    }),
    
    def.rule(what.variant({ variant: 'secondary' }), {
      root: what.css(['bg-gray-500', 'text-white'])
    })
  ]
}));

// When size: 'lg' is active:
// ✅ Matches: root rule + size: 'lg' rule
// ❌ No match: size: 'sm', variant rules
// Result: px-4 py-2 rounded px-6 py-3 text-lg
```

**Matching logic:**
- ✅ **Exact match** - `size: 'lg'` matches `size: 'lg'`
- ❌ **No match** - `size: 'lg'` doesn't match `size: 'sm'`
- ❌ **No match** - `size: 'lg'` doesn't match `variant: 'primary'`

#### **Multiple Variant Matching** 🎯🎯

**Multiple variant rules** match when **all specified variants** are active:

```typescript
const ButtonCls = cls(contract, ({ what, def }) => ({
  rules: [
    // Base styles
    def.root({
      root: what.css(['px-4', 'py-2', 'rounded'])
    }),
    
    // Single variant rules
    def.rule(what.variant({ size: 'lg' }), {
      root: what.css(['px-6', 'py-3', 'text-lg'])
    }),
    
    def.rule(what.variant({ variant: 'primary' }), {
      root: what.css(['bg-blue-500', 'text-white'])
    }),
    
    // Multiple variant rule - requires BOTH to match
    def.rule(what.variant({ size: 'lg', variant: 'primary' }), {
      root: what.css(['shadow-lg', 'transform', 'hover:scale-105'])
    })
  ]
}));

// When size: 'lg' AND variant: 'primary' are active:
// ✅ Matches: root rule + size: 'lg' rule + variant: 'primary' rule + combined rule
// Result: px-4 py-2 rounded px-6 py-3 text-lg bg-blue-500 text-white shadow-lg transform hover:scale-105

// When only size: 'lg' is active:
// ✅ Matches: root rule + size: 'lg' rule
// ❌ No match: variant: 'primary' rule, combined rule
// Result: px-4 py-2 rounded px-6 py-3 text-lg
```

**Matching logic:**
- ✅ **All variants match** - `size: 'lg'` + `variant: 'primary'` matches combined rule
- ❌ **Partial match** - `size: 'lg'` alone doesn't match combined rule
- ❌ **No match** - `size: 'sm'` + `variant: 'primary'` doesn't match combined rule

#### **Boolean Variant Matching** ✅❌

**Boolean variants** are **simple true/false** values:

```typescript
const ButtonCls = cls(contract, ({ what, def }) => ({
  rules: [
    // Base styles
    def.root({
      root: what.css(['px-4', 'py-2', 'rounded'])
    }),
    
    // Boolean variant rules
    def.rule(what.variant({ disabled: true }), {
      root: what.css(['opacity-50', 'cursor-not-allowed', 'pointer-events-none'])
    }),
    
    def.rule(what.variant({ loading: true }), {
      root: what.css(['animate-spin', 'cursor-wait'])
    }),
    
    def.rule(what.variant({ fullWidth: true }), {
      root: what.css(['w-full'])
    })
  ]
}));

// When disabled: true is active:
// ✅ Matches: root rule + disabled: true rule
// ❌ No match: loading: true, fullWidth: true rules
// Result: px-4 py-2 rounded opacity-50 cursor-not-allowed pointer-events-none

// When disabled: true AND loading: true are active:
// ✅ Matches: root rule + disabled: true rule + loading: true rule
// Result: px-4 py-2 rounded opacity-50 cursor-not-allowed pointer-events-none animate-spin cursor-wait
```

**Boolean matching:**
- ✅ **True matches true** - `disabled: true` matches `disabled: true`
- ❌ **False doesn't match true** - `disabled: false` doesn't match `disabled: true`
- ✅ **Multiple booleans** - can have multiple boolean variants active

#### **The Matching Algorithm** 🧮

**CLS follows this matching logic:**

```typescript
// 1. Start with root rules (always applied)
let activeStyles = rootStyles;

// 2. Check each rule in definition order
for (const rule of rules) {
  // 3. Does the rule's condition match current variants?
  if (rule.matches(currentVariants)) {
    // 4. Apply the rule's styles
    if (rule.override) {
      // Override mode: replace everything
      activeStyles = rule.styles;
    } else {
      // Append mode: add to existing
      activeStyles = [...activeStyles, ...rule.styles];
    }
  }
}

// 5. Return final accumulated styles
return activeStyles;
```

**Key points:**
- 🔍 **All rules checked** - no rules are skipped
- 📝 **Order matters** - rules are evaluated in definition order
- ✅ **All matches apply** - multiple rules can match simultaneously
- 🎯 **No conflicts** - styles accumulate or override based on mode

#### **Real-World Matching Example** 🌍

```typescript
const CardCls = cls(contract, ({ what, def }) => ({
  rules: [
    // Base card
    def.root({
      root: what.css(['bg-white', 'rounded-lg', 'shadow-md', 'p-6'])
    }),
    
    // Size variants
    def.rule(what.variant({ size: 'sm' }), {
      root: what.css(['p-4'])
    }),
    
    def.rule(what.variant({ size: 'lg' }), {
      root: what.css(['p-8'])
    }),
    
    // Color variants
    def.rule(what.variant({ variant: 'primary' }), {
      root: what.css(['border-l-4', 'border-blue-500'])
    }),
    
    def.rule(what.variant({ variant: 'success' }), {
      root: what.css(['border-l-4', 'border-green-500'])
    }),
    
    // State variants
    def.rule(what.variant({ interactive: true }), {
      root: what.css(['hover:shadow-lg', 'transition-shadow'])
    }),
    
    // Combined variants
    def.rule(what.variant({ size: 'lg', variant: 'primary', interactive: true }), {
      root: what.css(['hover:scale-105', 'transform'])
    })
  ]
}));
```

**Matching scenarios:**

**Scenario 1: `size: 'lg'`**
- ✅ **Matches:** root + size: 'lg'
- ❌ **No match:** size: 'sm', variants, states, combined
- **Result:** `bg-white rounded-lg shadow-md p-6 p-8`

**Scenario 2: `size: 'lg'` + `variant: 'primary'`**
- ✅ **Matches:** root + size: 'lg' + variant: 'primary'
- ❌ **No match:** size: 'sm', variant: 'success', states, combined
- **Result:** `bg-white rounded-lg shadow-md p-6 p-8 border-l-4 border-blue-500`

**Scenario 3: `size: 'lg'` + `variant: 'primary'` + `interactive: true`**
- ✅ **Matches:** root + size: 'lg' + variant: 'primary' + interactive + combined
- **Result:** `bg-white rounded-lg shadow-md p-6 p-8 border-l-4 border-blue-500 hover:shadow-lg transition-shadow hover:scale-105 transform`

#### **Bottom Line** 🎯

**Rule Matching** is **predictable and powerful**:

- 🔍 **Exact matching** - variants must match exactly
- ✅ **Multiple matches** - all matching rules apply
- 📝 **Order matters** - definition order determines accumulation
- 🎭 **Append vs Override** - choose your styling behavior
- 🚀 **No magic** - you control what matches and when

**Remember:** CLS is **not guessing** - it's following your **explicit rules** to the letter! Every style that appears is there because a rule **explicitly matched** your variants! 🎯

### 4.6 Complex Match Conditions <a id="46-complex-match-conditions"></a>

[↑ Back to Top] | [← Previous Chapter: Rule Matching](#45-rule-matching) | [→ Next Chapter: Inheritance System](#5-inheritance-system)

---

#### **Beyond Simple Matching** 🧠

While CLS keeps things **simple and predictable**, you can build **sophisticated styling logic** by combining multiple rules! Think of it as **building a puzzle** where each piece fits perfectly! 🧩

**Complex matching doesn't mean complicated - it means powerful!** 💪

#### **Nested Variant Combinations** 🎯🎯🎯

**Multiple variant combinations** create **layered styling logic**:

```typescript
const ButtonCls = cls(contract, ({ what, def }) => ({
  rules: [
    // Base styles
    def.root({
      root: what.css(['px-4', 'py-2', 'rounded', 'font-medium'])
    }),
    
    // Size variants
    def.rule(what.variant({ size: 'sm' }), {
      root: what.css(['px-2', 'py-1', 'text-sm'])
    }),
    
    def.rule(what.variant({ size: 'lg' }), {
      root: what.css(['px-6', 'py-3', 'text-lg'])
    }),
    
    // Color variants
    def.rule(what.variant({ variant: 'primary' }), {
      root: what.css(['bg-blue-500', 'text-white'])
    }),
    
    def.rule(what.variant({ variant: 'secondary' }), {
      root: what.css(['bg-gray-500', 'text-white'])
    }),
    
    // State variants
    def.rule(what.variant({ disabled: true }), {
      root: what.css(['opacity-50', 'cursor-not-allowed'])
    }),
    
    // Complex combinations - 3 variants
    def.rule(what.variant({ size: 'lg', variant: 'primary', disabled: true }), {
      root: what.css(['shadow-lg', 'transform', 'hover:scale-105'])
    }),
    
    // Complex combinations - 2 variants + different state
    def.rule(what.variant({ size: 'lg', variant: 'primary', loading: true }), {
      root: what.css(['animate-pulse', 'cursor-wait'])
    })
  ]
}));
```

**Complex matching scenarios:**

**Scenario 1: `size: 'lg'` + `variant: 'primary'` + `disabled: true`**
- ✅ **Matches:** root + size: 'lg' + variant: 'primary' + disabled + complex rule
- **Result:** `px-4 py-2 rounded font-medium px-6 py-3 text-lg bg-blue-500 text-white opacity-50 cursor-not-allowed shadow-lg transform hover:scale-105`

**Scenario 2: `size: 'lg'` + `variant: 'primary'` + `loading: true`**
- ✅ **Matches:** root + size: 'lg' + variant: 'primary' + loading + complex rule
- **Result:** `px-4 py-2 rounded font-medium px-6 py-3 text-lg bg-blue-500 text-white animate-pulse cursor-wait`

**Scenario 3: `size: 'lg'` + `variant: 'primary'` (no state)**
- ✅ **Matches:** root + size: 'lg' + variant: 'primary'
- ❌ **No match:** complex rules (require all 3 variants)
- **Result:** `px-4 py-2 rounded font-medium px-6 py-3 text-lg bg-blue-500 text-white`

#### **Exclusion Patterns** 🚫

**Sometimes you want styles to apply** when **certain variants are NOT present**:

```typescript
const CardCls = cls(contract, ({ what, def }) => ({
  rules: [
    // Base card
    def.root({
      root: what.css(['bg-white', 'rounded-lg', 'shadow-md', 'p-6'])
    }),
    
    // Interactive card (when NOT disabled)
    def.rule(what.variant({ interactive: true, disabled: false }), {
      root: what.css(['hover:shadow-lg', 'transition-shadow', 'cursor-pointer'])
    }),
    
    // Disabled card (overrides interactive)
    def.rule(what.variant({ disabled: true }), {
      root: what.css(['opacity-50', 'cursor-not-allowed', 'pointer-events-none'])
    }),
    
    // Loading state (when NOT disabled)
    def.rule(what.variant({ loading: true, disabled: false }), {
      root: what.css(['animate-pulse', 'cursor-wait'])
    })
  ]
}));
```

**Exclusion logic:**
- ✅ **Interactive + not disabled** - gets hover effects
- ❌ **Interactive + disabled** - no hover effects (disabled rule overrides)
- ✅ **Loading + not disabled** - gets loading animation
- ❌ **Loading + disabled** - no loading animation (disabled rule overrides)

#### **Conditional Slot Styling** 🎭

**Different slots** can have **different matching logic**:

```typescript
const FormFieldCls = cls(contract, ({ what, def }) => ({
  rules: [
    // Base styles
    def.root({
      root: what.css(['flex', 'flex-col', 'gap-2']),
      label: what.css(['text-sm', 'font-medium', 'text-gray-700']),
      input: what.css(['px-3', 'py-2', 'border', 'rounded-md', 'focus:ring-2'])
    }),
    
    // Error state - affects multiple slots
    def.rule(what.variant({ error: true }), {
      root: what.css(['text-red-600']),
      label: what.css(['text-red-600']),
      input: what.css(['border-red-300', 'focus:ring-red-500'])
    }),
    
    // Size variants - only affect input slot
    def.rule(what.variant({ size: 'sm' }), {
      input: what.css(['px-2', 'py-1', 'text-sm'])
    }),
    
    def.rule(what.variant({ size: 'lg' }), {
      input: what.css(['px-4', 'py-3', 'text-lg'])
    }),
    
    // Disabled state - affects all slots
    def.rule(what.variant({ disabled: true }), {
      root: what.css(['opacity-50']),
      label: what.css(['cursor-not-allowed']),
      input: what.css(['cursor-not-allowed', 'bg-gray-100'])
    })
  ]
}));
```

**Slot-specific matching:**
- **Error state** - affects root, label, and input slots
- **Size variants** - only affect input slot
- **Disabled state** - affects all slots
- **Combined states** - all matching rules apply to their respective slots

#### **Advanced Matching Strategies** 🚀

**Build sophisticated styling systems** with **strategic rule ordering**:

```typescript
const AlertCls = cls(contract, ({ what, def, override }) => ({
  rules: [
    // Base alert
    def.root({
      root: what.css(['p-4', 'rounded-lg', 'border-l-4', 'font-medium'])
    }),
    
    // Type variants
    def.rule(what.variant({ type: 'info' }), {
      root: what.css(['bg-blue-50', 'border-blue-500', 'text-blue-800'])
    }),
    
    def.rule(what.variant({ type: 'success' }), {
      root: what.css(['bg-green-50', 'border-green-500', 'text-green-800'])
    }),
    
    def.rule(what.variant({ type: 'warning' }), {
      root: what.css(['bg-yellow-50', 'border-yellow-500', 'text-yellow-800'])
    }),
    
    def.rule(what.variant({ type: 'error' }), {
      root: what.css(['bg-red-50', 'border-red-500', 'text-red-800'])
    }),
    
    // Size variants
    def.rule(what.variant({ size: 'sm' }), {
      root: what.css(['p-2', 'text-sm'])
    }),
    
    def.rule(what.variant({ size: 'lg' }), {
      root: what.css(['p-6', 'text-lg'])
    }),
    
    // Dismissible variant
    def.rule(what.variant({ dismissible: true }), {
      root: what.css(['pr-12']), // Make room for close button
      closeButton: what.css(['absolute', 'top-2', 'right-2', 'p-1', 'rounded'])
    }),
    
    // Special states - override everything
    override.rule(what.variant({ loading: true }), {
      root: what.css(['animate-pulse', 'cursor-wait'])
    }),
    
    override.rule(what.variant({ minimized: true }), {
      root: what.css(['p-2', 'text-sm', 'opacity-75'])
    })
  ]
}));
```

**Advanced matching scenarios:**

**Scenario 1: `type: 'success'` + `size: 'lg'` + `dismissible: true`**
- ✅ **Matches:** root + type: 'success' + size: 'lg' + dismissible
- **Result:** `p-4 rounded-lg border-l-4 font-medium bg-green-50 border-green-500 text-green-800 p-6 text-lg pr-12` + close button styles

**Scenario 2: `type: 'error'` + `loading: true`**
- ✅ **Matches:** root + type: 'error' + loading (override)
- **Result:** `animate-pulse cursor-wait` (only loading styles, type styles dropped)

**Scenario 3: `type: 'warning'` + `size: 'sm'` + `minimized: true`**
- ✅ **Matches:** root + type: 'warning' + size: 'sm' + minimized (override)
- **Result:** `p-2 text-sm opacity-75` (only minimized styles, others dropped)

#### **Performance Considerations** ⚡

**Complex matching is fast** because CLS is **optimized for this**:

```typescript
// ✅ Good: Clear, predictable rules
def.rule(what.variant({ size: 'lg', variant: 'primary' }), { ... })

// ✅ Good: Logical grouping
def.rule(what.variant({ type: 'error', dismissible: true }), { ... })

// ❌ Avoid: Too many variants in one rule
def.rule(what.variant({ 
  size: 'lg', 
  variant: 'primary', 
  disabled: false, 
  loading: false, 
  fullWidth: true,
  rounded: true,
  shadow: 'lg'
}), { ... })

// ✅ Better: Split into logical groups
def.rule(what.variant({ size: 'lg', variant: 'primary' }), { ... })
def.rule(what.variant({ disabled: false, loading: false }), { ... })
def.rule(what.variant({ fullWidth: true, rounded: true, shadow: 'lg' }), { ... })
```

**Performance tips:**
- 🎯 **Group related variants** - logical combinations
- 📝 **Keep rules focused** - one clear purpose per rule
- 🚀 **Order matters** - most specific rules last
- ⚡ **CLS is fast** - don't overthink it!

#### **Bottom Line** 🎯

**Complex Match Conditions** give you **unlimited styling power**:

- 🧩 **Nested combinations** - build sophisticated logic
- 🚫 **Exclusion patterns** - style when variants are NOT present
- 🎭 **Slot-specific matching** - different logic per slot
- 🚀 **Advanced strategies** - strategic rule ordering
- ⚡ **Performance optimized** - CLS handles complexity efficiently

**Remember:** **Complex doesn't mean complicated** - it means **powerful and flexible**! CLS keeps the complexity **manageable and predictable** while giving you **unlimited styling possibilities**! 🚀

**You're now a CLS Rules System master!** 🎓 Ready to explore the **Inheritance System** next? 🚀

---

## 5. Tokens <a id="5-tokens"></a>

[↑ Back to Top](#table-of-contents) | [← Previous Chapter: Rules System](#4-rules-system) | [→ Next Chapter: Variants & Defaults](#6-variants--defaults)

---

The **Tokens** chapter covers design tokens, their definitions, and how they work in the CLS system.

### 5.1 Contract Declaration <a id="51-contract-declaration"></a>

[↑ Back to Top](#table-of-contents) | [← Previous Chapter: Rules System](#4-rules-system) | [→ Next Chapter: Token Definitions](#52-token-definitions)

---

#### **What Are Token Contracts?** 🤔

Think of **token contracts** as the **blueprint** for your design system! They define **what tokens exist**, **what values they can have**, and **how they're organized** - all with **full TypeScript support**! 🏗️✨

**Token contracts are your styling DNA** - they establish the foundation that everything else builds upon! 🧬

#### **The Contract Structure** 📋

**Token contracts** define **what token groups and variants exist** in your design system:

```typescript
// Define your token contract - groups with variants
const ButtonCls = cls({
  tokens: {
    // Color tokens - group with variants
    "color.bg": ["default", "primary", "secondary", "success", "error"],
    "color.text": ["default", "primary", "secondary", "muted"],
    "color.border": ["default", "focus", "error"],
    
    // Spacing tokens - group with variants
    "spacing.padding": ["xs", "sm", "md", "lg", "xl"],
    
    // Typography tokens - group with variants
    "typography.size": ["xs", "sm", "base", "lg", "xl"],
    "typography.weight": ["normal", "medium", "semibold", "bold"]
  },
  slot: ["root", "label", "icon"],
  variant: {
    size: ["sm", "md", "lg"],
    variant: ["default", "primary", "secondary"],
    disabled: ["bool"]
  }
}, ({ what, def }) => ({
  // Definition will go here...
}));
```

**What this contract defines:**
- ✅ **Token groups** - `"color.bg"`, `"spacing.padding"`, etc.
- ✅ **Token variants** - `["default", "primary", "secondary"]` for each group
- ✅ **Available slots** - `["root", "label", "icon"]`
- ✅ **Component variants** - `size`, `variant`, `disabled`

#### **Token Enforcement Rules** ⚡

**CRITICAL:** CLS enforces different rules for **defined vs inherited tokens**:

- 🔒 **Defined in Contract = ENFORCED** - TypeScript requires definition for ALL variants
- 🔓 **Inherited from Parent = OPTIONAL** - TypeScript allows partial or no definition

**This prevents token definition gaps** and ensures **complete styling coverage**!

> **💡 CLS Pro Tip:** When extending contracts, **only specify NEW tokens/variants** you're adding. Don't re-specify inherited ones - CLS handles inheritance automatically!

#### **Token Enforcement Deep Dive** 🔍

**Why this matters for your design system:**

```typescript
// ❌ WRONG: Missing token definition
const BrokenButtonCls = cls({
  tokens: {
    "color.bg": ["default", "primary", "secondary"] // Declares 3 variants
  },
  slot: ["root"],
  variant: {}
}, ({ what, def }) => ({
  token: def.token({
    "color.bg": {
      default: ["bg-gray-100"],
      primary: ["bg-blue-500"]
      // ❌ Missing "secondary" - TypeScript ERROR!
    }
  })
}));

// ✅ CORRECT: Complete token definition
const WorkingButtonCls = cls({
  tokens: {
    "color.bg": ["default", "primary", "secondary"] // Declares 3 variants
  },
  slot: ["root"],
  variant: {}
}, ({ what, def }) => ({
  token: def.token({
    "color.bg": {
      default: ["bg-gray-100"],
      primary: ["bg-blue-500"],
      secondary: ["bg-gray-500"]  // ✅ All variants defined
    }
  })
}));
```

**Inheritance behavior:**

```typescript
// Base with enforced tokens
const BaseCls = cls({
  tokens: { "color.bg": ["default", "primary"] },
  slot: ["root"],
  variant: {}
}, ({ what, def }) => ({
  token: def.token({
    "color.bg": {
      default: ["bg-gray-100"],  // 🔒 ENFORCED
      primary: ["bg-blue-500"]   // 🔒 ENFORCED
    }
  })
}));

// Extended - only new tokens enforced
const ExtendedCls = BaseCls.extend({
  tokens: { 
    "color.bg": ["success"],      // ✅ Only add NEW variant
    "color.text": ["default", "primary"]  // ✅ Add NEW token group
  },
  slot: ["root"],
  variant: {}
}, ({ what, def }) => ({
  token: def.token({
    // 🔒 ENFORCED: Only NEW tokens
    "color.bg": {
      success: ["bg-green-500"]  // ✅ Required - new variant
    },
    "color.text": {
      default: ["text-gray-900"], // ✅ Required - new group
      primary: ["text-white"]     // ✅ Required - new group
    }
    // 🔓 OPTIONAL: Inherited tokens (color.bg.default, color.bg.primary)
    // Can be omitted, overridden, or left as-is
  })
}));
```

#### **Contract Declaration Patterns** 🎨

**Different ways** to declare your token contracts with CLS:

**Pattern 1: Inline Contract**
```typescript
const ButtonCls = cls({
  tokens: {
    "color.bg": ["default", "primary", "secondary"],
    "color.text": ["default", "primary", "secondary"],
    "spacing.padding": ["sm", "md", "lg"]
  },
  slot: ["root", "label"],
  variant: {
    size: ["sm", "md", "lg"],
    variant: ["default", "primary"]
  }
}, ({ what, def }) => ({
  // 🔒 ENFORCED: ALL declared tokens must be defined
  token: def.token({
    "color.bg": {
      default: ["bg-gray-100"],
      primary: ["bg-blue-500"],
      secondary: ["bg-gray-500"]
    },
    "color.text": {
      default: ["text-gray-900"],
      primary: ["text-white"],
      secondary: ["text-gray-700"]
    },
    "spacing.padding": {
      sm: ["px-2", "py-1"],
      md: ["px-4", "py-2"],
      lg: ["px-6", "py-3"]
    }
  }),
  rules: [def.root({ root: what.token(["color.bg.default", "color.text.default", "spacing.padding.md"]) })],
  defaults: def.defaults({ size: "md", variant: "default" })
}));
```

**Pattern 2: Direct Contract Usage**
```typescript
// Use contract directly in cls() call
const ButtonCls = cls({
  tokens: {
    "color.bg": ["default", "primary", "secondary"],
    "color.text": ["default", "primary", "secondary"],
    "spacing.padding": ["sm", "md", "lg"]
  },
  slot: ["root", "label"],
  variant: {
    size: ["sm", "md", "lg"],
    variant: ["default", "primary"]
  }
}, ({ what, def }) => ({
  // 🔒 ENFORCED: ALL declared tokens must be defined
  token: def.token({
    "color.bg": {
      default: ["bg-gray-100"],
      primary: ["bg-blue-500"],
      secondary: ["bg-gray-500"]
    },
    "color.text": {
      default: ["text-gray-900"],
      primary: ["text-white"],
      secondary: ["text-gray-700"]
    },
    "spacing.padding": {
      sm: ["px-2", "py-1"],
      md: ["px-4", "py-2"],
      lg: ["px-6", "py-3"]
    }
  }),
  rules: [def.root({ root: what.token(["color.bg.default", "color.text.default", "spacing.padding.md"]) })],
  defaults: def.defaults({ size: "md", variant: "default" })
}));
```

**Pattern 3: Extended Contract with Token Enforcement**
```typescript
// Base CLS instance
const BaseButtonCls = cls({
  tokens: {
    "color.bg": ["default", "primary"],
    "spacing.padding": ["md"]
  },
  slot: ["root"],
  variant: {
    size: ["md"],
    variant: ["default"]
  }
}, ({ what, def }) => ({
  // Base definition - ALL tokens MUST be defined
  token: def.token({
    "color.bg": {
      default: ["bg-gray-100"],
      primary: ["bg-blue-500"]
    },
    "spacing.padding": {
      md: ["px-4", "py-2"]
    }
  }),
  rules: [def.root({ root: what.token(["color.bg.default", "spacing.padding.md"]) })],
  defaults: def.defaults({ size: "md", variant: "default" })
}));

// Extended CLS instance - inherits from base
const ExtendedButtonCls = BaseButtonCls.extend({
  tokens: {
    "color.bg": ["success"],                // ✅ Only add NEW variant
    "color.text": ["default", "primary"]    // ✅ Add NEW token group
  },
  slot: ["root", "label"],       // Add new slot
  variant: {
    size: ["sm", "lg"],          // ✅ Only add NEW variants
    loading: ["bool"]            // ✅ Add NEW variant
  }
}, ({ what, def }) => ({
  // Extended definition - ONLY NEW tokens are enforced!
  token: def.token({
    // 🔒 ENFORCED: Only NEW tokens added in this contract
    "color.bg": {
      success: ["bg-green-500"]  // ✅ Required - new variant
    },
    "color.text": {
      default: ["text-gray-900"], // ✅ Required - new token group
      primary: ["text-white"]     // ✅ Required - new token group
    }
    // 🔓 OPTIONAL: Inherited tokens (color.bg.default, color.bg.primary, spacing.padding.md)
    // TypeScript won't complain if you don't define them
  }),
  rules: [
    def.root({
      root: what.token(["color.bg.default", "color.text.default"]),
      label: what.css(["font-medium"])
    })
  ],
  defaults: def.defaults({ size: "md", variant: "default", loading: false })
}));
```

#### **Type Safety Benefits** 🛡️

**Token contracts provide** **compile-time guarantees** in CLS:

```typescript
const ButtonCls = cls({
  tokens: {
    "color.bg": ["default", "primary", "secondary"],
    "color.text": ["default", "primary", "secondary"]
  },
  slot: ["root"],
  variant: {
    variant: ["default", "primary", "secondary"]
  }
}, ({ what, def }) => ({
  // 🔒 ENFORCED: ALL declared tokens must be defined
  token: def.token({
    "color.bg": {
      default: ["bg-gray-100"],
      primary: ["bg-blue-500"],
      secondary: ["bg-gray-500"]  // ✅ Required - declared in contract
    },
    "color.text": {
      default: ["text-gray-900"],
      primary: ["text-white"],
      secondary: ["text-gray-700"] // ✅ Required - declared in contract
    }
  }),
  
  rules: [
    def.root({
      root: what.css(['px-4', 'py-2', 'rounded'])
    }),
    
    // ✅ TypeScript knows these tokens exist
    def.rule(what.variant({ variant: 'primary' }), {
      root: what.token(['color.bg.primary', 'color.text.primary'])  // ✅ Valid
    }),
    
    // ✅ TypeScript knows this token exists
    def.rule(what.variant({ variant: 'secondary' }), {
      root: what.token(['color.bg.secondary', 'color.text.secondary']) // ✅ Valid
    }),
    
    // ❌ TypeScript error - token doesn't exist in contract
    def.rule(what.variant({ variant: 'error' }), {
      root: what.token(['color.bg.error'])    // ❌ Error!
    })
  ]
}));
```

**What TypeScript enforces:**
- ✅ **Valid tokens** - only declared tokens can be used
- ✅ **Correct paths** - token paths must match contract exactly
- ✅ **Type consistency** - all tokens are strings
- ✅ **IntelliSense** - autocomplete for all available tokens

#### **Real-World Contract Example** 🌍

**A practical button component contract in CLS:**

```typescript
// Button component with direct contract
const ButtonCls = cls({
  tokens: {
    // Color tokens - group with variants
    "color.bg": ["default", "primary", "secondary", "success", "error"],
    "color.text": ["default", "primary", "secondary", "muted"],
    "color.border": ["default", "focus", "error"],
    
    // Spacing tokens - group with variants
    "spacing.padding": ["xs", "sm", "md", "lg"],
    
    // Typography tokens - group with variants
    "typography.size": ["sm", "base", "lg"],
    "typography.weight": ["medium", "semibold"],
    
    // Component-specific tokens - group with variants
    "button.radius": ["sm", "md", "lg"],
    "button.shadow": ["none", "md", "lg"]
  },
  slot: ["root", "label", "icon"],
  variant: {
    size: ["sm", "md", "lg"],
    variant: ["default", "primary", "secondary", "success", "error"],
    disabled: ["bool"],
    loading: ["bool"]
  }
}, ({ what, def }) => ({
  // 🔒 ENFORCED: ALL declared tokens must be defined
  token: def.token({
    "color.bg": {
      default: ["bg-gray-100"],
      primary: ["bg-blue-500"],
      secondary: ["bg-gray-500"],
      success: ["bg-green-500"],
      error: ["bg-red-500"]
    },
    "color.text": {
      default: ["text-gray-900"],
      primary: ["text-white"],
      secondary: ["text-gray-700"],
      muted: ["text-gray-500"]
    },
    "color.border": {
      default: ["border-gray-300"],
      focus: ["border-blue-500"],
      error: ["border-red-500"]
    },
    "spacing.padding": {
      xs: ["px-2", "py-1"],
      sm: ["px-3", "py-1.5"],
      md: ["px-4", "py-2"],
      lg: ["px-6", "py-3"]
    },
    "typography.size": {
      sm: ["text-sm"],
      base: ["text-base"],
      lg: ["text-lg"]
    },
    "typography.weight": {
      medium: ["font-medium"],
      semibold: ["font-semibold"]
    },
    "button.radius": {
      sm: ["rounded"],
      md: ["rounded-md"],
      lg: ["rounded-lg"]
    },
    "button.shadow": {
      none: ["shadow-none"],
      md: ["shadow"],
      lg: ["shadow-lg"]
    }
  }),
  rules: [def.root({ root: what.token(["color.bg.default", "color.text.default", "spacing.padding.md"]) })],
  defaults: def.defaults({ size: "md", variant: "default", disabled: false, loading: false })
}));
```

**This contract provides:**
- 🎨 **Token groups** - organized by design concept (color, spacing, typography)
- 🎯 **Token variants** - multiple options for each group (default, primary, secondary)
- 🎭 **Component variants** - size, variant, disabled, loading states
- 🛡️ **Type safety** - TypeScript knows exactly what tokens and variants are available
- 🚀 **CLS integration** - ready to use with cls() function

#### **Contract Best Practices** 💡

**Follow these guidelines** for robust token contracts in CLS:**

**✅ Do:**
- **Use token groups** - `"color.bg"`, `"spacing.padding"`, `"typography.size"`
- **Use descriptive variants** - `["default", "primary", "secondary"]` not `["d", "p", "s"]`
- **Group by design concept** - all color tokens together, all spacing together
- **Be consistent** - same naming patterns across similar token types
- **Document your choices** - add comments for complex decisions

**❌ Don't:**
- **Use flat dot-notation** - CLS expects groups with variants structure
- **Mix concerns** - don't put spacing variants in color token groups
- **Use abbreviations** - `["d", "p", "s"]` is hard to understand
- **Skip validation** - always use TypeScript for contracts

#### **Bottom Line** 🎯

**Token Contract Declaration** is your **CLS design system foundation**:

- 🏗️ **Token groups** - organized by design concept (color, spacing, typography)
- 🎯 **Token variants** - multiple options for each group (default, primary, secondary)
- 🔒 **Token enforcement** - declared tokens MUST be defined, inherited tokens are optional
- 🛡️ **Type safety** - compile-time guarantees prevent missing token definitions
- 🚀 **CLS integration** - ready to use with cls() function
- 🌍 **Scalability** - grows with your design system

**Remember:** **Good contracts make good CLS components!** Start with a solid token group structure, and CLS will enforce complete coverage! 🎉

Ready to learn how to **define the actual token values** in the next section? 🚀

### 5.2 Token Definitions <a id="52-token-definitions"></a>

### 5.3 Runtime Overrides <a id="53-runtime-overrides"></a>

### 5.4 Inheritance Semantics <a id="54-inheritance-semantics"></a>

### 5.5 Token Conflicts & Resolution <a id="55-token-conflicts--resolution"></a>

---

## 6. Variants & Defaults <a id="6-variants--defaults"></a>

[↑ Back to Top] | [← Previous Chapter: Tokens](#5-tokens) | [→ Next Chapter: Slots](#7-slots)

---

### 6.1 String Variants <a id="61-string-variants"></a>

### 6.2 Boolean Variants <a id="62-boolean-variants"></a>

### 6.3 Forced Defaults <a id="63-forced-defaults"></a>

### 6.4 Default Values <a id="64-default-values"></a>

### 6.5 Variant Combinations <a id="65-variant-combinations"></a>

---

## 7. Slots <a id="7-slots"></a>

[↑ Back to Top] | [← Previous Chapter: Variants & Defaults](#6-variants--defaults) | [→ Next Chapter: Inheritance](#8-inheritance)

---

### 7.1 Slot Definition <a id="71-slot-definition"></a>

### 7.2 Lazy Evaluation <a id="72-lazy-evaluation"></a>

### 7.3 Inheritance Accumulation <a id="73-inheritance-accumulation"></a>

### 7.4 Slot Overrides <a id="74-slot-overrides"></a>

### 7.5 Multi-slot Components <a id="75-multi-slot-components"></a>

---

## 8. Inheritance <a id="8-inheritance"></a>

[↑ Back to Top] | [← Previous Chapter: Slots](#7-slots) | [→ Next Chapter: React Integration](#9-react-integration)

---

### 8.1 Overview <a id="81-overview"></a>

### 8.2 Authoritative Rules <a id="82-authoritative-rules"></a>

### 8.3 Behavior Examples <a id="83-behavior-examples"></a>

### 8.4 Multi-level Inheritance <a id="84-multi-level-inheritance"></a>

### 8.5 Contract Inheritance <a id="85-contract-inheritance"></a>

### 8.6 Token Inheritance <a id="86-token-inheritance"></a>

### 8.7 Variant Inheritance <a id="87-variant-inheritance"></a>

---

## 9. React Integration <a id="9-react-integration"></a>

[↑ Back to Top] | [← Previous Chapter: Inheritance](#8-inheritance) | [→ Next Chapter: Theming & Token Overloading](#10-theming--token-overloading)

---

### 9.1 useCls Hook <a id="91-usecls-hook"></a>

### 9.2 withCls HOC <a id="92-withcls-hoc"></a>

### 9.3 Context Integration <a id="93-context-integration"></a>

### 9.4 Component Patterns <a id="94-component-patterns"></a>

### 9.5 ClsProvider & useClsContext <a id="95-clsprovider--useclscontext"></a>

---

## 10. Theming & Token Overloading <a id="10-theming--token-overloading"></a>

[↑ Back to Top] | [← Previous Chapter: React Integration](#9-react-integration) | [→ Next Chapter: Recipes & Patterns](#11-recipes--patterns)

---

### 10.1 One-time Replace <a id="101-one-time-replace"></a>

### 10.2 External Themes <a id="102-external-themes"></a>

### 10.3 Partial Themes <a id="103-partial-themes"></a>

### 10.4 Dynamic Switching <a id="104-dynamic-switching"></a>

### 10.5 Merge Precedence <a id="105-merge-precedence"></a>

### 10.6 Theme Inheritance <a id="106-theme-inheritance"></a>

---

## 11. Recipes & Patterns <a id="11-recipes--patterns"></a>

[↑ Back to Top] | [← Previous Chapter: Theming & Token Overloading](#10-theming--token-overloading) | [→ Next Chapter: Advanced Features](#12-advanced-features)

---

### 11.1 Simple Static Components <a id="111-simple-static-components"></a>

### 11.2 Variant-only Components <a id="112-variant-only-components"></a>

### 11.3 Token System Components <a id="113-token-system-components"></a>

### 11.4 Inheritance Components <a id="114-inheritance-components"></a>

### 11.5 Theme System Components <a id="115-theme-system-components"></a>

### 11.6 Runtime Customization <a id="116-runtime-customization"></a>

### 11.7 Complex Components <a id="117-complex-components"></a>

### 11.8 Edge Cases & Empty Contracts <a id="118-edge-cases--empty-contracts"></a>

---

## 12. Advanced Features <a id="12-advanced-features"></a>

[↑ Back to Top] | [← Previous Chapter: Recipes & Patterns](#11-recipes--patterns) | [→ Next Chapter: Comparison](#13-comparison)

---

### 12.1 Performance & Caching <a id="121-performance--caching"></a>

### 12.2 Large Component Trees <a id="122-large-component-trees"></a>

### 12.3 Dynamic Variants <a id="123-dynamic-variants"></a>

### 12.4 Real-world Scenarios <a id="124-real-world-scenarios"></a>

### 12.5 Type System Deep Dive <a id="125-type-system-deep-dive"></a>

---

## 13. Comparison <a id="13-comparison"></a>

[↑ Back to Top] | [← Previous Chapter: Advanced Features](#12-advanced-features) | [→ Next Chapter: FAQ & Known Limitations](#14-faq--known-limitations)

---

### 13.1 Feature Table <a id="131-feature-table"></a>

### 13.2 Code Comparisons <a id="132-code-comparisons"></a>

### 13.3 Migration Paths <a id="133-migration-paths"></a>

### 13.4 vs CVA (Class Variance Authority) <a id="134-vs-cva-class-variance-authority"></a>

### 13.5 vs TV (Tailwind Variants) <a id="135-vs-tv-tailwind-variants"></a>

### 13.6 vs Stitches <a id="136-vs-stitches"></a>

### 13.7 vs Vanilla Extract <a id="137-vs-vanilla-extract"></a>

---

## 14. FAQ & Known Limitations <a id="14-faq--known-limitations"></a>

[↑ Back to Top] | [← Previous Chapter: Comparison](#13-comparison) | [→ Next Chapter: AI Compatibility & Documentation](#15-ai-compatibility--documentation)

---

### 14.1 Frequently Asked Questions <a id="141-frequently-asked-questions"></a>

### 14.2 Known Limitations <a id="142-known-limitations"></a>

### 14.3 Troubleshooting <a id="143-troubleshooting"></a>

### 14.4 Common Pitfalls <a id="144-common-pitfalls"></a>

---

## 15. AI Compatibility & Documentation <a id="15-ai-compatibility--documentation"></a>

[↑ Back to Top] | [← Previous Chapter: FAQ & Known Limitations](#14-faq--known-limitations)

---

### 15.1 AI-First Design Philosophy <a id="151-ai-first-design-philosophy"></a>

### 15.2 Documentation Strategy <a id="152-documentation-strategy"></a>

### 15.3 Context-Aware Usage <a id="153-context-aware-usage"></a>

### 15.4 AI Assistant Integration <a id="154-ai-assistant-integration"></a>

---

## Appendix A: Glossary <a id="appendix-a-glossary"></a>

[↑ Back to Top]

---

## Appendix B: Migration Playbook <a id="appendix-b-migration-playbook"></a>

[↑ Back to Top]

### B.1 From CVA to CLS <a id="b1-from-cva-to-cls"></a>

### B.2 From TV to CLS <a id="b2-from-tv-to-cls"></a>

### B.3 From Stitches to CLS <a id="b3-from-stitches-to-cls"></a>

---

**[↑ Back to Top](#table-of-contents)**
