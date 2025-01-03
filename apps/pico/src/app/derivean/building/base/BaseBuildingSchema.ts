import {
    FilterSchema,
    IdentitySchema,
    withRepositorySchema,
} from "@use-pico/common";
import { z } from "zod";
import { BaseBuildingLimitSchema } from "~/app/derivean/building/base/limit/BaseBuildingLimitSchema";
import { BaseBuildingRequirementSchema } from "~/app/derivean/building/base/requirement/BaseBuildingRequirementSchema";

const entity = IdentitySchema.merge(
	z.object({
		name: z.string().min(1),
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
			requirements: z.array(BaseBuildingRequirementSchema.output),
			limits: z.array(BaseBuildingLimitSchema.output),
		}),
	),
	shape: z.object({
		name: z.string().min(1),
		preview: z.boolean(),
	}),
	filter: FilterSchema,
});

export type BaseBuildingSchema = typeof BaseBuildingSchema;
