import {
	FilterSchema,
	IdentitySchema,
	translator,
	withSourceSchema,
} from "@use-pico/common";
import { z } from "zod";
import { BaseBuildingLimitSchema } from "~/app/derivean/building/base/limit/BaseBuildingLimitSchema";
import { BaseBuildingRequirementSchema } from "~/app/derivean/building/base/requirement/BaseBuildingRequirementSchema";

const entity = IdentitySchema.merge(
	z.object({
		name: z.string().min(1),
		cycles: z.number().int().positive(),
	}),
);

export const BaseBuildingSchema = withSourceSchema({
	entity,
	output: entity.merge(
		z.object({
			requirements: z.array(BaseBuildingRequirementSchema.output),
			limits: z.array(BaseBuildingLimitSchema.output),
		}),
	),
	shape: z.object({
		name: z.string().min(1),
		cycles: z.union([
			z.number().int().positive(),
			z
				.string()
				.transform((value) => parseInt(value, 10))
				.refine((value) => !isNaN(value), {
					message: translator.text("Cycles must be a number"),
				}),
		]),
	}),
	filter: FilterSchema.merge(
		z.object({
			name: z.string().optional(),
		}),
	),
	sort: ["name"],
});

export type BaseBuildingSchema = typeof BaseBuildingSchema;
