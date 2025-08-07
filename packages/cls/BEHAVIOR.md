# CLS Library Behavior Specification

This document defines the behavior of the CLS (Class List System) library based on its type system. This serves as the source of truth for implementation and testing.

## Core Concepts

### 1. Contract
A contract defines the structure of a component's styling system:
- **tokens**: Design tokens organized by groups with variants
- **slot**: Named parts of a component that can be styled
- **variant**: Component variants that affect styling
- **~use**: Internal inheritance mechanism (not public API)

### 2. Definition
A definition provides the actual styling values:
- **token**: Token definitions with CSS classes
- **rule**: Conditional styling rules based on variants
- **defaults**: Default variant values

### 3. Inheritance
Components can inherit from parent contracts, creating a design system hierarchy.

## Token System

### Token Structure
Tokens are organized in a nested structure:
```typescript
tokens: {
  "color.primary": ["default", "hover", "active"],
  "spacing": ["xs", "sm", "md", "lg", "xl"],
}
```

### Token Definitions
Token definitions use the same nested structure:
```typescript
token: {
  "color.primary": {
    default: ["text-blue-600"],
    hover: ["text-blue-700"],
    active: ["text-blue-800"],
  },
  "spacing": {
    xs: ["p-1"],
    sm: ["p-2"],
    md: ["p-4"],
    lg: ["p-6"],
    xl: ["p-8"],
  },
}
```

### Token Usage
Tokens are referenced using dot notation in rules:
```typescript
token: ["color.primary.default", "spacing.md"]
```

### Token Inheritance
- Child contracts can define inherited tokens from parent contracts
- Inherited tokens maintain type safety for their variants
- Token groups from parent contracts are available in child contracts

## Slot System

### Slot Definition
Slots define named parts of a component:
```typescript
slot: ["root", "icon", "label"]
```

### Slot Styling
Slots can be styled with classes and tokens:
```typescript
slot: {
  root: {
    class: ["inline-flex", "items-center"],
    token: ["button.base", "spacing.md"],
  },
  label: {
    token: ["color.primary.default"],
  },
}
```

### Slot Inheritance
- Child contracts inherit slots from parent contracts
- Child contracts can add new slots
- All inherited slots are available in child contracts

## Variant System

### Variant Definition
Variants define component states that affect styling:
```typescript
variant: {
  variant: ["primary", "secondary"],
  size: ["sm", "md", "lg"],
  disabled: ["bool"], // Special case: converts to boolean
}
```

### Variant Matching
Variants are matched in rules to apply conditional styling:
```typescript
match: {
  variant: "primary",
  size: "md",
  disabled: true, // Boolean for "bool" variants
}
```

### Variant Inheritance
- Child contracts inherit variants from parent contracts
- Child contracts can add new variants
- All inherited variants are available in child contracts

## Rule System

### Rule Structure
Rules define conditional styling based on variants:
```typescript
rule: [
  {
    // Base rule (no conditions)
    slot: {
      root: { class: ["base-class"] },
    },
  },
  {
    // Conditional rule
    match: { variant: "primary" },
    slot: {
      root: { token: ["color.primary.default"] },
    },
  },
]
```

### Rule Properties
- **override**: When true, resets all previous classes and starts fresh
- **match**: Variant conditions that must be met for the rule to apply
- **slot**: Slot-specific styling to apply when conditions are met

### Rule Application Order
1. Rules are applied in the order they appear in the array
2. Later rules override earlier rules for the same slots
3. Rules with `override: true` reset all previous styling for affected slots

## Default System

### Default Values
Defaults provide fallback values for variants:
```typescript
defaults: {
  variant: "primary",
  size: "md",
  disabled: false,
}
```

### Default Merging
- Child contract defaults are merged with parent defaults
- Child defaults override parent defaults for the same variants

## Inheritance System

### Contract Inheritance
Contracts can inherit from parent contracts using the `extend` method:
```typescript
const ChildCls = ParentCls.extend(
  {
    // Child contract
    tokens: { "child.token": ["value"] },
    slot: ["childSlot"],
    variant: { childVariant: ["value"] },
  },
  {
    // Child definition
    token: { "child.token": { value: ["class"] } },
    rule: [],
    defaults: {},
  }
);
```

### Inheritance Chain
- The `~use` property maintains the inheritance chain
- Type system ensures type safety through the inheritance chain
- All parent tokens, slots, and variants are available in child contracts

### Type Safety
- Inherited tokens maintain their variant types
- Token groups from parent contracts are available in child definitions
- Variant matching is type-safe across the inheritance chain

## Create System

### Create Configuration
The `create` method accepts configuration to override defaults, slot styling, and token definitions:
```typescript
const instance = Cls.create({
  variant: { size: "lg" }, // Override default size
  slot: {
    root: { 
      class: ["override-class"], // Override with classes
      token: ["color.primary.default"], // Override with tokens
    },
    label: { 
      class: ["text-sm"], // Override label slot
    },
  },
  override: {
    root: {
      class: ["hard-override"], // Hard override - replaces all previous styles
    },
  },
  token: {
    "color.primary": {
      default: ["text-red-600"], // Override specific token definition
      hover: ["text-red-700"],
    },
    "spacing.md": ["p-8"], // Override spacing token
  },
});
```

### Configuration Properties

#### variant
- **Type**: `Partial<DefaultDefinition<TContract>>`
- **Purpose**: Override default variant values
- **Inheritance**: Supports all inherited variants from parent contracts
- **Type Safety**: Only valid variants from the inheritance chain are allowed

