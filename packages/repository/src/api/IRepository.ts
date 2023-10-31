import {
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema
}                                from "@use-pico/query";
import {type WithIdentitySchema} from "@use-pico/schema";
import {
    type MutationSchema,
    type ShapeSchema
}                                from "@use-pico/source";

export interface IRepository<
    TEntitySchema extends WithIdentitySchema,
    TShapeSchema extends ShapeSchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    TMutationSchema extends MutationSchema<TShapeSchema, TQuerySchema>,
> {
    readonly schema: {
        readonly entity: TEntitySchema;
        readonly shape: TShapeSchema;
        readonly query: TQuerySchema;
        readonly mutation: TMutationSchema;
    };
    readonly table: string;
}
