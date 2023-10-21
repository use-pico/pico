import {type Schema} from "../Schema";

export interface UnionSchema<
    TOptions extends UnionSchema.Options,
    TOutput = Schema.Output<TOptions[number]>,
> extends Schema<Schema.Input<TOptions[number]>, TOutput> {
    schema: "union",
    union: TOptions;
}

export namespace UnionSchema {
    export type Options = [
        Schema<any>,
        Schema<any>,
        ...Schema<any>[],
    ];
}
