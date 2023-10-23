import {type IsPartial}  from "../IsPartial";
import {type PicoSchema} from "../PicoSchema";

export interface NullishSchema<
    TWrapped extends PicoSchema,
    TDefault extends PicoSchema.Input<TWrapped> | undefined = undefined,
    TOutput = TDefault extends undefined ? PicoSchema.Output<TWrapped> | null | undefined : PicoSchema.Output<TWrapped>
> extends PicoSchema<
    PicoSchema.Input<TWrapped> | null | undefined,
    TOutput
>, IsPartial {
    schema: "nullish",
    wrapped: TWrapped;

    get default(): TDefault;
}
