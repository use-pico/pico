import {type z}             from "zod";
import type {ShapeSchema}   from "../schema/ShapeSchema";
import type {FilterSchema}  from "./FilterSchema";
import type {OrderBySchema} from "./OrderBySchema";
import type {QuerySchema}   from "./QuerySchema";

export type MutationSchema<
    TShapeSchema extends ShapeSchema,
    TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
> = z.ZodObject<{
    create: z.ZodOptional<TShapeSchema>;
    update: z.ZodOptional<z.ZodObject<{
        update: z.ZodOptional<
            ReturnType<TShapeSchema["partial"]>
        >;
        query: TQuerySchema;
    }, "strip">>;
    upsert: z.ZodOptional<z.ZodObject<{
        create: z.ZodOptional<TShapeSchema>;
        update: z.ZodOptional<z.ZodObject<{
            update: z.ZodOptional<
                ReturnType<TShapeSchema["partial"]>
            >;
            query: TQuerySchema;
        }, "strip">>;
    }, "strip">>;
    delete: z.ZodOptional<TQuerySchema>;
}, "strip">;

export namespace MutationSchema {
    export type Type<
        TShapeSchema extends ShapeSchema,
        TQuerySchema extends QuerySchema<FilterSchema, OrderBySchema>,
    > = z.infer<MutationSchema<TShapeSchema, TQuerySchema>>;
}
