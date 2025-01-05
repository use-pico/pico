import {
    TagSchema as CoolTagSchema,
    FilterSchema,
    withSourceSchema
} from "@use-pico/common";
import { z } from "zod";

export const TagSchema = withSourceSchema({
	entity: CoolTagSchema,
	shape: z.object({
		code: z.string().min(1),
		label: z.string().min(1),
		group: z.string().nullish(),
		sort: z.number(),
	}),
	filter: FilterSchema.merge(
		z.object({
			code: z.string().optional(),
			group: z.string().optional(),
		}),
	),
});

export type TagSchema = typeof TagSchema;
