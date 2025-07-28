import type { z } from "zod";
import { proxyOf } from "../toolbox/proxyOf";
import type { EntitySchema } from "./EntitySchema";
import type { FilterSchema } from "./FilterSchema";
import type { SortSchema } from "./SortSchema";

export namespace withSourceSchema {
	export interface Props<
		TEntitySchema extends EntitySchema,
		TFilterSchema extends FilterSchema,
		TSortSchema extends SortSchema<any>,
	> {
		entity: TEntitySchema;
		filter: TFilterSchema;
		sort: TSortSchema;
	}

	export interface Instance<
		TEntitySchema extends EntitySchema,
		TFilterSchema extends FilterSchema,
		TSortSchema extends SortSchema<any>,
	> {
		/**
		 * Entity schema; required stuff stored in the database (or somewhere else).
		 *
		 * Creating an entity requires this schema being valid.
		 */
		entity: TEntitySchema;
		"~entity": z.infer<TEntitySchema>;
		"~entity-array": z.infer<TEntitySchema>[];
		"~entity-partial-exclude-id": Partial<
			Omit<z.infer<TEntitySchema>, "id">
		>;

		/**
		 * Filter schema defines client-side (userland) fields available for filtering.
		 */
		filter: TFilterSchema;
		"~filter": z.infer<TFilterSchema>;

		/**
		 * Sort schema defines client-side (userland) fields available for sorting.
		 */
		sort: TSortSchema;
		"~sort": z.infer<TSortSchema>;
	}
}

export const withSourceSchema = <
	TEntitySchema extends EntitySchema,
	TFilterSchema extends FilterSchema,
	TSortSchema extends SortSchema<any>,
>({
	entity,
	filter,
	sort,
}: withSourceSchema.Props<
	TEntitySchema,
	TFilterSchema,
	TSortSchema
>): withSourceSchema.Instance<TEntitySchema, TFilterSchema, TSortSchema> => {
	const proxy = proxyOf();

	return {
		entity,
		"~entity": proxy,
		"~entity-array": [],
		"~entity-partial-exclude-id": proxy,
		filter,
		"~filter": proxy,
		sort: sort as TSortSchema,
		"~sort": proxy,
	};
};
