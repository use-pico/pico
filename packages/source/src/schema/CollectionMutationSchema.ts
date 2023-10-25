import {type QuerySchema} from "@use-pico/query";
import {
    type PicoSchema,
    schema
}                         from "@use-pico/schema";
import {type ShapeSchema} from "./ShapeSchema";

export type CollectionMutationSchema<
    TShapeSchema extends ShapeSchema,
    TQuerySchema extends QuerySchema<any, any>,
> = ReturnType<withCollectionMutationSchema<TShapeSchema, TQuerySchema>>;

export namespace CollectionMutationSchema {
    export type Type<
        TShapeSchema extends ShapeSchema,
        TQuerySchema extends QuerySchema<any, any>,
    > = PicoSchema.Output<CollectionMutationSchema<TShapeSchema, TQuerySchema>>;
}

export namespace withCollectionMutationSchema {
    export interface Props<
        TShapeSchema extends ShapeSchema,
        TQuerySchema extends QuerySchema<any, any>,
    > {
        shape: TShapeSchema;
        query: TQuerySchema;
    }
}

export type withCollectionMutationSchema<
    TShapeSchema extends ShapeSchema,
    TQuerySchema extends QuerySchema<any, any>,
> = typeof withCollectionMutationSchema<TShapeSchema, TQuerySchema>;

export const withCollectionMutationSchema = <
    TShapeSchema extends ShapeSchema,
    TQuerySchema extends QuerySchema<any, any>,
>(
    {
        shape,
        query,
    }: withCollectionMutationSchema.Props<TShapeSchema, TQuerySchema>,
) => {
    return schema(z => z.object({
        patch:    z.object({
            patch: shape,
            query,
        }).nullish(),
        deleteBy: z.object({
            query,
        }).nullish(),
    }));
};
