import {z} from "zod";

/**
 * Count result schema.
 *
 * @group schema
 */
export const CountSchema = z.object({
    /**
     * Maximum number of items in the collection (without filters).
     */
    total: z.number(),
    /**
     * Number of items in the collection (with "where" filter).
     */
    where: z.number(),
    /**
     * Current count of items using "filter" (and "where").
     */
    count: z.number(),
});
export type CountSchema = typeof CountSchema;
export namespace CountSchema {
    export type Type = z.infer<CountSchema>;
}
