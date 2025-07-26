# @use-pico/graphql-codegen-zod

A powerful GraphQL Code Generator plugin that automatically generates [Zod](https://zod.dev/) schemas from your GraphQL schema and operations. This plugin provides type-safe validation for GraphQL data with full TypeScript integration.

## Features

### 🎯 **Complete GraphQL Type Support**
- **Object Types** - Convert GraphQL objects to Zod object schemas
- **Input Types** - Generate validation schemas for GraphQL input types
- **Enums** - Convert GraphQL enums to Zod enum schemas with proper values
- **Unions** - Handle GraphQL union types with Zod union schemas
- **Interfaces** - Support for GraphQL interface types
- **Scalars** - Built-in support for common scalars (String, Int, Float, Boolean, ID, Date, DateTime, JSON)
- **Custom Scalars** - Configurable mapping for custom scalar types

### 🔄 **Fragment Support**
- **Fragment Definitions** - Generate Zod schemas from GraphQL fragments
- **Fragment Spreads** - Handle fragment spreads within operations
- **Fragment Dependencies** - Automatic dependency validation and error detection
- **Inline Fragments** - Support for inline fragment definitions

### 📝 **Operation Support**
- **Query Variables** - Generate validation schemas for operation variables
- **Mutation Variables** - Validate mutation input parameters
- **Subscription Variables** - Support for subscription variable validation

### 🛡️ **Advanced Features**
- **Circular Reference Detection** - Prevents infinite loops with smart circular reference handling
- **Recursive Type Handling** - Uses getter functions for recursive types to avoid circular dependencies
- **Nullish Field Support** - Proper handling of nullable and optional fields
- **Description Preservation** - Maintains GraphQL field descriptions in generated schemas
- **Error Handling** - Comprehensive error handling with meaningful error messages
- **Type Deduplication** - Prevents duplicate field definitions in generated schemas

### 🔧 **TypeScript Integration**
- **Full TypeScript Support** - Generated schemas include proper TypeScript types
- **Type Inference** - Use `z.infer<typeof SchemaName>` for type extraction
- **Namespace Exports** - Organized exports with TypeScript namespaces

## Installation

```bash
npm install @use-pico/graphql-codegen-zod
# or
yarn add @use-pico/graphql-codegen-zod
# or
bun add @use-pico/graphql-codegen-zod
```

## Configuration

Add the plugin to your `codegen.yml` or `codegen.ts` configuration:

```yaml
# codegen.yml
schema: schema.graphql
documents: 'src/**/*.graphql'
generates:
  src/generated/zod.ts:
    plugins:
      - '@use-pico/graphql-codegen-zod'
    config:
      scalars:
        CustomScalar: 'z.custom()'
        DateTime: 'z.date()'
```

Or with TypeScript configuration:

```typescript
// codegen.ts
import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'schema.graphql',
  documents: ['src/**/*.graphql'],
  generates: {
    'src/generated/zod.ts': {
      plugins: ['@use-pico/graphql-codegen-zod'],
      config: {
        scalars: {
          CustomScalar: 'z.custom()',
          DateTime: 'z.date()',
        },
      },
    },
  },
};

export default config;
```

## Configuration Options

### `scalars`
Map custom GraphQL scalar types to Zod schema definitions.

```typescript
interface Config {
  scalars?: Record<string, string>;
}
```

**Example:**
```yaml
config:
  scalars:
    DateTime: 'z.date()'
    JSON: 'z.any()'
    CustomScalar: 'z.string().transform(val => customTransform(val))'
```

## Generated Output

The plugin generates TypeScript files with Zod schemas and type definitions:

```typescript
import { z } from "zod";

// Object Type Schema
export const UserSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string(),
});
export type UserSchema = typeof UserSchema;
export namespace UserSchema {
  export type Type = z.infer<UserSchema>;
}

// Fragment Schema
export const UserFragmentSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  profile: z.object({
    avatar: z.string().nullish(),
    bio: z.string().nullish(),
  }),
});
export type UserFragmentSchema = typeof UserFragmentSchema;
export namespace UserFragmentSchema {
  export type Type = z.infer<UserFragmentSchema>;
}

// Operation Variables Schema
export const GetUserVariablesSchema = z.object({
  id: z.string(),
  includeProfile: z.boolean().nullish(),
});
export type GetUserVariablesSchema = typeof GetUserVariablesSchema;
export namespace GetUserVariablesSchema {
  export type Type = z.infer<GetUserVariablesSchema>;
}

// Enum Schema
export const UserRoleSchema = z.enum(["ADMIN", "USER", "MODERATOR"]);
export type UserRoleSchema = typeof UserRoleSchema;
export namespace UserRoleSchema {
  export type Type = z.infer<UserRoleSchema>;
}
```

## Usage Examples

### Basic Schema Validation

```typescript
import { UserSchema } from './generated/zod';

// Validate user data
const userData = {
  id: "123",
  name: "John Doe",
  email: "john@example.com"
};

const validatedUser = UserSchema.parse(userData);
// TypeScript knows this is UserSchema.Type
```

### Fragment Validation

```typescript
import { UserFragmentSchema } from './generated/zod';

// Validate data that matches a fragment
const userWithProfile = {
  id: "123",
  name: "John Doe",
  profile: {
    avatar: "https://example.com/avatar.jpg",
    bio: "Software developer"
  }
};

const validatedUserFragment = UserFragmentSchema.parse(userWithProfile);
```

### Operation Variables Validation

```typescript
import { GetUserVariablesSchema } from './generated/zod';

// Validate GraphQL operation variables
const variables = {
  id: "123",
  includeProfile: true
};

const validatedVariables = GetUserVariablesSchema.parse(variables);
```

### Custom Scalar Handling

```typescript
// With custom scalar configuration
const config = {
  scalars: {
    DateTime: 'z.date()',
    JSON: 'z.any()',
    CustomScalar: 'z.string().transform(val => customTransform(val))'
  }
};

// Generated schema will use your custom definitions
export const EventSchema = z.object({
  id: z.string(),
  createdAt: z.date(), // Custom DateTime scalar
  metadata: z.any(), // Custom JSON scalar
});
```

## Advanced Features

### Recursive Type Handling

The plugin automatically detects recursive types and uses getter functions to prevent circular dependencies:

```typescript
// For recursive types like nested comments
export const CommentSchema = z.object({
  id: z.string(),
  content: z.string(),
  get replies() {
    return z.array(CommentSchema).nullish();
  }
});
```

### Fragment Dependency Validation

The plugin validates fragment dependencies and provides helpful error messages:

```typescript
// If a fragment references an undefined fragment, you'll get:
/** Fragment dependency warnings: */
/** Fragment 'UserWithProfile' depends on undefined fragment 'ProfileFragment' */
```

### Error Handling

Comprehensive error handling with meaningful messages:

```typescript
// For processing errors:
/** Error processing type User: Field 'invalidField' not found on type User */
/** Circular reference detected for type: RecursiveType */
```

## TypeScript Integration

The generated schemas provide full TypeScript support:

```typescript
import { UserSchema } from './generated/zod';

// Extract types
type User = UserSchema.Type;

// Use in function signatures
function processUser(user: User) {
  // TypeScript knows the exact shape of user
}

// Validate and get typed result
const user: User = UserSchema.parse(rawData);
```

## Best Practices

1. **Use Fragment Schemas** for reusable data shapes
2. **Validate Variables** before sending GraphQL operations
3. **Handle Nullish Fields** appropriately in your application logic
4. **Custom Scalars** should be properly typed and validated
5. **Error Handling** - Always handle validation errors in production

## Contributing

This plugin is part of the [use-pico](https://github.com/use-pico/pico) ecosystem. Contributions are welcome!

## License

MIT License - see the [LICENSE](LICENSE) file for details.
