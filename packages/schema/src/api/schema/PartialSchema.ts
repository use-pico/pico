import {type PicoSchema}   from "../PicoSchema";
import {type ObjectSchema} from "./ObjectSchema";

export interface PartialSchema<
    TObjectSchema extends ObjectSchema<any>,
> extends PicoSchema<PicoSchema.Input<TObjectSchema>, Partial<PicoSchema.Output<TObjectSchema>>> {
    schema: "partial",
}
