import {type IsPartial}  from "../IsPartial";
import {type PicoSchema} from "../PicoSchema";

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

    export type NonPartials<TObject extends Shape> = {
        [TKey in keyof TObject]: TObject[TKey] extends IsPartial ? never : TKey;
    }[keyof TObject];

    export type Partials<TObject extends Shape> = {
        [TKey in keyof TObject]: TObject[TKey] extends IsPartial ? TKey : never;
    }[keyof TObject];

    export type Input<
        TShape extends Shape,
    > =
        { [TKey in NonPartials<TShape>]: PicoSchema.Input<TShape[TKey]>; }
        &
        Partial<{ [TKey in Partials<TShape>]: PicoSchema.Input<TShape[TKey]>; }>;

    export type Output<
        TShape extends Shape,
    > =
        { [TKey in NonPartials<TShape>]: PicoSchema.Output<TShape[TKey]>; }
        &
        Partial<{ [TKey in Partials<TShape>]: PicoSchema.Output<TShape[TKey]>; }>;
}
