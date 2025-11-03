import { z } from "zod";

export const CountSchema = z.object({
	where: z.coerce.number(),
	filter: z.coerce.number(),
	total: z.coerce.number(),
});

export type CountSchema = typeof CountSchema;

export namespace CountSchema {
	export type Type = z.infer<typeof CountSchema>;
}
