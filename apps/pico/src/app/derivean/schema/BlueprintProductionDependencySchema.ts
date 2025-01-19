import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { withBlueprintProductionDependencySchema } from "~/app/derivean/db/sdk";

export const BlueprintProductionDependencySchema =
	withBlueprintProductionDependencySchema({
		shape: z.object({
			blueprintId: z.string().min(1),
		}),
		filter: FilterSchema,
	});

export type BlueprintProductionDependencySchema =
	typeof BlueprintProductionDependencySchema;
