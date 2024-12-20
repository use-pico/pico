import { z } from "zod";
import type { FilterSchema } from "./FilterSchema";
import type { PatchSchema } from "./PatchSchema";
import type { ShapeSchema } from "./ShapeSchema";

export namespace withPatchSchema {
	export interface Props<
		TShapeSchema extends ShapeSchema,
		TFilterSchema extends FilterSchema,
	> {
		shape: TShapeSchema;
		filter: TFilterSchema;
	}
}

export const withPatchSchema = <
	TShapeSchema extends ShapeSchema,
	TFilterSchema extends FilterSchema,
>({
	shape,
	filter,
}: withPatchSchema.Props<TShapeSchema, TFilterSchema>): PatchSchema<
	TShapeSchema,
	TFilterSchema
> => {
	return z.object({
		patch: z.object({
			with: shape.partial(),
			filter,
		}),
	}) as PatchSchema<TShapeSchema, TFilterSchema>;
};
