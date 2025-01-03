import { z } from "zod";

/**
 * Base definition of filter schema which should all the Sources implement.
 *
 * @group schema
 */
export const FilterSchema = z.object({
	/**
	 * Basically any entity should have an ID, thus it's present in the default schema.
	 */
	id: z.string().optional(),
	/**
	 * Option to get entities by an array of IDs.
	 */
	idIn: z.array(z.string()).optional(),
	/**
	 * Usually it's somehow possible to search for the Entity by some text, thus it's present,
	 * but not necessarily required.
	 */
	fulltext: z.string().optional(),
});

export type FilterSchema = typeof FilterSchema;

export namespace FilterSchema {
	export type Type = z.infer<FilterSchema>;
}
