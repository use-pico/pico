import {type QuerySchema} from "@use-pico/query";
import {
    type NullishSchema,
    type ObjectSchema,
    type PartialSchema,
    type PicoSchema,
    withNullish,
    withObject,
    withPartial
}                         from "@use-pico/schema";
import {type ShapeSchema} from "./ShapeSchema";

export type MutationSchema<
    TShapeSchema extends ShapeSchema,
    TQuerySchema extends QuerySchema<any, any>,
> = ObjectSchema<{
    create: NullishSchema<TShapeSchema>;
    update: NullishSchema<ObjectSchema<{
        update: NullishSchema<
            PartialSchema<TShapeSchema>
        >;
        query: TQuerySchema;
    }>>;
    upsert: NullishSchema<ObjectSchema<{
        create: NullishSchema<TShapeSchema>;
        update: NullishSchema<ObjectSchema<{
            update: NullishSchema<
                PartialSchema<TShapeSchema>
            >;
            query: TQuerySchema;
        }>>;
    }>>;
    delete: NullishSchema<TQuerySchema>;
}>;

export namespace MutationSchema {
    export type Type<
        TShapeSchema extends ShapeSchema,
        TQuerySchema extends QuerySchema<any, any>,
    > = PicoSchema.Output<MutationSchema<TShapeSchema, TQuerySchema>>;
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
