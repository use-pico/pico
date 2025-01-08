import {
    FilterSchema,
    IdentitySchema,
    withSourceSchema,
} from "@use-pico/common";
import { z } from "zod";

const entity = IdentitySchema.merge(
	z.object({
		name: z.string().min(1),
	}),
);

export const ResourceSchema = withSourceSchema({
	entity,
	shape: z.object({
		name: z.string().min(1),
		tagIds: z.array(z.string()).optional(),
	}),
	filter: FilterSchema.merge(
		z.object({
			name: z.string().optional(),
		}),
	),
	sort: ["name"],
});

export type ResourceSchema = typeof ResourceSchema;
