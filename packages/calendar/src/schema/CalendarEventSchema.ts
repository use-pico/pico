import {
    merge,
    type PicoSchema,
    WithIdentitySchema,
    withObject,
    withString
} from "@use-pico/schema";

export const CalendarEventSchema = merge([
    WithIdentitySchema,
    withObject({
        date: withString(),
    })
]);
export type CalendarEventSchema = typeof CalendarEventSchema;
export namespace CalendarEventSchema {
    export type Type = PicoSchema.Output<CalendarEventSchema>;
}
