import {z} from "@pico/utils";

/**
 * Base definition of filter schema which should all the Sources implement.
 */
export const FilterSchema = z.object({
    /**
     * Basically any entity should have an ID, thus it's present in the default schema
     */
    id:   z.string().nullish(),
    idIn: z.array(z.string()).nullish(),
    /**
     * Usually it's somehow possible to search for the Entity by some text, thus it's present,
     * but not necessarily required
     */
    fulltext: z.string().nullish(),
});
export type FilterSchema = typeof FilterSchema;
export namespace FilterSchema {
    export type Type = z.infer<FilterSchema>;
}
