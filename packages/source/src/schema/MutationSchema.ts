import {type QuerySchema} from "@use-pico/query";
import {z}                from "@use-pico/utils";
import {type ShapeSchema} from "./ShapeSchema";

export type MutationSchema<
    TShapeSchema extends ShapeSchema,
    TQuerySchema extends QuerySchema<any, any>,
> = ReturnType<withMutationSchema<TShapeSchema, TQuerySchema>>;

export namespace MutationSchema {
    export type Type<
        TShapeSchema extends ShapeSchema,
        TQuerySchema extends QuerySchema<any, any>,
    > = z.infer<MutationSchema<TShapeSchema, TQuerySchema>>;
}

export namespace withMutationSchema {
    export interface Props<
        TShapeSchema extends ShapeSchema,
        TQuerySchema extends QuerySchema<any, any>,
    > {
        shape: TShapeSchema;
        query: TQuerySchema;
    }
}

export type withMutationSchema<
    TShapeSchema extends ShapeSchema,
    TQuerySchema extends QuerySchema<any, any>,
> = typeof withMutationSchema<TShapeSchema, TQuerySchema>;

export const withMutationSchema = <
    TShapeSchema extends ShapeSchema,
    TQuerySchema extends QuerySchema<any, any>,
>(
    {
        shape,
        query,
    }: withMutationSchema.Props<
        TShapeSchema,
        TQuerySchema
    >,
) => {
    const update = z.object({
        update: shape.partial().nullish(),
        query,
    }).nullish();
    return z.object({
        create: shape.nullish(),
        update,
        upsert: z.object({
            create: shape.nullish(),
            update,
        }).nullish(),
        delete: query.nullish(),
    });
};
