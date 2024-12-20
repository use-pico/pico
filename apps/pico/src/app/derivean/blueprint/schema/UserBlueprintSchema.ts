import { z } from "zod";

export const UserBlueprintSchema = z.object({
	id: z.string(),
	userId: z.string(),
	blueprintId: z.string(),
});

export type UserBlueprintSchema = typeof UserBlueprintSchema;

export namespace UserBlueprintSchema {
	export type Type = z.infer<UserBlueprintSchema>;
}
