import {type Resolve} from "../Resolve";
import {type Schema}  from "../Schema";

export interface ObjectSchema<
    TShape extends ObjectSchema.Shape,
    TOutput = ObjectSchema.Output<TShape>,
> extends Schema<
    ObjectSchema.Input<TShape>,
    TOutput
> {
    schema: "object";
    object: {
        shape: TShape;
    };
}

export namespace ObjectSchema {
    export type Shape = Record<string, Schema<any>>;

    export type PathItem = {
        schema: "object";
        input: Record<string, any>;
        key: string;
        value: any;
    }

    /**
     * This utility type could be moved to @use-pico/types, but to keep this package as light as possible,
     * it will stay here.
     */
    export type RequiredKeys<TObject extends object> = {
        [TKey in keyof TObject]: undefined extends TObject[TKey] ? never : TKey;
    }[keyof TObject];

    export type OptionalKeys<TObject extends object> = {
        [TKey in keyof TObject]: undefined extends TObject[TKey] ? TKey : never;
    }[keyof TObject];

    export type WithOptional<TObject extends object> =
        Pick<TObject, RequiredKeys<TObject>>
        &
        Partial<Pick<TObject, OptionalKeys<TObject>>>;

    export type Input<
        TObjectEntries extends Shape,
    > = Resolve.Object<
        WithOptional<{
            [TKey in keyof TObjectEntries]: Schema.Input<TObjectEntries[TKey]>;
        }>
    >;

    export type Output<
        TObjectEntries extends Shape,
    > = Resolve.Object<
        WithOptional<{
            [TKey in keyof TObjectEntries]: Schema.Output<TObjectEntries[TKey]>;
        }>
    >;
}
