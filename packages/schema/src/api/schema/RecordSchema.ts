import {type Resolve}      from "../Resolve";
import {type Schema}       from "../Schema";
import {type EnumSchema}   from "./EnumSchema";
import {type StringSchema} from "./StringSchema";
import {UnionSchema}       from "./UnionSchema";

export interface RecordSchema<
    TKey extends RecordSchema.Key,
    TValue extends Schema,
    TOutput = RecordSchema.Output<TKey, TValue>,
> extends Schema<RecordSchema.Input<TKey, TValue>, TOutput> {
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
        TValue extends Schema,
    > = Resolve.Object<
        TKey extends PartialKeySchema ?
            Partial<Record<Schema.Input<TKey>, Schema.Input<TValue>>>
            : Record<Schema.Input<TKey>, Schema.Input<TValue>>
    >;

    export type Output<
        TKey extends Key,
        TValue extends Schema,
    > = Resolve.Object<
        TKey extends PartialKeySchema ?
            Partial<Record<Schema.Output<TKey>, Schema.Output<TValue>>>
            : Record<Schema.Output<TKey>, Schema.Output<TValue>>
    >;
}
