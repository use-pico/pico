import {
    IdentitySchema,
    withBoolSchema,
    withJsonArraySchema,
    withJsonSchema,
} from "@use-pico/common";
import { z } from "zod";
import { BlueprintDependencySchema } from "~/app/derivean/schema/BlueprintDependencySchema";
import { BlueprintRequirementSchema } from "~/app/derivean/schema/BlueprintRequirementSchema";

export const MapSchema = IdentitySchema.merge(
	z.object({
		name: z.string().min(1),
		cycles: z.number().int().nonnegative(),
		productionLimit: z.number().int().nonnegative(),
		productionCount: z.number().int().nonnegative(),
		withAvailableBuildings: withBoolSchema(),
		withAvailableResources: withBoolSchema(),
		productionAvailable: withBoolSchema(),
		building: withJsonSchema(
			z.object({
				id: z.string().min(1),
			}),
		).nullish(),
		construction: withJsonArraySchema(
			z.object({
				id: z.string().min(1),
				from: z.number().int().nonnegative(),
				to: z.number().int().nonnegative(),
				cycle: z.number().int().nonnegative(),
			}),
		),
		requirements: withJsonArraySchema(
			BlueprintRequirementSchema.entity.merge(
				z.object({
					name: z.string().min(1),
				}),
			),
		),
		dependencies: withJsonArraySchema(
			BlueprintDependencySchema.entity.merge(
				z.object({
					name: z.string().min(1),
				}),
			),
		),
		production: withJsonArraySchema(
			z.object({
				id: z.string().min(1),
				name: z.string().min(1),
				amount: z.number().nonnegative(),
				cycles: z.number().int().nonnegative(),
				limit: z.number().int().nonnegative(),
				blueprintId: z.string().min(1),
				resourceId: z.string().min(1),
				buildingId: z.string().nullish(),
				isFull: withBoolSchema(),
				withAvailableResources: withBoolSchema(),
				requirements: z.array(
					z.object({
						id: z.string().min(1),
						amount: z.number().nonnegative(),
						passive: withBoolSchema(),
						resourceId: z.string().min(1),
						name: z.string().min(1),
					}),
				),
				queue: z.array(
					z.object({
						id: z.string().min(1),
						blueprintProductionId: z.string().min(1),
						name: z.string().min(1),
						from: z.number().int().nonnegative(),
						to: z.number().int().nonnegative(),
						cycle: z.number().int().nonnegative(),
					}),
				),
			}),
		),
		producers: withJsonArraySchema(z.any()).nullish(),
	}),
);

export type MapSchema = typeof MapSchema;

export namespace MapSchema {
	export type Type = z.infer<typeof MapSchema>;
}
