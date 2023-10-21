import {type Schema} from "../Schema";

export interface OptionalSchema<
    TWrapped extends Schema,
    TDefault extends Schema.Input<TWrapped> | undefined = undefined,
    TOutput = TDefault extends undefined ? Schema.Output<TWrapped> | undefined : Schema.Output<TWrapped>,
> extends Schema<
    Schema.Input<TWrapped> | undefined,
    TOutput
> {
    schema: "optional",
    wrapped: TWrapped;

    get default(): TDefault;
}
