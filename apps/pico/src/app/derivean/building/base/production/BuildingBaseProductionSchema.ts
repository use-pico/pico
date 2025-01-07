import {
    FilterSchema,
    IdentitySchema,
    withSourceSchema,
} from "@use-pico/common";
import { z } from "zod";
import { BuildingBaseSchema } from "~/app/derivean/building/base/BuildingBaseSchema";
import { ResourceProductionSchema } from "~/app/derivean/resource/production/ResourceProductionSchema";

const entity = IdentitySchema.merge(
	z.object({
		buildingBaseId: z.string().min(1),
		resourceProductionId: z.string().min(1),
	}),
);

export const BuildingBaseProductionSchema = withSourceSchema({
	entity,
	output: entity.merge(
		z.object({
			buildingBase: BuildingBaseSchema.output,
			resourceProduction: ResourceProductionSchema.output,
		}),
	),
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
