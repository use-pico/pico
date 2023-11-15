---
title: Dull Schema
---

:::tip[Installation]

This package lives in

```bash
npm install @use-pico/dull-stuff @use-pico/query @use-pico/schema
```

:::

Strange name, right? But it's not that strange, if you know the backstory.

## Schemas

When you need to specify basic building blocks of your application (talking about CRUD),
you'll need bunch of _**boring schemas**_.

That's the **reason why** this package exists. To _minimize the amount of code you need to write._

## Show me

```ts title="./src/schema/BuildingDullSchema.ts"
/**
 * You know, you need this. Really
 */
import {withDullSchema} from "@use-pico/dull-stuff";
/**
 * Dull schema requires exact shape, so those methods helps
 * to create it.
 */
import {
    filterOf,
    orderByOf
}                       from "@use-pico/query";
/**
 * The same: you need thos to keep the final shape of dull schema
 * as it's needed.
 */
import {
    identityOf,
    schema
}                       from "@use-pico/schema";

/**
 * This is an example from the referenced project DeRivean:
 * Creater dull schema, types are exact, so they'll help you with guidance.
 */
export const BuildingSchema = withDullSchema({
    /**
     * Entity. This is the basic shape returned from the database.
     */
    entity: identityOf(z => z.object({
        name:         z.string,
        construction: z.number,
        maximum:      z.number,
    })),
    /**
     * Shape is schema used to create entity (also used in forms).
     */
    shape: schema(z => z.object({
        name:         z.string,
        construction: z.number,
        maximum:      z.number,
    })),
    /**
     * Shape of filter/where query available to client/server.
     *
     * This is important, because you define, what's supported instead of
     * direct exposure of database structure.
     */
    filter: filterOf(z => z.object({
        name: z.string$,
    })),
    /**
     * Similar to "filter": define which orderings are supported.
     */
    orderBy: orderByOf(["name"]),
});
/**
 * As the common concept: export type with the same type as the schema.
 */
export type BuildingSchema = typeof BuildingSchema;
```

## Boring part

So, what's happening? You'll get `QuerySchema`, `MutationSchema` and a few other interesting thing `@pico` needs
to work. A lot of internal schemas needs same input schema (for example `MutationSchema` needs `QuerySchema`, `QuerySchema` needs
`FilterSchema` and so on).

**Now you have everything you need in one piece.**
