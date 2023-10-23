import {type QuerySchema}    from "@use-pico/query";
import {
    withNullish,
    withObject,
    withPartial
}                            from "@use-pico/schema";
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
    const update = withNullish(
        withObject({
            update: withNullish(
                withPartial(shape)
            ),
            query,
        })
    );
    return withObject({
        create: withNullish(shape),
        update,
        upsert: withNullish(
            withObject({
                create: withNullish(shape),
                update,
            })
        ),
        delete: withNullish(query),
    });
};
