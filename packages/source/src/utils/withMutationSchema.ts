import {type QuerySchema}    from "@use-pico/query";
import {schema}              from "@use-pico/schema";
import {type MutationSchema} from "../schema/MutationSchema";
import {type ShapeSchema}    from "../schema/ShapeSchema";

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
): MutationSchema<TShapeSchema, TQuerySchema> => {
    const update = schema(z => z.object({
        update: z.nullish(z.partial(shape)),
        query,
    })).nullish();

    return schema(z => z.object({
        create: shape.nullish(),
        update,
        upsert: z.object({
            create: shape.nullish(),
            update,
        }).nullish(),
        delete: query.nullish(),
    }));
};
