import type { z } from "zod";
import type { EntitySchema } from "../schema/EntitySchema";
import type { FilterSchema } from "../schema/FilterSchema";
import type { ShapeSchema } from "../schema/ShapeSchema";

export namespace withRepositorySchema {
	export interface Props<
		TEntitySchema extends EntitySchema,
		TShapeSchema extends ShapeSchema,
		TFilterSchema extends FilterSchema,
	> {
		entity: TEntitySchema;
		shape: TShapeSchema;
		filter: TFilterSchema;
	}

	export interface Instance<
		TEntitySchema extends EntitySchema,
		TShapeSchema extends ShapeSchema,
		TFilterSchema extends FilterSchema,
	> {
		entity: TEntitySchema;
		shape: TShapeSchema;
		filter: TFilterSchema;
	}

	export interface Infer<TInstance extends Instance<any, any, any>> {
		entity: z.infer<TInstance["entity"]>;
		shape: z.infer<TInstance["shape"]>;
		filter: z.infer<TInstance["filter"]>;
	}

	export type Entity<TInstance extends Instance<any, any, any>> = z.infer<
		TInstance["entity"]
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
>({
	entity,
	shape,
	filter,
}: withRepositorySchema.Props<
	TEntitySchema,
	TShapeSchema,
	TFilterSchema
>): withRepositorySchema.Instance<
	TEntitySchema,
	TShapeSchema,
	TFilterSchema
> => {
	return {
		entity,
		shape,
		filter,
	};
};
