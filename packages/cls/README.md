# `@use-pico/cls`

## Introduction ✨ <a id="introduction"></a>

`@use-pico/cls` is a class-first styling system built for modern design systems and production apps. It works with existing CSS utilities (like Tailwind), _not_ CSS-in-JS. Its core ideas are: **design tokens** as first‑class citizens, **multi-slot** components, **explicit variants** with strong TypeScript guarantees, and a powerful **multi-level inheritance** model for scalable systems. ✨
`
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

> **Note**: `cls` is **not** `CSS‑in‑JS`; it returns class strings and works with your existing CSS (e.g., Tailwind). No runtime style injection. 🚫

## Table of Contents <a id="table-of-contents"></a>

[toc.json here]

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

**Now that you've declared your token contract**, it's time to **assign actual CSS values** to those tokens! 🎨

**Token definitions** are where the **magic happens** - you take your abstract design tokens and turn them into **real, usable CSS classes** that will be applied to your components.

#### **The Token Definition Structure** 🏗️

**Token definitions** map each token variant to **concrete CSS classes**:

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
  token: def.token({
    // 🔒 ENFORCED: Each token variant MUST have CSS values
    "color.bg": {
      default: ["bg-gray-100"],    // Maps to: bg-gray-100
      primary: ["bg-blue-500"],    // Maps to: bg-blue-500
      secondary: ["bg-gray-500"]   // Maps to: bg-gray-500
    },
    "color.text": {
      default: ["text-gray-900"],  // Maps to: text-gray-900
      primary: ["text-white"],     // Maps to: text-white
      secondary: ["text-gray-700"] // Maps to: text-gray-700
    }
  }),
  rules: [
    def.root({
      root: what.token(["color.bg.default", "color.text.default"])
    })
  ],
  defaults: def.defaults({ variant: "default" })
}));
```

**What this creates:**
- ✅ **Token mapping** - `"color.bg.primary"` → `"bg-blue-500"`
- ✅ **CSS resolution** - tokens resolve to actual CSS classes at runtime
- ✅ **Type safety** - TypeScript ensures all variants are defined
- ✅ **Reusability** - tokens can be used across multiple rules and slots

#### **Multiple CSS Classes per Token** 🎨

**Tokens can map to multiple CSS classes** for complex styling:

```typescript
const CardCls = cls({
  tokens: {
    "shadow": ["none", "sm", "md", "lg"],
    "border": ["none", "thin", "thick"]
  },
  slot: ["root"],
  variant: {}
}, ({ what, def }) => ({
  token: def.token({
    "shadow": {
      none: ["shadow-none"],
      sm: ["shadow-sm", "drop-shadow-sm"],      // Multiple classes
      md: ["shadow", "drop-shadow"],            // Multiple classes
      lg: ["shadow-lg", "drop-shadow-lg"]       // Multiple classes
    },
    "border": {
      none: [],
      thin: ["border", "border-gray-200"],      // Multiple classes
      thick: ["border-2", "border-gray-300"]    // Multiple classes
    }
  }),
  rules: [def.root({ root: what.token(["shadow.md", "border.thin"]) })],
  defaults: {}
}));
```

**Benefits of multiple classes:**
- 🎯 **Granular control** - combine multiple CSS utilities
- 🔧 **Flexibility** - mix Tailwind, custom CSS, and CSS variables
- 🎨 **Complex effects** - shadows, borders, transitions, etc.
- 🚀 **Performance** - no need for custom CSS files

#### **Using Tokens in Rules** 🎯

**Tokens come alive when used in rules** - they're the **building blocks** of your styling logic:

```typescript
const AlertCls = cls({
  tokens: {
    "color.bg": ["info", "success", "warning", "error"],
    "color.text": ["info", "success", "warning", "error"],
    "color.border": ["info", "success", "warning", "error"]
  },
  slot: ["root", "icon"],
  variant: {
    type: ["info", "success", "warning", "error"]
  }
}, ({ what, def }) => ({
  token: def.token({
    "color.bg": {
      info: ["bg-blue-50"],
      success: ["bg-green-50"],
      warning: ["bg-yellow-50"],
      error: ["bg-red-50"]
    },
    "color.text": {
      info: ["text-blue-800"],
      success: ["text-green-800"],
      warning: ["text-yellow-800"],
      error: ["text-red-800"]
    },
    "color.border": {
      info: ["border-blue-200"],
      success: ["border-green-200"],
      warning: ["border-yellow-200"],
      error: ["border-red-200"]
    }
  }),
  rules: [
    // Base styles
    def.root({
      root: what.css(['p-4', 'rounded-lg', 'border-l-4']),
      icon: what.css(['w-5', 'h-5'])
    }),
    
    // Type-specific styling using tokens
    def.rule(what.variant({ type: 'info' }), {
      root: what.token(['color.bg.info', 'color.text.info', 'color.border.info'])
    }),
    
    def.rule(what.variant({ type: 'success' }), {
      root: what.token(['color.bg.success', 'color.text.success', 'color.border.success'])
    }),
    
    def.rule(what.variant({ type: 'warning' }), {
      root: what.token(['color.bg.warning', 'color.text.warning', 'color.border.warning'])
    }),
    
    def.rule(what.variant({ type: 'error' }), {
      root: what.token(['color.bg.error', 'color.text.error', 'color.border.error'])
    })
  ],
  defaults: def.defaults({ type: 'info' })
}));
```

**How tokens work in rules:**
- 🎨 **Dynamic styling** - tokens change based on variant values
- 🔄 **Automatic resolution** - `what.token(['color.bg.info'])` → `"bg-blue-50"`
- 🎯 **Consistent theming** - same tokens used across multiple rules
- 🚀 **Performance** - tokens are resolved once and cached

#### **Token Definition Best Practices** 💡

**Follow these guidelines** for robust token definitions:

**✅ Do:**
- **Use semantic names** - `"color.bg.primary"` not `"color.bg.blue"`
- **Group related tokens** - all color tokens together, all spacing together
- **Provide all variants** - every declared token variant must have CSS values
- **Use consistent patterns** - same CSS class structure across similar tokens
- **Document complex tokens** - add comments for multi-class tokens

**❌ Don't:**
- **Leave tokens undefined** - TypeScript will error on missing variants
- **Mix CSS frameworks** - stick to one approach (Tailwind, custom, etc.)
- **Use hardcoded values** - prefer tokens over direct CSS classes in rules
- **Create too many variants** - keep token groups focused and manageable

**Example of good token organization:**

