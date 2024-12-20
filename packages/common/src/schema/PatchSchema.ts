import type { z } from "zod";
import type { FilterSchema } from "./FilterSchema";
import type { PartialSchema } from "./PartialSchema";
import type { ShapeSchema } from "./ShapeSchema";

export type PatchSchema<
	TShapeSchema extends ShapeSchema,
	TFilterSchema extends FilterSchema,
> = z.ZodObject<
	{
		patch: z.ZodObject<
			{
				with: PartialSchema<TShapeSchema>;
				filter: TFilterSchema;
			},
			"strip"
		>;
	},
	"strip"
>;