#### slot
- **Type**: `{ [K in SlotsOf<TContract>]?: What<TContract> }`
- **Purpose**: Append additional styling to slots defined by the cls
- **Inheritance**: Supports all inherited slots from parent contracts
- **Type Safety**: Only valid slots from the inheritance chain are allowed
- **Structure**: Each slot can have `class` and/or `token` properties
- **Behavior**: Classes and tokens are merged with existing slot styles

#### override
- **Type**: `{ [K in SlotsOf<TContract>]?: What<TContract> }`
- **Purpose**: Hard override of slot styling - replaces all previous styles
- **Inheritance**: Supports all inherited slots from parent contracts
- **Type Safety**: Only valid slots from the inheritance chain are allowed
- **Structure**: Each slot can have `class` and/or `token` properties
- **Behavior**: Completely replaces existing slot styles with new ones

#### token
- **Type**: `Partial<OptionalTokenDefinition<TContract>>`
- **Purpose**: Override specific token definitions during create
- **Inheritance**: Supports all inherited tokens from parent contracts
- **Type Safety**: Only valid tokens from the inheritance chain are allowed
- **Structure**: Nested structure matching token organization
- **Behavior**: Replaces token definitions for the duration of this create call
- **Scope**: Only affects this specific create call, doesn't modify the original cls definition
- **Optional Values**: All token variant values are optional (unlike TokenDefinition where some are required)

### Token Override Structure
Token overrides use the same nested structure as token definitions, but all variant values are optional:
```typescript
token: {
  "color.primary": {
    default: ["text-red-600"], // Override specific variant
    hover: ["text-red-700"], // Optional - can be omitted
    // active: ["text-red-800"], // Optional - can be omitted
  },
  "spacing": {
    md: ["p-8"], // Override spacing token
    // lg: ["p-12"], // Optional - can be omitted
  },
  "button.base": ["rounded-lg", "font-bold"], // Override button token
}
```

### Configuration Merging
1. **Variant Merging**: Variant overrides are merged with defaults
   - Child variant overrides take precedence over parent defaults
   - Missing variants use default values

2. **Token Override Application**: Token overrides are applied before rule processing
   - Token overrides have highest precedence for token resolution
   - Overrides are scoped to this create call only
   - Inherited tokens can be overridden

3. **Slot Override Application**: Slot overrides are applied after all rules are processed
   - `slot` overrides append to existing styles
   - `override` overrides completely replace existing styles
   - Overrides are applied to the final computed classes for each slot

4. **Inheritance Support**: 
   - All inherited slots are available in slot configurations
   - All inherited variants are available in variant configuration
   - All inherited tokens are available in token configuration
   - Type system ensures only valid slots, variants, and tokens can be used

### Type Safety Features
- **Slot Validation**: Only slots defined in the contract or inherited from parent contracts are allowed
- **Variant Validation**: Only variants defined in the contract or inherited from parent contracts are allowed
- **Token Validation**: Only tokens defined in the contract or inherited from parent contracts are allowed
- **Boolean Variants**: "bool" variants are automatically converted to boolean types in variant overrides
- **Token Structure Validation**: Token overrides must match the expected nested structure

## Use System

### Type-Safe Assignment
The `use` method allows type-safe assignment of compatible CLS instances:
```typescript
const BaseCls = designSystem(...);
const ExtendedCls = BaseCls.extend(...);
const AssignedCls = BaseCls.use(ExtendedCls); // Type-safe assignment
```

### Compatibility Check
- The type system ensures only compatible CLS instances can be assigned
- A CLS instance is compatible if it's derived from the target base contract
- The `HasBaseInUseChain` type checks the inheritance chain

## Class Resolution

### Resolution Process
1. Apply default variant values
2. Apply token overrides from create configuration
3. Merge with create configuration variant overrides
4. Apply rules in order based on variant matching
5. Apply slot overrides from create configuration
6. Apply override overrides from create configuration
7. Merge all classes using `tvc` (tailwind-merge)

### Token Resolution
1. Check for token overrides in create configuration first
2. Look up token in current contract definition
3. If not found, look up in parent contract definitions
4. Resolve token to CSS classes
5. Apply classes to the slot

### Class Merging
- All classes are merged using `tvc` (tailwind-merge)
- Duplicate classes are handled according to tailwind-merge rules
- Final result is a single string of CSS classes

## Type System Behavior

### Contract Types
- `TokenContract`: Record of token groups with variant arrays
- `SlotContract`: Array of slot names
- `VariantContract`: Record of variant names with value arrays

### Definition Types
- `TokenDefinition`: Nested structure matching token organization
- `RuleDefinition`: Array of conditional styling rules
- `DefaultDefinition`: Record of default variant values

### Inheritance Types
- `TokensOf`: All available tokens (current + inherited)
- `SlotsOf`: All available slots (current + inherited)
- `Variants`: All available variants (current + inherited)

### Helper Types
- `TokenGroups`: Extract token group names from contract
- `InheritedTokenGroups`: Extract inherited token group names
- `TokenGroupVariants`: Get variants for a specific token group
- `StringToBool`: Convert "bool" variants to boolean types

## Error Handling

### Type Errors
- Type system prevents invalid token references
- Type system prevents invalid variant matching
- Type system prevents invalid slot references

### Runtime Behavior
- Missing tokens are ignored (no error)
- Missing slots are ignored (no error)
- Missing variants use default values
- Invalid variant values are ignored

## Performance Considerations

### Rule Evaluation
- Rules are evaluated in order until a match is found
- Early termination when `override: true` is encountered
- Efficient variant matching with direct property access

### Token Resolution
- Token lookup is optimized with direct property access
- Inheritance chain traversal is minimized
- Class merging is handled by efficient tailwind-merge

### Memory Usage
- Contracts and definitions are immutable
- Inheritance chains are shallow (reference-based)
- Class strings are generated on-demand
