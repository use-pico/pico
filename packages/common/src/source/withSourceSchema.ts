import { z } from "zod";
import type { EntitySchema } from "../schema/EntitySchema";
import type { FilterSchema } from "../schema/FilterSchema";
import { OrderSchema } from "../schema/OrderSchema";
import type { ShapeSchema } from "../schema/ShapeSchema";
import type { SortSchema } from "../schema/SortSchema";
import { proxyOf } from "../toolbox/proxyOf";

export namespace withSourceSchema {
	export interface Props<
		TEntitySchema extends EntitySchema,
		TShapeSchema extends ShapeSchema,
		TFilterSchema extends FilterSchema,
		TSort extends [string, ...string[]] = any,
	> {
		entity: TEntitySchema;
		shape: TShapeSchema;
		filter: TFilterSchema;
		sort: TSort;
	}

	export interface Instance<
		TEntitySchema extends EntitySchema,
		TShapeSchema extends ShapeSchema,
		TFilterSchema extends FilterSchema,
		TSort extends [string, ...string[]] = any,
	> {
		/**
		 * Entity schema; required stuff stored in the database (or somewhere else).
		 *
		 * Creating an entity requires this schema being valid.
		 */
		entity: TEntitySchema;
		["~entity"]: z.infer<TEntitySchema>;
		["~entity-array"]: z.infer<TEntitySchema>[];
		["~entity-partial-exclude-id"]: Partial<Omit<z.infer<TEntitySchema>, "id">>;

		/**
		 * Shape schema defines fields required to create an entity in the database;
		 * repository usually provides rest of the required fields (like userId or created timestamp and so on).
		 */
		shape: TShapeSchema;
		["~shape"]: z.infer<TShapeSchema>;
		["~shape-partial"]: Partial<z.infer<TShapeSchema>>;

		/**
		 * Filter schema defines client-side (userland) fields available for filtering.
		 */
		filter: TFilterSchema;
		["~filter"]: z.infer<TFilterSchema>;

		sort: SortSchema<TSort>;
		["~sort"]: z.infer<SortSchema<TSort>>;
		["~sort-keyof"]: TSort[number];
	}
}

export const withSourceSchema = <
	TEntitySchema extends EntitySchema,
	TShapeSchema extends ShapeSchema,
	TFilterSchema extends FilterSchema,
	const TSort extends [string, ...string[]] = any,
>({
	entity,
	shape,
	filter,
	sort,
}: withSourceSchema.Props<
	TEntitySchema,
	TShapeSchema,
	TFilterSchema,
	TSort
>): withSourceSchema.Instance<
	TEntitySchema,
	TShapeSchema,
	TFilterSchema,
	TSort
> => {
	const proxy = proxyOf();

	return {
		entity,
		"~entity": proxy,
		"~entity-array": [],
		"~entity-partial-exclude-id": proxy,
		shape,
		"~shape": proxy,
		"~shape-partial": proxy,
		filter,
		"~filter": proxy,
		"sort": z.array(
			z.object({
				name: z.enum(sort),
				sort: OrderSchema,
			}),
		),
		"~sort": proxy,
		"~sort-keyof": proxy,
	};
};
