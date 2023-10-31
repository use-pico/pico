import {
    type FilterSchema,
    type OrderBySchema,
    type QuerySchema
}                           from "@use-pico/query";
import {WithIdentitySchema} from "@use-pico/schema";
import {
    type MutationSchema,
    type ShapeSchema
}                           from "@use-pico/source";
import {type IRepository}   from "../api/IRepository";

export namespace withRepository {
    export interface Props<
        TEntitySchema extends WithIdentitySchema,
        TShapeSchema extends ShapeSchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
        TMutationSchema extends MutationSchema<TShapeSchema, TQuerySchema>,
    > extends IRepository<
        TEntitySchema,
        TShapeSchema,
        TQuerySchema,
        TMutationSchema
    > {
    }
}

export const withRepository = <
    TEntitySchema extends WithIdentitySchema,
    TShapeSchema extends ShapeSchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    TMutationSchema extends MutationSchema<TShapeSchema, TQuerySchema>
>(
    props: withRepository.Props<
        TEntitySchema,
        TShapeSchema,
        TQuerySchema,
        TMutationSchema
    >
) => props;
