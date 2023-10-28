import {
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema
}                            from "@use-pico/query";
import {type ObjectSchema}   from "@use-pico/schema";
import {type MutationSchema} from "./MutationSchema";
import {type ShapeSchema}    from "./ShapeSchema";

export type SourceSchema<
    TEntitySchema extends ObjectSchema<any>,
    TShapeSchema extends ShapeSchema,
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
    TQuerySchema extends QuerySchema<TFilterSchema, TOrderBySchema> = QuerySchema<TFilterSchema, TOrderBySchema>
> = ObjectSchema<{
    entity: TEntitySchema;
    shape: TShapeSchema;
    mutation: MutationSchema<TShapeSchema, TQuerySchema>;
    filter: TFilterSchema;
    orderBy: TOrderBySchema;
    query: TQuerySchema;
}>;
