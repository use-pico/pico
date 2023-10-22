import {type PicoSchema} from "../api/PicoSchema";
import {withAny}         from "../schema/any/withAny";
import {withNullish}     from "../schema/nullish/withNullish";

export const DummySchema = withNullish(withAny());
export type DummySchema = typeof DummySchema;
export namespace DummySchema {
    export type Type = PicoSchema.Output<DummySchema>;
}
