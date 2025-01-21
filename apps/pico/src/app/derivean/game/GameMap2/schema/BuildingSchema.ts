import { z } from "zod";

export const BuildingSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	x: z.number(),
	y: z.number(),
});

export type BuildingSchema = typeof BuildingSchema;

export namespace BuildingSchema {
	export type Type = z.infer<BuildingSchema>;
}
