import {type PicoSchema} from "../PicoSchema";
import {type Resolve}    from "../Resolve";

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
    export type RequiredKeys<TObject extends object> = Exclude<{
        [TKey in keyof TObject]: undefined extends TObject[TKey] ? never : TKey;
    }[keyof TObject], undefined>;

    export type OptionalKeys<TObject extends object> = Exclude<{
        [TKey in keyof TObject]: undefined extends TObject[TKey] ? TKey : never;
    }[keyof TObject], undefined>;

    export type WithOptional<TObject extends object> =
        Pick<TObject, RequiredKeys<TObject>>
        &
        Partial<Pick<TObject, OptionalKeys<TObject>>>;

    export type Input<
        TObjectEntries extends Shape,
    > = Resolve.Object<{
        [TKey in keyof TObjectEntries]: PicoSchema.Input<TObjectEntries[TKey]>;
    }>;

    export type Output<
        TObjectEntries extends Shape,
    > = WithOptional<{
        [TKey in keyof TObjectEntries]: PicoSchema.Output<TObjectEntries[TKey]>;
    }>;
}
