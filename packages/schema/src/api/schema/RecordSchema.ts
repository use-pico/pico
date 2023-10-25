import {type PicoSchema}   from "../PicoSchema";
import {type Resolve}      from "../Resolve";
import {type EnumSchema}   from "./EnumSchema";
import {type StringSchema} from "./StringSchema";
import {type UnionSchema}  from "./UnionSchema";

export interface RecordSchema<
    TKey extends RecordSchema.Key,
    TValue extends PicoSchema,
    TOutput = RecordSchema.Output<TKey, TValue>,
> extends PicoSchema<RecordSchema.Input<TKey, TValue>, TOutput> {
    schema: "record";
    record: {
        key: TKey;
        value: TValue;
    };
}

export namespace RecordSchema {
    export type PathItem = {
        schema: "record";
        input: Record<string | number | symbol, any>;
        key: string | number | symbol;
        value: any;
    };

    export type Key =
        | EnumSchema<any>
        | UnionSchema<any, string | number | symbol>
        | StringSchema<string | number | symbol>;

    export type PartialKeySchema =
        | EnumSchema<any>
        | UnionSchema<any>;

    export type Input<
        TKey extends Key,
        TValue extends PicoSchema,
    > = Resolve.Object<
        TKey extends PartialKeySchema ?
            Partial<Record<PicoSchema.Input<TKey>, PicoSchema.Input<TValue>>>
            : Record<PicoSchema.Input<TKey>, PicoSchema.Input<TValue>>
    >;

    export type Output<
        TKey extends Key,
        TValue extends PicoSchema,
    > = Resolve.Object<
        TKey extends PartialKeySchema ?
            Partial<Record<PicoSchema.Output<TKey>, PicoSchema.Output<TValue>>>
            : Record<PicoSchema.Output<TKey>, PicoSchema.Output<TValue>>
    >;
}
