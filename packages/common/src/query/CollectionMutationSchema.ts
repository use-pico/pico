import {type z}             from "zod";
import type {ShapeSchema}   from "../schema/ShapeSchema";
import type {FilterSchema}  from "./FilterSchema";
import type {OrderBySchema} from "./OrderBySchema";
import type {QuerySchema}   from "./QuerySchema";

/**
 * This schema represents an ability to update/delete collection of the given data using a query.
 *
 * @template TShapeSchema Shape of a mutation (for patching).
 * @template TQuerySchema Query schema used to filter out collection to mutate.
 *
 * @group schema
 */
export type CollectionMutationSchema<
    TShapeSchema extends ShapeSchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
> = z.ZodObject<{
    /**
     * When specified, patch is executed; takes precedence over `delete`.
     */
    patch: z.ZodOptional<z.ZodObject<{
        /**
         * Data being used for patch.
         */
        with: ReturnType<TShapeSchema["partial"]>;
        /**
         * Query used to filter out data used to patch.
         */
        query: TQuerySchema;
    }, "strip">>;
    /**
     * When present, delete is executed on collection specified by it's query.
     */
    delete: z.ZodOptional<TQuerySchema>;
}, "strip">;

export namespace CollectionMutationSchema {
    export type Type<
        TShapeSchema extends ShapeSchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > = z.infer<CollectionMutationSchema<TShapeSchema, TQuerySchema>>;
}
