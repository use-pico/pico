import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const CursorSchema = schema((z, p) => z.object({
    page: z.number([p.minValue(0, "Page must be greater than zero")]),
    size: z.number([p.minValue(1, "Page size must be greater than one to get any data")]),
}));
export type CursorSchema = typeof CursorSchema;
export namespace CursorSchema {
    export type Type = PicoSchema.Output<CursorSchema>;
}
