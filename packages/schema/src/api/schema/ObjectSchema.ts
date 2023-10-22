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

    export type Input<
        TObjectEntries extends Shape,
    > = Resolve.Object<{
        [TKey in keyof TObjectEntries]: PicoSchema.Input<TObjectEntries[TKey]>;
    }>;

    export type Output<
        TObjectEntries extends Shape,
    > = Resolve.Object<{
        [TKey in keyof TObjectEntries]: PicoSchema.Output<TObjectEntries[TKey]>;
    }>;
}
