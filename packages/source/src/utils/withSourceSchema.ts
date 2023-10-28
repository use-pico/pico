import {
    FilterSchema,
    type OrderBySchema,
    withQuerySchema
}                           from "@use-pico/query";
import {
    merge,
    type ObjectSchema,
    schema
}                           from "@use-pico/schema";
import {type ShapeSchema}   from "../schema/ShapeSchema";
import {type SourceSchema}  from "../schema/SourceSchema";
import {withMutationSchema} from "./withMutationSchema";

export namespace withSourceSchema {
    export interface Props<
        TEntity extends ObjectSchema<any>,
        TShapeSchema extends ShapeSchema,
        TFilterSchema extends ObjectSchema<any>,
        TOrderBySchema extends OrderBySchema,
    > {
        (s: typeof schema): Schema<TEntity, TShapeSchema, TFilterSchema, TOrderBySchema>;
    }

    export interface Schema<
        TEntity extends ObjectSchema<any>,
        TShapeSchema extends ShapeSchema,
        TFilterSchema extends ObjectSchema<any>,
        TOrderBySchema extends OrderBySchema,
    > {
        entity: TEntity;
        shape: TShapeSchema;
        filter: TFilterSchema;
        orderBy: TOrderBySchema;
    }
}

export const withSourceSchema = <
    TEntity extends ObjectSchema<any>,
    TShapeSchema extends ShapeSchema,
    TFilterSchema extends ObjectSchema<any>,
    TOrderBySchema extends OrderBySchema,
>(
    factory: withSourceSchema.Props<TEntity, TShapeSchema, TFilterSchema, TOrderBySchema>,
): SourceSchema<
    TEntity,
    TShapeSchema,
    ObjectSchema<FilterSchema["shape"] & TFilterSchema["shape"]>,
    TOrderBySchema
> => {
    const {
        shape,
        entity,
        orderBy,
        ...rest
    } = factory(schema);
    const filter = merge([
        FilterSchema,
        rest.filter,
    ]);
    const query = withQuerySchema({
        filter,
        orderBy,
    });
    return schema(z => z.object({
        entity,
        shape,
        mutation: withMutationSchema({
            shape,
            query,
        }),
        filter,
        orderBy,
        query,
    }));
};
