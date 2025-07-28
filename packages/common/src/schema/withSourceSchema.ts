import type { z } from "zod";
import { proxyOf } from "../toolbox/proxyOf";
import type { EntitySchema } from "./EntitySchema";
import type { FilterSchema } from "./FilterSchema";

export namespace withSourceSchema {
	export interface Props<
		TEntitySchema extends EntitySchema,
		TFilterSchema extends FilterSchema,
	> {
		entity: TEntitySchema;
		filter: TFilterSchema;
	}

	export interface Instance<
		TEntitySchema extends EntitySchema,
		TFilterSchema extends FilterSchema,
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
	}
}

export const withSourceSchema = <
	TEntitySchema extends EntitySchema,
	TFilterSchema extends FilterSchema,
>({
	entity,
	filter,
}: withSourceSchema.Props<
	TEntitySchema,
	TFilterSchema
>): withSourceSchema.Instance<TEntitySchema, TFilterSchema> => {
	const proxy = proxyOf();

	return {
		entity,
		"~entity": proxy,
		"~entity-array": [],
		"~entity-partial-exclude-id": proxy,
		filter,
		"~filter": proxy,
	};
};
