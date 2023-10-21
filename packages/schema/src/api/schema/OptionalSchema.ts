import {type PicoSchema} from "../PicoSchema";

export interface OptionalSchema<
    TWrapped extends PicoSchema,
    TDefault extends PicoSchema.Input<TWrapped> | undefined = undefined,
    TOutput = TDefault extends undefined ? PicoSchema.Output<TWrapped> | undefined : PicoSchema.Output<TWrapped>,
> extends PicoSchema<
    PicoSchema.Input<TWrapped> | undefined,
    TOutput
> {
    schema: "optional",
    wrapped: TWrapped;

    get default(): TDefault;
}
