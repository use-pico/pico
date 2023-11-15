---
title: Basic Schema
---

:::tip[Installation]

```bash
$ npm install @use-pico/schema
```

:::

All the stuff in the **@use-pico** is built on top of schemas, so you'll get _validation_ and _types_ in one go.

Read the **[back-story](/docs/concepts/schema/back-story)**, why there is another schema library.

## Usage

:::tip

Here is the concept, how to create and organize schema, so you can use it in the **most simple way**.

:::

### Define schema

```ts title="./src/schema/CoolSchema.ts"
import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

/**
 * This is the simple part as you may know it:
 * define schema using "schema" function, then use "object" factory
 * to define the shape of you object. Or whatever else `z.` offers.
 */
const CoolSchema = schema(z => z.object({
    /**
     * See what `z.` offers.
     */
    myPropery:        z.string,
    optionalProperty: z.string$,
}));
/**
 * This is a little hack TypeScript gives us: use the same name
 * for Schema itself and for it's type.
 *
 * With this, you can export only one name.
 */
export type CoolSchema = typeof CoolSchema;
/**
 * Same kind of TypeScript hack:
 * Export namespace which will get merged with the type.
 */
export namespace CoolSchema {
    /**
     * Export Schema Type, so you can use it as you need.
     */
    export type Type = PicoSchema.Output<CoolSchema>;
}
```

### Use schema

:::tip

Now you have quite **cool thing**: schema itself as `CoolSchema`, schema type as `CoolSchema` and the inferred type as `CoolSchema.Type`.
It's not necessary to import any other files/types.

:::

```typescript title="./src/UseTheSchema.ts"
import {CoolSchema} from "./schema/CoolSchema";

/**
 * Because you've hidden Schema type extraction, you can just use
 * it's type.
 */
const MyConst: CoolSchema.Type = {
    myPropery: "Hello",
};
```
