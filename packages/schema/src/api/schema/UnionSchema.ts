import {type PicoSchema} from "../PicoSchema";

export interface UnionSchema<
    TOptions extends UnionSchema.Options,
    TOutput = PicoSchema.Output<TOptions[number]>,
> extends PicoSchema<PicoSchema.Input<TOptions[number]>, TOutput> {
    schema: "union",
    union: TOptions;
}

export namespace UnionSchema {
    export type Options = [
        PicoSchema<any>,
        PicoSchema<any>,
        ...PicoSchema<any>[],
    ];
}
