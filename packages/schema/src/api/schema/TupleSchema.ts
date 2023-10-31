import {type PicoSchema} from "../PicoSchema";

export interface TupleSchema<
    TItems extends TupleSchema.Items,
    TOutput = TupleSchema.Output<TItems>,
> extends PicoSchema<
    TupleSchema.Input<TItems>,
    TOutput
> {
    schema: "tuple",
    items: TItems;
}

export namespace TupleSchema {
    export type Items = [PicoSchema, ...PicoSchema[]];

    export type Input<
        TItems extends TupleSchema.Items,
    > = {
        [TKey in keyof TItems]: PicoSchema.Input<TItems[TKey]>;
    }

    export type Output<
        TItems extends TupleSchema.Items,
    > = {
        [TKey in keyof TItems]: PicoSchema.Output<TItems[TKey]>;
    }

    export type PathItem = {
        schema: "tuple";
        input: [any, ...any[]];
        key: number;
        value: any;
    };
}
