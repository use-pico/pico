import {
    FilterSchema,
    IdentitySchema,
    withRepositorySchema,
} from "@use-pico/common";
import { z } from "zod";

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
	output: entity,
	shape: z.object({
		name: z.string().min(1),
		preview: z.boolean(),
	}),
	filter: FilterSchema,
});

export type BaseBuildingSchema = typeof BaseBuildingSchema;
