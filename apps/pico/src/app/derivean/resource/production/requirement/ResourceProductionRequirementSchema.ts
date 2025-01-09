import {
    FilterSchema,
    IdentitySchema,
    withBoolSchema,
    withFloatSchema,
    withSourceSchema,
} from "@use-pico/common";
import { z } from "zod";

const entity = IdentitySchema.merge(
	z.object({
		resourceProductionId: z.string().min(1),
		resourceId: z.string().min(1),
		amount: z.number().nonnegative(),
		passive: withBoolSchema(),
	}),
);

export const ResourceProductionRequirementSchema = withSourceSchema({
	entity,
	shape: z.object({
		resourceId: z.string().min(1),
		amount: withFloatSchema(),
		passive: z.boolean(),
	}),
	filter: FilterSchema.merge(
		z.object({
			resourceProductionId: z.string().optional(),
			resourceId: z.string().optional(),
		}),
	),
	sort: ["resource", "requirement", "amount", "passive"],
});

export type ResourceProductionRequirementSchema =
	typeof ResourceProductionRequirementSchema;
