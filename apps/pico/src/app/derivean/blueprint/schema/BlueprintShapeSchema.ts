import { z } from "zod";

export const BlueprintShapeSchema = z.object({
	name: z.string().min(1),
	kind: z.enum(["building", "item"]),
});

export type BlueprintShapeSchema = typeof BlueprintShapeSchema;

export namespace BlueprintShapeSchema {
	export type Type = z.infer<BlueprintShapeSchema>;
}
