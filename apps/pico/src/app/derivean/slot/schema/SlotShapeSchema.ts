import { z } from "zod";

export const SlotShapeSchema = z.object({
	name: z.string(),
});

export type SlotShapeSchema = typeof SlotShapeSchema;

export namespace SlotShapeSchema {
	export type Type = z.infer<SlotShapeSchema>;
}
