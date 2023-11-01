import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const MySchema = schema(z => z.object({
    property:   z.string,
    anotherOne: z.string$,
}));

/**
 * This is a concept: because we're exporting "const", we can use the
 * same name for the type.
 *
 * Why? Because you'll be probably exporting this schema, so you can
 * simply end up with a LOT of exported names. This one will merge
 * everything related to one schema under one identifier.
 */
export type MySchema = typeof MySchema;

/**
 * Another part of hack: use namespace to bind a remaining type to
 * the exported schema.
 */
export namespace MySchema {
    export type Type = PicoSchema.Output<MySchema>;
}

const foo: MySchema.Type = {
    property: "this one is required",
    // anotherOne: 'this one is optional'
};
