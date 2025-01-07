import {
    FilterSchema,
    IdentitySchema,
    withSourceSchema,
} from "@use-pico/common";
import { z } from "zod";
import { BuildingBaseSchema } from "~/app/derivean/building/base/BuildingBaseSchema";

const entity = IdentitySchema.merge(
	z.object({
		userId: z.string().min(1),
		buildingBaseId: z.string().min(1),
	}),
);

export const BuildingSchema = withSourceSchema({
	entity,
	output: entity.merge(
		z.object({
			buildingBase: BuildingBaseSchema.output,
		}),
	),
	shape: z.object({
		buildingBaseId: z.string().min(1),
	}),
	filter: FilterSchema.merge(
		z.object({
			userId: z.string().optional(),
			buildingBaseId: z.string().optional(),
			name: z.string().optional(),
		}),
	),
	sort: ["name"],
});

export type BuildingSchema = typeof BuildingSchema;
