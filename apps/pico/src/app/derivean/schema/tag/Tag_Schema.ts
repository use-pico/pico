import { FilterSchema, withIntSchema } from "@use-pico/common";
import { z } from "zod";
import { withTagSchema } from "~/app/derivean/db/sdk";

export const Tag_Schema = withTagSchema({
	shape: z.object({
		code: z.string().min(1),
		label: z.string().min(1),
		group: z.string().nullish(),
		sort: withIntSchema(),
	}),
	filter: FilterSchema.merge(
		z.object({
			code: z.string().optional(),
			group: z.string().optional(),
		}),
	),
});

export type Tag_Schema = typeof Tag_Schema;
