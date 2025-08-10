# CLS Library Testing Guide

> **Note**: This guide provides a structured approach to testing the CLS library, ensuring comprehensive coverage of all features and edge cases.

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

## Chapter 1: Basic CLS Creation

### 1.1 Simple Component Creation
**File**: `01-basic-creation.test.ts`

**Scenarios to Cover**:
- Basic cls instance creation with minimal contract
- Simple token definitions
- Basic slot definitions
- Default variant values
- Basic create() method usage

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

### 1.2 Token System Basics
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

### 1.3 Slot System Basics
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

### 1.4 Variant System Basics
**File**: `04-variant-basics.test.ts`

**Scenarios to Cover**:
- String variants (size, variant, etc.)
- Boolean variants (disabled, loading, etc.)
- Default variant values
- Variant inheritance
- Variant override in create()

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

## Chapter 2: What Utility and Definition Helpers

### 2.1 What Utility Functions
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

### 2.2 Definition Helpers
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

## Chapter 3: Rules and Conditional Styling

### 3.1 Basic Rule Matching
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

### 3.2 Complex Rule Combinations
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

### 3.3 Rule Override Behavior
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

## Chapter 4: Create Method and Configuration

### 4.1 Basic Create Usage
**File**: `10-basic-create.test.ts`

**Scenarios to Cover**:
- Variant overrides
- Slot overrides
- Token overrides
- Default configuration
- Error handling

**Test Cases**:
```typescript
// Basic create usage
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

### 4.2 Advanced Create Configuration
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

### 4.3 Create Method Edge Cases
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

## Chapter 5: Inheritance and Extension

### 5.1 Basic Inheritance
**File**: `13-basic-inheritance.test.ts`

**Scenarios to Cover**:
- Simple contract extension
- Token inheritance
- Slot inheritance
- Variant inheritance
- Default value inheritance

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
```

### 5.2 Advanced Inheritance Patterns
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

### 5.3 Inheritance Edge Cases
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

## Chapter 6: Use Method and Type Safety

### 6.1 Use Method Basics
**File**: `16-use-basics.test.ts`

**Scenarios to Cover**:
- Basic use() functionality
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

### 6.2 Type Safety Features
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

## Chapter 7: Performance and Optimization

### 7.1 Caching Behavior
**File**: `18-caching.test.ts`

**Scenarios to Cover**:
- Slot function caching
- Token index caching
- Rule compilation caching
- Memory usage patterns
- Cache invalidation

**Test Cases**:
```typescript
// Caching verification
const Button = cls(contract, definition);
const instance1 = Button.create();
const instance2 = Button.create();

// Should reuse cached slot functions
const root1 = instance1.root();
const root2 = instance2.root();
```

### 7.2 Performance Characteristics
**File**: `19-performance.test.ts`

**Scenarios to Cover**:
- Large contract performance
- Deep inheritance performance
- Rule evaluation performance
- Memory allocation patterns
- Runtime optimization

**Test Cases**:
```typescript
// Performance benchmarks
const LargeComponent = cls(
  {
    tokens: { /* many tokens */ },
    slot: ["root", "header", "body", "footer", "actions"],
    variant: { /* many variants */ }
  },
  ({ what, def }) => ({
    rules: [/* many rules */]
  })
);
```

## Chapter 8: Integration and Real-World Usage

### 8.1 React Integration
**File**: `20-react-integration.test.ts`

**Scenarios to Cover**:
- Component prop integration
- Re-render optimization
- Class name generation
- Variant prop handling
- Slot usage patterns

**Test Cases**:
```typescript
// React component usage
const Button = cls(contract, definition);

const MyButton = ({ size, variant, className, children, ...props }) => {
  const classes = Button.create(({ what }) => ({
    variant: what.variant({ size, variant }),
    slot: {
      root: what.css([className])
    }
  }));

  return (
    <button className={classes.root()} {...props}>
      {children}
    </button>
  );
};
```

### 8.2 Design System Integration
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

## Chapter 9: Error Handling and Edge Cases

### 9.1 Validation and Errors
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

### 9.2 Edge Case Handling
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

## Chapter 10: Advanced Patterns and Techniques

### 10.1 Dynamic Styling
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

### 10.2 Advanced Composition
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

## Test Execution Strategy

### Running Tests
```bash
# Run all tests
bun test

# Run specific test file
bun test 01-basic-creation.test.ts

# Run tests with coverage
bun test --coverage

# Run tests in watch mode
bun test --watch
```

### Test Organization
- **Sequential Execution**: Tests are numbered for logical execution order
- **Independent Tests**: Each test file can run independently
- **Shared Utilities**: Common test utilities in `setup.ts`
- **Mock Data**: Consistent mock data across all tests

### Coverage Goals
- **100% API Coverage**: Every public method and feature tested
- **Edge Case Coverage**: Comprehensive edge case testing
- **Performance Testing**: Performance characteristics validated
- **Integration Testing**: Real-world usage patterns tested

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
