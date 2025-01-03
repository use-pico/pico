import type { z } from "zod";
import type { EntitySchema } from "../schema/EntitySchema";
import type { FilterSchema } from "../schema/FilterSchema";
import type { ShapeSchema } from "../schema/ShapeSchema";
import { proxyOf } from "../toolbox/proxyOf";

export namespace withRepositorySchema {
	export interface Props<
		TEntitySchema extends EntitySchema,
		TShapeSchema extends ShapeSchema,
		TFilterSchema extends FilterSchema,
		TOutputSchema extends TEntitySchema = TEntitySchema,
	> {
		entity: TEntitySchema;
		output?: TOutputSchema;
		shape: TShapeSchema;
		filter: TFilterSchema;
	}

	export interface Instance<
		TEntitySchema extends EntitySchema,
		TShapeSchema extends ShapeSchema,
		TFilterSchema extends FilterSchema,
		TOutputSchema extends TEntitySchema = TEntitySchema,
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

		/**
		 * The output of the queries (like fetch, list, etc.).
		 *
		 * Used only for the output validation.
		 */
		output: TOutputSchema;
		["~output"]: z.infer<TOutputSchema>;
		/**
		 * May be strange as a type, but the reason is to be explicit:
		 * TSchema['~output'][] is not as readable as TSchema['~output-array']
		 */
		["~output-array"]: z.infer<TOutputSchema>[];
	}
}

export const withRepositorySchema = <
	TEntitySchema extends EntitySchema,
	TShapeSchema extends ShapeSchema,
	TFilterSchema extends FilterSchema,
	TOutputSchema extends TEntitySchema = TEntitySchema,
>({
	entity,
	output = entity as TOutputSchema,
	shape,
	filter,
}: withRepositorySchema.Props<
	TEntitySchema,
	TShapeSchema,
	TFilterSchema,
	TOutputSchema
>): withRepositorySchema.Instance<
	TEntitySchema,
	TShapeSchema,
	TFilterSchema,
	TOutputSchema
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
		output,
		"~output": proxy,
		"~output-array": [],
	};
};
