import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const MySchema = schema(z => z.object({
    property:   z.string,
    anotherOne: z.string$,
    embedded:   z.object({
        required: z.number,
    }),
    partial:    z.partial(z.object({
        optional: z.number,
        another:  z.string,
    })),
}));

export type MySchema = typeof MySchema;

export namespace MySchema {
    export type Type = PicoSchema.Output<MySchema>;
}

const foo: MySchema.Type = {
    property: "this one is required",
    embedded: {
        required: "type works",
    },
    partial:  {
        another: "optional",
    }
};
