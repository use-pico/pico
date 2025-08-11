# CLS Library Design

> **Note**: This document serves as a single source of truth for this library.

## Overview

CLS (Class List System) is a **type-safe, composable styling system** that provides a structured approach to managing CSS classes, design tokens, and component variants. It's framework-agnostic and can be used with React, Vue, Svelte, vanilla JavaScript, or any other framework. It combines the flexibility of utility-first CSS with the maintainability of design systems.

## Table of Contents <a id="table-of-contents"></a>

- [1. Core Principles](#1-core-principles)
  - [1.1 Type Safety First](#11-type-safety-first)
  - [1.2 Composition Over Inheritance](#12-composition-over-inheritance)
  - [1.3 Declarative Configuration](#13-declarative-configuration)
  - [1.4 Performance Optimized](#14-performance-optimized)
- [2. Core Concepts](#2-core-concepts)
  - [2.1 Contract](#21-contract)
  - [2.2 Definition](#22-definition)
  - [2.3 CLS Instance](#23-cls-instance)
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

### 1.2 Composition Over Inheritance <a id="12-composition-over-inheritance"></a>
- Components can be extended and composed rather than rewritten
- Design tokens can be inherited and overridden at any level
- Slots provide granular control over component parts

### 1.3 Declarative Configuration <a id="13-declarative-configuration"></a>
- Styling rules are defined declaratively through contracts and definitions
- Variant combinations are resolved automatically
- Token resolution happens at runtime based on current state

### 1.4 Performance Optimized <a id="14-performance-optimized"></a>
- Lazy evaluation of slot functions
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
- **Token Definitions**: CSS classes for each token variant
- **Rules**: Conditional styling based on variant combinations
- **Defaults**: Default values for variants

### 2.3 CLS Instance <a id="23-cls-instance"></a>
The main interface that combines contract and definition:
- **`create()`**: Generates styled instances with optional overrides
- **`extend()`**: Creates new instances with additional functionality
- **`use()`**: Type-safe assignment of compatible instances

---

## 3. Architecture <a id="3-architecture"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Core Concepts](#2-core-concepts)** | **[→ Next Chapter: Main API](#4-main-api)**

### 3.1 Core Components <a id="31-core-components"></a>

#### Contract
A contract defines the **structure** of a component's styling system:
- **Tokens**: Named design values organized by groups and variants
- **Slots**: Named parts of a component that can receive styles  
- **Variants**: Configurable properties that affect component appearance
- **Inheritance**: Optional parent contract for extending functionality

#### Definition
A definition provides **concrete styling values** for a contract:
- **Token Definitions**: CSS classes for each token variant
- **Rules**: Conditional styling based on variant combinations
- **Defaults**: Default values for variants

#### CLS Instance
The main interface that combines contract and definition:
- **`create()`**: Generates styled instances with optional overrides
- **`extend()`**: Creates new instances with additional functionality
- **`use()`**: Type-safe assignment of compatible instances

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
- `definitionFn`: A callback function that receives `{ what, def }` and returns the definition

**Returns:** A cls instance with `create()`, `extend()`, `use()`, and contract properties

**Example:**
```typescript
// Basic button with variants
const Button = cls(
  {
    tokens: {
      "color.text": ["default", "primary"],
      "color.bg": ["default", "primary"]
    },
    slot: ["root", "label"],
    variant: {
      size: ["sm", "md", "lg"],
      variant: ["default", "primary"]
    }
  },
  ({ what, def }) => ({
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

The `what` utility provides helper functions for creating styling configurations:

```typescript
// Available what utility methods
what.css(classes)           // Creates a class-only configuration
what.token(tokens)          // Creates a token-only configuration  
what.both(classes, tokens)  // Creates a configuration with both classes and tokens
what.variant(variant)       // Helper for variant values (provides type safety)
```

**Usage Examples:**
```typescript
// Class only
root: what.css(["inline-flex", "items-center"])

// Token only  
root: what.token(["color.text.primary", "color.bg.primary"])

// Both classes and tokens
root: what.both(["rounded-md", "shadow"], ["color.bg.primary"])

// Type-safe variant usage
variant: what.variant({ size: "lg", variant: "primary" })
```

**Variant Helper Usage:**
The `what.variant()` helper provides type safety when setting variant values in the `create()` method. It ensures that only valid variant combinations are used:

```typescript
// Type-safe variant usage
const classes = Button.create(({ what }) => ({
  variant: what.variant({ 
    size: "lg",        // ✅ Valid: "lg" is in ["sm", "md", "lg"]
    variant: "primary" // ✅ Valid: "primary" is in ["default", "primary"]
  })
}));

// TypeScript will catch invalid variants
const classes = Button.create(({ what }) => ({
  variant: what.variant({ 
    size: "xl",        // ❌ Error: "xl" is not in ["sm", "md", "lg"]
    variant: "invalid" // ❌ Error: "invalid" is not in ["default", "primary"]
  })
}));
```

### 5.2 Definition Callback <a id="52-definition-callback"></a>

The definition function receives a `WhatUtil` object with three main interfaces:

```typescript
({ what, override, def }) => ({ ... })
```

**`what` - Styling Helpers:**
- **`what.css(classes)`**: Helper for classes only
- **`what.token(tokens)`**: Helper for tokens only  
- **`what.both(classes, tokens)`**: Helper for both classes and tokens
- **`what.variant(variant)`**: Helper for variant values (provides type safety)

**`override` - Override Helpers:**
- **`override.token(partialTokens)`**: Provides type-safe partial token overrides, useful for overriding specific tokens while preserving the rest. Takes partial input and returns partial output for use in `CreateConfig.token`.
- **`override.root(slotConfig, override = true)`**: Creates the default slot configuration with `override: true` by default, preventing boolean hell by hiding the explicit override flag.
- **`override.rule(match, slotConfig, override = true)`**: Creates a conditional rule with `override: true` by default, ensuring the rule clears previous styles and applies only its own styles.

**`def` - Definition Helpers:**
- **`def.root(slotConfig, override = false)`**: Creates the default slot configuration
- **`def.rule(match, slotConfig, override = false)`**: Creates a conditional rule
- **`def.token(tokenDefinition)`**: Wraps token definitions with proper typing
- **`def.defaults(defaultValues)`**: Wraps default values with proper typing

**Complete Example:**
```typescript
const Button = cls(
  {
    tokens: {
      "color.text": ["default", "primary"],
      "color.bg": ["default", "primary"]
    },
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
      // Note: override.token() is used in create() calls for partial token overrides
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

### 5.3 Tokens <a id="53-tokens"></a>

Tokens are the foundation of the design system, representing reusable design values:

```typescript
// Token structure: group.variant
"color.text": ["default", "primary", "secondary"]
"color.bg": ["default", "primary", "secondary"]
"spacing.padding": ["sm", "md", "lg"]
```

**Token Resolution:**
- Tokens are resolved to CSS classes at runtime
- Multiple tokens can be applied to a single slot
- Token inheritance follows the contract hierarchy
- Token overrides can be provided at creation time

**Implementation Details:**
- Token resolution uses `InternalTokenIndex` for efficient lookup
- The `resolveTokens()` function handles token-to-class conversion
- Token overrides are applied via `applyTokenOverrides()`
- The `applyWhat()` function processes both classes and tokens for slots

**Token Semantics:**
- **REPLACE**: When a contract explicitly declares a token variant, it replaces inherited values
- **APPEND**: When a contract doesn't declare a token variant, it appends to inherited values

**Token Override Example:**
```typescript
// Using override.token() for type-safe partial token overrides in create() calls
const buttonClasses = Button.create(({ what, override }) => ({
  token: override.token({
    "color.text": {
      primary: ["text-blue-600"] // Override only the primary variant
    }
    // Other tokens remain unchanged
  })
}));

// Or in component cls prop
const MyComponent = ({ cls }: Component<typeof Button>) => {
  return (
    <button className={cls(({ what, override }) => ({
      token: override.token({
        "color.bg": {
          primary: ["bg-indigo-600"] // Override only the primary background
        }
      })
    }))}>
      Click me
    </button>
  );
};
```

**Override Pattern - Preventing Boolean Hell:**

The `override` helpers provide a clean way to create rules and configurations with `override: true` by default, eliminating the need to explicitly specify `override: true` everywhere:

```typescript
// ❌ Boolean Hell - Explicit override flags everywhere
def.rule(
  { size: "lg" },
  { root: what.css(["px-6", "py-3"]) },
  true // Explicit flag required
);

// ✅ Clean Override - No explicit flags needed
override.rule(
  { size: "lg" },
  { root: what.css(["px-6", "py-3"]) }
  // override: true is automatically applied
);
```

**When to Use Override Helpers:**
- **`override.root()`**: When you want the default slot configuration to clear any previous styles
- **`override.rule()`**: When you want a rule to completely replace previous styles instead of appending to them
- **`override.token()`**: When you want to provide partial token overrides in create() calls

**Override Behavior:**
- Rules with `override: true` clear the style accumulator completely
- Only styles from the override rule (and any subsequent rules) are applied
- Previous styles are discarded, ensuring clean, predictable styling

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

Rules define conditional styling based on variant combinations:

```typescript
// Rule structure using the what utility
{
  match: what.variant({ size: "lg", variant: "primary" }),
  slot: {
    root: what.css(["text-lg"]),
    label: what.token(["color.bg.primary"])
  },
  override: false // Optional: clears previous styles
}
```

**Rule Matching:**
- Rules are evaluated in order of definition
- Multiple rules can apply to the same variant combination
- Rules can override previous styles or append to them
- Boolean variants are matched against true/false values

**Override vs Append Behavior:**
- **Default behavior**: Rules append to previous styles (accumulative)
- **Override behavior**: Rules with `override: true` clear previous styles completely
- **Use `override.rule()`** to automatically apply `override: true` without explicit flags

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
    "color.text": {
      primary: ["text-blue-600"]
    }
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
    tokens: {
      "color.text": ["default", "primary", "secondary"],
      "color.bg": ["default", "primary", "secondary"]
    },
    slot: ["root", "label", "icon"],
    variant: {
      size: ["sm", "md", "lg", "xl"],
      variant: ["default", "primary", "secondary"],
      loading: ["bool"]
    }
  },
  ({ what, def }) => ({
    token: def.token({
      "color.text": {
        default: ["text-gray-900"],
        primary: ["text-white"],
        secondary: ["text-gray-700"]
      },
      "color.bg": {
        default: ["bg-gray-100"],
        primary: ["bg-blue-600"],
        secondary: ["bg-gray-200"]
      }
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
type TokenContract = Record<string, readonly string[]>;

// Example
{
  "color.text": ["default", "primary", "secondary"],
  "color.bg": ["default", "primary", "secondary"],
  "spacing.padding": ["sm", "md", "lg"]
}
```

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
```typescript
type TokenDefinition<TContract> = {
  [K in keyof TContract["tokens"]]: {
    [V in TContract["tokens"][K][number]]: ClassName;
  };
};

// Example
{
  "color.text": {
    default: ["text-gray-900"],
    primary: ["text-white"],
    secondary: ["text-gray-700"]
  }
}
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

The `create()` method generates styled instances with optional overrides. Both parameters are **callback functions** that receive the `what` utility.

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
    "color.text": {
      primary: ["text-blue-600"]
    }
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
5. **Slot Overrides**: Apply slot-specific overrides
6. **Token Resolution**: Resolve tokens to CSS classes
7. **Class Merging**: Merge all classes using tailwind-merge

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
- The `buildChain()` function creates a layer-based inheritance system
- Token inheritance follows **REPLACE** vs **APPEND** semantics based on explicit declarations
- Variant inheritance merges arrays using union operations

### 11.2 Token Inheritance <a id="112-token-inheritance"></a>

Tokens follow specific inheritance rules:

1. **Declaration Check**: If child contract declares a token group, it replaces parent values
2. **Append Mode**: If child contract doesn't declare a token group, it appends to parent values
3. **Override Capability**: Child definitions can override any inherited token values

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
- **Token Index Caching**: Token resolution tables are built once per contract
- **Rule Caching**: Compiled rules are cached for reuse
- **Proxy Optimization**: Uses Proxy for lazy slot function creation

### 12.2 Memory Management <a id="122-memory-management"></a>
- **Lazy Evaluation**: Slot functions are only created when accessed
- **Shared References**: Contracts and definitions are shared across instances
- **Minimal Closures**: Avoid unnecessary closure creation
- **Efficient Merging**: Use efficient object merging strategies

### 12.3 Runtime Optimization <a id="123-runtime-optimization"></a>
- **Early Exit**: Stop rule evaluation when no more matches are possible
- **Efficient Matching**: Use direct property access for variant matching
- **Class Deduplication**: Use tailwind-merge for optimal class output
- **Minimal Allocations**: Reuse objects where possible

---

## 13. Type System <a id="13-type-system"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Performance Features](#12-performance-features)** | **[→ Next Chapter: Integration Patterns](#14-integration-patterns)**

### 13.1 Generic Constraints <a id="131-generic-constraints"></a>

The type system ensures compile-time safety through:

- **Contract Constraints**: Ensure contracts have valid structure
- **Definition Constraints**: Ensure definitions match contract structure
- **Inheritance Constraints**: Ensure inheritance chains are valid
- **Variant Constraints**: Ensure variant types are correctly inferred

### 13.2 Type Inference <a id="132-type-inference"></a>
- **Automatic Inference**: Most types are inferred from contract structure
- **Variant Mapping**: String variants are mapped to literal types
- **Boolean Variants**: "bool" variants are mapped to boolean types
- **Token Inference**: Token keys are inferred from contract tokens

### 13.3 Type Safety Features <a id="133-type-safety-features"></a>
- **Exhaustive Checking**: Ensure all variants are handled
- **Token Validation**: Ensure token references are valid
- **Slot Validation**: Ensure slot references are valid
- **Inheritance Validation**: Ensure inheritance chains are type-safe

---

## 14. Integration Patterns <a id="14-integration-patterns"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Type System](#13-type-system)** | **[→ Next Chapter: Best Practices](#15-best-practices)**

### 14.1 Framework Integration <a id="141-framework-integration"></a>

CLS integrates seamlessly with any framework through:

- **Component Props**: Variants become component props
- **Slot Functions**: Slots become className functions
- **Type Safety**: Full TypeScript support for component props
- **Performance**: Minimal re-render impact
- **Framework Agnostic**: Works with React, Vue, Svelte, vanilla JS, etc.

### 14.2 Design System Integration <a id="142-design-system-integration"></a>

CLS supports design system patterns through:

- **Token System**: Centralized design tokens
- **Variant System**: Consistent component variants
- **Inheritance**: Hierarchical design system structure
- **Composition**: Reusable component patterns

### 14.3 Build System Integration <a id="143-build-system-integration"></a>

CLS works with modern build systems:

- **Tree Shaking**: Unused code is eliminated
- **Type Checking**: Full TypeScript support
- **Bundle Optimization**: Minimal runtime footprint
- **Development Experience**: Excellent IDE support

---

## 15. Best Practices <a id="15-best-practices"></a>

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Integration Patterns](#14-integration-patterns)**

### 15.1 Contract Design <a id="151-contract-design"></a>

1. **Clear Naming**: Use descriptive names for tokens, slots, and variants
2. **Logical Grouping**: Group related tokens together
3. **Consistent Structure**: Maintain consistent contract structure
4. **Minimal Coupling**: Keep contracts focused and cohesive

### 15.2 Definition Design <a id="152-definition-design"></a>

1. **Semantic Tokens**: Use semantic names for design tokens
2. **Consistent Rules**: Maintain consistent rule patterns
3. **Default Values**: Provide sensible defaults for all variants
4. **Override Strategy**: Plan for override scenarios

### 15.3 Component Design <a id="153-component-design"></a>

1. **Slot Granularity**: Use appropriate slot granularity
2. **Variant Simplicity**: Keep variants simple and focused
3. **Token Reuse**: Reuse tokens across components
4. **Inheritance Planning**: Plan inheritance hierarchies carefully

### 15.4 Performance Optimization <a id="154-performance-optimization"></a>

1. **Caching**: Leverage built-in caching mechanisms
2. **Lazy Loading**: Use lazy evaluation where appropriate
3. **Bundle Size**: Monitor bundle size impact
4. **Runtime Performance**: Profile runtime performance

---

**[↑ Back to Top](#table-of-contents)**
