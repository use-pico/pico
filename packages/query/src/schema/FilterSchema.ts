import {
    type PicoSchema,
    schema
} from "@use-pico/schema";

/**
 * Base definition of filter schema which should all the Sources implement.
 */
export const FilterSchema = schema(z => z.object({
    /**
     * Basically any entity should have an ID, thus it's present in the default schema
     */
    id:   z.string$,
    idIn: z.array(z.string).nullish(),
    /**
     * Usually it's somehow possible to search for the Entity by some text, thus it's present,
     * but not necessarily required
     */
    fulltext: z.string$,
}));
export type FilterSchema = typeof FilterSchema;
export namespace FilterSchema {
    export type Type = PicoSchema.Output<FilterSchema>;
}
