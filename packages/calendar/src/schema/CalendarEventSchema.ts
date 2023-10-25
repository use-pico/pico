import {
    merge,
    type PicoSchema,
    schema,
    WithIdentitySchema
} from "@use-pico/schema";

export const CalendarEventSchema = merge([
    WithIdentitySchema,
    schema(z => z.object({
        date: z.string(),
    })),
]);
export type CalendarEventSchema = typeof CalendarEventSchema;
export namespace CalendarEventSchema {
    export type Type = PicoSchema.Output<CalendarEventSchema>;
}
