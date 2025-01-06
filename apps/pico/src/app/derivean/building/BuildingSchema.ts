import {
    FilterSchema,
    IdentitySchema,
    withSourceSchema,
} from "@use-pico/common";
import { z } from "zod";
import { BaseBuildingSchema } from "~/app/derivean/building/base/BaseBuildingSchema";

const entity = IdentitySchema.merge(
	z.object({
		userId: z.string().min(1),
		baseBuildingId: z.string().min(1),
	}),
);

export const BuildingSchema = withSourceSchema({
	entity,
	output: entity.merge(
		z.object({
			baseBuilding: BaseBuildingSchema.output,
		}),
	),
	shape: z.object({
		baseBuildingId: z.string().min(1),
	}),
	filter: FilterSchema.merge(
		z.object({
			userId: z.string().optional(),
			baseBuildingId: z.string().optional(),
			name: z.string().optional(),
		}),
	),
	sort: ["name"],
});

export type BuildingSchema = typeof BuildingSchema;
