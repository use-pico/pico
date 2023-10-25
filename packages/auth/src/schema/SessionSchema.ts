import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

export const SessionSchema = schema(z => z.object({
    id:     z.string,
    name:   z.nonEmptyString,
    site:   z.string$,
    tokens: z.array(z.nonEmptyString),
}));
export type SessionSchema = typeof SessionSchema;
export namespace SessionSchema {
    export type Type = PicoSchema.Output<SessionSchema>;
}