```typescript
const DesignSystemCls = cls({
  tokens: {
    // 🎨 Color system - semantic naming
    "color.bg": ["default", "primary", "secondary", "success", "error"],
    "color.text": ["default", "primary", "secondary", "muted", "inverse"],
    "color.border": ["default", "focus", "error", "success"],
    
    // 📏 Spacing system - consistent scale
    "spacing.padding": ["xs", "sm", "md", "lg", "xl"],
    "spacing.margin": ["xs", "sm", "md", "lg", "xl"],
    
    // 🔤 Typography system - semantic sizes
    "typography.size": ["xs", "sm", "base", "lg", "xl", "2xl"],
    "typography.weight": ["light", "normal", "medium", "semibold", "bold"]
  },
  slot: ["root"],
  variant: {}
}, ({ what, def }) => ({
  token: def.token({
    "color.bg": {
      default: ["bg-gray-50"],
      primary: ["bg-blue-500"],
      secondary: ["bg-gray-500"],
      success: ["bg-green-500"],
      error: ["bg-red-500"]
    },
    "color.text": {
      default: ["text-gray-900"],
      primary: ["text-blue-600"],
      secondary: ["text-gray-600"],
      muted: ["text-gray-500"],
      inverse: ["text-white"]
    },
    "color.border": {
      default: ["border-gray-300"],
      focus: ["border-blue-500"],
      error: ["border-red-500"],
      success: ["border-green-500"]
    },
    "spacing.padding": {
      xs: ["px-2", "py-1"],
      sm: ["px-3", "py-1.5"],
      md: ["px-4", "py-2"],
      lg: ["px-6", "py-3"],
      xl: ["px-8", "py-4"]
    },
    "spacing.margin": {
      xs: ["m-1"],
      sm: ["m-2"],
      md: ["m-4"],
      lg: ["m-6"],
      xl: ["m-8"]
    },
    "typography.size": {
      xs: ["text-xs"],
      sm: ["text-sm"],
      base: ["text-base"],
      lg: ["text-lg"],
      xl: ["text-xl"],
      "2xl": ["text-2xl"]
    },
    "typography.weight": {
      light: ["font-light"],
      normal: ["font-normal"],
      medium: ["font-medium"],
      semibold: ["font-semibold"],
      bold: ["font-bold"]
    }
  }),
  rules: [def.root({ root: what.token(["color.bg.default", "color.text.default", "spacing.padding.md"]) })],
  defaults: {}
}));
```

#### **Bottom Line** 🎯

**Token Definitions** are your **styling value foundation**:

- 🎨 **CSS mapping** - abstract tokens become concrete CSS classes
- 🔒 **Type enforcement** - all declared tokens must have values
- 🎯 **Rule integration** - tokens power dynamic styling in rules
- 🚀 **Performance** - resolved once, cached for reuse
- 🌍 **Design system** - consistent tokens across components

**Remember:** **Good token definitions make good design systems!** Define your tokens well, and your components will look great! 🎉

Ready to learn about **Runtime Overrides** in the next section? This will show how to dynamically change tokens at runtime! 🚀

### 5.3 Runtime Overrides <a id="53-runtime-overrides"></a>

**Tokens aren't just static definitions** - they can be **dynamically overridden** at runtime! 🎭

**Runtime overrides** allow you to **change token values** when creating component instances, making your styling system **flexible** and **context-aware**.

#### **Basic Token Overrides** 🎨

**Override specific token variants** when creating component instances:

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
    }
  }),
  rules: [
    def.root({
      root: what.token(["color.bg.default", "color.text.default"])
    }),
    def.rule(what.variant({ variant: 'primary' }), {
      root: what.token(["color.bg.primary", "color.text.primary"])
    }),
    def.rule(what.variant({ variant: 'secondary' }), {
      root: what.token(["color.bg.secondary", "color.text.secondary"])
    })
  ],
  defaults: def.defaults({ variant: 'default' })
}));

// 🎭 Runtime token overrides
const primaryButton = ButtonCls.create(({ what, override }) => ({
  variant: what.variant({ variant: 'primary' }),
  token: override.token({
    "color.bg": {
      primary: ["bg-indigo-600"]  // Override primary background
    },
    "color.text": {
      primary: ["text-indigo-50"] // Override primary text
    }
  })
}));

const secondaryButton = ButtonCls.create(({ what, override }) => ({
  variant: what.variant({ variant: 'secondary' }),
  token: override.token({
    "color.bg": {
      secondary: ["bg-emerald-500"]  // Override secondary background
    }
  })
}));
```

**What happens:**
- ✅ **Base tokens** - `"color.bg.primary"` → `"bg-blue-500"` (default)
- ✅ **Overridden tokens** - `"color.bg.primary"` → `"bg-indigo-600"` (runtime)
- ✅ **Partial overrides** - only specified tokens are changed
- ✅ **Type safety** - TypeScript ensures valid token overrides

#### **Component Prop Overrides** 🎯

**Override tokens through component props** for **user-configurable styling**:

```typescript
// Button component with tva prop for token overrides
interface ButtonProps extends Component<typeof ButtonCls> {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
}

const Button = ({ children, variant = 'default', tva = ButtonCls, cls }: ButtonProps) => {
  const classes = tva.create(cls, ({ what }) => ({
    variant: what.variant({ variant })
  })); // 🎭 User's cls prop takes precedence over internal config

  return (
    <button className={classes.root()}>
      {children}
    </button>
  );
};

// Usage with token overrides
const CustomButton = () => (
  <Button 
    variant="primary"
    cls={({ what, override }) => ({
      token: override.token({
        "color.bg": {
          primary: ["bg-purple-600"]  // User override
        },
        "color.text": {
          primary: ["text-purple-50"] // User override
        }
      })
    })}
  >
    Custom Purple Button
  </Button>
);

// Now use the enhanced version
const CustomButtonWithUse = () => (
  <Button 
    variant="primary"
    tva={ButtonCls.use(CustomButtonCls)} // Use the enhanced CLS instance
    cls={({ what, override }) => ({
      token: override.token({
        "color.bg": {
          primary: ["bg-pink-600"]  // Override for enhanced tva
        }
      })
    })}
  >
    Custom Pink Button
  </Button>
);
```

**How component overrides work:**
- 🎭 **User control** - consumers can override any tokens
- 🔄 **Merge behavior** - user's cls prop takes precedence over internal config
- 🎯 **Type safety** - TypeScript ensures valid token references
- 🚀 **Performance** - overrides are resolved at creation time

> **💡 CLS Pro Tip:** The `use` helper allows you to **assign a more specific CLS instance to a more general one**. This is useful when you want to use a specialized button variant (like `CustomButtonCls`) in place of the base button (`ButtonCls`). The `use` method is purely a **TypeScript type hack** with no runtime impact!

#### **Advanced Override Patterns** 🚀

**Combine multiple override strategies** for **powerful styling control**:

```typescript
const CardCls = cls({
  tokens: {
    "color.bg": ["default", "elevated", "muted"],
    "color.border": ["default", "focus", "error"],
    "shadow": ["none", "sm", "md", "lg"]
  },
  slot: ["root", "header", "content"],
  variant: {
    elevation: ["none", "low", "high"],
    state: ["default", "focus", "error"]
  }
}, ({ what, def }) => ({
  token: def.token({
    "color.bg": {
      default: ["bg-white"],
      elevated: ["bg-gray-50"],
      muted: ["bg-gray-100"]
    },
    "color.border": {
      default: ["border-gray-200"],
      focus: ["border-blue-500"],
      error: ["border-red-500"]
    },
    "shadow": {
      none: ["shadow-none"],
      sm: ["shadow-sm"],
      md: ["shadow"],
      lg: ["shadow-lg"]
    }
  }),
  rules: [
    def.root({
      root: what.token(["color.bg.default", "color.border.default", "shadow.none"]),
      header: what.css(["p-4", "border-b", "border-gray-200"]),
      content: what.css(["p-4"])
    }),
    def.rule(what.variant({ elevation: 'low' }), {
      root: what.token(["shadow.sm", "color.bg.elevated"])
    }),
    def.rule(what.variant({ elevation: 'high' }), {
      root: what.token(["shadow.lg", "color.bg.elevated"])
    }),
    def.rule(what.variant({ state: 'focus' }), {
      root: what.token(["color.border.focus"])
    }),
    def.rule(what.variant({ state: 'error' }), {
      root: what.token(["color.border.error"])
    })
  ],
  defaults: def.defaults({ elevation: 'none', state: 'default' })
}));

