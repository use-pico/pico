import {
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema
}                         from "@use-pico/query";
import {
    type NullishSchema,
    type ObjectSchema,
    type PartialSchema,
    type PicoSchema
}                         from "@use-pico/schema";
import {type ShapeSchema} from "./ShapeSchema";

export type MutationSchema<
    TShapeSchema extends ShapeSchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
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
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > = PicoSchema.Output<MutationSchema<TShapeSchema, TQuerySchema>>;
}
