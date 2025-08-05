# Test Suite for @use-pico/cls

This directory contains comprehensive tests for the `@use-pico/cls` package using Bun's test runner.

## Test Structure

The test suite is organized into separate files based on functionality:

### `basic.test.ts`
Tests fundamental cls functionality including:
- Basic component creation with slots and variants
- Variant overrides and class overrides
- Boolean variants
- Array slot values
- Edge cases with empty variants

### `matching.test.ts`
Tests the matching rules functionality:
- Applying matching rules when conditions are met
- Multiple matching rules
- Boolean variants in matching rules
- Partial matching conditions
- Empty matching rules

### `inheritance.test.ts`
Tests component inheritance and extension using the `use` property:
- Extending base components with additional variants
- Merging defaults from base and extended components
- Multiple levels of inheritance
- Slot and variant extensions
- Matching rules in inheritance



### `edge-cases.test.ts`
Tests edge cases and error handling:
- Empty configurations
- Undefined/null values
- Non-existent variants/slots
- Complex nested structures
- Configuration object structure
- Type object structure

## Running Tests

### Run all tests
```bash
bun test
```

### Run tests in watch mode
```bash
bun test:watch
```

### Run specific test file
```bash
bun test test/basic.test.ts
```

### Run tests with coverage
```bash
bun test --coverage
```

## Test Coverage

The test suite covers:

- ✅ Basic cls functionality
- ✅ Variant system
- ✅ Slot system
- ✅ Matching rules
- ✅ Component inheritance

- ✅ Edge cases and error handling
- ✅ Type safety (through TypeScript compilation)

## Test Patterns

### Component Creation
```typescript
const button = cls({
  slot: {
    base: "px-4 py-2 rounded",
  },
  variant: {
    color: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-gray-500 text-white",
    },
  },
  defaults: {
    color: "primary",
  },
});
```

### Testing Slots
```typescript
const result = button();
expect(result.slots.base()).toBe("px-4 py-2 rounded bg-blue-500 text-white");
```

### Testing Variants
```typescript
const result = button({ color: "secondary" });
expect(result.slots.base()).toBe("px-4 py-2 rounded bg-gray-500 text-white");
```



## Notes

- Tests use Bun's built-in test runner for fast execution
- All tests are written in TypeScript for type safety
- Tests are excluded from the published npm package via the `files` field in package.json
- The test suite follows the project's coding standards and patterns 