// 🎭 Complex runtime overrides
const elevatedCard = CardCls.create(({ what, override }) => ({
  variant: what.variant({ elevation: 'high', state: 'focus' }),
  token: override.token({
    "color.bg": {
      elevated: ["bg-blue-50"]  // Override elevated background
    },
    "shadow": {
      lg: ["shadow-xl", "drop-shadow-lg"]  // Enhanced shadow
    }
  })
}));

// 🎭 Component with dynamic overrides
const DynamicCard = ({ 
  elevation, 
  state, 
  customBg, 
  customShadow,
  tva = CardCls
}: {
  elevation: 'none' | 'low' | 'high';
  state: 'default' | 'focus' | 'error';
  customBg?: string;
  customShadow?: string;
  tva?: typeof CardCls;
}) => {
  const classes = tva.create(({ what, override }) => ({
    variant: what.variant({ elevation, state }),
    token: override.token({
      "color.bg": customBg ? {
        elevated: [customBg]  // Dynamic background override
      } : undefined,
      "shadow": customShadow ? {
        lg: [customShadow]    // Dynamic shadow override
      } : undefined
    })
  }));

  return (
    <div className={classes.root()}>
      <div className={classes.header()}>Card Header</div>
      <div className={classes.content()}>Card Content</div>
    </div>
  );
};
```

**Advanced override capabilities:**
- 🎭 **Multiple variants** - combine elevation and state overrides
- 🔄 **Dynamic values** - runtime token values from props
- 🎯 **Conditional overrides** - only override when custom values provided
- 🚀 **Performance** - overrides resolved once per instance

#### **Bottom Line** 🎯

**Runtime Token Overrides** make your styling system **truly dynamic**:

- 🎭 **Live customization** - change tokens when creating instances
- 🎯 **Component props** - users can override tokens through cls prop
- 🔄 **Merge behavior** - user's cls prop takes precedence over internal config
- 🚀 **Performance** - overrides resolved once, cached for reuse
- 🌍 **Flexibility** - adapt styling to context, user preferences, and dynamic data

**Remember:** **Runtime overrides make CLS powerful!** Define your base tokens well, then let users customize them at will! 🎉

Ready to learn about **Inheritance Semantics** in the next section? This will show how tokens flow through inheritance chains! 🚀

### 5.4 Inheritance Semantics <a id="54-inheritance-semantics"></a>

**CLS inheritance isn't just about extending contracts** - it's about **understanding how tokens flow** through the inheritance chain! 🔄

**Inheritance semantics** determine **which tokens are enforced**, **which are optional**, and **how conflicts are resolved** when building complex design systems.

#### **The Two Token Types** 🎯

**CLS distinguishes between two types of tokens** in inheritance:

- 🔒 **ENFORCED tokens** - declared in the current contract, MUST be defined
- 🔓 **INHERITED tokens** - from parent contracts, optional to define

**This prevents token definition gaps** and ensures **complete coverage**!

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
    variant: ["default", "primary"]
  }
}, ({ what, def }) => ({
  // 🔒 ENFORCED: ALL declared tokens must be defined
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

// Extended CLS instance
const ExtendedButtonCls = BaseButtonCls.extend({
  tokens: {
    "color.bg": ["success"],      // ✅ Only add NEW variant
    "color.text": ["default", "primary"]  // ✅ Add NEW token group
  },
  slot: ["root", "label"],       // Add new slot
  variant: {
    size: ["lg"],                // ✅ Only add NEW variant
    loading: ["bool"]            // ✅ Add NEW variant
  }
}, ({ what, def }) => ({
  // 🔒 ENFORCED: Only NEW tokens added in this contract
  token: def.token({
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

#### **Inheritance Behavior** 🔄

**How tokens flow through the inheritance chain:**

```typescript
// Multi-level inheritance example
const ThemeCls = cls({
  tokens: {
    "color.bg": ["default", "primary", "secondary"],
    "color.text": ["default", "primary", "secondary"],
    "spacing.base": ["sm", "md", "lg"]
  },
  slot: ["root"],
  variant: {}
}, ({ what, def }) => ({
  token: def.token({
    "color.bg": {
      default: ["bg-gray-50"],
      primary: ["bg-blue-500"],
      secondary: ["bg-gray-500"]
    },
    "color.text": {
      default: ["text-gray-900"],
      primary: ["text-white"],
      secondary: ["text-gray-700"]
    },
    "spacing.base": {
      sm: ["p-2"],
      md: ["p-4"],
      lg: ["p-6"]
    }
  }),
  rules: [def.root({ root: what.token(["color.bg.default", "color.text.default", "spacing.base.md"]) })],
  defaults: {}
}));

// Level 1: Button inherits from Theme
const ButtonCls = ThemeCls.extend({
  tokens: {
    "button.radius": ["sm", "md", "lg"],
    "button.shadow": ["none", "md"]
  },
  slot: ["root", "label"],
  variant: {
    size: ["sm", "md", "lg"],
    variant: ["default", "primary", "secondary"]
  }
}, ({ what, def }) => ({
  // 🔒 ENFORCED: Only NEW tokens
  token: def.token({
    "button.radius": {
      sm: ["rounded"],
      md: ["rounded-md"],
      lg: ["rounded-lg"]
    },
    "button.shadow": {
      none: ["shadow-none"],
      md: ["shadow"]
    }
    // 🔓 OPTIONAL: Inherited from Theme (color.bg, color.text, spacing.base)
  }),
  rules: [
    def.root({
      root: what.token(["color.bg.default", "color.text.default", "spacing.base.md", "button.radius.md"]),
      label: what.css(["font-medium"])
    }),
    def.rule(what.variant({ variant: 'primary' }), {
      root: what.token(["color.bg.primary", "color.text.primary"])
    })
  ],
  defaults: def.defaults({ size: "md", variant: "default" })
}));

