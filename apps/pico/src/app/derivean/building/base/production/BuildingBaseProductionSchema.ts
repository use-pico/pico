import {
    FilterSchema,
    IdentitySchema,
    withSourceSchema,
} from "@use-pico/common";
import { z } from "zod";

const entity = IdentitySchema.merge(
	z.object({
		buildingBaseId: z.string().min(1),
		resourceProductionId: z.string().min(1),
	}),
);

export const BuildingBaseProductionSchema = withSourceSchema({
	entity,
	shape: z.object({
		resourceProductionId: z.string().min(1),
	}),
	filter: FilterSchema.merge(
		z.object({
			buildingBaseId: z.string().optional(),
			resourceProductionId: z.string().optional(),
		}),
	),
	sort: ["resource"],
});

export type BuildingBaseProductionSchema = typeof BuildingBaseProductionSchema;
