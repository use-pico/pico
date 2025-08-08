# CLS Library Design

## Overview

CLS (Class List System) is a type-safe, composable styling system that provides a structured approach to managing CSS classes, design tokens, and component variants. It's framework-agnostic and can be used with React, Vue, Svelte, vanilla JavaScript, or any other framework. It combines the flexibility of utility-first CSS with the maintainability of design systems.

## Core Principles

### 1. Type Safety First
- All styling configurations are fully type-checked at compile time
- Contract definitions ensure consistency across the design system
- Inheritance chains maintain type safety through the entire hierarchy

### 2. Composition Over Inheritance
- Components can be extended and composed rather than rewritten
- Design tokens can be inherited and overridden at any level
- Slots provide granular control over component parts

### 3. Declarative Configuration
- Styling rules are defined declaratively through contracts and definitions
- Variant combinations are resolved automatically
- Token resolution happens at runtime based on current state

### 4. Performance Optimized
- Lazy evaluation of slot functions
- Caching of resolved configurations
- Minimal runtime overhead with maximum flexibility

## Architecture

### Core Components

#### Contract
A contract defines the structure of a component's styling system:
- **Tokens**: Named design values organized by groups and variants
- **Slots**: Named parts of a component that can receive styles
- **Variants**: Configurable properties that affect component appearance
- **Inheritance**: Optional parent contract for extending functionality

#### Definition
A definition provides concrete styling values for a contract:
- **Token Definitions**: CSS classes for each token variant
- **Rules**: Conditional styling based on variant combinations
- **Defaults**: Default values for variants

#### CLS Instance
The main interface that combines contract and definition:
- **create()**: Generates styled instances with optional overrides
- **extend()**: Creates new instances with additional functionality
- **use()**: Type-safe assignment of compatible instances

### Data Flow

1. **Contract Definition**: Define the structure (tokens, slots, variants)
2. **Definition Creation**: Provide concrete styling values
3. **CLS Instance**: Combine contract and definition
4. **Instance Creation**: Generate styled components with overrides
5. **Slot Resolution**: Apply rules and resolve tokens to CSS classes

## Key Concepts

### Tokens

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

**Token Semantics:**
- **REPLACE**: When a contract explicitly declares a token variant, it replaces inherited values
- **APPEND**: When a contract doesn't declare a token variant, it appends to inherited values

### Slots

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

### Variants

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

### Rules

Rules define conditional styling based on variant combinations:

```typescript
// Rule structure
{
  match: { size: "lg", variant: "primary" },
  slot: {
    root: { class: ["text-lg"], token: ["color.bg.primary"] }
  },
  override: false // Optional: clears previous styles
}
```

**Rule Matching:**
- Rules are evaluated in order of definition
- Multiple rules can apply to the same variant combination
- Rules can override previous styles or append to them
- Boolean variants are matched against true/false values

## Inheritance System

### Contract Inheritance

Contracts can inherit from parent contracts, creating a hierarchy:

```typescript
// Base contract
const BaseButton = cls(baseContract, baseDefinition);

// Extended contract
const ExtendedButton = BaseButton.extend(childContract, childDefinition);
```

**Inheritance Behavior:**
- Child contracts inherit all tokens, slots, and variants from parents
- Child contracts can add new tokens, slots, and variants
- Child contracts can override inherited tokens
- Inheritance chain is walked bottom-up for resolution

### Token Inheritance

Tokens follow specific inheritance rules:

1. **Declaration Check**: If child contract declares a token group, it replaces parent values
2. **Append Mode**: If child contract doesn't declare a token group, it appends to parent values
3. **Override Capability**: Child definitions can override any inherited token values

### Variant Inheritance

Variants are merged across the inheritance chain:

1. **Union Merging**: Child variants are combined with parent variants
2. **Type Preservation**: Variant types (string/boolean) are preserved
3. **Default Inheritance**: Child defaults can override parent defaults

## API Design

### Create Method

The `create()` method generates styled instances with optional overrides:

```typescript
cls.create(userConfig?, internalConfig?)
```

**Configuration Options:**
- **variant**: Override variant values
- **slot**: Override slot styling (append mode)
- **override**: Hard override slot styling (replace mode)
- **token**: Override token definitions

**Precedence Rules:**
1. User config takes precedence over internal config
2. Override config takes precedence over slot config
3. Later rules take precedence over earlier rules

### Extend Method

The `extend()` method creates new instances with additional functionality:

```typescript
cls.extend(childContract, childDefinition)
```

**Extension Capabilities:**
- Add new tokens, slots, and variants
- Override inherited tokens
- Add new styling rules
- Maintain type safety through inheritance

### Use Method

The `use()` method provides type-safe assignment of compatible instances:

```typescript
cls.use(compatibleClsInstance)
```

**Compatibility Rules:**
- Target instance must be derived from current instance
- Type safety is enforced through inheritance chain checking
- Allows for polymorphic component usage

## Styling Resolution

### Resolution Order