// Level 2: PrimaryButton inherits from Button
const PrimaryButtonCls = ButtonCls.extend({
  tokens: {
    "button.animation": ["none", "pulse", "bounce"]
  },
  slot: ["root", "label", "icon"],
  variant: {
    loading: ["bool"]
  }
}, ({ what, def }) => ({
  // 🔒 ENFORCED: Only NEW tokens
  token: def.token({
    "button.animation": {
      none: [],
      pulse: ["animate-pulse"],
      bounce: ["animate-bounce"]
    }
    // 🔓 OPTIONAL: Inherited from Button (button.radius, button.shadow)
    // 🔓 OPTIONAL: Inherited from Theme (color.bg, color.text, spacing.base)
  }),
  rules: [
    def.root({
      root: what.token(["color.bg.primary", "color.text.primary", "spacing.base.md", "button.radius.md", "button.shadow.md"]),
      label: what.css(["font-medium"]),
      icon: what.css(["mr-2"])
    }),
    def.rule(what.variant({ loading: true }), {
      root: what.token(["button.animation.pulse"]),
      icon: what.css(["animate-spin"])
    })
  ],
  defaults: def.defaults({ size: "md", variant: "primary", loading: false })
}));
```

**What happens at each level:**
- 🎨 **ThemeCls** - defines base design tokens (enforced)
- 🔘 **ButtonCls** - inherits theme tokens, adds button-specific tokens (only new ones enforced)
- 🎯 **PrimaryButtonCls** - inherits both theme and button tokens, adds animation tokens (only new ones enforced)

#### **Inheritance Rules** 📋

**Key principles** that govern CLS inheritance:

**✅ Token Inheritance:**
- **Append-only** - child contracts can't remove inherited tokens
- **New tokens enforced** - only newly declared tokens must be defined
- **Inherited tokens optional** - can be omitted, overridden, or left as-is

**✅ Variant Inheritance:**
- **Union merging** - child variants are combined with parent variants
- **Type preservation** - variant types (string/boolean) are maintained
- **Default inheritance** - child defaults can override parent defaults

**✅ Slot Inheritance:**
- **Slot accumulation** - child slots are added to parent slots
- **No removal** - inherited slots cannot be removed
- **Slot-specific styling** - each level can style inherited slots

**Example of inheritance rules in action:**

```typescript
// Base contract
const BaseCls = cls({
  tokens: { "color.bg": ["default", "primary"] },
  slot: ["root"],
  variant: { size: ["md"] }
}, ({ what, def }) => ({
  token: def.token({
    "color.bg": {
      default: ["bg-gray-100"],
      primary: ["bg-blue-500"]
    }
  }),
  rules: [def.root({ root: what.token(["color.bg.default"]) })],
  defaults: def.defaults({ size: "md" })
}));

// Extended contract - follows inheritance rules
const ExtendedCls = BaseCls.extend({
  tokens: { "color.bg": ["success"] },        // ✅ Add new variant
  slot: ["label"],                            // ✅ Add new slot
  variant: { size: ["lg"] }                   // ✅ Add new variant
}, ({ what, def }) => ({
  token: def.token({
    "color.bg": {
      success: ["bg-green-500"]               // ✅ Required - new token
    }
    // 🔓 Optional - inherited tokens (color.bg.default, color.bg.primary)
  }),
  rules: [
    def.root({
      root: what.token(["color.bg.default"]), // ✅ Can use inherited tokens
      label: what.css(["font-medium"])        // ✅ Can style new slot
    })
  ],
  defaults: def.defaults({ size: "lg" })     // ✅ Can override parent default
}));
```

#### **Bottom Line** 🎯

**Inheritance Semantics** are the **foundation of CLS design systems**:

- 🔒 **Enforced tokens** - newly declared tokens MUST be defined
- 🔓 **Optional inheritance** - inherited tokens can be omitted or overridden
- 🔄 **Append-only growth** - contracts can only add, never remove
- 🎯 **Type safety** - TypeScript ensures inheritance chain validity
- 🌍 **Scalable architecture** - build complex systems from simple building blocks

**Remember:** **Good inheritance makes great design systems!** Understand the rules, and you can build anything! 🎉

Ready to learn about **Token Conflicts & Resolution** in the next section? This will show how CLS handles conflicting tokens in inheritance chains! 🚀

### 5.5 Token Conflicts & Resolution <a id="55-token-conflicts--resolution"></a>

**When tokens flow through inheritance chains**, **conflicts can arise** - but CLS has **clear resolution rules**! ⚔️

**Token conflicts** happen when **different levels** in the inheritance chain **define the same token** with **different values**. Understanding how CLS resolves these conflicts is crucial for **predictable styling**.

#### **Conflict Resolution Rules** ⚔️

**CLS follows a simple but powerful rule** for resolving token conflicts:

- 🏆 **Child wins** - child definitions override parent definitions
- 🔄 **Last definition wins** - later definitions override earlier ones
- 🎯 **Predictable behavior** - conflicts are resolved consistently

**This ensures that** **specialized components** can **override base styling** when needed!

#### **Token Conflict Examples** 🎭

**See how CLS resolves conflicts** in real inheritance scenarios:

```typescript
// Base theme with primary color
const ThemeCls = cls({
  tokens: {
    "color.bg": ["default", "primary", "secondary"],
    "color.text": ["default", "primary", "secondary"]
  },
  slot: ["root"],
  variant: {}
}, ({ what, def }) => ({
  token: def.token({
    "color.bg": {
      default: ["bg-gray-50"],
      primary: ["bg-blue-500"],    // 🎨 Base blue primary
      secondary: ["bg-gray-500"]
    },
    "color.text": {
      default: ["text-gray-900"],
      primary: ["text-white"],     // 🎨 Base white text
      secondary: ["text-gray-700"]
    }
  }),
  rules: [def.root({ root: what.token(["color.bg.default", "color.text.default"]) })],
  defaults: {}
}));

