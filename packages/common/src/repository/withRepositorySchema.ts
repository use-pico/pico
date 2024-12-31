import type { z } from "zod";
import type { EntitySchema } from "../schema/EntitySchema";
import type { FilterSchema } from "../schema/FilterSchema";
import type { ShapeSchema } from "../schema/ShapeSchema";

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
		/**
		 * The output of the queries (like fetch, list, etc.).
		 *
		 * Used only for the output validation.
		 */
		output: TOutputSchema;
		/**
		 * Shape schema defines fields required to create an entity in the database;
		 * repository usually provides rest of the required fields (like userId or created timestamp and so on).
		 */
		shape: TShapeSchema;
		/**
		 * Filter schema defines client-side (userland) fields available for filtering.
		 */
		filter: TFilterSchema;
	}

	export type Any = Instance<
		EntitySchema,
		ShapeSchema,
		FilterSchema,
		EntitySchema
	>;

	export interface Infer<TInstance extends Instance<any, any, any>> {
		entity: z.infer<TInstance["entity"]>;
		output: z.infer<TInstance["output"]>;
		shape: z.infer<TInstance["shape"]>;
		filter: z.infer<TInstance["filter"]>;
	}

	export type Entity<TInstance extends Instance<any, any, any>> = z.infer<
		TInstance["entity"]
	>;

	export type Output<TInstance extends Instance<any, any, any>> = z.infer<
		TInstance["output"]
	>;

	export type Shape<TInstance extends Instance<any, any, any>> = z.infer<
		TInstance["shape"]
	>;

	export type Filter<TInstance extends Instance<any, any, any>> = z.infer<
		TInstance["filter"]
	>;
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
	return {
		entity,
		output,
		shape,
		filter,
	};
};
