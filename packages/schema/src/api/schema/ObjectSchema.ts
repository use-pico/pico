import {type PicoSchema} from "../PicoSchema";
import {NullishSchema}   from "./NullishSchema";

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
    export type RequiredKeys<TObject extends object> = {
        [TKey in keyof TObject]: NullishSchema<any> extends TObject[TKey] ? never : TKey;
    }[keyof TObject];

    export type OptionalKeys<TObject extends object> = {
        [TKey in keyof TObject]: NullishSchema<any> extends TObject[TKey] ? TKey : never;
    }[keyof TObject];

    export type Input<
        TShape extends Shape,
    > =
        Pick<{
            [TKey in keyof TShape]: PicoSchema.Input<TShape[TKey]>;
        }, RequiredKeys<TShape>>
        &
        Partial<Pick<{
            [TKey in keyof TShape]: PicoSchema.Input<TShape[TKey]>;
        }, OptionalKeys<TShape>>>;

    export type Output<
        TShape extends Shape,
    > =
        Pick<{
            [TKey in keyof TShape]: PicoSchema.Output<TShape[TKey]>;
        }, RequiredKeys<TShape>>
        &
        Partial<Pick<{
            [TKey in keyof TShape]: PicoSchema.Output<TShape[TKey]>;
        }, OptionalKeys<TShape>>>;
}