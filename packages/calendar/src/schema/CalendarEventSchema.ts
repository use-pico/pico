import {WithIdentitySchema} from "@pico/schema";
import {z}                  from "@pico/utils";

export const CalendarEventSchema = WithIdentitySchema.extend({
    date: z.date(),
});
export type CalendarEventSchema = typeof CalendarEventSchema;
export namespace CalendarEventSchema {
    export type Type = z.infer<CalendarEventSchema>;
}
