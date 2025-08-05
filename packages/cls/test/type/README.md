# Type Tests for @use-pico/cls

This directory contains type tests for the `@use-pico/cls` package using the `expect-type` library to ensure type safety and catch issues like types resolving to `any` or being too permissive.

## Overview

Each type has its own test file to ensure proper organization and maintainability:

- `ClassName.test.ts` - Tests for the ClassName type
- `ClsFn.test.ts` - Tests for the ClsFn function type
- `ClsProps.test.ts` - Tests for the ClsProps utility type
- `ClsSlots.test.ts` - Tests for the ClsSlots utility type
- `ClsClear.test.ts` - Tests for the ClsClear utility type
- `ClsExtract.test.ts` - Tests for the ClsExtract utility type

## Running Type Tests

```bash
# Run type tests
bun run test:types

# Or run the full test suite (includes runtime tests)
bun test
```

## What Gets Tested

### Core Types
- **ClassName** - Must not resolve to `any`
- **ClsFn** - Must be a function type and not resolve to `any`

### Utility Types
- **ClsProps** - Must work with various ClsFn configurations and not resolve to `any`
- **ClsSlots** - Must be an object type and not resolve to `any`
- **ClsClear** - Must clear cls-related props from a type
- **ClsExtract** - Must extract cls-related props from a type

### Test Scenarios
- Basic type constraints
- Complex nested configurations
- Different slot and variant setups
- Additional props integration
- Edge cases and combinations

## How It Works

The type tests use the `expect-type` library which provides compile-time type assertions:

```typescript
import { expectTypeOf } from "expect-type";

// Test that a type is not any
expectTypeOf<MyType>().not.toBeAny();

// Test that a type is a function
expectTypeOf<MyFunction>().toBeFunction();

// Test that a type is an object
expectTypeOf<MyObject>().toBeObject();
```

These tests will cause compilation errors if the types don't match the expected constraints, ensuring type safety at compile time.

## Adding New Type Tests

To add a new type test:

1. Create a new file `NewType.test.ts` in this directory
2. Import the type directly from its source file
3. Use `expectTypeOf` to test the type constraints
4. Run `bun run test:types` to verify it works

Example:

```typescript
import { expectTypeOf } from "expect-type";
import type { NewType } from "../../src/types/NewType";

// Test the new type
expectTypeOf<NewType>().not.toBeAny();
```

## Benefits

- **Compile-time safety** - Type errors are caught during compilation
- **Prevents regressions** - Changes that break types will fail tests
- **Documentation** - Tests serve as living documentation of type constraints
- **Organized structure** - Each type has its own test file for clarity
- **Easy maintenance** - Clear separation of concerns

## Configuration

The type tests use a separate TypeScript configuration (`tsconfig.type-tests.json`) that:

- Includes both source files and type test files
- Excludes runtime test files
- Uses strict type checking
- Sets the root directory to handle the test structure properly 
