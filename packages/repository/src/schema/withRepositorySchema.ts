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
import {type IRepository}        from "../api/IRepository";

export namespace withRepositorySchema {
    export interface Props<
        TEntitySchema extends WithIdentitySchema,
        TShapeSchema extends ShapeSchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
        TMutationSchema extends MutationSchema<TShapeSchema, TQuerySchema>,
    > extends IRepository.Schema<
        TEntitySchema,
        TShapeSchema,
        TQuerySchema,
        TMutationSchema
    > {
    }
}

export const withRepositorySchema = <
    TEntitySchema extends WithIdentitySchema,
    TShapeSchema extends ShapeSchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    TMutationSchema extends MutationSchema<TShapeSchema, TQuerySchema>,
>(
    props: withRepositorySchema.Props<
        TEntitySchema,
        TShapeSchema,
        TQuerySchema,
        TMutationSchema
    >
) => props;
