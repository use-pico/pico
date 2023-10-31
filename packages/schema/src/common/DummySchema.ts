import {type PicoSchema} from "../api/PicoSchema";
import {schema}          from "../schema/schema";

export const DummySchema = schema(z => z.any);
export type DummySchema = typeof DummySchema;
export namespace DummySchema {
    export type Type = PicoSchema.Output<DummySchema>;
}
