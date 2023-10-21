import {
    type Schema,
    withArray,
    withObject,
    withOptional,
    withString
} from "@use-pico/schema";

/**
 * Base definition of filter schema which should all the Sources implement.
 */
export const FilterSchema = withObject({
    /**
     * Basically any entity should have an ID, thus it's present in the default schema
     */
    id:   withOptional(
        withString()
    ),
    idIn: withOptional(
        withArray(
            withString()
        )
    ),
    /**
     * Usually it's somehow possible to search for the Entity by some text, thus it's present,
     * but not necessarily required
     */
    fulltext: withOptional(
        withString()
    ),
});
export type FilterSchema = typeof FilterSchema;
export namespace FilterSchema {
    export type Type = Schema.Output<FilterSchema>;
}
