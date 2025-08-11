# CLS Testing Suite Index

## Chapter 1: Fundamentals ✅
### 1.1 Simple Component Creation
- `01-basic-creation-minimal-contract.test.ts` - Basic CLS instance creation with minimal contract
- `02-parameter-less-contract.test.ts` - CLS instance creation with empty token/variant contracts

### 1.2 Token System Basics
- `01-single-token-definition.test.ts` - Single token definition and application
- `02-multiple-token-variants.test.ts` - Multiple variants for a single token
- `03-token-inheritance.test.ts` - Token inheritance using BaseComponent.extend()

### 1.3 Slot System Basics
- `01-single-slot-definition.test.ts` - Definition and application of styles to root slot
- `02-multiple-slots.test.ts` - Definition and styling of multiple distinct slots

### 1.4 Variant System Basics
- `01-single-variant.test.ts` - Single variant definition with multiple options and default application
- `02-multiple-variants.test.ts` - Definition and default application of multiple independent variants

## Chapter 2: Utility Functions ✅
### 2.1 What Utility Functions
- `01-what-token.test.ts` - what.token utility for token references
- `02-what-css.test.ts` - what.css utility for direct CSS classes
- `03-what-variant.test.ts` - Application of variant-specific styles using def.rule and what.css

### 2.2 Definition Helpers
- `01-def-token.test.ts` - def.token helper for token definitions
- `02-def-root.test.ts` - def.root helper for primary root slot rules
- `03-def-defaults.test.ts` - def.defaults helper for default variant values

## Chapter 3: Rule Matching ✅
### 3.1 Basic Rule Matching
- `01-simple-rule-matching.test.ts` - Simple rule matching with variant conditions using def.rule

### 3.2 Complex Rule Combinations
- `01-multiple-variant-rules.test.ts` - Application of multiple variant rules with different combinations

## Chapter 4: Create Method ✅
### 4.1 Basic Create Usage
- `01-basic-create-with-defaults.test.ts` - create method behavior when no explicit variants are passed
- `02-create-with-custom-variants.test.ts` - create method with custom variant values using what.variant()

## Chapter 5: Inheritance ✅
### 5.1 Basic Inheritance
- `01-extend-basic-component.test.ts` - Basic component inheritance using extend method with token and variant overrides

## Chapter 6: Advanced Inheritance ✅
### 6.1 Multi-level Inheritance
- [x] `01-three-level-inheritance.test.ts` - Test multi-level inheritance with proper token and variant inheritance
### 6.2 Complex Token Overrides
- [x] `01-complex-token-override-semantics.test.ts` - Test complex token overrides with proper precedence and merging
### 6.3 Slot Inheritance
- [x] `01-slot-inheritance-semantics.test.ts` - Test slot inheritance with proper slot definition and styling inheritance

## Chapter 7: Advanced Rule Matching ✅
### 7.1 Complex Match Conditions
- `01-nested-variant-matching.test.ts` - Complex nested variant matching with multiple conditions (color, size, state combinations)
### 7.2 Rule Overrides
- `01-rule-override-semantics.test.ts` - Rule override semantics in inheritance with proper class ordering
### 7.3 Conditional Token Application
- `01-conditional-token-application.test.ts` - Conditional token application based on variant combinations with proper class ordering
### 7.4 Slot Caching Behavior
- `01-slot-caching-semantics.test.ts` - Slot caching behavior for parameterless calls vs dynamic calls with parameters
- `02-inheritance-caching-scenarios.test.ts` - Caching behavior in inheritance scenarios with overrides
- `03-cache-key-validation.test.ts` - Cache key generation and uniqueness validation

## Chapter 8: Advanced Create Usage (IN PROGRESS)
### 8.1 Slot Overrides
- `01-slot-override-semantics.test.ts` - Slot override semantics using override property in create() method
### 8.2 Token Overrides
- `01-token-override-semantics.test.ts` - Token override semantics using override property in create() method
### 8.3 Complex Configuration
- `01-complex-configuration-semantics.test.ts` - Complex configuration scenarios with multiple overrides and variants ✅

## Chapter 9: Use Method ✅
### 9.1 Basic Usage
- `01-basic-use-method.test.ts` - Basic use method functionality with inherited instances ✅
### 9.2 Type Safety
- `01-type-safety-constraints.test.ts` - Type safety constraints and compatibility checks in use method ✅
### 9.3 Inheritance Chain
- `01-inheritance-chain-usage.test.ts` - Use method with multi-level inheritance chains ✅

## Chapter 10: Edge Cases (IN PROGRESS)
### 10.1 Empty Contracts
- `01-empty-contract-behavior.test.ts` - Edge cases with minimal or empty contracts ✅

### 10.2 Boolean Variants
- `01-boolean-variant-behavior.test.ts` - Boolean variant values and their interactions ✅

### 10.3 Token Conflicts
- `01-token-conflict-resolution.test.ts` - Token conflicts and resolution with proper precedence ✅

## Chapter 11: Performance & Integration (IN PROGRESS)
### 11.1 Large Component Trees
- `01-large-component-tree-performance.test.ts` - Performance with deep inheritance chains and many variants ✅
### 11.2 Dynamic Variants
### 11.3 Real-world Scenarios

## Test Coverage Summary
- **Completed**: 39 tests across 9 chapters
- **Remaining**: 2 chapters with estimated 4-6 additional tests
- **Total Progress**: ~95% complete

## Notes
- All tests use exact matches (`.toBe()`) for class assertions
- Each test is in its own file with single `it` blocks
- Tests adhere strictly to CLS API without TypeScript-only scenarios
- Inheritance tests demonstrate proper class ordering behavior