// Button inherits from theme
const ButtonCls = ThemeCls.extend({
  tokens: {
    "color.bg": ["default", "primary", "secondary", "success"], // Extends existing group
    "color.text": ["default", "primary", "secondary", "success"] // Extends existing group
  },
  slot: ["root", "label"],
  variant: {
    variant: ["default", "primary", "secondary", "success"]
  }
}, ({ what, def }) => ({
  token: def.token({
    "color.bg": {
      primary: ["bg-indigo-600"],  // 🏆 OVERRIDE: Child wins over parent
      success: ["bg-green-500"]    // 🆕 NEW: Only new token
    },
    "color.text": {
      primary: ["text-indigo-50"], // 🏆 OVERRIDE: Child wins over parent
      success: ["text-white"]      // 🆕 NEW: Only new token
    }
    // 🔓 OPTIONAL: Inherited tokens (color.bg.default, color.bg.secondary, etc.)
  }),
  rules: [
    def.root({
      root: what.token(["color.bg.default", "color.text.default"]),
      label: what.css(["font-medium"])
    }),
    def.rule(what.variant({ variant: 'primary' }), {
      root: what.token(["color.bg.primary", "color.text.primary"]) // Uses overridden values
    }),
    def.rule(what.variant({ variant: 'success' }), {
      root: what.token(["color.bg.success", "color.text.success"]) // Uses new values
    })
  ],
  defaults: def.defaults({ variant: 'default' })
}));

// Specialized button with different primary color
const SpecialButtonCls = ButtonCls.extend({
  tokens: {
    "color.bg": ["primary"],       // Override existing variant
    "color.text": ["primary"]      // Override existing variant
  },
  slot: ["root", "label"],
  variant: {
    variant: ["default", "primary", "secondary", "success"]
  }
}, ({ what, def }) => ({
  token: def.token({
    "color.bg": {
      primary: ["bg-purple-700"]   // 🏆 OVERRIDE: Child wins over ButtonCls
    },
    "color.text": {
      primary: ["text-purple-50"]  // 🏆 OVERRIDE: Child wins over ButtonCls
    }
    // 🔓 OPTIONAL: All other inherited tokens
  }),
  rules: [
    def.root({
      root: what.token(["color.bg.default", "color.text.default"]),
      label: what.css(["font-medium"])
    }),
    def.rule(what.variant({ variant: 'primary' }), {
      root: what.token(["color.bg.primary", "color.text.primary"]) // Uses SpecialButtonCls values
    })
  ],
  defaults: def.defaults({ variant: 'default' })
}));
```

**What happens in this inheritance chain:**

1. **ThemeCls** - `"color.bg.primary"` → `"bg-blue-500"`
2. **ButtonCls** - `"color.bg.primary"` → `"bg-indigo-600"` (overrides ThemeCls)
3. **SpecialButtonCls** - `"color.bg.primary"` → `"bg-purple-700"` (overrides ButtonCls)

**Final result:** `"color.bg.primary"` resolves to `"bg-purple-700"` in SpecialButtonCls! 🎯

#### **Runtime Override Conflicts** 🎭

**Runtime overrides** can also create conflicts with **inherited tokens**:

```typescript
// Using the SpecialButtonCls from above
const customButton = SpecialButtonCls.create(({ what, override }) => ({
  variant: what.variant({ variant: 'primary' }),
  token: override.token({
    "color.bg": {
      primary: ["bg-red-600"]  // 🏆 RUNTIME OVERRIDE: Takes precedence over all inheritance
    },
    "color.text": {
      primary: ["text-red-50"] // 🏆 RUNTIME OVERRIDE: Takes precedence over all inheritance
    }
  })
}));

// Component with runtime overrides
const DynamicButton = ({ 
  variant, 
  customPrimaryColor 
}: {
  variant: 'default' | 'primary' | 'secondary' | 'success';
  customPrimaryColor?: string;
}) => {
  const classes = SpecialButtonCls.create(({ what, override }) => ({
    variant: what.variant({ variant }),
    token: override.token({
      "color.bg": customPrimaryColor ? {
        primary: [customPrimaryColor]  // 🏆 RUNTIME OVERRIDE: Dynamic color
      } : undefined
    })
  }));

  return (
    <button className={classes.root()}>
      Dynamic Button
    </button>
  );
};
```

**Runtime override precedence:**

1. **Runtime overrides** - highest priority (user control)
2. **Child definitions** - override parent definitions
3. **Parent definitions** - base styling from inheritance chain

**This gives users** **complete control** over styling while maintaining **inheritance benefits**!

#### **Conflict Resolution Best Practices** 💡

**Follow these guidelines** for predictable token conflicts:

**✅ Do:**
- **Document overrides** - comment when you're intentionally overriding tokens
- **Use semantic names** - `"color.bg.primary"` not `"color.bg.blue"`
- **Test inheritance chains** - verify conflicts resolve as expected
- **Plan your hierarchy** - design inheritance to minimize conflicts

**❌ Don't:**
- **Override unnecessarily** - only override when you need different styling
- **Create circular dependencies** - avoid inheritance loops
- **Forget runtime precedence** - remember runtime overrides win
- **Ignore inheritance benefits** - leverage inherited tokens when possible

**Example of good conflict management:**

```typescript
// Base theme - keep it simple
const ThemeCls = cls({
  tokens: {
    "color.bg": ["default", "primary", "secondary"],
    "color.text": ["default", "primary", "secondary"]
  },
  slot: ["root"],
  variant: {}
}, ({ what, def }) => ({
  token: def.token({
    "color.bg": {
      default: ["bg-gray-50"],
      primary: ["bg-blue-500"],    // 🎨 Base primary color
      secondary: ["bg-gray-500"]
    },
    "color.text": {
      default: ["text-gray-900"],
      primary: ["text-white"],     // 🎨 Base primary text
      secondary: ["text-gray-700"]
    }
  }),
  rules: [def.root({ root: what.token(["color.bg.default", "color.text.default"]) })],
  defaults: {}
}));

