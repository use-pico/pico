# CLS Library Testing Guide

> **Note**: This guide provides a structured approach to testing the CLS library, ensuring comprehensive coverage of all features and edge cases.

## Table of Contents <a id="table-of-contents"></a>

- [1. Basic CLS Creation](#1-basic-cls-creation)
  - [1.1 Simple Component Creation](#11-simple-component-creation)
  - [1.2 Token System Basics](#12-token-system-basics)
  - [1.3 Slot System Basics](#13-slot-system-basics)
  - [1.4 Variant System Basics](#14-variant-system-basics)
- [2. What Utility and Definition Helpers](#2-what-utility-and-definition-helpers)
  - [2.1 What Utility Functions](#21-what-utility-functions)
  - [2.2 Definition Helpers](#22-definition-helpers)
- [3. Rules and Conditional Styling](#3-rules-and-conditional-styling)
  - [3.1 Basic Rule Matching](#31-basic-rule-matching)
  - [3.2 Complex Rule Combinations](#32-complex-rule-combinations)
  - [3.3 Rule Override Behavior](#33-rule-override-behavior)
- [4. Create Method and Configuration](#4-create-method-and-configuration)
  - [4.1 Basic Create Usage](#41-basic-create-usage)
  - [4.2 Advanced Create Configuration](#42-advanced-create-configuration)
  - [4.3 Create Method Edge Cases](#43-create-method-edge-cases)
- [5. Inheritance and Extension](#5-inheritance-and-extension)
  - [5.1 Basic Inheritance](#51-basic-inheritance)
  - [5.2 Advanced Inheritance Patterns](#52-advanced-inheritance-patterns)
  - [5.3 Inheritance Edge Cases](#53-inheritance-edge-cases)
- [6. Use Method and Type Safety](#6-use-method-and-type-safety)
  - [6.1 Use Method Basics](#61-use-method-basics)
  - [6.2 Type Safety Features](#62-type-safety-features)
- [7. Cache Performance Testing](#7-cache-performance-testing)
  - [7.1 Cache Performance Benchmarks](#71-cache-performance-benchmarks)
  - [7.2 Cache Validation Tests](#72-cache-validation-tests)
- [8. Integration and Real-World Usage](#8-integration-and-real-world-usage)
  - [8.1 React Integration](#81-react-integration)
  - [8.2 Design System Integration](#82-design-system-integration)
- [9. Error Handling and Edge Cases](#9-error-handling-and-edge-cases)
  - [9.1 Validation and Errors](#91-validation-and-errors)
  - [9.2 Edge Case Handling](#92-edge-case-handling)
- [10. Advanced Patterns and Techniques](#10-advanced-patterns-and-techniques)
  - [10.1 Dynamic Styling](#101-dynamic-styling)
  - [10.2 Advanced Composition](#102-advanced-composition)
- [11. Complex Inheritance and Override Stress Tests](#11-complex-inheritance-and-override-stress-tests)
  - [11.1 Multi-Level Inheritance with Progressive Overrides](#111-multi-level-inheritance-with-progressive-overrides)
  - [11.2 Complex Create-Time Override Combinations](#112-complex-create-time-override-combinations)
  - [11.3 Slot-Time Override Stress Testing](#113-slot-time-override-stress-testing)
  - [11.4 Ultimate Integration Stress Test](#114-ultimate-integration-stress-test)
- [12. React Integration](#12-react-integration)
  - [12.1 React Hooks](#121-react-hooks)
  - [12.2 React Context](#122-react-context)
  - [12.3 React Components](#123-react-components)
  - [12.4 React Props](#124-react-props)
  - [12.5 React Integration](#125-react-integration)
  - [12.6 React Advanced Integration](#126-react-advanced-integration)

---

## Important Testing Philosophy

> **Type Safety Note**: The CLS library provides **compile-time type safety** that prevents invalid values from being passed into the `cls()` function. This means:
> - **No runtime validation tests needed** for invalid contract structures, token definitions, or variant values
> - **TypeScript compilation will catch** any attempts to pass invalid configurations
> - **Tests should focus on valid usage patterns** and ensure the library behaves correctly with valid inputs
> - **This type safety is one of the main benefits** of using CLS over other styling solutions

> **What We Don't Test**: Invalid contracts, malformed definitions, type mismatches, or other scenarios that TypeScript prevents at compile time.

> **Performance Note**: We do not test performance characteristics, memory usage, or runtime optimization. The focus is on **functional correctness** and **API behavior** rather than performance metrics.

> **Test Organization**: Tests should match individual chapters and subchapters in folders, where each folder can contain an arbitrary number of files (per single responsibility requirement). This allows for better organization and easier maintenance while keeping individual test files focused on specific scenarios.

**Folder Structure Example**:
```
test/
├── chapter-01/
│   ├── 1.1-simple-component-creation/
│   │   ├── basic-creation.test.ts
│   │   └── minimal-contract.test.ts
│   ├── 1.2-token-system-basics/
│   │   ├── single-tokens.test.ts
│   │   └── token-inheritance.test.ts
│   └── 1.3-slot-system-basics/
│       ├── single-slot.test.ts
│       └── multiple-slots.test.ts
├── chapter-02/
│   ├── 2.1-what-utility-functions/
│   │   ├── what-css.test.ts
│   │   ├── what-token.test.ts
│   │   └── what-variant.test.ts
│   └── 2.2-definition-helpers/
│       ├── def-root.test.ts
│       └── def-rule.test.ts
└── chapter-11/
    ├── 11.1-multi-level-inheritance/
    │   ├── level-1-base.test.ts
    │   ├── level-2-extension.test.ts
    │   └── level-3-complex.test.ts
    └── 11.2-create-override-combinations/
        ├── user-config.test.ts
        ├── internal-config.test.ts
        └── progressive-overrides.test.ts
```

## Testing Philosophy

### File Organization
- **Small, Focused Tests**: Each test file should focus on a specific feature or concept
- **Logical Grouping**: Group related tests into separate files for better organization
- **Progressive Complexity**: Start with basic functionality and progress to complex scenarios
- **Comprehensive Coverage**: Ensure every API method and feature is thoroughly tested

### Test Structure
- **Single Responsibility**: Each test file covers one main concept or feature
- **Clear Naming**: Use descriptive file names that indicate what is being tested
- **Consistent Patterns**: Follow consistent testing patterns across all test files
- **Edge Case Coverage**: Include both happy path and edge case scenarios

## Chapter 1: Basic CLS Creation <a id="1-basic-cls-creation"></a>

**[← Previous: Table of Contents](#table-of-contents)** | **[→ Next Chapter: What Utility and Definition Helpers](#2-what-utility-and-definition-helpers)**

### 1.1 Simple Component Creation <a id="11-simple-component-creation"></a>
**File**: `01-basic-creation.test.ts`

**Scenarios to Cover**:
- Basic `cls` instance creation with minimal contract
- Simple token definitions
- Basic slot definitions
- Default variant values
- Basic `create()` method usage

**Test Cases**:
```typescript
// Basic button creation
const Button = cls(
  {
    tokens: { "color.bg": ["default"] },
    slot: ["root"],
    variant: { size: ["sm", "md"] }
  },
  ({ what, def }) => ({
    token: def.token({
      "color.bg": { default: ["bg-gray-100"] }
    }),
    rules: [def.root({ root: what.token(["color.bg.default"]) })],
    defaults: def.defaults({ size: "md" })
  })
);
```

### 1.2 Token System Basics <a id="12-token-system-basics"></a>
**File**: `02-token-basics.test.ts`

**Scenarios to Cover**:
- Single token definitions
- Multiple token variants
- Token resolution to CSS classes
- Token inheritance basics
- Token override functionality

**Test Cases**:
```typescript
// Token inheritance and resolution
const Base = cls(
  { tokens: { "color.text": ["default", "primary"] } },
  ({ what, def }) => ({
    token: def.token({
      "color.text": {
        default: ["text-gray-900"],
        primary: ["text-blue-600"]
      }
    })
  })
);
```

### 1.3 Slot System Basics <a id="13-slot-system-basics"></a>
**File**: `03-slot-basics.test.ts`

**Scenarios to Cover**:
- Single slot components
- Multiple slot components
- Slot function creation
- Slot override functionality
- Slot inheritance

**Test Cases**:
```typescript
// Multi-slot component
const Card = cls(
  { slot: ["root", "header", "body", "footer"] },
  ({ what, def }) => ({
    rules: [
      def.root({
        root: what.css(["bg-white", "rounded-lg", "shadow"]),
        header: what.css(["px-4", "py-3", "border-b"]),
        body: what.css(["px-4", "py-4"]),
        footer: what.css(["px-4", "py-3", "border-t"])
      })
    ]
  })
);
```

### 1.4 Variant System Basics <a id="14-variant-system-basics"></a>
**File**: `04-variant-basics.test.ts`

**Scenarios to Cover**:
- String variants (size, variant, etc.)
- Boolean variants (disabled, loading, etc.)
- Default variant values
- Variant inheritance
- Variant override in `create()`

**Test Cases**:
```typescript
// Boolean and string variants
const Button = cls(
  {
    variant: {
      size: ["sm", "md", "lg"],
      disabled: ["bool"],
      loading: ["bool"]
    }
  },
  ({ what, def }) => ({
    rules: [
      def.root({
        root: what.css(["inline-flex", "items-center"])
      }),
      def.rule(what.variant({ disabled: true }), {
        root: what.css(["opacity-50", "cursor-not-allowed"])
      })
    ],
    defaults: def.defaults({
      size: "md",
      disabled: false,
      loading: false
    })
  })
);
```

---

**[↑ Back to Top](#table-of-contents)** | **[→ Next Chapter: What Utility and Definition Helpers](#2-what-utility-and-definition-helpers)**

## Chapter 2: What Utility and Definition Helpers <a id="2-what-utility-and-definition-helpers"></a>

**[← Previous Chapter: Basic CLS Creation](#1-basic-cls-creation)** | **[→ Next Chapter: Rules and Conditional Styling](#3-rules-and-conditional-styling)**

### 2.1 What Utility Functions <a id="21-what-utility-functions"></a>
**File**: `05-what-utility.test.ts`

**Scenarios to Cover**:
- `what.css()` for class-only styling
- `what.token()` for token-only styling
- `what.both()` for combined styling
- `what.variant()` for type-safe variants
- Edge cases and error handling

**Test Cases**:
```typescript
// All what utility methods
const TestComponent = cls(
  { tokens: { "color.bg": ["primary"] }, slot: ["root"] },
  ({ what, def }) => ({
    token: def.token({
      "color.bg": { primary: ["bg-blue-600"] }
    }),
    rules: [
      def.root({
        root: what.both(
          ["rounded-md", "shadow"],
          ["color.bg.primary"]
        )
      }),
      def.rule(what.variant({ size: "lg" }), {
        root: what.css(["px-6", "py-3"])
      })
    ]
  })
);
```

### 2.2 Definition Helpers <a id="22-definition-helpers"></a>
**File**: `06-definition-helpers.test.ts`

**Scenarios to Cover**:
- `def.root()` for default slot configuration
- `def.rule()` for conditional styling
- `def.token()` for token definitions
- `def.defaults()` for default values
- Helper function error handling

**Test Cases**:
```typescript
// All definition helpers
const Component = cls(
  {
    tokens: { "color.text": ["default"] },
    slot: ["root", "label"],
    variant: { size: ["sm", "md"] }
  },
  ({ what, def }) => ({
    token: def.token({
      "color.text": { default: ["text-gray-900"] }
    }),
    rules: [
      def.root({
        root: what.css(["flex", "items-center"]),
        label: what.token(["color.text.default"])
      }),
      def.rule(what.variant({ size: "md" }), {
        root: what.css(["px-4", "py-2"])
      })
    ],
    defaults: def.defaults({ size: "md" })
  })
);
```

---

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: What Utility and Definition Helpers](#2-what-utility-and-definition-helpers)** | **[→ Next Chapter: Rules and Conditional Styling](#3-rules-and-conditional-styling)**

## Chapter 3: Rules and Conditional Styling <a id="3-rules-and-conditional-styling"></a>

**[← Previous Chapter: What Utility and Definition Helpers](#2-what-utility-and-definition-helpers)** | **[→ Next Chapter: Create Method and Configuration](#4-create-method-and-configuration)**

### 3.1 Basic Rule Matching <a id="31-basic-rule-matching"></a>
**File**: `07-basic-rules.test.ts`

**Scenarios to Cover**:
- Single variant rule matching
- Multiple variant rule matching
- Rule order and precedence
- Default rule application
- Rule inheritance

**Test Cases**:
```typescript
// Basic rule matching
const Button = cls(
  {
    variant: { size: ["sm", "md", "lg"], variant: ["default", "primary"] }
  },
  ({ what, def }) => ({
    rules: [
      def.root({ root: what.css(["inline-flex", "items-center"]) }),
      def.rule(what.variant({ size: "lg" }), {
        root: what.css(["px-6", "py-3", "text-lg"])
      }),
      def.rule(what.variant({ variant: "primary" }), {
        root: what.css(["bg-blue-600", "text-white"])
      })
    ]
  })
);
```

### 3.2 Complex Rule Combinations <a id="32-complex-rule-combinations"></a>
**File**: `08-complex-rules.test.ts`

**Scenarios to Cover**:
- Multiple variant combinations
- Rule override behavior
- Complex boolean logic
- Nested variant conditions
- Rule precedence conflicts

**Test Cases**:
```typescript
// Complex rule combinations
const Button = cls(
  {
    variant: {
      size: ["sm", "md", "lg"],
      variant: ["default", "primary", "danger"],
      disabled: ["bool"],
      loading: ["bool"]
    }
  },
  ({ what, def }) => ({
    rules: [
      def.root({ root: what.css(["inline-flex", "items-center"]) }),
      def.rule(what.variant({ size: "lg", variant: "primary" }), {
        root: what.css(["px-8", "py-4", "bg-blue-600", "text-white"])
      }),
      def.rule(what.variant({ disabled: true }), {
        root: what.css(["opacity-50", "cursor-not-allowed"])
      }),
      def.rule(what.variant({ loading: true }), {
        root: what.css(["opacity-75"])
      })
    ]
  })
);
```

### 3.3 Rule Override Behavior <a id="33-rule-override-behavior"></a>
**File**: `09-rule-override.test.ts`

**Scenarios to Cover**:
- `override: true` behavior
- `override: false` behavior (default)
- Partial slot overrides
- Complete slot overrides
- Override inheritance

**Test Cases**:
```typescript
// Rule override behavior
const Component = cls(
  { slot: ["root", "label"] },
  ({ what, def }) => ({
    rules: [
      def.root({
        root: what.css(["bg-gray-100", "p-4"]),
        label: what.css(["text-gray-900"])
      }),
      def.rule(what.variant({ variant: "primary" }), {
        root: what.css(["bg-blue-100", "border-blue-300"]),
        override: true
      })
    ]
  })
);
```

---

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Rules and Conditional Styling](#3-rules-and-conditional-styling)** | **[→ Next Chapter: Create Method and Configuration](#4-create-method-and-configuration)**

## Chapter 4: Create Method and Configuration <a id="4-create-method-and-configuration"></a>

**[← Previous Chapter: Rules and Conditional Styling](#3-rules-and-conditional-styling)** | **[→ Next Chapter: Inheritance and Extension](#5-inheritance-and-extension)**

### 4.1 Basic Create Usage <a id="41-basic-create-usage"></a>
**File**: `10-basic-create.test.ts`

**Scenarios to Cover**:
- Parameter-less `create()` call (default configuration)
- Variant overrides
- Slot overrides
- Token overrides
- Default configuration
- Error handling

**Test Cases**:
```typescript
// Parameter-less create usage (default configuration)
const classes = Button.create();

// Basic create usage with variants
const classes = Button.create(({ what }) => ({
  variant: what.variant({ size: "lg", variant: "primary" })
}));

// With slot overrides
const classes = Button.create(({ what }) => ({
  slot: {
    root: what.css(["custom-class", "additional-style"])
  }
}));
```

### 4.2 Advanced Create Configuration <a id="42-advanced-create-configuration"></a>
**File**: `11-advanced-create.test.ts`

**Scenarios to Cover**:
- Combined user and internal configs
- Multiple override types
- Complex override scenarios
- Configuration precedence
- Edge cases

**Test Cases**:
```typescript
// Combined configurations
const classes = Button.create(
  ({ what }) => ({
    variant: what.variant({ variant: "primary" }),
    slot: { root: what.css(["user-override"]) }
  }),
  ({ what }) => ({
    slot: { root: what.css(["internal-override"]) }
  })
);

// Token overrides
const classes = Button.create(({ what }) => ({
  token: {
    "color.bg": {
      primary: ["bg-custom-blue"]
    }
  }
}));
```

### 4.3 Create Method Edge Cases <a id="43-create-method-edge-cases"></a>
**File**: `12-create-edge-cases.test.ts`

**Scenarios to Cover**:
- Invalid variant combinations
- Missing token definitions
- Undefined slot references
- Type safety violations
- Performance edge cases

**Test Cases**:
```typescript
// Invalid configurations
const classes = Button.create(({ what }) => ({
  variant: what.variant({ size: "invalid" }) // Should error
}));

// Missing tokens
const classes = Button.create(({ what }) => ({
  slot: { root: what.token(["nonexistent.token"]) }
}));
```

---

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Create Method and Configuration](#4-create-method-and-configuration)** | **[→ Next Chapter: Inheritance and Extension](#5-inheritance-and-extension)**

## Chapter 5: Inheritance and Extension <a id="5-inheritance-and-extension"></a>

**[← Previous Chapter: Create Method and Configuration](#4-create-method-and-configuration)** | **[→ Next Chapter: Use Method and Type Safety](#6-use-method-and-type-safety)**

### 5.1 Basic Inheritance <a id="51-basic-inheritance"></a>
**File**: `13-basic-inheritance.test.ts`

**Scenarios to Cover**:
- Simple contract extension
- Token inheritance
- Slot inheritance
- Variant inheritance
- Default value inheritance
- Minimal parent inheritance (parent with empty tokens/variants/slots)

**Test Cases**:
```typescript
// Basic inheritance
const BaseButton = cls(baseContract, baseDefinition);
const PrimaryButton = BaseButton.extend(
  {
    variant: { variant: ["primary", "secondary"] }
  },
  ({ what, def }) => ({
    rules: [
      def.rule(what.variant({ variant: "primary" }), {
        root: what.css(["bg-blue-600", "text-white"])
      })
    ]
  })
);

// Minimal parent inheritance (parent with empty tokens/variants/slots)
const MinimalParent = cls(
  {
    tokens: {},
    slot: [],
    variant: {}
  },
  ({ what, def }) => ({
    token: {},
    rules: [],
    defaults: {}
  })
);
const ChildOfMinimal = MinimalParent.extend(
  {
    tokens: { "color.bg": ["primary"] },
    slot: ["root"],
    variant: { size: ["sm", "md"] }
  },
  ({ what, def }) => ({
    token: def.token({
      "color.bg": { primary: ["bg-blue-600"] }
    }),
    rules: [def.root({ root: what.token(["color.bg.primary"]) })],
    defaults: def.defaults({ size: "md" })
  })
);
```

### 5.2 Advanced Inheritance Patterns <a id="52-advanced-inheritance-patterns"></a>
**File**: `14-advanced-inheritance.test.ts`

**Scenarios to Cover**:
- Multi-level inheritance
- Token override vs append
- Complex inheritance chains
- Inheritance conflicts
- Performance implications

**Test Cases**:
```typescript
// Multi-level inheritance
const Base = cls(baseContract, baseDefinition);
const Button = Base.extend(buttonContract, buttonDefinition);
const PrimaryButton = Button.extend(primaryContract, primaryDefinition);
const LargePrimaryButton = PrimaryButton.extend(
  { variant: { size: ["xl"] } },
  ({ what, def }) => ({
    rules: [
      def.rule(what.variant({ size: "xl" }), {
        root: what.css(["px-8", "py-4", "text-xl"])
      })
    ]
  })
);
```

### 5.3 Inheritance Edge Cases <a id="53-inheritance-edge-cases"></a>
**File**: `15-inheritance-edge-cases.test.ts`

**Scenarios to Cover**:
- Circular inheritance
- Deep inheritance chains
- Token resolution conflicts
- Variant type conflicts
- Memory usage patterns

**Test Cases**:
```typescript
// Deep inheritance with conflicts
const DeepInheritance = Base
  .extend(level1Contract, level1Definition)
  .extend(level2Contract, level2Definition)
  .extend(level3Contract, level3Definition);

// Token override scenarios
const OverrideTest = Base.extend(
  {
    tokens: { "color.bg": ["custom"] } // Should replace inherited tokens
  },
  ({ what, def }) => ({
    token: def.token({
      "color.bg": { custom: ["bg-custom-color"] }
    })
  })
);
```

---

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Inheritance and Extension](#5-inheritance-and-extension)** | **[→ Next Chapter: Use Method and Type Safety](#6-use-method-and-type-safety)**

## Chapter 6: Use Method and Type Safety <a id="6-use-method-and-type-safety"></a>

**[← Previous Chapter: Inheritance and Extension](#5-inheritance-and-extension)** | **[→ Next Chapter: Cache Performance Testing](#7-cache-performance-testing)**

### 6.1 Use Method Basics <a id="61-use-method-basics"></a>
**File**: `16-use-basics.test.ts`

**Scenarios to Cover**:
- Basic `use()` functionality
- Type compatibility checking
- Inheritance validation
- Error handling
- Return value behavior

**Test Cases**:
```typescript
// Basic use functionality
const ButtonGroup = Button.use(PrimaryButton);
const ExtendedGroup = ButtonGroup.use(LargePrimaryButton);

// Type compatibility
const Compatible = BaseButton.use(PrimaryButton); // Should work
const Incompatible = PrimaryButton.use(BaseButton); // Should error
```

### 6.2 Type Safety Features <a id="62-type-safety-features"></a>
**File**: `17-type-safety.test.ts`

**Scenarios to Cover**:
- Contract type validation
- Definition type validation
- Variant type inference
- Token type safety
- Slot type safety

**Test Cases**:
```typescript
// Type validation
const ValidContract = cls(
  {
    tokens: { "color.bg": ["primary"] },
    slot: ["root"],
    variant: { size: ["sm", "md"] }
  },
  ({ what, def }) => ({
    token: def.token({
      "color.bg": { primary: ["bg-blue-600"] }
    }),
    rules: [def.root({ root: what.token(["color.bg.primary"]) })],
    defaults: def.defaults({ size: "md" })
  })
);
```

---

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Use Method and Type Safety](#6-use-method-and-type-safety)** | **[→ Next Chapter: Cache Performance Testing](#7-cache-performance-testing)**

## Chapter 7: Cache Performance Testing <a id="7-cache-performance-testing"></a>

**[← Previous Chapter: Use Method and Type Safety](#6-use-method-and-type-safety)** | **[→ Next Chapter: Integration and Real-World Usage](#8-integration-and-real-world-usage)**

### 7.1 Cache Performance Benchmarks <a id="71-cache-performance-benchmarks"></a>
**File**: `18-cache-performance.test.ts`

**Scenarios to Cover**:
- Cache hit performance (create outside loop)
- Cache miss performance (create inside loop)
- Performance difference measurement
- Slot function reuse validation
- Cache effectiveness demonstration

**Test Cases**:
```typescript
// Cache performance test - comparing create inside vs outside loop
const Button = cls(contract, definition);

// Test 1: Create inside loop (cache misses - slower)
const startInsideLoop = performance.now();
for (let i = 0; i < 1000; i++) {
  const classes = Button.create();
  // Also call slots to make it a fair comparison
  const rootClasses = classes.root();
  const labelClasses = classes.label();
}
const insideLoopTime = performance.now() - startInsideLoop;

// Test 2: Create outside loop (cache hits - faster)
const classes = Button.create();
const startOutsideLoop = performance.now();
for (let i = 0; i < 1000; i++) {
  // Reuse the same slot functions
  const rootClasses = classes.root();
  const labelClasses = classes.label();
}
const outsideLoopTime = performance.now() - startOutsideLoop;

// Performance difference should be significant
// create inside loop should be 3-5x slower due to cache misses
const performanceRatio = insideLoopTime / outsideLoopTime;
expect(performanceRatio).toBeGreaterThan(3); // At least 3x slower
expect(performanceRatio).toBeLessThan(10);   // But not more than 10x (reasonable upper bound)

// Validate that slot functions are actually reused
const slotFunction1 = classes.root;
const slotFunction2 = Button.create().root;
expect(slotFunction1).toBe(slotFunction2); // Same function reference
```

### 7.2 Cache Validation Tests <a id="72-cache-validation-tests"></a>
**File**: `19-cache-validation.test.ts`

**Scenarios to Cover**:
- Slot function identity across create calls
- Variant-specific caching
- Token resolution caching
- Rule matching caching
- Cache consistency validation

**Test Cases**:
```typescript
// Cache validation - ensure slot functions are reused
const Button = cls(contract, definition);

// Create multiple instances
const instance1 = Button.create();
const instance2 = Button.create();
const instance3 = Button.create();

// All instances should share the same slot functions (cached)
expect(instance1.root).toBe(instance2.root);
expect(instance2.root).toBe(instance3.root);
expect(instance1.label).toBe(instance2.label);

// Variant-specific instances should also share base slot functions
const variantInstance = Button.create(({ what }) => ({
  variant: what.variant({ size: "lg" })
}));

// Base slots should be the same
expect(instance1.root).toBe(variantInstance.root);

// But variant-specific slots might be different
const variantInstance2 = Button.create(({ what }) => ({
  variant: what.variant({ size: "lg" })
}));

// Same variant should share slot functions
expect(variantInstance.root).toBe(variantInstance2.root);
```

> **Performance Testing Note**: These cache performance tests are designed to demonstrate the caching benefits of the CLS library, but they are **not direct performance comparisons**. The "create inside loop" test creates new instances on each iteration (cache misses), while the "create outside loop" test reuses cached slot functions. This approach shows the real-world benefit of caching without introducing artificial cache disabling mechanisms. The performance difference should be significant (3-5x) due to the overhead of creating new instances vs. reusing cached functions.

---

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Cache Performance Testing](#7-cache-performance-testing)** | **[→ Next Chapter: Integration and Real-World Usage](#8-integration-and-real-world-usage)**

## Chapter 8: Integration and Real-World Usage <a id="8-integration-and-real-world-usage"></a>

**[← Previous Chapter: Cache Performance Testing](#7-cache-performance-testing)** | **[→ Next Chapter: Error Handling and Edge Cases](#9-error-handling-and-edge-cases)**

### 8.1 React Integration <a id="81-react-integration"></a>

**Note**: React integration testing is covered in **Chapter 12: React Integration**, which provides comprehensive coverage of all React-specific features.

**Chapter 12 Structure**:
- **12.1 React Hooks** - `useCls` hook functionality and performance
- **12.2 React Context** - `ClsProvider` and `useClsContext` usage
- **12.3 React Components** - `withCls` HOC and component integration
- **12.4 React Props** - `cls` prop handling and overrides
- **12.5 React Integration** - Context integration and token inheritance
- **12.6 React Advanced Integration** - HOC combinations and complex patterns

**Key React Features Tested**:
- `useCls` hook with configuration functions
- `ClsProvider` context provider
- `useClsContext` hook for accessing context
- `withCls` Higher-Order Component
- `cls` prop overrides and merging
- Context token inheritance and conflicts
- HOC composition patterns
- Performance optimization with stable references
- Error handling for missing tokens and undefined instances

### 8.2 Design System Integration <a id="82-design-system-integration"></a>
**File**: `21-design-system.test.ts`

**Scenarios to Cover**:
- Token system integration
- Variant consistency
- Component composition
- Theme integration
- Design token resolution

**Test Cases**:
```typescript
// Design system patterns
const DesignTokens = {
  colors: { primary: ["blue-600"], secondary: ["gray-600"] },
  spacing: { sm: ["p-2"], md: ["p-4"], lg: ["p-6"] }
};

const Component = cls(
  {
    tokens: {
      "color.bg": ["primary", "secondary"],
      "spacing.padding": ["sm", "md", "lg"]
    }
  },
  ({ what, def }) => ({
    token: def.token({
      "color.bg": {
        primary: DesignTokens.colors.primary,
        secondary: DesignTokens.colors.secondary
      },
      "spacing.padding": {
        sm: DesignTokens.spacing.sm,
        md: DesignTokens.spacing.md,
        lg: DesignTokens.spacing.lg
      }
    })
  })
);
```

---

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Integration and Real-World Usage](#8-integration-and-real-world-usage)** | **[→ Next Chapter: Error Handling and Edge Cases](#9-error-handling-and-edge-cases)**

## Chapter 9: Error Handling and Edge Cases <a id="9-error-handling-and-edge-cases"></a>

**[← Previous Chapter: Integration and Real-World Usage](#8-integration-and-real-world-usage)** | **[→ Next Chapter: Advanced Patterns and Techniques](#10-advanced-patterns-and-techniques)**

### 9.1 Validation and Errors <a id="91-validation-and-errors"></a>
**File**: `22-validation-errors.test.ts`

**Scenarios to Cover**:
- Invalid contract structure
- Missing token definitions
- Invalid variant values
- Type mismatches
- Runtime errors

**Test Cases**:
```typescript
// Invalid contracts
const InvalidContract = cls(
  {
    tokens: { "invalid": ["value"] }, // Missing definition
    slot: ["root"]
  },
  ({ what, def }) => ({
    rules: [def.root({ root: what.css(["class"]) })]
  })
);

// Missing definitions
const MissingDefinitions = cls(
  { tokens: { "color.bg": ["primary"] } },
  ({ what, def }) => ({
    // Missing token definitions
    rules: [def.root({ root: what.css(["class"]) })]
  })
);
```

### 9.2 Edge Case Handling <a id="92-edge-case-handling"></a>
**File**: `23-edge-cases.test.ts`

**Scenarios to Cover**:
- Empty contracts
- Empty definitions
- Null/undefined values
- Extreme values
- Boundary conditions

**Test Cases**:
```typescript
// Empty contracts
const EmptyContract = cls({}, ({ what, def }) => ({}));

// Extreme values
const ExtremeComponent = cls(
  {
    tokens: { "test": ["value"] },
    slot: ["root"],
    variant: { size: ["sm", "md", "lg"] }
  },
  ({ what, def }) => ({
    token: def.token({
      "test": { value: ["very-long-class-name-that-exceeds-normal-bounds"] }
    }),
    rules: [def.root({ root: what.token(["test.value"]) })]
  })
);
```

---

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Error Handling and Edge Cases](#9-error-handling-and-edge-cases)**

## Chapter 10: Advanced Patterns and Techniques <a id="10-advanced-patterns-and-techniques"></a>

**[← Previous Chapter: Error Handling and Edge Cases](#9-error-handling-and-edge-cases)**

### 10.1 Dynamic Styling <a id="101-dynamic-styling"></a>
**File**: `24-dynamic-styling.test.ts`

**Scenarios to Cover**:
- Runtime token generation
- Dynamic variant creation
- Conditional rule application
- State-based styling
- Responsive patterns

**Test Cases**:
```typescript
// Dynamic token generation
const createDynamicTokens = (theme) => ({
  "color.bg": {
    primary: [`bg-${theme}-600`],
    secondary: [`bg-${theme}-200`]
  }
});

const DynamicComponent = cls(
  { tokens: { "color.bg": ["primary", "secondary"] } },
  ({ what, def }) => ({
    token: def.token(createDynamicTokens("blue")),
    rules: [def.root({ root: what.token(["color.bg.primary"]) })]
  })
);
```

### 10.2 Advanced Composition <a id="102-advanced-composition"></a>
**File**: `25-advanced-composition.test.ts`

**Scenarios to Cover**:
- Component composition patterns
- Slot composition
- Variant composition
- Token composition
- Inheritance composition

**Test Cases**:
```typescript
// Advanced composition
const BaseComponent = cls(baseContract, baseDefinition);
const StyleMixin = cls(styleContract, styleDefinition);
const BehaviorMixin = cls(behaviorContract, behaviorDefinition);

const ComposedComponent = BaseComponent
  .extend(styleContract, styleDefinition)
  .extend(behaviorContract, behaviorDefinition);
```

---

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Error Handling and Edge Cases](#9-error-handling-and-edge-cases)** | **[→ Next Chapter: Complex Inheritance and Override Stress Tests](#11-complex-inheritance-and-override-stress-tests)**

## Chapter 11: Complex Inheritance and Override Stress Tests <a id="11-complex-inheritance-and-override-stress-tests"></a>

**[← Previous Chapter: Advanced Patterns and Techniques](#10-advanced-patterns-and-techniques)** | **[→ Next Chapter: React Integration](#12-react-integration)**

This chapter contains the most complex test scenarios that push the CLS library to its absolute limits. These tests validate that the library behaves correctly under extreme conditions with multiple inheritance levels, complex override combinations, and edge cases that stress-test the entire system.

### 11.1 Multi-Level Inheritance with Progressive Overrides <a id="111-multi-level-inheritance-with-progressive-overrides"></a>
**File**: `26-multi-level-inheritance.test.ts`

**Scenarios to Cover**:
- 5+ level inheritance chain with progressive complexity
- Token additions, overrides, and merges at each level
- Variant extensions and overrides at each level
- Slot additions and modifications at each level
- Default value inheritance and overrides
- Complex rule inheritance and override behavior

**Test Cases**:
```typescript
// Level 1: Base component with minimal structure
const BaseLevel1 = cls(
  {
    tokens: { "color.bg": ["default"] },
    slot: ["root"],
    variant: { size: ["sm"] }
  },
  ({ what, def }) => ({
    token: def.token({
      "color.bg": { default: ["bg-gray-100"] }
    }),
    rules: [def.root({ root: what.css(["p-2", "rounded"]) })],
    defaults: def.defaults({ size: "sm" })
  })
);

// Level 2: Add tokens and variants
const Level2 = BaseLevel1.extend(
  {
    tokens: { "color.bg": ["primary"], "color.text": ["default"] },
    slot: ["root", "label"],
    variant: { size: ["sm", "md"], variant: ["default"] }
  },
  ({ what, def }) => ({
    token: def.token({
      "color.bg": { primary: ["bg-blue-600"] },
      "color.text": { default: ["text-gray-900"] }
    }),
    rules: [
      def.root({
        root: what.css(["flex", "items-center"]),
        label: what.token(["color.text.default"])
      }),
      def.rule(what.variant({ size: "md" }), {
        root: what.css(["px-4", "py-2"])
      })
    ],
    defaults: def.defaults({ size: "md", variant: "default" })
  })
);

// Level 3: Override tokens and add complex variants
const Level3 = Level2.extend(
  {
    tokens: { "color.bg": ["primary", "secondary"], "spacing": ["sm", "md"] },
    slot: ["root", "label", "icon"],
    variant: { size: ["sm", "md", "lg"], variant: ["default", "primary"], disabled: ["bool"] }
  },
  ({ what, def }) => ({
    token: def.token({
      "color.bg": { 
        primary: ["bg-blue-700"], // Override from Level2
        secondary: ["bg-gray-600"] // New token
      },
      "spacing": { sm: ["p-2"], md: ["p-4"] }
    }),
    rules: [
      def.root({
        root: what.css(["relative", "transition-all"]),
        label: what.css(["font-medium"]),
        icon: what.css(["ml-2"])
      }),
      def.rule(what.variant({ size: "lg" }), {
        root: what.css(["px-6", "py-3", "text-lg"])
      }),
      def.rule(what.variant({ variant: "primary" }), {
        root: what.token(["color.bg.primary"]),
        label: what.css(["text-white"])
      }),
      def.rule(what.variant({ disabled: true }), {
        root: what.css(["opacity-50", "cursor-not-allowed"])
      })
    ],
    defaults: def.defaults({ size: "lg", variant: "primary", disabled: false })
  })
);

// Level 4: Complex token merging and slot overrides
const Level4 = Level3.extend(
  {
    tokens: { "color.bg": ["primary", "secondary", "danger"], "animation": ["fast", "slow"] },
    slot: ["root", "label", "icon", "badge"],
    variant: { size: ["sm", "md", "lg", "xl"], variant: ["default", "primary", "danger"], loading: ["bool"] }
  },
  ({ what, def }) => ({
    token: def.token({
      "color.bg": { 
        danger: ["bg-red-600"] // New token
      },
      "animation": { fast: ["animate-pulse"], slow: ["animate-bounce"] }
    }),
    rules: [
      def.root({
        root: what.css(["group", "focus:outline-none"]),
        badge: what.css(["absolute", "-top-1", "-right-1"])
      }),
      def.rule(what.variant({ size: "xl" }), {
        root: what.css(["px-8", "py-4", "text-xl"])
      }),
      def.rule(what.variant({ variant: "danger" }), {
        root: what.token(["color.bg.danger"]),
        label: what.css(["text-white"])
      }),
      def.rule(what.variant({ loading: true }), {
        root: what.css(["animate-spin"])
      })
    ],
    defaults: def.defaults({ size: "xl", variant: "danger", loading: false })
  })
);

// Level 5: Ultimate complexity with all features
const UltimateComponent = Level4.extend(
  {
    tokens: { "color.bg": ["primary", "secondary", "danger", "success"], "theme": ["light", "dark"] },
    slot: ["root", "label", "icon", "badge", "tooltip"],
    variant: { 
      size: ["sm", "md", "lg", "xl", "2xl"], 
      variant: ["default", "primary", "danger", "success"], 
      theme: ["light", "dark"],
      interactive: ["bool"]
    }
  },
  ({ what, def }) => ({
    token: def.token({
      "color.bg": { 
        success: ["bg-green-600"] // New token
      },
      "theme": { light: ["bg-white"], dark: ["bg-gray-900"] }
    }),
    rules: [
      def.root({
        root: what.css(["cursor-pointer", "select-none"]),
        tooltip: what.css(["invisible", "group-hover:visible"])
      }),
      def.rule(what.variant({ size: "2xl" }), {
        root: what.css(["px-10", "py-5", "text-2xl"])
      }),
      def.rule(what.variant({ variant: "success" }), {
        root: what.token(["color.bg.success"]),
        label: what.css(["text-white"])
      }),
      def.rule(what.variant({ theme: "dark" }), {
        root: what.token(["theme.dark"]),
        label: what.css(["text-white"])
      }),
      def.rule(what.variant({ interactive: true }), {
        root: what.css(["hover:scale-105", "active:scale-95"])
      })
    ],
    defaults: def.defaults({ 
      size: "2xl", 
      variant: "success", 
      theme: "light", 
      interactive: true 
    })
  })
);

// Test the complete inheritance chain
const instance = UltimateComponent.create();
expect(instance.root()).toContain("cursor-pointer");
expect(instance.label()).toContain("text-white");
expect(instance.icon()).toContain("ml-2");
expect(instance.badge()).toContain("absolute");
expect(instance.tooltip()).toContain("invisible");
```

### 11.2 Complex Create-Time Override Combinations <a id="112-complex-create-time-override-combinations"></a>
**File**: `27-create-override-combinations.test.ts`

**Scenarios to Cover**:
- Multiple user config overrides with different priorities
- Internal config overrides with user config overrides
- Token overrides at create time
- Variant overrides at create time
- Slot overrides at create time
- Complex override precedence validation
- Override inheritance and merging

**Test Cases**:
```typescript
// Complex create with multiple override layers
const ComplexButton = cls(complexContract, complexDefinition);

// Test 1: User config with multiple override types
const userConfigInstance = ComplexButton.create(
  ({ what }) => ({
    // Token overrides
    token: {
      "color.bg": {
        primary: ["bg-custom-blue"],
        secondary: ["bg-custom-gray"]
      }
    },
    // Variant overrides
    variant: what.variant({ 
      size: "xl", 
      variant: "primary", 
      theme: "dark" 
    }),
    // Slot overrides
    slot: {
      root: what.css(["user-root-override", "additional-class"]),
      label: what.token(["color.text.custom"]),
      icon: what.css(["user-icon-style"])
    }
  })
);

// Test 2: User config + internal config combination
const combinedInstance = ComplexButton.create(
  ({ what }) => ({
    // User config
    variant: what.variant({ size: "lg", variant: "secondary" }),
    slot: {
      root: what.css(["user-override"])
    }
  }),
  ({ what }) => ({
    // Internal config (higher priority)
    variant: what.variant({ size: "md", variant: "primary" }),
    slot: {
      root: what.css(["internal-override"]),
      label: what.css(["internal-label"])
    }
  })
);

// Test 3: Progressive override building
const progressiveInstance = ComplexButton.create(
  // First override layer
  ({ what }) => ({
    variant: what.variant({ size: "lg" })
  }),
  // Second override layer
  ({ what }) => ({
    variant: what.variant({ variant: "primary" }),
    slot: { root: what.css(["second-layer"]) }
  }),
  // Third override layer (highest priority)
  ({ what }) => ({
    variant: what.variant({ theme: "dark" }),
    slot: { 
      root: what.css(["third-layer"]),
      label: what.css(["final-label"])
    }
  })
);

// Validate override precedence
expect(progressiveInstance.root()).toContain("third-layer");
expect(progressiveInstance.label()).toContain("final-label");
// Size should be from first layer (lg)
// Variant should be from second layer (primary)
// Theme should be from third layer (dark)
```

### 11.3 Slot-Time Override Stress Testing <a id="113-slot-time-override-stress-testing"></a>
**File**: `28-slot-override-stress.test.ts`

**Scenarios to Cover**:
- Slot function overrides with complex class combinations
- Dynamic slot overrides based on runtime conditions
- Slot override inheritance and merging
- Slot override precedence validation
- Complex slot composition patterns
- Performance under heavy slot override usage

**Test Cases**:
```typescript
// Complex slot override scenarios
const SlotTestComponent = cls(slotTestContract, slotTestDefinition);

// Test 1: Dynamic slot overrides based on conditions
const createDynamicSlots = (isActive, hasError, userTheme) => {
  const baseClasses = ["base-class", "transition-all"];
  const activeClasses = isActive ? ["active-state", "shadow-lg"] : [];
  const errorClasses = hasError ? ["error-state", "border-red-500"] : [];
  const themeClasses = userTheme === "dark" ? ["dark-theme", "text-white"] : ["light-theme", "text-black"];
  
  return {
    root: [...baseClasses, ...activeClasses, ...errorClasses, ...themeClasses],
    label: [
      "label-base",
      isActive ? "label-active" : "label-inactive",
      hasError ? "label-error" : "label-normal"
    ],
    icon: [
      "icon-base",
      isActive ? "icon-active" : "icon-inactive",
      userTheme === "dark" ? "icon-dark" : "icon-light"
    ]
  };
};

// Test 2: Complex slot composition with inheritance
const baseSlotClasses = {
  root: ["base-root", "flex", "items-center"],
  label: ["base-label", "font-medium"],
  icon: ["base-icon", "ml-2"]
};

const createComposedSlots = (baseClasses, overrides, conditions) => {
  const composed = { ...baseClasses };
  
  // Apply conditional overrides
  if (conditions.isPrimary) {
    composed.root = [...composed.root, "bg-blue-600", "text-white"];
    composed.label = [...composed.label, "text-white"];
  }
  
  if (conditions.isLarge) {
    composed.root = [...composed.root, "px-6", "py-3", "text-lg"];
    composed.icon = [...composed.icon, "w-6", "h-6"];
  }
  
  if (conditions.hasIcon) {
    composed.root = [...composed.root, "justify-between"];
    composed.label = [...composed.label, "flex-1"];
  }
  
  // Apply user overrides
  Object.keys(overrides).forEach(slot => {
    if (composed[slot]) {
      composed[slot] = [...composed[slot], ...overrides[slot]];
    }
  });
  
  return composed;
};

// Test 3: Slot override inheritance chain
const SlotInheritanceBase = cls(
  { slot: ["root", "label", "icon"] },
  ({ what, def }) => ({
    rules: [def.root({
      root: what.css(["base-root", "p-2"]),
      label: what.css(["base-label", "text-sm"]),
      icon: what.css(["base-icon", "w-4"])
    })]
  })
);

const SlotInheritanceLevel1 = SlotInheritanceBase.extend(
  { slot: ["root", "label", "icon", "badge"] },
  ({ what, def }) => ({
    rules: [def.root({
      root: what.css(["level1-root", "rounded"]),
      label: what.css(["level1-label", "font-medium"]),
      icon: what.css(["level1-icon", "text-blue-600"]),
      badge: what.css(["level1-badge", "ml-2"])
    })]
  })
);

const SlotInheritanceLevel2 = SlotInheritanceLevel1.extend(
  { slot: ["root", "label", "icon", "badge", "tooltip"] },
  ({ what, def }) => ({
    rules: [def.root({
      root: what.css(["level2-root", "shadow"]),
      label: what.css(["level2-label", "text-lg"]),
      icon: what.css(["level2-icon", "w-6"]),
      badge: what.css(["level2-badge", "px-2", "py-1"]),
      tooltip: what.css(["level2-tooltip", "invisible"])
    })]
  })
);

// Test slot inheritance with overrides
const slotInstance = SlotInheritanceLevel2.create(({ what }) => ({
  slot: {
    root: what.css(["user-root", "custom-style"]),
    label: what.css(["user-label"]),
    tooltip: what.css(["user-tooltip", "visible"])
  }
}));

// Validate inheritance chain
expect(slotInstance.root()).toContain("base-root");
expect(slotInstance.root()).toContain("level1-root");
expect(slotInstance.root()).toContain("level2-root");
expect(slotInstance.root()).toContain("user-root");
expect(slotInstance.tooltip()).toContain("level2-tooltip");
expect(slotInstance.tooltip()).toContain("user-tooltip");
```

### 11.4 Ultimate Integration Stress Test <a id="114-ultimate-integration-stress-test"></a>
**File**: `29-ultimate-stress.test.ts`

**Scenarios to Cover**:
- All inheritance levels combined with all override types
- Complex token resolution under stress
- Variant combination explosion testing
- Slot composition under extreme conditions
- Performance validation under maximum complexity
- Memory usage validation
- Cache effectiveness under stress

**Test Cases**:
```typescript
// The ultimate test that combines everything
const UltimateStressTest = cls(ultimateContract, ultimateDefinition);

// Create instance with maximum complexity
const stressInstance = UltimateStressTest.create(
  // User config layer 1
  ({ what }) => ({
    token: {
      "color.bg": { custom: ["bg-stress-test"] },
      "spacing": { custom: ["p-stress"] }
    },
    variant: what.variant({ 
      size: "2xl", 
      variant: "success", 
      theme: "dark",
      interactive: true,
      loading: false,
      disabled: false
    }),
    slot: {
      root: what.css(["user-stress-root"]),
      label: what.css(["user-stress-label"]),
      icon: what.css(["user-stress-icon"])
    }
  }),
  // User config layer 2
  ({ what }) => ({
    variant: what.variant({ size: "xl", variant: "primary" }),
    slot: { root: what.css(["user-layer2"]) }
  }),
  // Internal config layer
  ({ what }) => ({
    variant: what.variant({ theme: "light" }),
    slot: { 
      root: what.css(["internal-stress"]),
      badge: what.css(["internal-badge"])
    }
  })
);

// Validate all aspects work correctly
const rootClasses = stressInstance.root();
const labelClasses = stressInstance.label();
const iconClasses = stressInstance.icon();
const badgeClasses = stressInstance.badge();
const tooltipClasses = stressInstance.tooltip();

// Should contain inherited classes from all levels
expect(rootClasses).toContain("base-root");
expect(rootClasses).toContain("level1-root");
expect(rootClasses).toContain("level2-root");
expect(rootClasses).toContain("user-stress-root");
expect(rootClasses).toContain("user-layer2");
expect(rootClasses).toContain("internal-stress");

// Should contain user token overrides
expect(rootClasses).toContain("bg-stress-test");
expect(rootClasses).toContain("p-stress");

// Should have correct variant resolution
// Final variant should be: size="xl", variant="primary", theme="light", interactive=true, loading=false, disabled=false

// Performance validation
const startTime = performance.now();
for (let i = 0; i < 1000; i++) {
  const classes = stressInstance.root();
  const label = stressInstance.label();
  const icon = stressInstance.icon();
}
const endTime = performance.now();

// Should complete within reasonable time (caching should make this fast)
expect(endTime - startTime).toBeLessThan(100); // 100ms threshold

// Memory validation - should not create excessive objects
const initialMemory = performance.memory?.usedJSHeapSize || 0;
const instances = [];
for (let i = 0; i < 100; i++) {
  instances.push(UltimateStressTest.create());
}
const finalMemory = performance.memory?.usedJSHeapSize || 0;

// Memory increase should be reasonable
const memoryIncrease = finalMemory - initialMemory;
expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024); // 10MB threshold
```

---

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Advanced Patterns and Techniques](#10-advanced-patterns-and-techniques)**

## Test Execution Strategy

### Running Tests
```bash
# Run all tests
bun run test

# Run specific test file
bunx vitest run test/chapter-12/12.1-react-hooks/01-stable-references.test.tsx

# Run specific chapter
bunx vitest run test/chapter-12/

# Run tests with coverage
bun run test --coverage

# Run tests in watch mode
bun run test --watch
```

### Test Organization
- **Sequential Execution**: Tests are numbered for logical execution order
- **Independent Tests**: Each test file can run independently
- **Shared Utilities**: Common test utilities in `setup.ts`
- **Mock Data**: Consistent mock data across all tests
- **React Testing**: Uses `@testing-library/react` for React component testing
- **Vitest Framework**: Modern testing framework with excellent TypeScript support

### Coverage Goals
- **100% API Coverage**: Every public method and feature tested
- **Edge Case Coverage**: Comprehensive edge case testing
- **Performance Testing**: Performance characteristics validated
- **Integration Testing**: Real-world usage patterns tested
- **React Integration**: Complete coverage of all React-specific features
- **Type Safety**: Full TypeScript type checking and validation

## Best Practices

### Test Writing
1. **Clear Test Names**: Use descriptive test names that explain the scenario
2. **Single Assertion**: Each test should verify one specific behavior
3. **Setup and Teardown**: Properly set up test data and clean up
4. **Error Testing**: Test both success and error scenarios
5. **Performance Awareness**: Test performance characteristics where relevant

### Test Organization
1. **Logical Grouping**: Group related tests together
2. **Progressive Complexity**: Start simple and build complexity
3. **Consistent Patterns**: Use consistent testing patterns across files
4. **Clear Documentation**: Document complex test scenarios
5. **Maintainable Structure**: Keep tests easy to understand and maintain

### Test Data
1. **Realistic Examples**: Use realistic component examples
2. **Edge Cases**: Include boundary conditions and edge cases
3. **Variety**: Test different combinations and scenarios
4. **Consistency**: Use consistent naming and structure
5. **Reusability**: Create reusable test utilities and data

This testing guide ensures comprehensive coverage of the CLS library while maintaining clear organization and progressive complexity. Each chapter builds upon the previous ones, creating a solid foundation for understanding and testing the library's capabilities.

## Testing Implementation Guidance

### Test File Naming Convention
- **Chapter folders**: Use `chapter-XX` format (e.g., `chapter-01`, `chapter-11`)
- **Subsection folders**: Use `X.X-subsection-name` format (e.g., `1.1-simple-component-creation`)
- **Test files**: Use descriptive names that indicate the specific scenario being tested
- **File extensions**: Always use `.test.ts` for TypeScript test files

### Test File Organization Principles
1. **Single Responsibility**: Each test file should focus on one specific concept or scenario
2. **Progressive Complexity**: Start with basic tests and build up to complex scenarios
3. **Logical Grouping**: Group related tests within the same subsection folder
4. **Consistent Patterns**: Use consistent testing patterns across all test files
5. **Clear Documentation**: Document complex test scenarios with inline comments
6. **No README Files**: Avoid creating README files in test folders as this testing guide already provides comprehensive documentation
7. **Single Test Files**: A single test can be in its own file if it's complex or if it helps prevent test files from growing too large. It's better to have many small, focused files than a few large, unwieldy ones

### Test Writing Best Practices
1. **Descriptive Test Names**: Use clear, descriptive test names that explain the scenario
2. **Single Assertion Focus**: Each test should verify one specific behavior
3. **Proper Setup/Teardown**: Set up test data properly and clean up after tests
4. **Edge Case Coverage**: Include both happy path and edge case scenarios
5. **Realistic Examples**: Use realistic component examples that mirror real-world usage
6. **Code Quality**: All test files should pass linting and TypeScript checks without warnings or errors
7. **No Unused Code**: Remove unused parameters, variables, and imports to maintain clean test code
8. **Test Validation**: Each test must pass linting/typechecking and run successfully (green) before proceeding to the next test
9. **Test Extension**: While following this guide is the primary approach, extended tests may be created when needed or desirable to cover additional scenarios
10. **Class Order Testing**: Tests must verify CSS class order as this is critical for inheritance behavior and CSS specificity. Class order affects how styles cascade and override each other, especially in inheritance chains

### Class Order Testing Guidelines
Class order is critical in CSS and must be tested thoroughly. Here's why and how:

#### Why Class Order Matters:
- **CSS Specificity**: Later classes can override earlier ones
- **Inheritance Behavior**: Parent classes should come before child overrides
- **Variant Resolution**: Variant-specific classes must override base classes
- **Token Resolution**: Token-based classes must maintain proper precedence
- **tw-merge Processing**: CLS uses `tw-merge` at the end which may alter the final class order for optimization

#### Testing Class Order:
1. **Base Classes First**: Verify base/token classes appear before variant-specific ones
2. **Inheritance Order**: Parent classes should precede extended/child classes
3. **Override Classes Last**: Variant overrides and user overrides should come last
4. **Slot Order**: Multi-slot components should maintain consistent class ordering

#### Example Class Order Test:
```typescript
it("should maintain correct class order for inheritance", () => {
  const Base = cls(/* ... */);
  const Extended = Base.extend(/* ... */);
  
  const classes = Extended.create().root();
  
  // Base classes should come first
  expect(classes.indexOf("base-class")).toBeLessThan(classes.indexOf("extended-class"));
  
  // Variant classes should come after base classes
  expect(classes.indexOf("base-class")).toBeLessThan(classes.indexOf("variant-class"));
  
  // User overrides should come last
  const userClasses = Extended.create(({ what }) => ({
    slot: { root: what.css(["user-override"]) }
  })).root();
  
  expect(userClasses.indexOf("user-override")).toBeGreaterThan(
    userClasses.indexOf("base-class")
  );
});
```

#### Common Class Order Scenarios to Test:
- **Simple Inheritance**: Base → Extended → User Override
- **Multi-Level Inheritance**: Level1 → Level2 → Level3 → User Override
- **Variant Overrides**: Base → Variant → User Override
- **Token Resolution**: Token → Variant → Override
- **Slot Inheritance**: Parent Slot → Child Slot → User Override

#### Important Note on tw-merge:
CLS uses `tw-merge` at the end of the class generation process. This utility may alter the final class order for optimization purposes:

- **Class Deduplication**: `tw-merge` removes duplicate classes
- **Order Optimization**: May reorder classes for better CSS performance
- **Tailwind Conflicts**: Resolves conflicting Tailwind CSS classes
- **Final Output**: The actual CSS order may differ from the logical order in your CLS definition

**Testing Strategy**: Focus on testing that the correct classes are present and that overrides work as expected, rather than testing the exact order of classes in the final output string.

### Test Execution Strategy
1. **Sequential Execution**: Tests are numbered for logical execution order
2. **Independent Tests**: Each test file can run independently
3. **Shared Utilities**: Common test utilities should be placed in `setup.ts`
4. **Mock Data**: Use consistent mock data across all tests
5. **Coverage Goals**: Aim for 100% API coverage and comprehensive edge case testing

### Folder Structure Benefits
- **Easy Navigation**: Developers can quickly find tests for specific features
- **Scalable Organization**: Easy to add new tests without losing structure
- **Maintainable Code**: Related tests are grouped logically
- **Clear Ownership**: Each subsection has its own folder for focused development
- **Consistent Patterns**: Enforces consistent testing organization across the project

### Example Test Implementation
```typescript
// File: test/chapter-01/1.1-simple-component-creation/01-basic-creation-minimal-contract.test.ts
import { describe, it, expect } from 'vitest';
import { cls } from '../../../src';

describe('1.1 Simple Component Creation - Basic Creation Minimal Contract', () => {
  it('should create a basic CLS instance with minimal contract', () => {
    const Button = cls(
      {
        tokens: { "color.bg": ["default"] },
        slot: ["root"],
        variant: { size: ["sm"] }
      },
      ({ what, def }) => ({
        token: def.token({
          "color.bg": { default: ["bg-gray-100"] }
        }),
        rules: [def.root({ root: what.token(["color.bg.default"]) })],
        defaults: def.defaults({ size: "sm" })
      })
    );

    const instance = Button.create();
    expect(instance.root()).toContain("bg-gray-100");
  });
});

// File: test/chapter-12/12.1-react-hooks/01-stable-references.test.tsx
import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { cls } from '../../../src';
import { useCls } from '../../../src/react';

describe('12.1 React Hooks - Stable References', () => {
  it('should maintain stable references for same configuration', () => {
    const ButtonCls = cls(/* contract and definition */);
    
    const { result: result1 } = renderHook(() => useCls(ButtonCls, configFn));
    const { result: result2 } = renderHook(() => useCls(ButtonCls, configFn));
    
    expect(result1.current.root()).toBe(result2.current.root());
  });
});
```

### Maintenance and Updates
1. **Keep Tests Focused**: Don't let individual test files grow too large
2. **Regular Refactoring**: Refactor tests when patterns become inconsistent
3. **Documentation Updates**: Keep test documentation in sync with implementation
4. **Coverage Monitoring**: Regularly check test coverage and identify gaps
5. **Performance Awareness**: Monitor test execution time and optimize slow tests

This comprehensive testing structure ensures that the CLS library is thoroughly tested, well-organized, and maintainable for long-term development success.

---

## Chapter 12: React Integration <a id="12-react-integration"></a>

**[← Previous Chapter: Complex Inheritance and Override Stress Tests](#11-complex-inheritance-and-override-stress-tests)**

This chapter provides comprehensive testing coverage for all React-specific features of the CLS library, including hooks, context providers, Higher-Order Components (HOCs), and advanced integration patterns.

### 12.1 React Hooks <a id="121-react-hooks"></a>

**File**: `12.1-react-hooks/`

**Scenarios Covered**:
- `useCls` hook basic functionality and configuration
- Dynamic variant computation with `useCls`
- Computed values and functions integration
- Conditional logic handling
- Array-based configurations
- Performance optimization with stable references
- Configuration function changes efficiency
- Context changes handling
- Error handling for missing tokens
- Missing token graceful degradation

**Test Files**:
- `01-stable-references.test.tsx` - Maintain stable references for same configuration
- `02-configuration-function-changes.test.tsx` - Handle configuration function changes efficiently
- `03-context-changes.test.tsx` - Handle context changes efficiently
- `01-handle-missing-tokens.test.tsx` - Handle missing tokens gracefully
- `01-dynamic-variant-computation.test.tsx` - Dynamic variant computation
- `02-computed-values-functions.test.tsx` - Computed values and functions
- `03-conditional-logic.test.tsx` - Conditional logic handling
- `05-computed-values-functions.test.tsx` - Additional computed values scenarios
- `07-array-based-configurations.test.tsx` - Array-based configurations
- `03-usecls-function-configuration.test.tsx` - Function configuration patterns

### 12.2 React Context <a id="122-react-context"></a>

**File**: `12.2-react-context/`

**Scenarios Covered**:
- `ClsProvider` context provider functionality
- `useClsContext` hook usage
- Context provider without provider handling
- Stable cls reference across re-renders
- Stable instance reference validation
- Nested providers behavior
- Undefined context handling

**Test Files**:
- `01-provide-cls-instance.test.tsx` - Provide cls instance via context
- `02-no-provider-context.test.tsx` - Handle no provider context
- `03-stable-cls-reference.test.tsx` - Stable cls reference
- `04-nested-providers.test.tsx` - Nested providers behavior
- `02-undefined-context-no-provider.test.tsx` - Undefined context handling
- `03-stable-instance-reference.test.tsx` - Stable instance reference

### 12.3 React Components <a id="123-react-components"></a>

**File**: `12.3-react-components/`

**Scenarios Covered**:
- `withCls` HOC attachment to components
- Component props preservation
- Multiple cls instances handling
- Component identity and type safety
- HOC composition patterns

**Test Files**:
- `01-attach-cls-instance.test.tsx` - Attach cls instance via HOC
- `02-preserve-component-props.test.tsx` - Preserve component props
- `03-multiple-cls-instances.test.tsx` - Handle multiple cls instances
- `04-component-identity-type-safety.test.tsx` - Component identity and type safety

### 12.4 React Props <a id="124-react-props"></a>

**File**: `12.4-react-props/`

**Scenarios Covered**:
- `cls` prop with variant overrides
- `cls` prop with slot overrides
- `cls` prop with token overrides
- `cls` prop with no configuration (defaults)

**Test Files**:
- `01-variant-overrides.test.tsx` - Handle cls prop with variant overrides
- `02-slot-overrides.test.tsx` - Handle cls prop with slot overrides
- `03-token-overrides.test.tsx` - Handle cls prop with token overrides
- `04-no-configuration.test.tsx` - Handle cls prop with no configuration

### 12.5 React Integration <a id="125-react-integration"></a>

**File**: `12.5-react-integration/`

**Scenarios Covered**:
- Merge context tokens with component configuration
- Context token inheritance handling
- Multiple context providers behavior
- Context token conflicts resolution

**Test Files**:
- `01-merge-context-tokens.test.tsx` - Merge context tokens with component configuration
- `02-context-token-inheritance.test.tsx` - Handle context token inheritance correctly
- `03-multiple-context-providers.test.tsx` - Handle multiple context providers correctly
- `04-context-token-conflicts.test.tsx` - Handle context token conflicts correctly

### 12.6 React Advanced Integration <a id="126-react-advanced-integration"></a>

**File**: `12.6-react-advanced-integration/`

**Scenarios Covered**:
- Combine `useCls` with `withCls` HOC
- `cls` prop overrides with HOC
- `cls` prop function with context access
- Merge `cls` prop with context tokens
- Context token inheritance with `cls` prop overrides

**Test Files**:
- `01-combine-usecls-with-hoc.test.tsx` - Combine useCls with withCls HOC
- `02-cls-prop-overrides-with-hoc.test.tsx` - Handle cls prop overrides with HOC
- `03-cls-prop-function-with-context.test.tsx` - Handle cls prop function with context
- `01-merge-cls-prop-with-context.test.tsx` - Merge cls prop with context tokens
- `02-context-token-inheritance.test.tsx` - Handle context token inheritance with cls prop overrides

### React Integration Testing Philosophy

**Key Testing Principles**:
1. **Hook Testing**: Focus on `useCls` behavior with various configuration patterns
2. **Context Testing**: Validate `ClsProvider` and `useClsContext` functionality
3. **HOC Testing**: Ensure `withCls` properly enhances components
4. **Props Testing**: Verify `cls` prop overrides and merging behavior
5. **Integration Testing**: Test complex scenarios combining multiple React features
6. **Performance Testing**: Validate stable references and efficient re-renders
7. **Error Handling**: Test graceful degradation for edge cases

**React-Specific Considerations**:
- **Type Safety**: Leverage TypeScript for compile-time validation
- **Performance**: Test for stable references and efficient updates
- **Context**: Validate proper context inheritance and override behavior
- **HOCs**: Ensure proper component enhancement and prop preservation
- **Props**: Test prop merging and override precedence

**Test Organization**:
- Each subsection focuses on a specific React integration aspect
- Individual test files cover single responsibilities
- Progressive complexity from basic hooks to advanced integration patterns
- Comprehensive coverage of all React-specific CLS features

---

**[↑ Back to Top](#table-of-contents)** | **[← Previous Chapter: Complex Inheritance and Override Stress Tests](#11-complex-inheritance-and-override-stress-tests)**
