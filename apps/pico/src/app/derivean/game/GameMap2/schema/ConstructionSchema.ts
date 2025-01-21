import { withBoolSchema } from "@use-pico/common";
import { z } from "zod";

export const ConstructionSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	x: z.number(),
	y: z.number(),
	valid: withBoolSchema(),
});

export type ConstructionSchema = typeof ConstructionSchema;

export namespace ConstructionSchema {
	export type Type = z.infer<ConstructionSchema>;
}
