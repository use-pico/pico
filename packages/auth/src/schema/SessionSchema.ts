import {
    nonEmpty,
    type PicoSchema,
    withArray,
    withNullish,
    withNumber,
    withObject,
    withString
} from "@use-pico/schema";

export const SessionSchema = withObject({
    id:     withNumber(),
    name:   withString([nonEmpty("Non-empty")]),
    site:   withNullish(withString()),
    tokens: withArray(withString([nonEmpty("Non-empty")])),
});
export type SessionSchema = typeof SessionSchema;
export namespace SessionSchema {
    export type Type = PicoSchema.Output<SessionSchema>;
}
