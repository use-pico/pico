import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { withBlueprintDependencySchema } from "~/app/derivean/db/sdk";

export const BlueprintDependencySchema = withBlueprintDependencySchema({
	shape: z.object({
		dependencyId: z.string().min(1),
	}),
	filter: FilterSchema.merge(
		z.object({
			blueprintId: z.string().optional(),
			dependencyId: z.string().optional(),
		}),
	),
});

export type BlueprintDependencySchema = typeof BlueprintDependencySchema;