1. **Default Values**: Apply contract defaults
2. **Internal Config**: Apply component-controlled overrides
3. **User Config**: Apply user-provided overrides
4. **Rule Evaluation**: Apply matching rules in definition order
5. **Slot Overrides**: Apply slot-specific overrides
6. **Token Resolution**: Resolve tokens to CSS classes
7. **Class Merging**: Merge all classes using tailwind-merge

### Token Resolution Process

1. **Token Lookup**: Find token in current contract or inheritance chain
2. **Variant Selection**: Select appropriate variant based on current state
3. **Class Extraction**: Extract CSS classes from token definition
4. **Multiple Tokens**: Combine classes from multiple tokens
5. **Override Application**: Apply any token overrides from create config

### Rule Evaluation Process

1. **Match Testing**: Test rule conditions against current variants
2. **Slot Mapping**: Apply rule styling to matching slots
3. **Override Handling**: Clear previous styles if override is true
4. **Class Application**: Apply classes and tokens to slots
5. **Order Preservation**: Maintain rule definition order

## Performance Considerations

### Caching Strategy

- **Slot Function Caching**: Slot functions are cached after first creation
- **Token Index Caching**: Token resolution tables are built once per contract
- **Rule Caching**: Compiled rules are cached for reuse
- **Proxy Optimization**: Uses Proxy for lazy slot function creation

### Memory Management

- **Lazy Evaluation**: Slot functions are only created when accessed
- **Shared References**: Contracts and definitions are shared across instances
- **Minimal Closures**: Avoid unnecessary closure creation
- **Efficient Merging**: Use efficient object merging strategies

### Runtime Optimization

- **Early Exit**: Stop rule evaluation when no more matches are possible
- **Efficient Matching**: Use direct property access for variant matching
- **Class Deduplication**: Use tailwind-merge for optimal class output
- **Minimal Allocations**: Reuse objects where possible

## Type System

### Generic Constraints

The type system ensures compile-time safety through:

- **Contract Constraints**: Ensure contracts have valid structure
- **Definition Constraints**: Ensure definitions match contract structure
- **Inheritance Constraints**: Ensure inheritance chains are valid
- **Variant Constraints**: Ensure variant types are correctly inferred

### Type Inference

- **Automatic Inference**: Most types are inferred from contract structure
- **Variant Mapping**: String variants are mapped to literal types
- **Boolean Variants**: "bool" variants are mapped to boolean types
- **Token Inference**: Token keys are inferred from contract tokens

### Type Safety Features

- **Exhaustive Checking**: Ensure all variants are handled
- **Token Validation**: Ensure token references are valid
- **Slot Validation**: Ensure slot references are valid
- **Inheritance Validation**: Ensure inheritance chains are type-safe

## Integration Patterns

### Framework Integration

CLS integrates seamlessly with any framework through:

- **Component Props**: Variants become component props
- **Slot Functions**: Slots become className functions
- **Type Safety**: Full TypeScript support for component props
- **Performance**: Minimal re-render impact
- **Framework Agnostic**: Works with React, Vue, Svelte, vanilla JS, etc.

### Design System Integration

CLS supports design system patterns through:

- **Token System**: Centralized design tokens
- **Variant System**: Consistent component variants
- **Inheritance**: Hierarchical design system structure
- **Composition**: Reusable component patterns

### Build System Integration

CLS works with modern build systems:

- **Tree Shaking**: Unused code is eliminated
- **Type Checking**: Full TypeScript support
- **Bundle Optimization**: Minimal runtime footprint
- **Development Experience**: Excellent IDE support

## Best Practices

### Contract Design

1. **Clear Naming**: Use descriptive names for tokens, slots, and variants
2. **Logical Grouping**: Group related tokens together
3. **Consistent Structure**: Maintain consistent contract structure
4. **Minimal Coupling**: Keep contracts focused and cohesive

### Definition Design

1. **Semantic Tokens**: Use semantic names for design tokens
2. **Consistent Rules**: Maintain consistent rule patterns
3. **Default Values**: Provide sensible defaults for all variants
4. **Override Strategy**: Plan for override scenarios

### Component Design

1. **Slot Granularity**: Use appropriate slot granularity
2. **Variant Simplicity**: Keep variants simple and focused
3. **Token Reuse**: Reuse tokens across components
4. **Inheritance Planning**: Plan inheritance hierarchies carefully

### Performance Optimization

1. **Caching**: Leverage built-in caching mechanisms
2. **Lazy Loading**: Use lazy evaluation where appropriate
3. **Bundle Size**: Monitor bundle size impact
4. **Runtime Performance**: Profile runtime performance

## Future Considerations

### Planned Features

- **Dynamic Tokens**: Runtime token generation
- **Theme Support**: Multi-theme capabilities
- **Animation Integration**: Built-in animation support
- **Responsive Variants**: Responsive design support

### Extension Points

- **Custom Resolvers**: Custom token resolution logic
- **Plugin System**: Extensible plugin architecture
- **Custom Mergers**: Custom class merging strategies
- **Validation Hooks**: Custom validation logic

### Ecosystem Integration

- **Design Tools**: Integration with design tools
- **Build Tools**: Enhanced build tool integration
- **Testing Tools**: Testing utilities and helpers
- **Documentation Tools**: Automated documentation generation
