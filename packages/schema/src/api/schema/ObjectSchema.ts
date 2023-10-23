import {type PicoSchema} from "../PicoSchema";
import {NullishSchema}   from "./NullishSchema";
import {NumberSchema}    from "./NumberSchema";
import {StringSchema}    from "./StringSchema";

export interface ObjectSchema<
    TShape extends ObjectSchema.Shape,
    TOutput = ObjectSchema.Output<TShape>,
> extends PicoSchema<
    ObjectSchema.Input<TShape>,
    TOutput
> {
    schema: "object";
    object: {
        shape: TShape;
    };
}

export namespace ObjectSchema {
    export type Shape = Record<string, PicoSchema<any>>;

    export type PathItem = {
        schema: "object";
        input: Record<string, any>;
        key: string;
        value: any;
    }

    export type Schemas = [
        ObjectSchema<any, any>,
        ObjectSchema<any, any>,
        ...ObjectSchema<any, any>[],
    ];

    /**
     * This utility type could be moved to @use-pico/types, but to keep this package as light as possible,
     * it will stay here.
     */
    export type RequiredKeys<TObject extends Shape> = {
        [TKey in keyof TObject]: NullishSchema<any> extends TObject[TKey] ? never : TKey;
    }[keyof TObject];

    export type OptionalKeys<TObject extends Shape> = {
        [TKey in keyof TObject]: NullishSchema<any> extends TObject[TKey] ? TKey : never;
    }[keyof TObject];

    export type Input<
        TShape extends Shape,
    > =
        { [TKey in RequiredKeys<TShape>]: PicoSchema.Input<TShape[TKey]>; }
        &
        Partial<{ [TKey in OptionalKeys<TShape>]: PicoSchema.Input<TShape[TKey]>; }>;

    export type Output<
        TShape extends Shape,
    > =
        { [TKey in RequiredKeys<TShape>]: PicoSchema.Output<TShape[TKey]>; }
        &
        Partial<{ [TKey in OptionalKeys<TShape>]: PicoSchema.Output<TShape[TKey]>; }>;
}

type InnerSchema = ObjectSchema<{
    a: NumberSchema,
}>;

type SomeSchema<T extends InnerSchema> = ObjectSchema<{
    foo: NullishSchema<StringSchema>
    bar: NumberSchema;
    inner: NullishSchema<T>;
}>;

interface Input<T extends SomeSchema<any>> {
    schema(bla: PicoSchema.Output<T>): void;
}

function bla<T extends InnerSchema>(
    {
        schema,
    }: Input<SomeSchema<T>>
) {
    schema({
        bar: 1254,
    });
}