// Specialized theme - override only what's needed
const DarkThemeCls = ThemeCls.extend({
  tokens: {
    "color.bg": ["default", "primary"],  // Only override what changes
    "color.text": ["default", "primary"] // Only override what changes
  },
  slot: ["root"],
  variant: {}
}, ({ what, def }) => ({
  token: def.token({
    "color.bg": {
      default: ["bg-gray-900"],    // 🏆 OVERRIDE: Dark background
      primary: ["bg-blue-600"]     // 🏆 OVERRIDE: Darker primary
    },
    "color.text": {
      default: ["text-gray-100"],  // 🏆 OVERRIDE: Light text
      primary: ["text-blue-50"]    // 🏆 OVERRIDE: Light primary text
    }
    // 🔓 OPTIONAL: Inherited secondary tokens remain unchanged
  }),
  rules: [def.root({ root: what.token(["color.bg.default", "color.text.default"]) })],
  defaults: {}
}));
```

**Benefits of this approach:**
- 🎯 **Minimal conflicts** - only override what's necessary
- 🔄 **Clear inheritance** - easy to understand what changes
- 🚀 **Maintainable** - changes are localized and predictable
- 🌍 **Flexible** - runtime overrides still work for customization

#### **Bottom Line** 🎯

**Token Conflicts & Resolution** ensure **predictable styling** in complex inheritance chains:

- 🏆 **Child wins** - child definitions override parent definitions
- 🎭 **Runtime priority** - runtime overrides take highest precedence
- 🎯 **Predictable behavior** - conflicts resolved consistently
- 🔄 **Clear hierarchy** - inheritance chain determines resolution order
- 🌍 **User control** - runtime overrides give complete customization

**Remember:** **Good conflict resolution makes great design systems!** Understand the rules, and your inheritance chains will be predictable and maintainable! 🎉

Ready to learn about **Variants & Defaults** in the next chapter? This will show how to control component appearance and behavior! 🚀

---

## 6. Variants & Defaults <a id="6-variants--defaults"></a>

[↑ Back to Top](#table-of-contents) | [← Previous Chapter: Tokens](#5-tokens) | [→ Next Chapter: Slots](#7-slots)

---

**Variants are the heart of component customization** - they let you **control appearance and behavior** based on different states and configurations! 🎭

**Defaults ensure predictable behavior** by providing **sensible starting values** for all variants. Together, they create a **flexible and user-friendly** styling system that adapts to different use cases.

### 6.1 Understanding Variants <a id="61-understanding-variants"></a>

**Variants are configurable properties** that **affect component appearance and behavior**. Think of them as **"settings"** that users can adjust to customize how components look and work! 🎛️

**Common variant types include:**
- 🎨 **Visual variants** - `variant`, `color`, `theme`
- 📏 **Size variants** - `size`, `width`, `height`
- 🚦 **State variants** - `disabled`, `loading`, `active`
- 🎯 **Behavior variants** - `interactive`, `readonly`, `editable`

**Example of a button with multiple variants:**

```typescript
const ButtonCls = cls({
  tokens: {
    "color.bg": ["default", "primary", "secondary", "danger"],
    "color.text": ["default", "primary", "secondary", "danger"],
    "spacing.padding": ["sm", "md", "lg", "xl"],
    "border.radius": ["none", "sm", "md", "lg", "full"]
  },
  slot: ["root", "label"],
  variant: {
    variant: ["default", "primary", "secondary", "danger"],  // 🎨 Visual style
    size: ["sm", "md", "lg", "xl"],                         // 📏 Size variations
    disabled: "bool",                                        // 🚦 State control
    loading: "bool"                                          // 🚦 Loading state
  }
}, ({ what, def }) => ({
  token: def.token({
    "color.bg": {
      default: ["bg-gray-100"],
      primary: ["bg-blue-500"],
      secondary: ["bg-gray-500"],
      danger: ["bg-red-500"]
    },
    "color.text": {
      default: ["text-gray-900"],
      primary: ["text-white"],
      secondary: ["text-white"],
      danger: ["text-white"]
    },
    "spacing.padding": {
      sm: ["px-2", "py-1"],
      md: ["px-4", "py-2"],
      lg: ["px-6", "py-3"],
      xl: ["px-8", "py-4"]
    },
    "border.radius": {
      none: [],
      sm: ["rounded"],
      md: ["rounded-md"],
      lg: ["rounded-lg"],
      full: ["rounded-full"]
    }
  }),
  rules: [
    // Base styles
    def.root({
      root: what.token(["color.bg.default", "color.text.default", "spacing.padding.md", "border.radius.md"]),
      label: what.css(["font-medium", "transition-colors"])
    }),
    
    // Variant styles
    def.rule(what.variant({ variant: 'primary' }), {
      root: what.token(["color.bg.primary", "color.text.primary"])
    }),
    def.rule(what.variant({ variant: 'secondary' }), {
      root: what.token(["color.bg.secondary", "color.text.secondary"])
    }),
    def.rule(what.variant({ variant: 'danger' }), {
      root: what.token(["color.bg.danger", "color.text.danger"])
    }),
    
    // Size styles
    def.rule(what.variant({ size: 'sm' }), {
      root: what.token(["spacing.padding.sm", "border.radius.sm"])
    }),
    def.rule(what.variant({ size: 'lg' }), {
      root: what.token(["spacing.padding.lg", "border.radius.lg"])
    }),
    def.rule(what.variant({ size: 'xl' }), {
      root: what.token(["spacing.padding.xl", "border.radius.xl"])
    }),
    
    // State styles
    def.rule(what.variant({ disabled: true }), {
      root: what.css(["opacity-50", "cursor-not-allowed"]),
      label: what.css(["text-gray-500"])
    }),
    def.rule(what.variant({ loading: true }), {
      root: what.css(["cursor-wait"]),
      label: what.css(["animate-pulse"])
    })
  ],
  defaults: def.defaults({
    variant: 'default',
    size: 'md',
    disabled: false,
    loading: false
  })
});
```

**This button supports:**
- 🎨 **4 visual variants** - default, primary, secondary, danger
- 📏 **4 size options** - small, medium, large, extra-large
- 🚦 **2 state flags** - disabled, loading
- 🎯 **Combined styling** - variants work together seamlessly

### 6.2 Required Defaults <a id="62-required-defaults"></a>

**Defaults are mandatory in CLS** - they **force you to make conscious choices** about what values variants should have when no specific configuration is provided! 🎯

**Why defaults are required:**
- 🚫 **No magic values** - you explicitly define what happens by default
- 🎯 **Predictable behavior** - users know what to expect
- 🔒 **Type safety** - TypeScript ensures all variants have defaults
- 🎨 **Design consistency** - consistent starting point for all components

**Example of comprehensive defaults:**

```typescript
const CardCls = cls({
  tokens: {
    "color.bg": ["default", "elevated", "outlined"],
    "color.border": ["default", "elevated", "outlined"],
    "color.text": ["default", "elevated", "outlined"],
    "spacing.padding": ["sm", "md", "lg"],
    "shadow.size": ["none", "sm", "md", "lg"]
  },
  slot: ["root", "header", "body", "footer"],
  variant: {
    variant: ["default", "elevated", "outlined"],  // 🎨 Visual style
    size: ["sm", "md", "lg"],                      // 📏 Size variations
    interactive: "bool",                            // 🎯 Behavior control
    hoverable: "bool"                               // 🎯 Hover effects
  }
}, ({ what, def }) => ({
  token: def.token({
    "color.bg": {
      default: ["bg-white"],
      elevated: ["bg-white"],
      outlined: ["bg-transparent"]
    },
    "color.border": {
      default: ["border-gray-200"],
      elevated: ["border-transparent"],
      outlined: ["border-gray-300"]
    },
    "color.text": {
      default: ["text-gray-900"],
      elevated: ["text-gray-900"],
      outlined: ["text-gray-900"]
    },
    "spacing.padding": {
      sm: ["p-3"],
      md: ["p-4"],
      lg: ["p-6"]
    },
    "shadow.size": {
      none: [],
      sm: ["shadow-sm"],
      md: ["shadow"],
      lg: ["shadow-lg"]
    }
  }),
  rules: [
    // Base styles with defaults
    def.root({
      root: what.token([
        "color.bg.default",
        "color.border.default", 
        "color.text.default",
        "spacing.padding.md",
        "shadow.size.none"
      ]),
      header: what.css(["border-b", "border-gray-200", "pb-3"]),
      body: what.css(["py-2"]),
      footer: what.css(["border-t", "border-gray-200", "pt-3"])
    }),
    
    // Variant-specific styles
    def.rule(what.variant({ variant: 'elevated' }), {
      root: what.token(["color.bg.elevated", "color.border.elevated", "shadow.size.md"])
    }),
    def.rule(what.variant({ variant: 'outlined' }), {
      root: what.token(["color.bg.outlined", "color.border.outlined"])
    }),
    
    // Size variations
    def.rule(what.variant({ size: 'sm' }), {
      root: what.token(["spacing.padding.sm"])
    }),
    def.rule(what.variant({ size: 'lg' }), {
      root: what.token(["spacing.padding.lg"])
    }),
    
    // Interactive states
    def.rule(what.variant({ interactive: true }), {
      root: what.css(["cursor-pointer", "transition-all", "duration-200"])
    }),
    def.rule(what.variant({ hoverable: true }), {
      root: what.css(["hover:shadow-lg", "hover:transform", "hover:scale-105"])
    })
  ],
  defaults: def.defaults({
    variant: 'default',    // 🎯 Default visual style
    size: 'md',            // 📏 Default size
    interactive: false,    // 🎯 Default behavior
    hoverable: false       // 🎯 Default hover state
  })
});
```

**Using the card with defaults:**

```typescript
// Uses all defaults
const defaultCard = CardCls.create();
console.log(defaultCard.root()); 
// "bg-white border-gray-200 text-gray-900 p-4 shadow-none"

// Override specific variants
const elevatedCard = CardCls.create(({ what }) => ({
  variant: what.variant({ variant: 'elevated', size: 'lg' })
}));
console.log(elevatedCard.root());
// "bg-white border-transparent text-gray-900 p-6 shadow-md"

// Interactive card with hover effects
const interactiveCard = CardCls.create(({ what }) => ({
  variant: what.variant({ interactive: true, hoverable: true })
}));
console.log(interactiveCard.root());
// "bg-white border-gray-200 text-gray-900 p-4 shadow-none cursor-pointer transition-all duration-200 hover:shadow-lg hover:transform hover:scale-105"
```

### 6.3 Variant Combinations <a id="63-variant-combinations"></a>

**Variants work together seamlessly** - you can **combine multiple variants** to create **rich, contextual styling**! 🎭

**CLS automatically handles variant combinations** by applying **all matching rules** in the order they're defined. This means you get **accumulated styling** rather than **overriding behavior**.

**Example of variant combinations in action:**

```typescript
const AlertCls = cls({
  tokens: {
    "color.bg": ["default", "info", "success", "warning", "error"],
    "color.border": ["default", "info", "success", "warning", "error"],
    "color.text": ["default", "info", "success", "warning", "error"],
    "spacing.padding": ["sm", "md", "lg"],
    "border.radius": ["sm", "md", "lg"]
  },
  slot: ["root", "icon", "content", "close"],
  variant: {
    variant: ["default", "info", "success", "warning", "error"],  // 🎨 Alert type
    size: ["sm", "md", "lg"],                                     // 📏 Size variations
    dismissible: "bool",                                           // 🎯 Can be closed
    bordered: "bool"                                               // 🎯 Border style
  }
}, ({ what, def }) => ({
  token: def.token({
    "color.bg": {
      default: ["bg-gray-50"],
      info: ["bg-blue-50"],
      success: ["bg-green-50"],
      warning: ["bg-yellow-50"],
      error: ["bg-red-50"]
    },
    "color.border": {
      default: ["border-gray-200"],
      info: ["border-blue-200"],
      success: ["border-green-200"],
      warning: ["border-yellow-200"],
      error: ["border-red-200"]
    },
    "color.text": {
      default: ["text-gray-800"],
      info: ["text-blue-800"],
      success: ["text-green-800"],
      warning: ["text-yellow-800"],
      error: ["text-red-800"]
    },
    "spacing.padding": {
      sm: ["p-2"],
      md: ["p-3"],
      lg: ["p-4"]
    },
    "border.radius": {
      sm: ["rounded"],
      md: ["rounded-md"],
      lg: ["rounded-lg"]
    }
  }),
  rules: [
    // Base styles
    def.root({
      root: what.token([
        "color.bg.default",
        "color.border.default",
        "color.text.default",
        "spacing.padding.md",
        "border.radius.md"
      ]),
      icon: what.css(["mr-2", "flex-shrink-0"]),
      content: what.css(["flex-1"]),
      close: what.css(["ml-2", "flex-shrink-0", "opacity-70", "hover:opacity-100"])
    }),
    
    // Variant-specific colors
    def.rule(what.variant({ variant: 'info' }), {
      root: what.token(["color.bg.info", "color.border.info", "color.text.info"])
    }),
    def.rule(what.variant({ variant: 'success' }), {
      root: what.token(["color.bg.success", "color.border.success", "color.text.success"])
    }),
    def.rule(what.variant({ variant: 'warning' }), {
      root: what.token(["color.bg.warning", "color.border.warning", "color.text.warning"])
    }),
    def.rule(what.variant({ variant: 'error' }), {
      root: what.token(["color.bg.error", "color.border.error", "color.text.error"])
    }),
    
    // Size variations
    def.rule(what.variant({ size: 'sm' }), {
      root: what.token(["spacing.padding.sm", "border.radius.sm"]),
      icon: what.css(["w-4", "h-4"]),
      close: what.css(["w-4", "h-4"])
    }),
    def.rule(what.variant({ size: 'lg' }), {
      root: what.token(["spacing.padding.lg", "border.radius.lg"]),
      icon: what.css(["w-6", "h-6"]),
      close: what.css(["w-6", "h-6"])
    }),
    
    // Dismissible behavior
    def.rule(what.variant({ dismissible: true }), {
      root: what.css(["flex", "items-start", "justify-between"]),
      content: what.css(["flex", "items-start"])
    }),
    def.rule(what.variant({ dismissible: false }), {
      close: what.css(["hidden"])  // Hide close button
    }),
    
    // Border variations
    def.rule(what.variant({ bordered: false }), {
      root: what.css(["border-0"])  // Remove border
    })
  ],
  defaults: def.defaults({
    variant: 'default',
    size: 'md',
    dismissible: false,
    bordered: true
  })
});
```

**Using variant combinations:**

```typescript
// Small, dismissible success alert
const successAlert = AlertCls.create(({ what }) => ({
  variant: what.variant({ 
    variant: 'success', 
    size: 'sm', 
    dismissible: true 
  })
}));
console.log(successAlert.root());
// "bg-green-50 border-green-200 text-green-800 p-2 rounded flex items-start justify-between"

// Large, non-dismissible error alert without border
const errorAlert = AlertCls.create(({ what }) => ({
  variant: what.variant({ 
    variant: 'error', 
    size: 'lg', 
    dismissible: false, 
    bordered: false 
  })
}));
console.log(errorAlert.root());
// "bg-red-50 border-0 text-red-800 p-4 rounded-lg"

// Medium info alert with all defaults
const infoAlert = AlertCls.create(({ what }) => ({
  variant: what.variant({ variant: 'info' })
}));
console.log(infoAlert.root());
// "bg-blue-50 border-blue-200 text-blue-800 p-3 rounded-md"
```

### 6.4 Boolean Variants with "bool" Keyword <a id="64-boolean-variants-with-bool-keyword"></a>

**CLS has a special trick for boolean variants** - use the **"bool" keyword** to enable **true/false boolean values** automatically! 🎭

**The "bool" keyword** tells CLS that a variant should accept **boolean values** instead of **explicit string arrays**. This makes boolean variants much cleaner and more intuitive!

**Comparison: Regular vs Boolean Variants**

**❌ Without "bool" keyword (explicit arrays):**
```typescript
const ButtonCls = cls({
  // ... tokens and slots
  variant: {
    disabled: [true, false],      // 🚫 Explicit array
    loading: [true, false],       // 🚫 Explicit array
    active: [true, false]         // 🚫 Explicit array
  }
}, ({ what, def }) => ({
  // ... tokens and rules
  defaults: def.defaults({
    disabled: false,              // 🚫 Must match array values
    loading: false,               // 🚫 Must match array values
    active: false                 // 🚫 Must match array values
  })
}));
```

**✅ With "bool" keyword (automatic boolean):**
```typescript
const ButtonCls = cls({
  // ... tokens and slots
  variant: {
    disabled: "bool",             // 🎯 Automatic true/false
    loading: "bool",              // 🎯 Automatic true/false
    active: "bool"                // 🎯 Automatic true/false
  }
}, ({ what, def }) => ({
  // ... tokens and rules
  defaults: def.defaults({
    disabled: false,              // 🎯 Natural boolean
    loading: false,               // 🎯 Natural boolean
    active: false                 // 🎯 Natural boolean
  })
}));
```

**Practical Example with Boolean Variants:**

```typescript
const ToggleButtonCls = cls({
  tokens: {
    "color.bg": ["default", "active", "disabled"],
    "color.text": ["default", "active", "disabled"],
    "color.border": ["default", "active", "disabled"]
  },
  slot: ["root", "icon", "label"],
  variant: {
    variant: ["default", "primary", "secondary"],  // 🎨 Visual style
    size: ["sm", "md", "lg"],                      // 📏 Size variations
    disabled: "bool",                              // 🎯 Boolean variant
    loading: "bool",                               // 🎯 Boolean variant
    active: "bool"                                 // 🎯 Boolean variant
  }
}, ({ what, def }) => ({
  token: def.token({
    "color.bg": {
      default: ["bg-gray-100"],
      active: ["bg-blue-500"],
      disabled: ["bg-gray-300"]
    },
    "color.text": {
      default: ["text-gray-900"],
      active: ["text-white"],
      disabled: ["text-gray-500"]
    },
    "color.border": {
      default: ["border-gray-300"],
      active: ["border-blue-600"],
      disabled: ["border-gray-400"]
    }
  }),
  rules: [
    // Base styles
    def.root({
      root: what.token([
        "color.bg.default",
        "color.text.default",
        "color.border.default"
      ]),
      icon: what.css(["mr-2", "transition-transform"]),
      label: what.css(["font-medium", "transition-colors"])
    }),
    
    // Visual variants
    def.rule(what.variant({ variant: 'primary' }), {
      root: what.css(["shadow-sm", "hover:shadow-md"])
    }),
    def.rule(what.variant({ variant: 'secondary' }), {
      root: what.css(["border-2"])
    }),
    
    // Size variations
    def.rule(what.variant({ size: 'sm' }), {
      root: what.css(["px-2", "py-1", "text-sm"]),
      icon: what.css(["w-4", "h-4"])
    }),
    def.rule(what.variant({ size: 'lg' }), {
      root: what.css(["px-6", "py-3", "text-lg"]),
      icon: what.css(["w-6", "h-6"])
    }),
    
    // Boolean state variants
    def.rule(what.variant({ active: true }), {
      root: what.token(["color.bg.active", "color.text.active", "color.border.active"]),
      icon: what.css(["rotate-180"])  // Icon rotation for active state
    }),
    def.rule(what.variant({ disabled: true }), {
      root: what.token(["color.bg.disabled", "color.text.disabled", "color.border.disabled"]),
      icon: what.css(["opacity-50"]),
      label: what.css(["opacity-50"])
    }),
    def.rule(what.variant({ loading: true }), {
      root: what.css(["cursor-wait"]),
      icon: what.css(["animate-spin"]),
      label: what.css(["animate-pulse"])
    })
  ],
  defaults: def.defaults({
    variant: 'default',
    size: 'md',
    disabled: false,    // 🎯 Natural boolean default
    loading: false,     // 🎯 Natural boolean default
    active: false       // 🎯 Natural boolean default
  })
});
```

**Using boolean variants:**

```typescript
// Active primary button
const activeButton = ToggleButtonCls.create(({ what }) => ({
  variant: what.variant({ 
    variant: 'primary', 
    active: true,      // 🎯 Boolean: true
    loading: false     // 🎯 Boolean: false
  })
}));

// Disabled loading button
const disabledButton = ToggleButtonCls.create(({ what }) => ({
  variant: what.variant({ 
    variant: 'secondary', 
    disabled: true,    // 🎯 Boolean: true
    loading: true      // 🎯 Boolean: true
  })
}));

// Default state (all booleans false)
const defaultButton = ToggleButtonCls.create();
```

### **Bottom Line** 🎯

**Variants & Defaults** provide **powerful component customization**:

- 🎭 **Multiple variant types** - visual, size, state, behavior
- 🎯 **Required defaults** - force conscious design choices
- 🔄 **Variant combinations** - seamless style accumulation
- 🎯 **"bool" keyword** - automatic boolean variant support
- 🔒 **Type safety** - TypeScript ensures variant validity
- 🎨 **Predictable behavior** - consistent styling across components

**Key Benefits:**
- 🚀 **Flexible styling** - combine variants for rich customization
- 🎯 **Clear defaults** - no magic values, explicit behavior
- 🔄 **Accumulative rules** - styles build upon each other
- 🎭 **Boolean shortcuts** - use "bool" for true/false variants
- 🌍 **User control** - runtime variant overrides for customization

**Remember:** **Variants are your component's personality, defaults are its foundation!** Design them well, and your components will be both flexible and predictable! 🎉

Ready to learn about **Slots** in the next chapter? This will show how to style different parts of your components! 🚀
