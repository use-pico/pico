import {
    PicoSchema,
    withAny,
    withNullish
} from "@use-pico/schema";

export const DummySchema = withNullish(withAny());
export type DummySchema = typeof DummySchema;
export namespace DummySchema {
    export type Type = PicoSchema.Output<DummySchema>;
}
