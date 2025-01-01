import {
    FilterSchema,
    IdentitySchema,
    withRepositorySchema,
} from "@use-pico/common";
import { z } from "zod";
import { BuildingRequirementResourceSchema } from "~/app/derivean/building/requirement/resource/BuildingRequirementResourceSchema";

const entity = IdentitySchema.merge(
	z.object({
		name: z.string().min(1),
		description: z.string().optional(),
		preview: z.union([
			z.boolean(),
			z
				.number()
				.int()
				.refine((val) => val === 0 || val === 1)
				.transform((val) => (typeof val === "boolean" ? val : val === 1)),
		]),
	}),
);

export const BaseBuildingSchema = withRepositorySchema({
	entity,
	output: entity.merge(
		z.object({
			requiredResources: z.array(BuildingRequirementResourceSchema.output),
		}),
	),
	shape: z.object({
		name: z.string().min(1),
		description: z.string().optional(),
		preview: z.boolean(),
	}),
	filter: FilterSchema,
});

export type BaseBuildingSchema = typeof BaseBuildingSchema;
